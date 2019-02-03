const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
const mongoDBuri = 'mongodb://admindb:admindb0@ds141654.mlab.com:41654/isde';
const router = require('./routes/router');
const mongoose = require('mongoose');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//connect to mongodb
mongoose.connect(mongoDBuri, { useNewUrlParser: true }, () => {
  console.log('Connected to mongodb');
})

//set up routes
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  next(createError(res));
});

module.exports = app;