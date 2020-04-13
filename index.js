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
    io.emit('chat message', data.user + ' connected')
  });

  socket.on('private message', function (data) {
    var text = require('textbelt');
    text.sendText(data.phoneNumber, data.message);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
