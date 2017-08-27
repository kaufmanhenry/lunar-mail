const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET = 'thisisastupidsecret';
const SALT_ROUNDS = 10;

// Decodes a token
const decodeToken = token =>
  new Promise((resolve, reject) => {
    if (!token) {
      return reject({
        message: 'No token was provided'
      });
    }
    return jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return reject(err);
      if (decoded._doc) return resolve(decoded._doc); // eslint-disable-line
      return reject({
        message: 'No user found in the token'
      });
    });
  });

// Hashes a password
const hashPassword = password =>
  new Promise((resolve, reject) => {
    if (!password) {
      return reject({
        message: 'A password is required in order to hash'
      });
    }

    return bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });

// Compares a password and a hash
const comparePassword = (password, hash) =>
  new Promise((resolve, reject) => {
    if (!password || !hash) {
      return reject({
        message: 'Both a password and a hash are required to compare'
      });
    }

    return bcrypt.compare(password, hash, (err, response) => {
      if (err) return reject(err);

      return resolve(response);
    });
  });

// Encodes a user into a token
const encodeUser = user =>
  new Promise((resolve, reject) => {
    if (!user) {
      return reject({
        message: 'A user is required in order to encode'
      });
    }
    return jwt.sign(user, SECRET, {}, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });

// Middleware to validate a token
const authMiddleware = (req, res, next) => {
  const token = req.headers.lunarMailToken;

  if (token) {
    decodeToken(token)
      .then(
        () => next(),
        err => res.status(err.status || 422).send({ message: err.message || 'Bad request' })
      );
  }

  return res.status(403);
};

module.exports = {
  authMiddleware,
  decodeToken,
  encodeUser,
  hashPassword,
  comparePassword
};
