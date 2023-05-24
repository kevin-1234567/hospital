const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const consultation = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    trim: true,
  },
  hospitalId: {
    type: String,
    required: true,
    trim: true,
  },
  departmentId: {
    type: String,
    required: false,
    trim: true,
  },
  doctorId: {
    type: String,
    required: false,
    trim: true,
  },
  time: {
    type: String,
    required: false,
    trim: true,
  },
  loginId: {
    type: ObjectId,
    ref: 'login',
    required: false,
    trim: true,
  },
  date: { type: Date, trim: true, required: true },
  transactionId: { type: ObjectId, ref: 'transaction', required: false },
});

module.exports = mongoose.model('consultation', consultation);
