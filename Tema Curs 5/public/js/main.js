const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');
const socket = io();

socket.on('menu', function () {
    console.log('You left game!');
    document.getElementById('menu').classList.remove('display-none');
    document.getElementById('game-container').classList.add('display-none');
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

socket.on('game-loop', function (data) {
    document.getElementById('menu').classList.add('display-none');
    document.getElementById('back-to-menu').classList.add('display-none');
    document.getElementById('game-container').classList.remove('display-none');
    context.drawImage(document.getElementById('map-image'), 0, 0);
    var canvas = document.getElementById("game-canvas");

    data.objectsForDraw.forEach(function (objectForDraw) {
        context.drawImage(
            document.getElementById(objectForDraw.imageId),
            ...objectForDraw.drawImageParameters
        )
    })
    if (data.gameInProgress) {
        document.getElementById('waiting-for-player').classList.add('display-none');
        context.font = "30px Comic Sans MS";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Space Ranger " + data.score['space-ranger'] + " : " + data.score['pink-lady'] + " Pink Lady", canvas.width / 2, canvas.height - 20);
        context.fillText("There are " + data.leftDiamonds + " diamonds left.", canvas.width / 2, 30);
    }
    else {
        document.getElementById('waiting-for-player').classList.remove('display-none');
    }

})

document.addEventListener("keydown", function (event) {
    switch (event.key) {
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
        case ' ': {
            socket.emit('attack');
            break;

        }
    }
})

document.addEventListener('keyup', function (event) {
    switch (event.key) {
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

socket.on('add-game-to-list', function (option) {
    const gameElementContainer = document.createElement('div');
    gameElementContainer.classList.add('game-element');
    gameElementContainer.id = option.gameId;

    const gameNameElement = document.createElement('p');
    gameNameElement.innerHTML = option.gameName;
    const joinGameButton = document.createElement('button');
    joinGameButton.innerHTML = 'Join Game!';

    joinGameButton.addEventListener('click', function () {
        socket.emit('join-game', option.gameId);
    })

    gameElementContainer.appendChild(gameNameElement);
    gameElementContainer.appendChild(joinGameButton);

    document.getElementById('game-list').appendChild(gameElementContainer);

})

socket.on('remove-game-from-list', function (gameId) {
    const element = document.getElementById(gameId);
    if (element != null)
        element.remove();
})

socket.on('game-over', function (imageId, gameId) {
    context.drawImage(document.getElementById(imageId), 0, 0);
    document.getElementById('back-to-menu').classList.remove('display-none');
    document.getElementById('back-to-menu').dataset.gameId = gameId;
})

document.getElementById('back-to-menu').addEventListener('click', function () {
    console.log('Back to menu.');
    socket.emit('back-to-menu', document.getElementById('back-to-menu').dataset.gameId);
    document.getElementById('game-container').classList.add('display-none');
    document.getElementById('menu').classList.remove('display-none');
})