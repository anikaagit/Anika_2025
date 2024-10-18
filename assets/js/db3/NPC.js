import Player from "./Player.js";
import GameEnv from "./GameEnv.js";

class NPC extends Player {
    constructor(data = null) {
        super(data);
        this.alertTimeout = null;
       
        this.position = { x: 0, y: GameEnv.innerHeight/2 }; // Start from the left side of the canvas
        this.speed = 2; // Set the speed of the NPC
        this.angle = Math.PI / 4; // Set an angle (e.g., 45 degrees)

        if (this.spriteData.name === 'npc2') {
            this.position = { x: GameEnv.innerWidth-100, y: GameEnv.innerHeight-100 }; // position for the wizard
        }
    }

    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     * 
     * @override
     */
    update() {
        this.move(); // Move the NPC to the right
        this.draw();
        // Check for proximity only if the cooldown is not active
        if (!this.proximityCooldown) {
            this.checkProximityToNPC();
            this.startCooldown();  // Start cooldown after checking
        }
    }

    /**
    * Move the NPC to the right. If it goes off the screen, reset to the left.
    */
    move() {

        // Check if the NPC is the wizard (stationary)
        if (this.spriteData.name === 'npc2') {
            return;  // Skip movement for the wizard
        }

        // Filter all Player objects from the game environment
        var players = GameEnv.gameObjects.filter(obj => obj instanceof Player);

        // Find the dragon player in the filtered list
        const dragon = players.find(player => player.spriteData.name === 'dragon');

        // Check if the dragon exists
        if (dragon) {
            // Calculate the angle to the dragon
            const deltaX = dragon.position.x - this.position.x;
            const deltaY = dragon.position.y - this.position.y;
            this.angle = Math.atan2(deltaY, deltaX); // Set angle towards the dragon
        }
    
        // Calculate the change in x and y based on the speed and angle
        this.position.x += this.speed * Math.cos(this.angle); // Move in the x direction
        this.position.y += this.speed * Math.sin(this.angle); // Move in the y direction

        // Check for off-screen conditions
        if (this.position.x > GameEnv.canvas.width || this.position.x < 0) {
            this.position.x = Math.random() * (GameEnv.canvas.width - 50); // Random x position within canvas
            this.position.y = Math.random() * (GameEnv.canvas.height - 50); // Random y position within canvas
            this.angle = this.getRandomAngle(); // Set a new random angle
        }

        if (this.position.y > GameEnv.canvas.height || this.position.y < 0) {
            this.position.x = Math.random() * (GameEnv.canvas.width - 50); // Random x position within canvas
            this.position.y = Math.random() * (GameEnv.canvas.height - 50); // Random y position within canvas
            this.angle = this.getRandomAngle(); // Set a new random angle
         }
        
    }
    /**
    * Generate a random angle between 0 and 2π (0 to 360 degrees).
    * returns {number} Random angle in radians.
    */
    getRandomAngle() {
        return Math.random() * 2 * Math.PI; // Random angle between 0 and 2π
    }
    /**
     * Starts a cooldown to prevent proximity checks from happening too frequently.
     * The cooldown lasts for 1000 milliseconds.
     */
    startCooldown() {
        this.proximityCooldown = true;
        setTimeout(() => {
            this.proximityCooldown = false;
        }, 1000);  // Cooldown of 1000 milliseconds (adjust as needed)
    }
    /**
     * Handles keydown events for proximity interaction.
     * This method is triggered when a key is pressed and checks for proximity interactions.
     * 
     * @param {Object} event - The event object containing the key that was pressed.
     * @param {string} event.key - The key that was pressed.
     * 
     * Keys handled:
     * - 'e': Proximity interaction for Player 1
     * - 'u': Proximity interaction for Player 2
     * 
     * This method calls checkProximityToNPC() if either 'e' or 'u' is pressed.
     */
    handleKeyDown({ key }) {
        switch (key) {
            case 'e':  // Player 1 
            case 'u':  // Player 2 
                //this.checkProximityToNPC();
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * It also clears the alert timeout if the 'e' or 'u' key is released.
     * 
     * @param {Object} event - The keyup event object.
     * @param {string} event.key - The key that was released.
     */
    handleKeyUp({ key }) {
        // Check if the released key is 'e' or 'u'
        if (key === 'e' || key === 'u') {
            // Clear the alert timeout to cancel the alert
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
                closeCustomAlert();
            }
        }
    }

    /**
     * Custom alert mechanism to handle responses.
     * 
     * @param {string} message - The message to be displayed in the alert.
     */
    handleResponse(message) {
        // Clear any existing alert timeout
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }

        // Set a new alert timeout
        this.alertTimeout = setTimeout(() => {
            showCustomAlert(message);
        }, 0);
    }

    /**
     * Check for proximity of objects.
     * This method checks if any players are within a certain distance of the NPC.
     * If players are within the specified distance, their names are collected and a response is generated.
     */
    checkProximityToNPC() {
        // Filter all Player objects from the game environment
        var players = GameEnv.gameObjects.filter(obj => obj instanceof Player);
        var npc = this;
        var names = [];
        
        if (players.length > 0 && npc) {
            players.forEach(player => {
                // The Euclidean distance between two points in a 2D space
                var distance = Math.sqrt(
                    Math.pow(player.position.x - npc.position.x, 2) + Math.pow(player.position.y - npc.position.y, 2)
                );
                //console.log("Distance between player and NPC:", distance);
                // The distance is less than 100 pixels
                if (player != npc && distance <= 100) {
                    names.push(player.spriteData.name);
                    // Play sound when player is close
                    GameEnv.proximitySound.play();
                    // If the player's sprite is 'Dragon', decrement lives
                    if (player.spriteData.name === 'dragon') {
                        player.decrementLives(); // Call method from PlayerOne.js
                        this.updateLivesOnScreen(player.livesRemaining); // Update lives on screen
                        //this.handleResponse("Lives Remaining" + player.livesRemaining);
                        // Check if lives have reached 0 after decrementing
                        if (player.livesRemaining <= 0) {
                            player.livesRemaining = 0;  // Set lives to 0
                            GameEnv.proximitySound.pause();  // Stop the sound
                            GameEnv.proximitySound.currentTime = 0;  // Reset sound to start
                        }
                }
                }
            });
            // Join all player names inside the proximity
            //if (names.length > 0) {
                //this.handleResponse(`Hello, ${names.join(', ')}`);
            //}
        }
    }

/**
     * Updates the lives remaining on the screen.
     * 
     * @param {number} livesRemaining - The remaining lives of the dragon to display.
     */
updateLivesOnScreen(livesRemaining) {
    const livesDisplay = document.getElementById('lives-display');
    if (livesRemaining > 0) {
        livesDisplay.textContent = `Lives Remaining: ${livesRemaining}`;
    } else {
        livesDisplay.textContent = "Game Over";
    }
}

}

export default NPC;

/**
 * Show the custom alert with the given message.
 * 
 * @param {string} message - The message to be displayed in the alert.
 */
function showCustomAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}

/**
 * Close the custom alert.
 */
function closeCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.display = 'none';
}