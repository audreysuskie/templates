const multer = require('multer');
const sharp = require('sharp');
const Service = require('../models/serviceModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError('Please upload only JPG, JPEG, or PNG image files.', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single('photo');

exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `service-${Date.now()}.jpeg`;
  //Reads uploaded file from memory
  await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/services/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((e) => {
    if (allowedFields.includes(e)) newObj[e] = obj[e];
  });
  return newObj;
};

exports.createService = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  const filteredBody = filterObj(req.body, 'title', 'subtitle', 'description');
  if (req.file) filteredBody.photo = req.file.filename;

  const newService = await Service.create(filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      service: newService,
    },
  });
  res.redirect('/services/services');
});

exports.updateService = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  const serviceId = req.body.serviceId;
  const filteredBody = filterObj(
    req.body,
    'title',
    'subtitle',
    'description',
    'active'
  );
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedService,
    },
  });
});

//exports.createService = factory.createOne(Service);
exports.getService = factory.getOne(Service);
exports.getAllServices = factory.getAll(Service);
//exports.updateService = factory.updateOne(Service);
exports.deleteService = factory.deleteOne(Service);
