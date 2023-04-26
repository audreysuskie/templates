const express = require('express');
const calendarController = require('../controllers/calendarController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

//router.use(authController.protect);

router.route('/').get(calendarController.getAllAvailables).post(
  // authController.protect,
  // authController.restrictTo('user', 'admin'),
  // calendarController.setUserIds,
  calendarController.createAvailable
);

router
  .route('/:id')
  .get(calendarController.getAvailable)
  .patch(
    //authController.restrictTo('user', 'admin'),
    calendarController.updateAvailable
  )
  .delete(
    //authController.restrictTo('user', 'admin'),
    calendarController.deleteAvailable
  );

module.exports = router;
