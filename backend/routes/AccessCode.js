const { Router } = require('express');
const co = require('co');

const User = require('../models/User');

const { authMiddleware, generateAccessCode } = require('../config/auth');
const handleRequest = require('../config/responseHandler');

const router = Router();

router.post('/', authMiddleware, (req, res) =>
  co(function* createAccessCode() {
    if (!req.body.user) {
      return handleRequest(res)({
        message: 'A user is required to create an access code',
        user: req.body.user
      });
    }

    let user;
    try {
      user = yield User.findOne({ _id: req.body.user });
    } catch (e) {
      return handleRequest(res)(e);
    }

    let accessCode;
    try {
      accessCode = yield generateAccessCode(user);
    } catch (e) {
      return handleRequest(res)(e);
    }

    return handleRequest(res)(null, {
      accessCode
    });
  }));

module.exports = router;
