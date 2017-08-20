const { Router } = require('express');
const co = require('co');

const responseHandler = require('../config/responseHandler');

const User = require('../models/User');
const { comparePassword, encodeUser } = require('../config/auth');

const router = Router();

router.post('/', (req, res) =>
  co(function* auth() {
    // Both an email and password are required to auth
    if (!req.body.email) {
      return responseHandler(res)({
        message: 'An email is required to authenticate',
        status: 422,
        email: req.body.email
      });
    }
    if (!req.body.password) {
      return responseHandler(res)({
        message: 'A password is required to authenticate',
        status: 422,
        password: req.body.password
      });
    }

    // Find the user with the email requested
    let user;
    try {
      user = yield User.findOne({
        email: req.body.email
      });
    } catch (e) {
      return responseHandler(res)(e);
    }

    // If no user exists, handle the error
    if (!user) {
      return responseHandler(res)({
        message: 'No user found for the supplied email',
        status: 422
      });
    }

    // Compare the found user's password with the password from the request
    let matchedPassword;
    try {
      matchedPassword = yield comparePassword(req.body.password, user.passwordHash);
    } catch (e) {
      return responseHandler(res)(e);
    }

    // If they do not match, return with an error
    if (!matchedPassword) {
      return responseHandler(res)({
        message: 'Error authenticating',
        status: 403
      });
    }

    // Encode the user into a token
    let encodedUser;
    try {
      encodedUser = yield encodeUser(user);
    } catch (e) {
      return responseHandler(res)(e);
    }

    // Respond the the generated token
    return responseHandler(res)(encodedUser);
  }));
