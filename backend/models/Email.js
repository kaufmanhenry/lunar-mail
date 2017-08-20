const Mongo = require('./index');

const EmailModel = Mongo.model('Email', {
  name: {
    type: String,
    required: true
  },
  identifier: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  }
});

module.exports = EmailModel;
