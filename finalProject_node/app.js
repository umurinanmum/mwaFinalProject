let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bearer = require('express-bearer-token');
let cors = require('cors');
let MongoClient = require('mongodb').MongoClient;
let client = new MongoClient('mongodb+srv://mwa:mwa@cluster0-rtumx.mongodb.net/test?retryWrites=true');

let indexRouter = require('./routes/index');

let app = express();
let port = 8888;

app.set('port', process.env.PORT || port);
let db = null;

app.use((req, res, next) => {
  if (!db) {
    client.connect(err => {
      if (err) throw (err);
      db = client.db("finalProject");
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

app.set('etag', true);
app.disable("x-powered-by");
app.set('env', 'development');
app.set('trust proxy', true);
app.set('case sensitive routing', true);
app.set("strict routing", true);

app.use(cors());
app.use(bearer());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

port = app.get('port');
app.listen(port, ()=>{ console.log(`Listening on port: ${port}`);});
