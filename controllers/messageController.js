const Message = require('../models/messageModel');
const factory = require('./handlerFactory');
const Email = require('../utils/email');
const catchAsync = require('../utils/catchAsync');

exports.createMessage = catchAsync(async (req, res, next) => {
  const newMessage = await Message.create(req.body);

  const url = `${req.protocol}://${req.get('host')}/contact`;
  await new Email(newMessage, url).sendContact();

  res.status(201).json({
    status: 'success',
    data: {
      data: newMessage,
    },
  });
});

exports.getAllMessages = factory.getAll(Message);
exports.getMessage = factory.getOne(Message);
//exports.createMessage = factory.createOne(Message);
exports.updateMessage = factory.updateOne(Message);
exports.deleteMessage = factory.deleteOne(Message);
