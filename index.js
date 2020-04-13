var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var users = {}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('join', function (data) {
    // user[user] = socket
    io.emit('chat message', data.user + ' connected')
  });

  socket.on('private message', function (data) {
    users[data.user].emit('chat message', data.cards);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
