const server = require('../server.js');
const Diamond = require('./diamond.js');

class Game {
    constructor(options) {
        this.id = options.id
        this.players = options.players
        this.name = options.name;
        this.diamonds = [];
        this.bullets = [];
        this.numberOfDiamonds = 3;
        this.over = false;
        this.start();
    }

    start() {
        const that = this;
        this.gameInterval = setInterval(function () { server.gameLoop(that.id) }, 1000 / 60);
    }

    update() {
        if (this.inProgress() && (this.players[0].score + this.players[1].score) === this.numberOfDiamonds) {
            this.over = true;
            this.winner = this.players[0].score > this.players[1].score ? 'space-ranger' : 'pink-lady';
            return
        }
        this.players.forEach(function (player) {
            player.update();
        })
        this.bullets.forEach((bullet, index) => {
            if (bullet.distance <= 0) {
                delete this.bullets[index];
            }
            else {
                bullet.update();
            }
        })
    }

    generateDiamonds() {
        for (let i = 0; i < this.numberOfDiamonds; i++) {
            this.diamonds.push(new Diamond(Object.values(this.players)[0].base, Object.values(this.players)[1].base));
        }
    }

    inProgress() {
        return this.players.length == 2;
    }
}
module.exports = Game;