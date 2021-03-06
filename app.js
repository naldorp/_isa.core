var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var brain = require('./brain');

var mongoose = require("mongoose"),
    models = require('./models'),
    dbConnectionString = process.env.DATABASE_CON || "mongodb://localhost:27017/isaBrain",
    db = mongoose.connect(dbConnectionString, {safe:true});

var app = express();

//middleware(expose all collections to all routes)
app.use(function(req, res, next) {
    if (!models.Command || !models.Skills) return next(new Error('No models loaded'));
    req.models = models;
    return next();
});

var index = require('./routes/index');
var cmd = require('./routes/cmd');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use('/', index);
app.use('/api/cmd',cmd);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

brain.init(models.Skills);

module.exports = app;
