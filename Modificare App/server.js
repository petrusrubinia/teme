const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Player = require('./Player.js');
const Game = require('./Game.js');

http.listen(5000, function () {
  console.log('[SERVER STARTED AT PORT 5000]');
})

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  console.log('[SOCKET CONNECTED]' + socket.id);

  socket.on('join-chat', function (userName) {
    console.log('[USER JOINED CHAT]', socket.id, userName.name);
    colorUsers[socket.id] = userName.color;
    chatUsers[socket.id] = userName.name;
    socket.join('chat');
    socket.emit('joined-chat');
    socket.broadcast.emit('join-chat', chatUsers[socket.id]);
    activeFriends += 1;
    io.in('chat').emit('active-friends', activeFriends);
  })

  socket.on('send-message', function (message) {
    console.log('[USER SENT MESSAGE]', message);
    io.to('chat').emit('new-message', { name: chatUsers[socket.id] + ': ' + message, color: colorUsers[socket.id] });
  })

  socket.on('leave-chat', function () {
    console.log('[USER LEFT CHAT]', socket.id);

    socket.broadcast.emit('leave-chat', chatUsers[socket.id]); delete chatUsers[socket.id];
    socket.leave('chat');
    socket.emit('menu');
    activeFriends -= 1;
    socket.broadcast.emit('active-friends', activeFriends);
  })

  socket.on('create-game', function (gameName) {
    console.log('[NEW GAME CREATED]');
    const gameId = 'game-' + socket.id;
    const players = [new Player()];
    const game = new Game({
      id: gameId,
      players: players
    });

    games[gameId] = game;
    console.log('[User joined ' + gameId + '] room');
    socket.join(gameId);
  })

  socket.on('online-friends', function () {
    console.log('[ONLINE FRIENS]', chatUsers.legth);
  })
})

const gameLoop = (id) => {
  const objectsForDraw = [];
  games[id].players.forEach(function (player) {
    objectsForDraw.push(player.forDraw());
  })
  io.to(id).emit('game-loop', objectsForDraw);
}

app.get('/about', function (request, response) {
  response.sendFile(__dirname + '/about.html');
})

const chatUsers = {};
const games = {};
const colorUsers = {};
var activeFriends = 0;
exports.gameLoop = gameLoop;