const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/resetPassword', viewsController.resetPasswordForm);

router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);

router.patch(
  '/updateAccount',
  authController.isLoggedIn,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateUser
);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(authController.signupUser);
router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
