//5.
const canvas = document.getElementById('idCanvas2');
const context = canvas.getContext('2d');
const sizeWidth = context.canvas.clientWidth;
const sizeHeight = context.canvas.clientHeight;
const button = document.getElementById("idButton");

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

button.addEventListener("click", () =>{
    console.log("click");
    // get random color for the square
    context.fillStyle = 'rgb('+getRndInteger(0,255) + ',' + getRndInteger(0,255) + ',' + getRndInteger(0,255)+ ')';
    context.fillRect(getRndInteger(0,sizeWidth),getRndInteger(0,sizeHeight), 20, 20);
});
