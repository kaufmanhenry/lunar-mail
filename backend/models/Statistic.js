const Mongo = require('./index');
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const StatisticModel = Mongo.model('Statistic', new mongoose.Schema({
  email: {
    type: ObjectId,
    ref: 'Email'
  },
  to: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}));

module.exports = StatisticModel;
