const Service = require('../models/serviceModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createService = factory.createOne(Service);
exports.getService = factory.getOne(Service);
exports.getAllServices = factory.getAll(Service);
exports.updateService = factory.updateOne(Service);
exports.deleteService = factory.deleteOne(Service);
