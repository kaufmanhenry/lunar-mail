const co = require('co');
const { Router } = require('express');
const User = require('../models/User');
const Email = require('../models/Email');

const handleRequest = require('../config/responseHandler');

const { authMiddleware, hashPassword } = require('../config/auth');

const userPostMiddleware = user =>
  co(function* middleware() {
    if (user.password) user.passwordHash = yield hashPassword(user.password);

    return user;
  });

const router = Router();

router.get('/:user', authMiddleware, (req, res) => User.find({ _id: req.params.user }, handleRequest(res)));

// Find specific emails for a user
router.get('/:user/emails', authMiddleware, (req, res) =>
  Email.find({ owner: req.params.user }, (err, response) => {
    if (err) return handleRequest(res)(err);

    return handleRequest(res)(null, response);
  })
);

router.post('/', (req, res) =>
  userPostMiddleware(req.body)
  .then((user) => {
    const saveUser = new User(user);
    return saveUser.save(handleRequest(res));
  }, err => handleRequest(res)(err))
);

router.put('/:user', authMiddleware, (req, res) =>
  User.findOneAndUpdate(
    { _id: req.params.user },
    req.body,
    handleRequest(res)
  )
);

router.delete('/:user', authMiddleware, (req, res) => User.remove({ _id: req.params.user }, handleRequest(res)));

module.exports = router;
