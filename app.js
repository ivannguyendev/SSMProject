var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var index = require('./routes/app');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', api);
app.use('/', index);

//================================
var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};


Promise = require('bluebird'); // // make bluebird default Promise eslint-disable-line no-global-assign

//Url address Database
const mongoDb = 'mongodb://localhost:27017/SSM'

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;
//Database
mongoose.connect(mongoDb,{
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console,'connection error: '));

//===================================

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

  // render the error pagen
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
module.exports = app;
