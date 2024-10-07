import Player from './Player.js';
import GameEnv from './GameEnv.js';


class Turtle extends Player {
    constructor(imageSrc = null) {
        super(imageSrc);
        // initialize to turtle to Center/Right position
        this.position = { x: GameEnv.innerWidth - this.size, y: (GameEnv.innerHeight - this.size) / 2 }; 
    }

    update() {
        super.update();
    }

    resize() {
        super.resize();
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 73: // 'I' key
                this.velocity.y -= this.yVelocity;
                this.direction = 'up';
                break;
            case 74: // 'J' key
                this.velocity.x -= this.xVelocity;
                this.direction = 'left';
                break;
            case 75: // 'K' key
                this.velocity.y += this.yVelocity;
                this.direction = 'down';
                break;
            case 76: // 'L' key
                this.velocity.x += this.xVelocity;
                this.direction = 'right';
                break;
        }
    }
    
    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 73: // 'I' key
                this.velocity.y = 0;
                break;
            case 74: // 'J' key
                this.velocity.x = 0;
                break;
            case 75: // 'K' key
                this.velocity.y = 0;
                break;
            case 76: // 'L' key
                this.velocity.x = 0;
                break;
        }
    }
}

export default Turtle;