// To build GameLevels, each contains GameObjects from below imports
import GameEnv from './GameEnv.js';
import Background from './Background.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';
import NPC from './NPC.js';
//import Goomba from './EnemyGoomba.js';
//import Coin from './Coin.js';


class GameLevelCastle {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_castle = path + "/images/db/castleinterior.jpg";
    const image_data_castle = {
        name: 'castle',
        src: image_src_castle,
        pixels: {height: 580, width: 1038}
    };

    // Create a new image element
    const castleImage = new Image();
    castleImage.src = image_data_castle.src;

    // Once the image loads, draw it on the full screen canvas
    castleImage.onload = function () {
      GameEnv.clear();  // Clears the canvas before drawing
      GameEnv.ctx.drawImage(castleImage, 0, 0, width, height);  // Draws and scales the image to fit the canvas
    };

    const livesDisplay = document.createElement('div');
    livesDisplay.id = 'lives-display';
    livesDisplay.style.position = 'absolute';
    livesDisplay.style.top = '10px';
    livesDisplay.style.left = '10px';
    livesDisplay.style.fontSize = '20px';
    livesDisplay.style.color = 'white';
    livesDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    livesDisplay.style.padding = '10px';
    livesDisplay.style.borderRadius = '5px';
    livesDisplay.textContent = 'Lives Remaining: 9';  // Initial lives display
    document.body.appendChild(livesDisplay);

    // Audio element for proximity sound
    const proximitySound = document.createElement('audio');
    proximitySound.src = path + "/images/db/tada.wav";  // Use your WAV file path here
    proximitySound.preload = 'auto';
    // Append the audio to the document (optional)
    document.body.appendChild(proximitySound);
    // Store the sound reference in the GameEnv for access in NPC.js
    GameEnv.proximitySound = proximitySound;

    // Player 1 sprite data (dragon)
    const DRAGON_SCALE_FACTOR = 10;
    const sprite_src_dragon = path + "/images/db/dragon.png";
    const sprite_data_dragon = {
        name: 'dragon',
        src: sprite_src_dragon,
        SCALE_FACTOR: DRAGON_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/DRAGON_SCALE_FACTOR) }, 
        pixels: {height: 644, width: 573},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 1, start: 0, columns: 3 },
        right: {row: 2, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
    };

    // Player 2 sprite data (fish)
    const sprite_src_fish = path + "/images/rpg/fishies.png";
    const sprite_data_fish = {
        name: 'fish',
        src: sprite_src_fish,
        SCALE_FACTOR: 16,
        STEP_FACTOR: 400,
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 384},
        INIT_POSITION: { x: 0, y: 0 },
        orientation: {rows: 8, columns: 12 },
        down: {row: 0, start: 0, columns: 3 },  // 1st row
        left: {row: 1, start: 0, columns: 3 },  // 2nd row
        right: {row: 2, start: 0, columns: 3 }, // 3rd row
        up: {row: 3, start: 0, columns: 3 },    // 4th row
    };

    // NPC sprite data (monster)
    const sprite_src_monster = path + "/images/db/monster_ax.png";
    const sprite_data_monster = {
        name: 'npc',
        src: sprite_src_monster,
        SCALE_FACTOR: 8,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 290, width: 698},
        INIT_POSITION: { x: 0, y: (height / 2)},
        orientation: {rows: 2, columns: 5 },
        down: {row: 0, start: 1, columns: 4 },  // This is the stationary npc, down is default 
    };

    // List of objects defnitions for this level
    this.objects = [
      { class: Background, data: image_data_castle },
      { class: PlayerOne, data: sprite_data_dragon },
      //{ class: PlayerTwo, data: sprite_data_fish },
      { class: NPC, data: sprite_data_monster }
    ];
  }

}

export default GameLevelCastle;