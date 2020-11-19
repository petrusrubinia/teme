//1.
var array = ["Love", "I", "Javascript"];
var deletedValue = array.shift();
array.splice(1,0,deletedValue)
console.log(array);

//2.
var array2 = ["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ];
for(var i = 0; i < array2.length; i++){
    console.log("Position: " + i);
    console.log("Value: " + array2[i]);
    console.log("Type: " + typeof array2[i]);    
}

//3. + 4.
const canvas = document.getElementById('idCanvas');
const context = canvas.getContext('2d');
const mario = new Image();
const marioWidth = 20;
const marioHeight = 40;
const step = 10;
const sizeWidth = context.canvas.clientWidth;
const sizeHeight = context.canvas.clientHeight;
let marioX = 50;
let marioY = 50;

//we change the image while Mario is moving
let directionX = 0;
let directionY = 2;
mario.src = 'mario2.png'
mario.onload = () => {
        context.drawImage(mario, directionX * marioWidth, directionY * marioHeight, marioWidth, marioHeight, marioX, marioY, marioWidth, marioHeight);
}

document.addEventListener("keydown", event => {
    context.clearRect(0,0, sizeWidth, sizeHeight);
    switch(event.keyCode){
        case 83: {//s
            if( (marioY + marioHeight + step) <= sizeHeight) 
            {
                marioY += step;
                directionY = 2;
                directionX = 0;
            }
            break;
        }
        case 87: {//w
            if((marioY - step) >= 0)
            {
                marioY -= step;
                directionY = 3;
                directionX = 0;
            }
            break;
        }
        case 68: {//d
            if((marioX + marioWidth + step) <= sizeWidth)
            {
                marioX += step;
                directionY = 0;
                if(directionX < 8)
                    directionX++;
                else
                    directionX = 0;
            }    
            break;
        }
        case 65: {//a
            if((marioX - step) >= 0)
            {
                marioX -= step;
                directionY = 1;
                if(directionX < 8)
                    directionX++;
                else
                    directionX = 0;
            }
            break;
        }
    }
    
    context.drawImage(mario, directionX * marioWidth, directionY * marioHeight, marioWidth, marioHeight, marioX, marioY, marioWidth, marioHeight);
});
