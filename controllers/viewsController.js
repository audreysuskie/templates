const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const Event = require('../models/eventModel');
const Service = require('../models/serviceModel');
const Message = require('../models/messageModel');
const Calendar = require('../models/calendarModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
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
  const availables = await Calendar.find().sort({ service: 1 });
  const reviews = await Review.find().limit(3).sort({ createdAt: 1 });
  const services = await Service.find().sort({
    title: 1,
  });
  res.status(200).render('index', {
    title: 'Home Page',
    reviews,
    services,
    availables,
  });
});

exports.aboutPage = catchAsync(async (req, res) => {
  res.status(200).render('about', {
    title: 'About Us',
  });
});

exports.faqPage = catchAsync(async (req, res) => {
  res.status(200).render('faqs', {
    title: 'Frequently Asked Questions',
  });
});

exports.contactPage = catchAsync(async (req, res) => {
  res.status(200).render('contact', {
    title: 'Contact Us',
  });
});

exports.guestServices = catchAsync(async (req, res) => {
  const availables = await Calendar.find().sort({ service: 1 });
  const messages = await Message.find({ status: 'unread' });
  const pendreviews = await Review.find({ status: 'pending' });
  const services = await Service.find({ active: { $ne: 'false' } }).sort({
    title: 1,
  });
  res.status(200).render('guestservices', {
    title: 'Our Services',
    services,
    pendreviews,
    messages,
    availables,
  });
});

exports.bookService = catchAsync(async (req, res) => {
  const service = await Service.findById(req.params.serviceId);
  res.status(200).render('bookservice', {
    title: 'Book Service',
    service,
  });
});

exports.services = catchAsync(async (req, res) => {
  const messages = await Message.find({ status: 'unread' });
  const pendreviews = await Review.find({ status: 'pending' });
  const actives = await Service.find({ active: { $ne: 'false' } }).sort({
    title: 1,
  });
  const notactives = await Service.find({ active: 'false' });
  res.status(200).render('services', {
    title: 'Services',
    actives,
    notactives,
    pendreviews,
    messages,
  });
});

exports.availability = catchAsync(async (req, res) => {
  const availables = await Calendar.find().sort({ service: 1 });
  const messages = await Message.find({ status: 'unread' });
  const pendreviews = await Review.find({ status: 'pending' });
  const services = await Service.find({ active: { $ne: 'false' } }).sort({
    title: 1,
  });
  res.status(200).render('availability', {
    title: 'Edit Calendar',
    services,
    pendreviews,
    messages,
    availables,
  });
});

exports.addService = catchAsync(async (req, res) => {
  const messages = await Message.find({ status: 'unread' });
  const pendreviews = await Review.find({ status: 'pending' });
  res.status(200).render('addservice', {
    title: 'Add New Service',
    pendreviews,
    messages,
  });
});

exports.updateService = catchAsync(async (req, res) => {
  const messages = await Message.find({ status: 'unread' });
  const pendreviews = await Review.find({ status: 'pending' });
  const service = await Service.findById(req.params.serviceId);

  res.status(200).render('updateservice', {
    title: 'Edit Service',
    service,
    pendreviews,
    messages,
  });
});

exports.clientList = catchAsync(async (req, res) => {
  const messages = await Message.find({ status: 'unread' });
  const pendreviews = await Review.find({ status: 'pending' });
  const users = await User.find({ active: { $eq: true }, role: 'user' });
  const users2 = await User.find({ active: { $eq: false } });
  res.status(200).render('clients', {
    title: 'Client List',
    users,
    users2,
    pendreviews,
    messages,
  });
});

exports.allBookings = catchAsync(async (req, res) => {
  const messages = await Message.find({ status: 'unread' });
  const pendreviews = await Review.find({ status: 'pending' });
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
    pendreviews,
    messages,
  });
});

exports.userReviews = catchAsync(async (req, res) => {
  const userId = res.locals.user.id;
  const reviews = await Review.find({
    user: userId,
  });
  const pendreviews = await Review.find({ status: 'pending' });
  const messages = await Message.find();

  res.status(200).render('userreviews', {
    title: 'Reviews',
    reviews,
    pendreviews,
    messages,
  });
});

exports.allReviews = catchAsync(async (req, res) => {
  const messages = await Message.find({ status: 'unread' });
  const pendreviews = await Review.find({ status: 'pending' }).sort({
    createdAt: -1,
  });
  const reviews = await Review.find({ status: 'published' }).sort({
    createdAt: -1,
  });

  res.status(200).render('allreviews', {
    title: 'Reviews',
    pendreviews,
    reviews,
    messages,
  });
});

exports.allMessages = catchAsync(async (req, res) => {
  const pendreviews = await Review.find({ status: 'pending' });
  const messages = await Message.find({ status: 'unread' }).sort({
    sent: -1,
  });
  const readmessages = await Message.find({ status: 'read' }).sort({
    sent: -1,
  });

  res.status(200).render('messages', {
    title: 'Messages',
    pendreviews,
    messages,
    readmessages,
  });
});

exports.userBookings = catchAsync(async (req, res) => {
  const userId = res.locals.user.id;
  const messages = await Message.find({ status: 'unread' });
  const pendreviews = await Review.find({ status: 'pending' });
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
    pendreviews,
    messages,
  });
});

exports.accountHistory = catchAsync(async (req, res) => {
  const userId = res.locals.user.id;
  const messages = await Message.find({ status: 'unread' });
  const events = await Event.find({
    user: userId,
    dateString: { $gte: today },
  });
  const reviews = await Review.find({
    user: userId,
  });
  const reviews2 = await Review.find({
    user: userId,
  })
    .limit(2)
    .sort({ createdAt: -1 });
  const currents = await Event.find({
    user: userId,
    dateString: { $gte: today },
  })
    .limit(1)
    .sort({
      dateString: 1,
      eventTime: 1,
    });
  const pastevents = await Event.find({
    user: userId,
    dateString: { $lt: today },
  }).sort({
    dateString: -1,
    eventTime: -1,
  });

  res.status(200).render('accounthistory', {
    title: 'User Account History',
    currents,
    events,
    pastevents,
    reviews,
    reviews2,
    messages,
  });
});

exports.getAccount = catchAsync(async (req, res) => {
  const pendreviews = await Review.find({ status: 'pending' });
  const messages = await Message.find({ status: 'unread' });
  const services = await Service.find({ active: { $ne: 'false' } }).sort({
    title: 1,
  });
  res.status(200).render('account', {
    title: 'Your Account',
    User,
    pendreviews,
    messages,
    services,
  });
});

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
