const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setUserIds = (req, res, next) => {
  // Allow Nested Routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });

  res.status(200).render('myreviews', {
    title: 'My Reviews',
    reviews,
  });
});

exports.manageReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).render('managereviews', {
    title: 'Manage Reviews',
    reviews,
  });
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
