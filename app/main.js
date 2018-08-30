'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var fs = require('fs')
var morgan = require('morgan');
var logger = require('./tools/logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// include env
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// create log directory if not exists
const logDir = __dirname + "/../log";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), {flags: 'a'})

// setup the logger
app.use(morgan(process.env.NODE_ENV, {stream: accessLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'dev') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('port', process.env.PORT || 3000);

app.server = app.listen(app.get('port'), function() {
  logger.debug('Express server listening on port ' + app.server.address().port);
});

module.exports = app;
