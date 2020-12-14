const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(5050, function () {
    console.log('[SERVER STARTED AT PORT 5050]');
})

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
    console.log('[SOCKET CONNECTED ]' + socket.id);

    socket.on('join-chat', function (userName) {
        console.log('[USER JOINED CHAT]', socket.id, userName.name);
        colorUsers[socket.id] = userName.color;
        chatUsers[socket.id] = userName.name;
        socket.join('chat');
        socket.emit('joined-chat');
        socket.broadcast.emit('join-chat', chatUsers[socket.id]);
        io.in('chat').emit('active-friends', Object.keys(chatUsers).length);
      })
    
      socket.on('send-message', function (message) {
        console.log('[USER SENT MESSAGE]', message);
        io.to('chat').emit('new-message', { name: chatUsers[socket.id] + ': ' + message, color: colorUsers[socket.id] });
      })

      socket.on('online-friends', function () {
        console.log('[ONLINE FRIENS]', chatUsers.legth);
      })
    
      socket.on('leave-chat', function () {
        console.log('[USER LEFT CHAT]', socket.id);
        socket.broadcast.emit('leave-chat', chatUsers[socket.id]);
        delete chatUsers[socket.id];
        socket.leave('chat');
        socket.emit('menu');
        socket.broadcast.emit('active-friends', Object.keys(chatUsers).length);
      })

      socket.on('disconnect', () => {
        console.log('user disconnected');
        console.log('[USER LEFT CHAT]', socket.id);
        socket.broadcast.emit('leave-chat', chatUsers[socket.id]);
        delete chatUsers[socket.id];
        socket.leave('chat');
        socket.emit('menu');
        socket.broadcast.emit('active-friends', Object.keys(chatUsers).length);
      });
})

const chatUsers = {};
const colorUsers = {};