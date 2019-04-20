var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb+srv://test:test@mongodb-0besx.mongodb.net/mwa', { useNewUrlParser: true });
//const client = new MongoClient('mongodb+srv://mwa:mwa@cluster0-rtumx.mongodb.net/test?retryWrites=true');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');

var app = express();
var port = 8888;
let db = null;

app.use((req, res, next) => {
  if (!db) {
    client.connect(err => {
      if (err) throw (err);
      db = client.db("finalProject");
      //db = client.db("mwa");
      req.db = db;
      next();
    })
  }
  else {
    req.db = db;
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);

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
  res.render('error');
});

app.listen(port, () => { console.log(`Listening on port: ${port}`); })

module.exports = app;
