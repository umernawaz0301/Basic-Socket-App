let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const dir = "/client";

app.get('/', function(req, res){
    // var __dirname = "/client";
    res.sendFile(__dirname + dir + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    console.log("socket",socket.id);
    socket.on('chat message', function(msg){
        console.log('message: ' + JSON.stringify(msg));
        io.emit('chat message', {"msg": msg.data,"id":msg.id});

        // socket.send("From server",msg.data);
    });
    socket.on('disconnect',function () {
        console.log("1 connection lost");
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});