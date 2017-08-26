const { Router } = require('express');
const co = require('co');
const Email = require('../models/Email');

const mailerConfig = require('../config/mailer');

const handleRequest = require('../config/responseHandler');

const { authMiddleware } = require('../config/auth');

const sendEmail = (to, meta, email) =>
  new Promise((resolve, reject) => {
    const renderedBody = `
      <p>${email.body}</p>
    `;

    return mailerConfig(to, email.subject, renderedBody).then(resolve, reject);
  });

const router = Router();

router.get('/:email',
  authMiddleware,
  (req, res) => Email.find({ _id: req.params.email }, handleRequest(res)));

router.post('/', authMiddleware, (req, res) => {
  const email = new Email(req.body);

  return email.save(handleRequest(res));
});

router.put('/:email',
  authMiddleware,
  (req, res) =>
    Email.findOneAndUpdate(
      { _id: req.params.location },
      req.body,
      handleRequest(res)
    ));

router.delete('/:location',
  authMiddleware,
  (req, res) => Email.remove({ _id: req.params.location }, handleRequest(res)));

router.post('/send/:identifier',
  authMiddleware,
  (req, res) =>
    co(function* sendEmailRoute() {
      if (!req.params.identifier) {
        return handleRequest(res)({
          message: 'An identifier is required in order to send an email',
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

      // Find the email with the correct identifier
      let email;
      try {
        email = yield Email.findOne({ identifier: req.params.identifier });
      } catch (e) {
        return handleRequest(res)(e);
      }

      let sentEmail;
      try {
        sentEmail = yield sendEmail(req.body.to, req.body.meta, email);
      } catch (e) {
        return handleRequest(res)(e);
      }

      return res.send(sentEmail);
    })
);

module.exports = router;
