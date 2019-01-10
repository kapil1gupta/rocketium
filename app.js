var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8000;

app.use(express.static(__dirname));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    socket.on('textValue', function (msg) {
        io.emit('textValue', msg);
        io.emit('id', socket.id)

    });

    socket.on('activeInactive', function (msg) {
        io.emit('activeInactive', msg, socket.id)
    });
});

http.listen(port, function () {
    console.log('listening on port:' + port);
});