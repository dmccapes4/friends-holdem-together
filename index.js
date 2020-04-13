var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('join', function (data) {
    socket.join(data.user);
    io.emit('chat message', data.user + ' connected')
  });

  socket.on('private message', function(msg, user) {
    io.sockets.in(user).emit('chat message', {msg: msg});
  });
});

// app.post('/users', function(req, res) {
//   // io.sockets.in(req.body.user).emit('chat message', {msg: 'hello'});
//   io.emit('chat message', req)
//   res.send("hello")
// });

http.listen(port, function(){
  console.log('listening on *:' + port);
});
