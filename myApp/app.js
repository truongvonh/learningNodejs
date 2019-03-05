/*
    *Vo Nhat Truong*
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var foodsRouter = require('./routes/food');

var app = express();

// connect to database
let option = {
	db: { native_parser: true },
	server: { poolSize: 5 },
	user: 'vonhattruong',
	pass: 'abcd1234'
}
// use native promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:28888/testDB02', option)
	.then(
		() => {
			console.log('connect database successful');
		},
		(err) => {
			console.log('database connect failed');
		}
	);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/foods', foodsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
