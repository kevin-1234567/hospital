const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const vaccination = new mongoose.Schema({
  vaccineId: { type: String, trim: true, required: true },
  hospitalId: { type: String, trim: true, required: true },
  disease: { type: String, trim: true, required: true },
  antigen: { type: String, trim: true, required: true },
  loginId: { type: ObjectId, ref: 'login', trim: true, required: true },
  date: { type: Date, trim: true, required: true },
  time: {
    type: String,
    required: false,
    trim: true,
  },
  transactionId: { type: ObjectId, ref: 'transaction', required: false },
});

module.exports = mongoose.model('vaccination', vaccination);
