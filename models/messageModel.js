const mongoose = require('mongoose');
const validator = require('validator');
('use strict');
const mongooseDateFormat = require('mongoose-date-format');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name.'],
  },

  email: {
    type: String,
    required: [true, 'An email address is required.'],
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },

  phone: {
    type: String,
  },

  sent: {
    type: Date,
    default: Date.now(),
  },

  status: {
    type: String,
    default: 'unread',
  },

  message: {
    type: String,
    required: [true, 'An message is required.'],
  },
});

messageSchema.plugin(mongooseDateFormat);
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
