var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var methodOverride = require('method-override');

//  Connect to the DB and bring in the data model
require('./app/models/db');
// BRING IN YOUR SCHEMAS & MODELS
require('./app/models/users');
require('./app/models/sensorschema');
require('./app/models/gourmetschema');

//  Bring in the Passport config after 'User" model is defined
require('./app/config/passport');

//  Bring in the routes for the API (delete the default routes)
var routesApi = require('./app/routes/index');

var app = express();

// configuration ===========================================
	
var port = process.env.PORT || 8080; // set our port

// get all data/stuff of the sensor (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================

// Initialise Passport before using the route middleware
app.use(passport.initialize());

// Use the API routes when path starts with /api
app.use('/api', routesApi);

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 	// shoutout to the user


//======================== error handlers ===================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
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

exports = module.exports = app; 						// expose app