const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const valueCounter = 0;

http.listen(5000, function(){
    console.log('[SERVER STARTED AT PORT 5000]');
})

app.get('/', function(request, response){
    response.sendFile(__dirname + '/client.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
    console.log('[SOCKET ID]' + socket.id);

    socket.emit('counter', valueCounter);
    socket.on('counter',function(counter){
        io.emit('counter', counter);
    } )
})