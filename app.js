const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const eventRouter = require('./routes/eventRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const messageRouter = require('./routes/messageRoutes');
const calendarRouter = require('./routes/calendarRoutes');

const app = express();

app.enable('trust proxy');

// Define view engine and path to views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// GLOBAL MIDDLEWARE
// Implement CORS (Cross origin resource sharing)
app.use(cors());

app.options('*', cors());
//👇 Specific route
//app.options('/users/:id', cors());

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set security http
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit API request from IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //100 requests in 1 hour (60 mins)
  message: 'Too many requets from this IP, please try again in one (1) hour!',
});

app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//Data sanitization against noSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.cookies);
  next();
});

//Routes
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/availables', calendarRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Your request for ${req.originalUrl} was not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
