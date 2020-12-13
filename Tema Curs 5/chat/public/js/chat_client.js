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
