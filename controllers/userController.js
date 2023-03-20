const User = require('../models/userModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
