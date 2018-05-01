const express = require('express');
const app = express();
let http = require('http').Server(app);
var path = require('path');
let io = require('socket.io')(http);
const dir = "/client";
var port = process.env.PORT || 3000;

app.set('views', __dirname + '/client');

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function(req, res){
    // var __dirname = "/client";
    res.sendFile('index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    console.log("socket",socket.id);
    socket.on('chat message', function(msg){
        console.log('message: ' + JSON.stringify(msg));
        //if(socket.id == msg.id){
            // io.emit('chat message', {"msg": "Hello-- "+ msg.id +" --Client how can i help you!","id":socket.id});
        io.to(socket.id).emit('chat message', {"msg": "Hello-- "+ msg.id +" --Client how can i help you!","id":socket.id});
        //}


        // socket.send("From server",msg.data);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(port);
// http.listen(3000, function(){
//     console.log('listening on *:3000');
// });