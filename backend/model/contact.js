const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

const contact = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('contact', contact);
