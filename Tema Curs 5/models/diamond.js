const SpaceRanger = require('./space_ranger');
const RIGHT_EDGE = 930;
const DOWN_EDGE = 610;
class Diamond {
    constructor(spaceRangerBase, pinkLadyBase) {
        this.x = 0;
        this.y = 0;
        this.imageId = 'diamond';
        this.width = 26;
        this.height = 21;
        this.spaceRangerBase = spaceRangerBase;
        this.pinkLadyBase = pinkLadyBase;
        this.generateDiamond();
    }

    generateDiamond() {
        while (true) {
            this.x = Math.floor(Math.random() * RIGHT_EDGE);
            this.y = Math.floor(Math.random() * DOWN_EDGE);
            if ((this.x < this.spaceRangerBase.width && this.y < this.spaceRangerBase.height)
                || (this.x > this.pinkLadyBase.x && this.y > this.pinkLadyBase.y)) {
                this.x = Math.floor(Math.random() * RIGHT_EDGE);
                this.y = Math.floor(Math.random() * DOWN_EDGE);
            }
            else
                break;
        }
    }

    forDraw() {
        return {
            imageId: this.imageId,
            drawImageParameters: [
                this.x,
                this.y
            ]
        }
    }

}

module.exports = Diamond;