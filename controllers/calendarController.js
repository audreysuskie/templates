const Available = require('../models/calendarModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.updateAvailable = catchAsync(async (req, res, next) => {
  const origArray = await Available.findById(req.params.id);
  const array1 = origArray.available;
  const array2 = req.body.available;
  const array3 = array1.concat(array2);
  console.log(array3);
  const newAvailable = await Available.findByIdAndUpdate(req.params.id, {
    available: array3,
  });

  if (!newAvailable) {
    return next(new AppError(`No document found with that ID`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      newAvailable,
    },
  });
});

exports.getAvailableDays = (serviceId) =>
  catchAsync(async (req, res, next) => {
    let query = Available.findById(serviceId);
    const doc = await query;
    const availableDays = query.available;
    if (!doc) {
      return next(new AppError(`No document found with that ID`, 404));
    }

    return availableDays;
  });

exports.getAllAvailables = factory.getAll(Available);
exports.getAvailable = factory.getOne(Available);
exports.createAvailable = factory.createOne(Available);
//exports.updateAvailable = factory.updateOne(Available);
exports.deleteAvailable = factory.deleteOne(Available);
