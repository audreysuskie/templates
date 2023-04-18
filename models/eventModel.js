const mongoose = require('mongoose');
('use strict');
const mongooseDateFormat = require('mongoose-date-format');

const eventSchema = new mongoose.Schema(
  {
    eventDate: {
      type: String,
      required: [true, 'Please specify a booking date.'],
    },

    eventTime: {
      type: String,
      required: [true, 'Please specify a booking time.'],
    },

    dateString: {
      type: Date,
      default: new Date(),
    },

    service: {
      type: mongoose.Schema.ObjectId,
      ref: 'Service',
      required: [true, 'A new appointment must include a service ID.'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'You must be logged in to book a service.'],
    },

    review: {
      type: mongoose.Schema.ObjectId,
      ref: 'Review',
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-events',
  });

  this.populate({
    path: 'service',
    select: 'title',
  });

  this.populate({
    path: 'review',
    select: 'rating review service',
  });

  next();
});

eventSchema.plugin(mongooseDateFormat);
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
