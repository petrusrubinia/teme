class Gamer{
    constructor(playerName, score, level, intensity)
    {
        this.playerName = playerName;
        this.score = score;
        this.level = level;
        this.intensity = intensity;
        this.controlKeys = ['w', 'a', 's', 'd'];
    }

    setControlKeys(controlKeys){
        this.controlKeys = controlKeys;
    }

    updateScore(points){
        this.score += points;
    }

    nextLevel(){
        if(this.score >= 100)
        {
            this.score -=100;
            return this.level + 1;
        }
        return this.level;
    }
}

var gamer1 = new Gamer("John", 1000, 10, "high");
var gamer2 = new Gamer("Alin", 10, 1, "Low");
var gamer3 = new Gamer("Marcelica", 2000, 20, "Medium");

gamer1.setControlKeys(["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowUp"]);
gamer2.updateScore(98);
console.log("Level Gamer2: " + gamer2.nextLevel());
console.log("Level Gamer3: " + gamer3.nextLevel());


