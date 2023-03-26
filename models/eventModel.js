const mongoose = require('mongoose');

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

    service: {
      type: String,
      required: [true, 'Please specify a service.'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'You must be logged in to book a service.'],
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
    select: 'name email id',
  });

  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
