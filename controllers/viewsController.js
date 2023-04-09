const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const Event = require('../models/eventModel');
const Service = require('../models/serviceModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
// const factory = require('./handlerFactory');
// const Email = require('../utils/email');
const today = new Date();

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      'Your session was booked! Please check your email for confirmation. Your new booking will appear on this page shortly.';
  next();
};

exports.checkEmail = (req, res) => {
  res.status(200).render('email/welcome');
};

exports.getHomePage = catchAsync(async (req, res) => {
  const reviews = await Review.find().limit(3);
  res.status(200).render('index', {
    title: 'Home Page',
    reviews,
  });
});

exports.services = catchAsync(async (req, res) => {
  const services = await Service.find();
  res.status(200).render('services', {
    title: 'Our Services',
    services,
  });
});

exports.addService = catchAsync(async (req, res) => {
  res.status(200).render('addservice', {
    title: 'Add New Service',
  });
});

exports.clientList = catchAsync(async (req, res) => {
  const users = await User.find({ active: { $eq: true } });
  const users2 = await User.find({ active: { $eq: false } });
  res.status(200).render('clients', {
    title: 'Client List',
    users,
    users2,
  });
});

exports.allBookings = catchAsync(async (req, res) => {
  const events = await Event.find({ dateString: { $gte: today } }).sort({
    dateString: 1,
    eventTime: 1,
  });
  const pastevents = await Event.find({
    dateString: { $lt: today },
  }).sort({
    dateString: -1,
    eventTime: -1,
  });
  res.status(200).render('allbookings', {
    title: 'Bookings',
    events,
    pastevents,
  });
});

exports.userBookings = catchAsync(async (req, res) => {
  const userId = res.locals.user.id;
  const events = await Event.find({
    user: userId,
    dateString: { $gte: today },
  }).sort({
    dateString: 1,
    eventTime: 1,
  });

  res.status(200).render('bookings', {
    title: 'User Bookings',
    events,
  });
});

exports.pastUserBookings = catchAsync(async (req, res) => {
  const userId = res.locals.user.id;
  const events = await Event.find({
    user: userId,
    dateString: { $lt: today },
  }).sort({
    dateString: -1,
    eventTime: -1,
  });
  res.status(200).render('pastbookings', {
    title: 'User Past Bookings',
    events,
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
    User,
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log in to your Account',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('createaccount', {
    title: 'Create your new Account',
  });
};

exports.forgotPasswordForm = (req, res) => {
  res.status(200).render('forgotpassword', {
    title: 'Forgot password?',
  });
};

exports.resetPasswordForm = (req, res) => {
  if (!res.locals.user) {
    const { token } = req.query;
    res.status(200).render('resetpassword', {
      title: 'Reset your password',
      token,
    });
  } else {
    res.redirect('/');
  }
};

exports.tempPage = (req, res) => {
  res.status(200).render('test', {
    title: 'Event Calendar',
  });
};
