const Event = require('../models/eventModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setUserIds = (req, res, next) => {
  // Allow Nested Routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createEvent = factory.createOne(Event);
exports.getEvent = factory.getOne(Event);
exports.getAllEvents = factory.getAll(Event);
exports.updateEvent = factory.updateOne(Event);
exports.deleteEvent = factory.deleteOne(Event);
