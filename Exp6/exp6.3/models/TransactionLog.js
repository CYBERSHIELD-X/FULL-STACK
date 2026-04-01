const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
  status: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TransactionLog', logSchema);
