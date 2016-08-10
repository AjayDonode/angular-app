var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/users');
var rapidtest = require('./routes/rapidtest');
//var config = require('./scripts/config');


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9091; 
app.set('view engine', 'jade');  

var corsOptions = {
	origin: 'http://localhost:9000',
	credentials: false
};

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/', routes);
app.use('/users', users);
app.use('/rapidtest', rapidtest);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

//DO not remove this block , varify in prod env 
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/**
 * Development Settings
 */

if ('development' == app.get('env')) {
// This will change in production since we'll be using the dist folder
// This covers serving up the index page
app.use(express.static(path.join(__dirname, '../client/.tmp')));
app.use(express.static(path.join(__dirname, '../client/app')));
//app.use(express.errorHandler());
}
/**
 * Production Settings
 */
if('production' == app.get('env')) {
app.use(express.static(path.join(__dirname, '/dist')));
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port);
console.log('Rest Service is up :' + port);
module.exports = app;
