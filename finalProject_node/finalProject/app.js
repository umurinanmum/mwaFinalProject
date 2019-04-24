var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var authenticate = require('./middlewares/AuthorizationMiddleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productsRouter = require('./routes/products');
var commentsRouter = require('./routes/comments');


var app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authenticate.authenticate);

//routers
app.use('/', indexRouter);
app.use('/api/users', usersRouter);

app.use('/api/products', productsRouter);
app.use('/api/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
});

app.listen(port, () => {
  console.log('Server is running . . . Port : 3000');
});

//module.exports = app;
