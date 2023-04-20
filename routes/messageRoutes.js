const express = require('express');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(messageController.getAllMessages)
  .post(messageController.createMessage);
router
  .route('/:id')
  .get(messageController.getMessage)
  .patch(messageController.updateMessage)
  .delete(messageController.deleteMessage);

module.exports = router;
