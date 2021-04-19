class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

preload()
{
    //loads images/tile sprites
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('starfield', './assets/starfield.png');
    this.load.image('rocket2', './assets/rocket2.png');
  
    //load spritesheet
    this.load.spritesheet('explosion', '../assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 0});

    //particle effect
    this.load.image('spark', './assets/blue.png');
}


create()
{
    console.log('testing');
    //place tile sprite
    this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0,0);
    //green UI Background
    this.add.rectangle(0,borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);

    //white borders
    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

    // add rocket (p1)
    this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

    // add rocket(p2)
    this.p2Rocket = new Rocket(this, game.config.width/6, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0);

    // creating particles
    var particles = this.add.particles('spark');
    var emitter = particles.createEmitter();
    

    // add spaceships (x3)
    this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

    // define keys p1
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.p1Rocket.fire = keyF;
    this.p1Rocket.left = keyLEFT;
    this.p1Rocket.right = keyRIGHT;

    // defining keys for p2
    console.log('player 2');
    keyF2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.p2Rocket.fire = keyF2;
    this.p2Rocket.left = keyLEFT2;
    this.p2Rocket.right = keyRIGHT2;




    //animation config
    this.anims.create({
        key: 'explosion',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
    });

    //initializes score
    this.p1Score = 0;
    this.p2Score = 0;
    highScore = highScore;

   

    //displays score
    let scoreConfig = 
    {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 100
    }
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
    scoreConfig.color = "#FF0000";
    this.scoreRight = this.add.text(471, 54, this.p2Score, scoreConfig);




    //Game over flag
    this.gameOver = false;

    //60-second play clock
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
    this.gameOver = true;

    //update highscore
    this.pHigh = Math.max(this.p1Score, this.p2Score);

    if(highScore < this.pHigh)
        highScore = this.pHigh;

    this.highScoreDisplay.text = "High Score: " + highScore;
   
  
    }, null, this);

     //timer
        scoreConfig.color = "#843605";
        this.timer = this.add.text(game.config.width/2, 72, this.clock.getElapsedSeconds(), scoreConfig).setOrigin(0.5);

        //highscore
        this.highScoreDisplay = this.add.text(game.config.width/2, 465, "High Score: " + highScore, scoreConfig).setOrigin(0.5)

  
}

update()
{
     //update timer
     this.timer.text = (game.settings.gameTimer / 1000) - Math.floor(this.clock.getElapsedSeconds());

    //check key input for restarting the game
    if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR))
    {
        this.scene.restart(this.p1Score);
    }

    if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) 
    {
        this.scene.start("menuScene");
    }

    //updates tile sprite
    this.starfield.tilePositionX -= 4;

    this.p1Rocket.update();
    this.p2Rocket.update();





    //update spaceships
    if (!this.gameOver)
    {
        this.p1Rocket.update();
        this.p2Rocket.update();
        this.ship01.update();               
        this.ship02.update();
        this.ship03.update();
    }
  
    // check collisions
    if(this.checkCollision(this.p1Rocket,this.ship03)) 
    {
        this.p1Rocket.reset();
        this.shipExplode(this.ship03);
    }
    else if(this.checkCollision(this.p2Rocket,this.ship03))
        {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
        }
    if (this.checkCollision(this.p1Rocket, this.ship02)) 
    {
        this.p1Rocket.reset();
        this.shipExplode(this.ship02);
    }
    else if(this.checkCollision(this.p2Rocket, this.ship02))
    {
        this.p2Rocket.reset();
        this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) 
    {
        this.p1Rocket.reset();
        this.shipExplode(this.ship01);
    }
    else if(this.checkCollision(this.p2Rocket, this.ship01))
    {
        this.p2Rocket.reset();
        this.shipExplode(this.ship01);
    }
  
}

checkCollision(rocket, ship)
{
    // simple AABB checking
    if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) 
        {
            return true;
        } 
    else
    {
        return false;
    }
}

shipExplode(ship, player) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explosion');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
      
      
    });       


     //score increases
     if(player == "p1") 
     {
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
    else 
    { 
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
    }

    //score add and repaint
    // this.p1Score += ship.points;
    // this.scoreLeft.text = this.p1Score;
    //score p2
    // this.p2Score += ship.points;
    // this.scoreRight.text = this.p2Score;
   
    //this.sound.play('sfx_explosion');
}
}


