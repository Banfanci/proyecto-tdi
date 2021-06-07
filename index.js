const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const humanRoutes = require('./routes/humanRoutes');
const viewsRoutes = require('./routes/viewsRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// 1) MIDDLEWARES

//Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanization against NoSQL query injection
app.use(mongoSanitize());

// Data saniaztion against XSS
app.use(xss());

// 2) ROUTES

app.use('/', viewsRoutes);

app.use('/api/humans', humanRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 405));
});

app.use(globalErrorHandler);

module.exports = app;
