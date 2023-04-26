const express = require('express');
const serviceController = require('../controllers/serviceController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/createService',
  serviceController.uploadPhoto,
  serviceController.resizePhoto,
  serviceController.createService
);

router.patch('/availability/:id', serviceController.updateAvailable);

router.patch(
  '/:id',
  serviceController.uploadPhoto,
  serviceController.resizePhoto,
  serviceController.updateService
);

router
  .route('/')
  .get(serviceController.getAllServices)
  .post(serviceController.createService);
router
  .route('/:id')
  .get(serviceController.getService)
  .delete(serviceController.deleteService);

module.exports = router;
