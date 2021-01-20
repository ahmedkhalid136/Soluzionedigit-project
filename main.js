// Express server
const express = require('express');
const cors = require('cors');
const routeConnect = require('./initializer/framework')['connectRouters'];
const process = require('process');
const i18n = require('i18n');

// Database
const fs = require('fs');
const mongoose = require('mongoose');
const tunnel = require('tunnel-ssh');

// Modules
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const path = require('path');
const util = require('util');
const http = require('http');
const https = require('https');
/*
const flash       = require('connect-flash');
const multer    = require('multer');
*/

// Use global-provided Promise (necessary to silence a Mongoose warning).
mongoose.Promise = global.Promise;

// Configurations
const expiresIn = 30 * 24 * 3600 * 1000;
const sessionOpt = {
  cookie: {
    expires: new Date(Date.now() + expiresIn),
    maxAge: expiresIn,
    secure: true,
  },
  resave: false,
  proxy: true,
  rolling: true, // reset expiry every call
  secret: process.env.SECRET,
  saveUninitialized: false, // save every uninitialized session
};
const allowedOrigins = [
  `${process.env.STORE_NAME}://${process.env.VIRTUAL_HOST}`,
  `${process.env.STORE_NAME}://localhost`,
  `http://${process.env.VIRTUAL_HOST}`,
  `https://${process.env.VIRTUAL_HOST}`,
  'http://localhost',
  'https://localhost',
  'http://localhost:8080',
  'https://localhost:8080',
  'http://localhost:8100',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.log('Origin not allowed by CORS: ' + origin);
      callback(null);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowHeaders: 'Content-Type',
  credentials: true,
};
/**
 * i18n Configuration.
 */

i18n.configure({
  locales: ['it'],
  defaultLocale: 'it',
  directory: './i18n/locales',
  objectNotation: true,
});

/**
 * Connect to MongoDB.
 */

mongoose
  .connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error('MongoDB Connection Error. Fallback without db.'));
sessionOpt.store = new MongoStore({
  autoRemove: 'disabled',
  mongooseConnection: mongoose.connection,
  stringify: false,
  ttl: expiresIn,
});

// Uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

// CERT files for HTTPS
var options = {
  key: '', //fs.readFileSync("/etc/letsencrypt/archive/api.soluzione-digitale.com/privkey1.pem"),
  cert: '', //fs.readFileSync("/etc/letsencrypt/archive/api.soluzione-digitale.com/fullchain1.pem"),
  ca: '', //fs.readFileSync("/etc/letsencrypt/archive/api.soluzione-digitale.com/chain1.pem")
};

// Create a new Express application.
var app = express();

// ?? TODO:  qui creare i doc vuoti delle setting dalle env.var

/**
 * Express configuration.
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.set('trust proxy', 1);

// Plugins
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(i18n.init);
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Session config
app.use(session(sessionOpt));
/* app.use(flash()); // use connect-flash for flash messages stored in session */

const apiRoutes = express.Router();
const apiVersion = express.Router();

app.use('/api', apiRoutes);
apiRoutes.use('/v1', apiVersion);
apiRoutes.use('/', apiVersion); //default @latest

routeConnect(apiVersion);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error(`Not Found requrl=${req.path} query=${util.inspect(req.query)}`);
  err.status = 404;
  //next(err);
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err.stack);

  // render the error page
  res.status(err.status || 500).send(); //.json({ 'result':'error', 'message' : err.status+'\n'+err.stack });
  //res.render('error');
});

// Start Express server
//const server = app.listen(app.get('port'), () => {
//    console.log(`Express server listening on port ${app.get('port')} in ${app.get('env')} mode`);
//});

// necessary for testing
//module.exports = app;

/**
 * Start Express server.
 */
var server;

server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')} in ${app.get('env')} mode`);
});
server.on('error', onError);
server.on('listening', onListening);

var serverSSL;

if (process.env.SSL == 'true') {
  if (process.env.NAME == 'stag') {
    var options = {
      key: fs.readFileSync(path.resolve(__dirname, './security/localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './security/localhost.crt')),
    };
  } else {
    var options = {
      key: fs.readFileSync('/etc/letsencrypt/archive/api.soluzione-digitale.com/key.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/archive/api.soluzione-digitale.com/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/archive/api.soluzione-digitale.com/chain.pem'),
    };
  }

  serverSSL = https.createServer(options, app);

  console.log('SSL Enabled, listening on port', process.env.SSL_PORT);
  serverSSL.listen(process.env.SSL_PORT);
  serverSSL.on('error', onError);
  serverSSL.on('listening', onListening);
}

// socket.io
/*
const io = require('socket.io').listen(server);

socketEvents(io);
*/

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  //debug('Listening on ' + bind);
}

// necessary for testing
// module.exports = app; //<-- necessario se si vuole separare la logica da questo file. questo rende importabile questo file.
