import Player from './Player.js';

class PlayerOne extends Player {
    constructor(data = null) {
        super(data);
        // Initialize livesRemaining for the dragon
        this.livesRemaining = 9;
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y -= this.yVelocity;
                this.direction = 'up';
                break;
            case 65: // 'A' key
                this.velocity.x -= this.xVelocity;
                this.direction = 'left';
                break;
            case 83: // 'S' key
                this.velocity.y += this.yVelocity;
                this.direction = 'down';
                break;
            case 68: // 'D' key
                this.velocity.x += this.xVelocity;
                this.direction = 'right';
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * 
     * @param {Object} event - The keyup event object.
     */
    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y = 0;
                break;
            case 65: // 'A' key
                this.velocity.x = 0;
                break;
            case 83: // 'S' key
                this.velocity.y = 0;
                break;
            case 68: // 'D' key
                this.velocity.x = 0;
                break;
        }
    }
// Method to decrement lives
decrementLives() {
    if (this.livesRemaining > 0) {
        this.livesRemaining--;
      
    }
}
}



export default PlayerOne;
