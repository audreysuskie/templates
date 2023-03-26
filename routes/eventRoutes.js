const express = require('express');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(
    authController.isLoggedIn,
    authController.protect,
    authController.restrictTo('user', 'admin'),
    eventController.setUserIds,
    eventController.createEvent
  );
router
  .route('/:id')
  .get(eventController.getEvent)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
