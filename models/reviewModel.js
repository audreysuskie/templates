const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A brief review is required'],
    },
    service: {
      type: String,
      required: [true, 'Please specify the service you had.'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be below 5'],
      required: [true, 'A rating is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must be written by a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.findOne();
//   next();
// });

//reviewSchema.index({ user: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
