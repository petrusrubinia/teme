// import { Animal } from '/js/animal.js';

const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

// const myPet = new Animal('Rocky');
// myPet.canEat();

// // context.fillStyle = "red";
// // context.fillRect(280, 20, 40, 20);

// const geoerge = new Image();
// geoerge.src = 'assets/george.png'
// const GEORGE_WIDTH = 40;
// const GEORGE_HEIGHT = 45;
// let georgeX = 100;
// let georgeY = 100;
// geoerge.onload = () => {
//     context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, 100, 100, GEORGE_WIDTH, GEORGE_HEIGHT)
// }

// const mario = new Image();
// mario.src = 'assets/mario.png'
// const MARIO_WIDTH = 32;
// const MARIO_HEIGHT = 39;
// mario.onload = () => {
//     context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT)
// }

// const button = document.getElementById("myButton");
// button.addEventListener("click", function() {
//     console.log(this);
//     context.fillStyle = "green";
//     context.fillRect(480, 20, 40, 20);
// });

// document.addEventListener("keydown", function(event) {
//     context.clearRect(0, 0, 600, 400);
//     switch(event.key) {
//         case 'ArrowUp': {
//             georgeY -= 10;
//             break;
//         }
//         case 'ArrowDown': {
//             georgeY += 10;
//             break;
//         }
//         case 'ArrowLeft': {
//             georgeX -= 10;
//             break;
//         }
//         case 'ArrowRight': {
//             georgeX += 10;
//             break;
//         }
//     }

//     context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT);
//     context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT)
// });

const socket = io();

document.getElementById('join-chat-button').addEventListener('click', function () {
    const input = document.getElementById('user-name-input');
    const userName = input.value;
    const textColor = document.getElementById('text-color').value;

    if (userName.length > 0) {
        document.getElementById('user-name-missing').classList.add('display-none');
        socket.emit('join-chat', { name: userName, color: textColor });
    } else {
        document.getElementById('user-name-missing').classList.remove('display-none');
    }
})

socket.on('joined-chat', function () {
    console.log('You joined chat!');
    document.getElementById('join-chat').classList.add('display-none');
    document.getElementById('chat-container').classList.remove('display-none');
})

document.getElementById('send-message-button').addEventListener('click', function () {
    const input = document.getElementById('message');
    const message = input.value;
    input.value = '';
    socket.emit('send-message', message);
})

socket.on('new-message', function (message) {
    const messagesContainer = document.getElementById('chat-messages');
    const nameElement = document.createElement('p');
    const messageElement = document.createElement('span');
    var mess = message.name.split(":");

    nameElement.innerHTML = mess[0] + ": ";
    messageElement.style.cssText = 'color:' + message.color + ';';
    messageElement.innerHTML = mess[1];
    nameElement.appendChild(messageElement);
    messagesContainer.appendChild(nameElement);
})

document.getElementById('leave-chat-button').addEventListener('click', function () {
    socket.emit('leave-chat');
})

socket.on('menu', function () {
    console.log('You left chat!');
    document.getElementById('join-chat').classList.remove('display-none');
    document.getElementById('chat-container').classList.add('display-none');
})

document.getElementById('create-game-button').addEventListener('click', function () {
    const input = document.getElementById('game-name-input');
    const gameName = input.value;
    if (gameName.length > 0) {
        document.getElementById('game-name-missing').classList.add('display-none');
        socket.emit('create-game', gameName);
    } else {
        document.getElementById('game-name-missing').classList.remove('display-none');
    }
})

socket.on('game-loop', function (objectsForDraw) {
    document.getElementById('join-chat').classList.add('display-none');
    document.getElementById('create-game-container').classList.add('display-none');
    document.getElementById('game-container').classList.remove('display-none');
    context.drawImage(document.getElementById('map-image'), 0, 0);

    objectsForDraw.forEach(function (objectForDraw) {
        context.drawImage(
            document.getElementById(objectForDraw.imageId),
            ...objectForDraw.drawImageParameters
        )
    })
})

socket.on('active-friends', function (activeFriends) {
    console.log('active-Friends', activeFriends);
    const activeFriendsElement = document.getElementById('active-friends');

    activeFriendsElement.innerHTML = 'Active friends: ' + (parseInt(activeFriends) - 1);
})

socket.on('leave-chat', function (name) {
    const messagesContainer = document.getElementById('chat-messages');
    const message = document.createElement('p');

    message.innerHTML = name + ' left chat.';
    messagesContainer.appendChild(message);
})

socket.on('join-chat', function (name) {
    console.log(name + ' joined chat!');
    const messagesContainer = document.getElementById('chat-messages');
    const message = document.createElement('p');

    message.innerHTML = name + ' joined chat.';
    messagesContainer.appendChild(message);
})
