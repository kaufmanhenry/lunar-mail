const Mongo = require('./index');

const UserModel = Mongo.model('User', {
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

module.exports = UserModel;
