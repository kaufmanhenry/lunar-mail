const { Router } = require('express');
const co = require('co');
const Email = require('../models/Email');
const Statistic = require('../models/Statistic');

const { sendEmail } = require('../config/mailer');

const handleRequest = require('../config/responseHandler');

const { authMiddleware, validateAccessCode } = require('../config/auth');

const Prop = (obj, is, value) => {
  if (typeof is === 'string') is = is.split('.');
  if (is.length === 1 && value !== undefined) return obj[is[0]] = value;
  else if (is.length === 0) return obj;
  else {
    const prop = is.shift();
    if (value !== undefined && obj[prop] === undefined) obj[prop] = {};
    return Prop(obj[prop], is, value);
  }
};

const render = (str, obj) => str.replace(/\$\{(.+?)\}/g, (match, p1) => Prop(obj, p1));

const renderAndSendEmail = (to, meta, email) =>
  new Promise((resolve, reject) => {
    const renderedBody = render(email.body, meta);

    return sendEmail(to, email.subject, renderedBody).then((response) => {
      // Create a new statistic to save (an interaction)
      const newStat = new Statistic({ email: email._id, to }); // eslint-disable-line

      // Save the interaction
      newStat.save((err) => {
        if (err) return reject(err);

        return resolve(response);
      });
    }, reject);
  });

const router = Router();

router.get('/:email',
  authMiddleware,
  (req, res) =>
    co(function* fetchEmail() {
      // Find the email corresponding to the parameter
      let email;
      try {
        email = yield Email.findOne({ _id: req.params.email });
      } catch (e) {
        return handleRequest(res)(e);
      }

      // Find all stats corresponding to the parameter
      let stats;
      try {
        stats = yield Statistic.find({ email: req.params.email });
      } catch (e) {
        return handleRequest(res)(e);
      }

      // Respond with the email and stats
      return handleRequest(res)(null, {
        email,
        stats
      });
    }));

router.post('/', authMiddleware, (req, res) => {
  // Create an object of the email to save
  const emailToSave = {
    name: req.body.name,
    subject: req.body.subject,
    body: req.body.body,
    owner: req.body.user._id // eslint-disable-line
  };
  // Save the email
  const email = new Email(emailToSave);

  // Save email
  return email.save((err, response) => {
    if (err) return handleRequest(res)(err);

    return handleRequest(res)(null, response);
  });
});

router.post('/:email',
  authMiddleware,
  (req, res) =>
    Email.findOneAndUpdate(
      { _id: req.params.email },
      req.body,
      { new: true },
      handleRequest(res)
    ));

router.delete('/:email',
  authMiddleware,
  (req, res) => Email.remove({ _id: req.params.email }, handleRequest(res)));

router.post('/send/:id',
  (req, res) =>
    co(function* sendEmailRoute() {
      if (!req.params.id) {
        return handleRequest(res)({
          message: 'An id is required in order to send an email',
          status: 422
        });
      }

      if (!req.body.to) {
        return handleRequest(res)({
          message: 'A user to send the email to is required in order to send an email',
          status: 422
        });
      }

      if (!req.body.meta) {
        return handleRequest(res)({
          message: 'Meta data is required in order to send an email.',
          status: 422
        });
      }

      let validAccessCode;
      try {
        validAccessCode = yield validateAccessCode(req.headers.accesstoken);
      } catch (e) {
        return handleRequest(res)(e);
      }

      if (!validAccessCode) {
        return handleRequest(res)({
          status: 403,
          message: 'Access token was not valid'
        });
      }

      // Find the email with the correct identifier
      let email;
      try {
        email = yield Email.findOne({ _id: req.params.id });
      } catch (e) {
        return handleRequest(res)(e);
      }

      try {
        yield renderAndSendEmail(req.body.to, req.body.meta, email);
      } catch (e) {
        return handleRequest(res)(e);
      }

      return handleRequest(res)(null, {
        message: 'Successfully sent an email'
      });
    })
);

module.exports = router;
