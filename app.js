var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var colors = require('colors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//for client
const server = require('http').Server(app);
const io = require('socket.io')(server);
const SocketHander = require('./modules/dbclient');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', function (req, res, next) {
  console.log(req._remoteAddress);
  res.send('ver2!');
});
app.use('/users', usersRouter);

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
//io listen
io.on('connection', (socket) => {
  console.log(socket);
  socketHander = new SocketHander();
  socketHander.connect();

  socketHander.storeEntry(
    {
      name: socket.conn.remoteAddress,
      msg: socket.handshake.headers['user-agent'],
      action: 'connect'
    }
  );

  console.log(('IP：' + socket.conn.remoteAddress + '連入').green);
  //當client送出訊息
  socket.on('Client_message', (msg) => {
    msg.owner = socket.handshake.headers['user-agent'];
    io.emit('message', msg);
  })

  socket.on("disconnect", () => {
    io.emit("fuckyou", {
      owner: 'server',
      message: 'A BITCH GO OUT'
    });
    console.log(('IP：' + socket.conn.remoteAddress + '登出').red);
  });

});
//listen 3000
server.listen(3000, function () {
  console.log('\x1b[32m%s\x1b[0m', 'Server Start!\nport: ' + 3000);
});
module.exports = app;
