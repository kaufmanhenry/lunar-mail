const Mongo = require('./index');
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

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
  },
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = EmailModel;
