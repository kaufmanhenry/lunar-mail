const Mongo = require('./index');

const UserModel = Mongo.model('User', {
  name: {
    type: String,
    required: true
  },
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
