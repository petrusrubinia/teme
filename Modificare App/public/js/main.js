// import { Animal } from '/js/animal.js';

const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');
const socket = io();

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
    document.getElementById('menu').classList.add('display-none');
    //document.getElementById('create-game-container').classList.add('display-none');
    document.getElementById('game-container').classList.remove('display-none');
    context.drawImage(document.getElementById('map-image'), 0, 0);

    objectsForDraw.forEach(function (objectForDraw) {
        context.drawImage(
            document.getElementById(objectForDraw.imageId),
            ...objectForDraw.drawImageParameters
        )
    })
})

document.addEventListener("keydown", function(event) {
    //context.clearRect(0, 0, 600, 400);
    switch(event.key) {
        case 'ArrowUp': {
            socket.emit('start-moving-player', 'up');
            break;
        }
        case 'ArrowDown': {
            socket.emit('start-moving-player', 'down');
            break;
        }
        case 'ArrowLeft': {
            socket.emit('start-moving-player', 'left');
            break;
        }
        case 'ArrowRight': {
            socket.emit('start-moving-player', 'right');
            break;
        }
    }
})

document.addEventListener('keyup', function(event){
    switch(event.key) {
        case 'ArrowUp':
        case 'ArrowDown': {
            socket.emit('stop-moving-player', 'dy');
            break;
        }
        case 'ArrowLeft':
        case 'ArrowRight': {
            socket.emit('stop-moving-player', 'dx');
            break;
        }
    }
})

socket.on('add-game-to-list', function(option){
    const gameElementContainer = document.createElement('div');
    gameElementContainer.classList.add('game-element');
    gameElementContainer.id = option.gameId;

    const gameNameElement = document.createElement('p');
    gameNameElement.innerHTML = option.gameName;
    const joinGameButton = document.createElement('button');
    joinGameButton.innerHTML = 'Join Game!';

    joinGameButton.addEventListener('click', function(){
        socket.emit('join-game', option.gameId);
    })

    gameElementContainer.appendChild(gameNameElement);
    gameElementContainer.appendChild(joinGameButton);

    document.getElementById('game-list').appendChild(gameElementContainer);

})

socket.on('remove-game-from-list', function(gameId){
    const element = document.getElementById(gameId);
    if(element != null)
        element.remove();
})

socket.on('game-over', function(reason){
    console.log('Game Over ', reason);
    const canvasContainer = document.getElementById('game-canvas');
    const context = canvas.getContext('2d');
    context.font = "80px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("Game Over", canvasContainer.width/2, canvasContainer.height/2);
})

document.getElementById('back-button').addEventListener('click', function(){
    console.log('Back to menu.');
    socket.emit('back-to-menu');
    document.getElementById('game-container').classList.add('display-none');
    document.getElementById('menu').classList.remove('display-none');
})