const socket = io();
const button = document.getElementById('buttonCounter');
const divValueCounter = document.getElementById("showCounter");

const counter = socket.on('counter', function(counter){
    console.log("valoarea initiala primita de la server: " + counter);
    document.getElementById('showCounter').innerHTML = counter;
})

button.addEventListener('click', function(){
    var newCounter = parseInt(document.getElementById("showCounter").innerHTML) + 1;
    console.log("noua valoare" + newCounter);
    socket.emit('counter', newCounter);
})