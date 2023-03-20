const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.use(viewsController.alerts);

// router.get('/', function (req, res, next) {
//   // ONLY FOR DEVELOPMENT!!!!
//   res.set('Cache-Control', 'no-store');

//   res.render('index', { title: 'New Template' });
// });

router.get('/', authController.isLoggedIn, viewsController.getHomePage);

router.get('/email', viewsController.checkEmail);
router.get('/test', viewsController.tempPage);
router.get('/forgotpassword', viewsController.forgotPasswordForm);
router.get('/account', authController.isLoggedIn, viewsController.getAccount);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get(
  '/resetPassword',
  authController.isLoggedIn,
  viewsController.resetPasswordForm
);
router.get('/signup', viewsController.getSignupForm);

router.get('/logout', authController.logout);

module.exports = router;
