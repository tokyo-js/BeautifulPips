var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

const
	redisClient  = require('./setup/redisClient')
	, session    = require('express-session')
	, RedisStore = require('connect-redis')(session)
	, passport   = require('passport')
	, authRoute  = require('./routes/auth')
	, mongoose   = require('mongoose')

mongoose.connect('mongodb://localhost:27017/pips');
mongoose.connection.on('error', function (err) {
	console.log(err);
});
mongoose.connection.on('connected', function () {
	console.log('Mongodb is ready');
});

require('./setup/passport')();
require('./setup/acl');
// require('./setup/restful-apis')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	name : 'beautifulpips',
	resave : false,
	saveUninitialized : false,
	secret : '4FRlUu7Jledo1JOp6otFhCIFddUHEY2m',
	store : new RedisStore({
		client : redisClient
	})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/auth', authRoute);
app.use('/api', require('./setup/restful-apis'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			error: err.message,
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


module.exports = app;
