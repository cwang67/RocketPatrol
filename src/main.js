let config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  scene: [ Menu, Play ]
}

// var config = {
//   type: Phaser.WEBGL,
//   width: 800,
//   height: 600,
//   backgroundColor: '#000',
//   parent: 'phaser-example',
//   scene: {
//       preload: preload,
//       create: create
//   }
// };

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
