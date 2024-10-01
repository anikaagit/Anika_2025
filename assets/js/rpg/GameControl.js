import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';

const GameControl = {
    turtleImage: null, // Store turtle image

    start: function(assets = {}) {
        GameEnv.create();
        this.background = new Background(assets.image || null);
        this.player = new Player(assets.sprite || null);
        this.loadTurtleImage(); // Load turtle image
        this.gameLoop();
    },

    loadTurtleImage: function() {
        this.turtleImage = new Image();
        this.turtleImage.src = '{{site.baseurl}}/images/rpg/turtle.png'; // Use site.baseurl for the path
    },

    gameLoop: function() {
        GameEnv.clear();
        this.background.draw();
        this.player.update();
        this.showTurtle(); // Draw turtle if it should be shown
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    showTurtle: function() {
        if (this.turtleImage) {
            GameEnv.ctx.drawImage(this.turtleImage, 100, 100); // Change the position as needed
        }
    },

    handleKeyPress: function(event) {
        if (event.code === 'Space') {
            this.showTurtle(); // Draw turtle when space is pressed
        }
    }
};

// Add event listener for key press
window.addEventListener('keydown', GameControl.handleKeyPress.bind(GameControl));

// Detect window resize events
window.addEventListener('resize', GameControl.resize.bind(GameControl));

export default GameControl;
