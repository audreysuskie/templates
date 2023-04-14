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
router.get('/aboutus', authController.isLoggedIn, viewsController.aboutPage);
router.get('/faqs', authController.isLoggedIn, viewsController.faqPage);
router.get('/contact', authController.isLoggedIn, viewsController.contactPage);

router.get('/email', viewsController.checkEmail);
router.get(
  '/guestservices',
  authController.isLoggedIn,
  viewsController.guestServices
);
router.get(
  '/services',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin', 'user'),
  viewsController.services
);

router.get(
  '/updateService/:serviceId',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin', 'user'),
  viewsController.updateService
);

router.get(
  '/addservice',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.addService
);

router.get(
  '/clients',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.clientList
);
router.get(
  '/allbookings',
  authController.isLoggedIn,
  viewsController.allBookings
);
router.get(
  '/bookings',
  authController.isLoggedIn,
  viewsController.userBookings
);
router.get(
  '/pastbookings',
  authController.isLoggedIn,
  viewsController.pastUserBookings
);
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
