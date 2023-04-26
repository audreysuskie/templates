const mongoose = require('mongoose');
const validator = require('validator');
('use strict');
const mongooseDateFormat = require('mongoose-date-format');

const calendarSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.ObjectId,
    ref: 'Service',
  },

  available: {
    type: Array,
  },
});

calendarSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'service',
    select: 'id title',
  });

  next();
});

calendarSchema.plugin(mongooseDateFormat);
const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
