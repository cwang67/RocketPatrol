// Carey Wang
// Modded Rocket Patrol
// 04/21/2021
// 20 hours to complete
// Implement a simultaneous two-player mode (30)
// Display the time remaining (in seconds) on the screen (10)
// Track a high score that persists across scenes and display it in the UI (5)
// Add your own (copyright-free) background music to the Play scene (5)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20)
// Create 4 new explosion SFX and randomize which one plays on impact (10)
// Received help from https://github.com/Ghosin9/Rocket-Patrol and https://github.com/rsmitchell179/Rocket-Patrol-With-Mods





let config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  scene: [ Menu, Play ]
}


// var game = new Phaser.Game(config);
let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
let keyF2, keyLEFT2, keyRIGHT2;

// initializing high score
let highScore = 0;

//background music variable
let backgroundMusic;
