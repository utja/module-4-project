import React from 'react'

var Phaser = require('../../../node_modules/phaser/src/phaser-arcade-physics.js')


const Game = (props) => {

  var config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 600,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 1000 },
              debug: false
          }
      },
      scene: {
          preload: preload,
          create: create,
          update: update
      },
      parent: 'phaser-container'
  };

  var player;
  var moolahs;
  var bombs;
  var platforms;
  var cursors;
  var score = 0;
  var gameOver = false;
  var scoreText;
  var portals;
  var dot;
  var lava;
  var gameOverText;
  var winText;
  var button;
  var mySpace;
  var rope;
  var trampoline;
  var portalSide;
  var spike;
  var camera;
  var rKey;

  var game = new Phaser.Game(config);

  function preload ()
  {
      this.load.image('lava', './assets/lava.jpg')
      this.load.image('nature', './assets/nature.png')
      this.load.image('dot', './assets/dot.png')
      this.load.image('portal', './assets/portal.png')
      this.load.image('sky', './assets/sky.png');
      this.load.image('smallLedge', './assets/mapleSmallLedge.png')
      this.load.image('basicLedge', './assets/mapleBasicLedge.png')
      this.load.image('ground', 'assets/mapleLedge.png');
      this.load.image('moolah', 'assets/moolah.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.image('gameOver', 'assets/gameOver.png')
      this.load.image('victory', 'assets/victory.png')
      this.load.image('rope', 'assets/rope.png')
      this.load.image('button', 'assets/replay.png')
      this.load.image('trampoline', 'assets/trampoline.png')
      this.load.image('portalSide', 'assets/portalSide.png')
      this.load.image('spike', 'assets/spike.png')
      this.load.image('map', 'assets/niceMap.png')
      this.load.image('lava-level', 'assets/lava-level.jpg')
  }

  function create ()
  {
      this.physics.world.setBounds(0,0, 19000 * 2, 1800)
      // debugger
      // this.cameras.main.followOffset(player, Phaser.Cameras.Scene2D.Camera.FOLLOW_LOCKON, 0.1, 0.1);
      //  A simple background for our game
      this.add.image(400, 300, 'nature').setScale(1.4).refreshBody;
      this.add.image(800, 1500, 'lava-level').setScale(2, 1.6).refreshBody;
      // this.add.image(400, 300, 'map').refreshBody

      //  The platforms group contains the ground and the 2 ledges we can jump on
      platforms = this.physics.add.staticGroup();
      portals = this.physics.add.staticGroup();
      portalSide = this.physics.add.staticGroup();
      rope = this.physics.add.staticGroup();
      lava = this.physics.add.staticGroup();
      dot = this.physics.add.staticGroup();
      trampoline = this.physics.add.staticGroup();
      spike = this.physics.add.staticGroup();
      //  Here we create the ground.
      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      platforms.create(50, 568, 'basicLedge').refreshBody();
      // platforms.create(70, 568, 'ground')

      platforms.create(160, 510, 'smallLedge');
      platforms.create(260, 460, 'smallLedge');
      platforms.create(440, 460, 'ground');
      platforms.create(580, 410, 'smallLedge');
      platforms.create(460, 355, 'smallLedge');
      platforms.create(380, 300, 'smallLedge');
      platforms.create(300, 245, 'smallLedge');
      platforms.create(490, 230, 'ground');
      platforms.create(700, 230, 'ground');
      platforms.create(50, 568, 'basicLedge')
      trampoline.create(710, 200, 'trampoline').setScale(1)
      platforms.create(870, 140, 'basicLedge')
      platforms.create(980, 568, 'basicLedge')
      portals.create(960, 485, 'portal').setScale(.75).refreshBody();
      spike.create(880, 115, 'spike')
      spike.create(900, 115, 'spike')
      spike.create(890, 115, 'spike')
      dot.create(890, 120, 'dot').setScale(.4).refreshBody();
      // portals.create(940, 500, 'portal').setScale(.75).refreshBody();
      lava.create(300, 640, 'lava')
      lava.create(300, 1757, 'lava')
      lava.create(1494, 1757, 'lava')
      platforms.create(100, 1600, 'basicLedge')
      // lava.create(1000, 1757, 'lava').setScale(1, 1.5)
      // lava.create(1500, 1757, 'lava').setScale(1, 1.5)
      // rope.create(100, 550, 'rope')

      // portals.create(260, 460, 'portal').refreshBody();


      //*************************************************************
      //*************************************************************
      //*************************************************************
      //*************************************************************
      //*************************************************************
      //*************************************************************
      //*************************************************************
      //*************************************************************
      //change the dude
      player = this.physics.add.sprite(0, 450, 'dude');
      //*************************************************************
      //*************************************************************
      //*************************************************************
      mySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      // debugger
      rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      // debugger

      //  Player physics properties. Give the little guy a slight bounce.
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);

      //  Our player animations, turning, walking left and walking right.
      this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });

      this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude', frame: 4 } ],
          frameRate: 20
      });

      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
          frameRate: 10,
          repeat: -1
      });


      //  Input Events
      cursors = this.input.keyboard.createCursorKeys();

      //  Some moolahs to collect, 12 in total, evenly spaced 70 pixels apart along the x axis

      moolahs = this.physics.add.group({
          key: 'moolah',
          repeat: 9,
          setXY: { x: 12, y: 0, stepX: 70 }
      });

      moolahs.children.iterate(function (child) {

          //  Give each moolah a slightly different bounce
          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

      });

      // bombs = this.physics.add.group();

      //  The score
      scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

      //  Collide the player and the moolahs with the platforms
      this.physics.add.collider(player, platforms);
      this.physics.add.collider(moolahs, platforms);
      // this.physics.add.collider(bombs, platforms);

      //  Checks to see if the player overlaps with any of the moolahs, if he does call the collectMoolah function
      this.physics.add.overlap(player, moolahs, collectMoolah, null, this);
      //
      // this.physics.add.collider(player, bombs, hitBomb, null, this);
      // this.physics.add.collider(player, dot, hitPortal, null, this)

      this.physics.add.collider(player, lava, touchLava, null, this)

      // this.physics.add.collider(player, rope, moveOnRope, null, this)
      //  Checks to see if the player overlaps with any of the moolahs, if he does call the collectMoolah function
      this.physics.add.overlap(player, portals, enterPortal, null, this);
      this.physics.add.overlap(player, trampoline, trampolineJump, null, this);
      this.physics.add.overlap(player, dot, touchLava, null, this)
      camera = this.cameras.main
      camera.setBounds(0, 0, 1920 * 2, 1080 * 2);
      camera.startFollow(player, true, 0.05, 0.05);

      let that = this
      this.input.keyboard.on('keydown_R', function (event) {

        props.gameOver(score)
        gameOver = true
        props.changeGameState()
        that.scene.restart()
        gameOver = false

      });
  }

  function trampolineJump(){
    player.setVelocityY(-460);
  }

  function enterPortal() {
    player.setVelocityY(450)
    if (cursors.up.isDown) {
      // console.log('hello')
      // this.physics.pause();
      // player.setTint(0x00ffff);
      // player.anims.play('turn');
      // this.add.image(camera.midPoint.x, camera.midPoint.y, 'victory').setScale(.5)
      player.x = 100
      player.y = 1300
      camera.centerOn(100, 1500)
    }
  }

  function update ()
  {
      if (gameOver)
      {
          return;
      }

      if (cursors.left.isDown)
      {
          player.setVelocityX(-160);

          player.anims.play('left', true);
      }
      else if (cursors.right.isDown)
      {
          player.setVelocityX(160);

          player.anims.play('right', true);
      }
      else
      {
          player.setVelocityX(0);

          player.anims.play('turn');
      }

      // console.log(space)
      // debugger
//&& player.body.blocked.down
      if (mySpace.isDown && player.body.blocked.down) {
        player.setVelocityY(-330);
      }

      // if (cursors.up.isDown && player.body.touching.down)
      // {
      //     player.setVelocityY(-330);
      // }
  }


  function jump(){
    player.setVelocityY(-300);
  }

  function touchLava (player, lava)
  {
    this.physics.pause();
    player.setTint(0xff0000);

    player.anims.play('turn');

    // this.add.image(520, 300, 'gameOver')
    this.add.image(camera.midPoint.x, camera.midPoint.y, 'gameOver')
    // debugger
    console.log(rKey.isDown)

    let that = this

    // if(true){
      // debugger
      // console.log('hello')
      // props.gameOver(score)
      // gameOver = true
      // props.changeGameState()
      // that.scene.restart()
      // gameOver = false
    // }
    // debugger
    // button = this.add.image(340, 250, 'button').setScale(.6).setInteractive();

    //
    // button = this.add.image(camera.midPoint.x - 180, camera.midPoint.y - 50, 'button').setScale(.6).setInteractive();
    // let that = this
    // button.on('pointerdown', ()=>{
    //   gameOver = true
    //   score = 0
    //   props.changeGameState()
    //   that.scene.restart()
    //   gameOver = false
    // });
       // Start game on click.

    //
    // button.on('pointerover', function (event) { /* Do something when the mouse enters */ });
    // button.on('pointerout', function (event) { /* Do something when the mouse exits. */ });
    // debugger

  }

  // function restartGame(){
  //   gameOver = true
  //   // debugger
  //   // this.scene.scene.restart()
  // }

  // function moveOnRope (player, rope)
  // {
  //   if(cursors.up.isDown){
  //     player.setVelocityY(-160);
  //     player.anims.play('turn')
  //   }else if(cursors.down.isDown){
  //     player.setVelocityY(-160);
  //     player.anims.play('turn')
  //   }else{
  //     return
  //   }
  // }

  function collectMoolah (player, moolah)
  {
      moolah.disableBody(true, true);
      //  Add and update the score
      score += 10;
      scoreText.setText('Score: ' + score);

      // if (moolahs.countActive(true) === 0)
      // {
      //     //  A new batch of moolahs to collect
      //     moolahs.children.iterate(function (child) {
      //
      //         child.enableBody(true, child.x, 0, true, true);
      //
      //     });
      //
      //     var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      //     //
      //     // var bomb = bombs.create(x, 16, 'bomb');
      //     // bomb.setBounce(1);
      //     // bomb.setCollideWorldBounds(true);
      //     // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      //     // bomb.allowGravity = false;
      //
      // }
  }

  function hitBomb (player, bomb)
  {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      gameOver = true;

      props.gameOver(score)

  }

  return(
    <div id="phaser-container">
    </div>
  )

}

export default Game
