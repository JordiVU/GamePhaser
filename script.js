const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const worldWidth = screenWidth * 10;
const maxWorldWidth = worldWidth * 2;

const platformHeight = screenHeight / 6;
const joystickSize = platformHeight / 3;

const velocityX = screenWidth / 4;
const velocityY = screenHeight / 2;

const numRocks = 40;
const numRocks2 = 30;
const numGrass = worldWidth / 50;
const numGrass1 = worldWidth / 50;
const numGrass2 = worldWidth / 50;
const numGrass3 = worldWidth / 50;
const numGrass4 = worldWidth / 50;
const numGrass5 = worldWidth / 50;
const numClouds1 = 10;
const numClouds2 = 10;
const numClouds3 = 10;
const numClouds4 = 10;
const numSkeletons = 10;
const numCoins = 50;
const numTrees1 = 30;
const numTrees2 = 25;
const numTrees3 = 30;
const numTrees4 = 10;
const numTrees5 = 5;
const numTrees6 = 8;
const numTrees7 = 8;
const numTrees8 = 8;
const numWizards = 3;
const numStones1 = 10;
const numStones2 = 10;
const numStones3 = 10;
const numStones4 = 10;
const numFlowers = 30;
const numTrees = 100;
const numStars = 50;
const numCrows = 25;
const numWitchs = 3;
const numOtrees1 = 30;
const numOtrees2 = 25;
const numOtrees3 = 5;
const numOtrees4 = 10;
const numOtrees5 = 20;
const numShirimes = 10;
const numStreets = worldWidth / 20;
const numRices = worldWidth / 20;
const numDirs = worldWidth / 20;

var config = {
  type: Phaser.AUTO,
  width: screenWidth,
  height: screenHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: velocityY },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};


var wall, platform, platform2, player, bell, dead, background, background2, loading, paused;
var cursors, joyStick;
var score = 0, lives = 5, scoreText = null;
var gameOver = false;
var timeout = false;

var game = new Phaser.Game(config);

function preload() {
  // Load joyStick
  this.load.plugin('rexvirtualjoystickplugin', 'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins@1.60.10/dist/rexvirtualjoystickplugin.min.js', true);


  // Load images
  this.load.image('background', 'assets/background.png');
  this.load.image('background2', 'assets/background2.png');
  this.load.image('loading', 'assets/loading.jpg');
  this.load.image('pause', 'assets/pause.png');
  this.load.image('paused', 'assets/paused.png');
  this.load.image('cloud1', 'cloud/cloud1.png');
  this.load.image('cloud3', 'cloud/cloud3.png');
  this.load.image('rock', 'assets/rock.png');
  this.load.spritesheet('wizard', 'monsters/wizard.png', { frameWidth: 280, frameHeight: 777 });
  this.load.image('rock2', 'assets/rock2.png');
  this.load.image('tree1', 'tree/tree1.png');
  this.load.image('tree3', 'tree/tree3.png');
  this.load.image('tree4', 'tree/tree4.png');
  this.load.image('tree5', 'tree/tree5.png');
  this.load.image('tree8', 'tree/tree8.png');
  this.load.spritesheet('bomb', 'monsters/bomb.png', { frameWidth: 57, frameHeight: 92 });
  this.load.image('restart', 'assets/restart.png');
  this.load.spritesheet('dude', 'player/dude.png', { frameWidth: 79, frameHeight: 105 });
  this.load.spritesheet('dude2', 'player/dude2.png', { frameWidth: 88, frameHeight: 105 });
  this.load.image('cloud2', 'cloud/cloud2.png');
  this.load.image('cloud4', 'cloud/cloud4.png');
  this.load.spritesheet('skeleton', 'monsters/skeleton.png', { frameWidth: 187, frameHeight: 191 });
  this.load.image('grass', 'grass/grass.png');
  this.load.image('grass1', 'grass/grass.png');
  this.load.image('grass2', 'grass/grass2.png');
  this.load.image('grass3', 'grass/grass.png');
  this.load.image('grass4', 'grass/grass2.png');
  this.load.image('grass5', 'grass/grass.png');
  this.load.image('yflower', 'grass/y_flower.png');
  this.load.image('oflower', 'grass/o_flower.png');
  this.load.image('pflower', 'grass/p_flower.png');
  this.load.image('rflower', 'grass/r_flower.png');
  this.load.image('stone1', 'stone/stone1.png');
  this.load.image('stone2', 'stone/stone2.png');
  this.load.image('stone3', 'stone/stone3.png');
  this.load.image('stone4', 'stone/stone4.png');
  this.load.image('tree6', 'tree/tree6.png');
  this.load.image('tree7', 'tree/tree7.png');
  this.load.image('tree2', 'tree/tree2.png');
  this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('shirime', 'monsters/shirime.png', { frameWidth: 170, frameHeight: 163 });
  this.load.image('otree1', 'tree/otree1.png');
  this.load.image('otree2', 'tree/otree2.png');
  this.load.image('otree3', 'tree/otree3.png');
  this.load.image('otree4', 'tree/otree4.png');
  this.load.image('street', 'platform2/street.png');
  this.load.image('street2', 'platform2/street2.png');
  this.load.image('rice', 'platform2/rice.png');
  this.load.image('dir', 'platform2/dir.jpg');

  // Load Image Scene 2
  this.load.image('arrow', 'assets/arrow.png');
  this.load.image('tree2', 'assets/tree2.png');
  this.load.image('star', 'assets/star.png');
  this.load.audio('bell2', 'assets/ding2.mp3');
  this.load.spritesheet('crow', 'monsters/crow.png', { frameWidth: 168, frameHeight: 206 });
  this.load.spritesheet('witch', 'monsters/witch.png', { frameWidth: 620, frameHeight: 725 });
  this.load.spritesheet('magic', 'assets/magic.png', { frameWidth: 60, frameHeight: 116 });

  // Load sounds and music
  this.load.audio('bell', 'assets/ding.mp3');
  this.load.audio('dead', 'assets/dead.mp3');
  this.load.audio('music', 'assets/music.mp3');
}

function initSounds() {
  bell = this.sound.add('bell');
  bell2 = this.sound.add('bell2', { volume: 0.2 });
  dead = this.sound.add('dead');
  this.sound.add('music', { volume: 0.5 }).play({ loop: -1 });
}

function create() {
  background = this.add.image(0, 0, 'background')
    .setOrigin(0)
    .setScale(screenWidth / 1379, screenHeight / 764)
    .setScrollFactor(0);

  background2 = this.add.image(0, 0, 'background2')
    .setOrigin(0)
    .setScale(screenWidth / 1280, screenHeight / 474)
    .setScrollFactor(0);

  background2.setVisible(false);
  
  initSounds.call(this);
  createWorld.call(this);
  showArrow.call(this);
  createAnimations.call(this);
  for (i = 0; i < numWizards; i++) createWizard.call(this);
  for (i = 0; i < numWitchs; i++) createWitch.call(this);
  for (i = 0; i < numRocks; i++) createRock.call(this);
  for (i = 0; i < numRocks2; i++) createRock2.call(this);
  for (i = 0; i < numClouds1; i++) createCloud1.call(this);
  for (i = 0; i < numClouds3; i++) createCloud3.call(this);
  for (i = 0; i < numTrees1; i++) createTree1.call(this);
  for (i = 0; i < numTrees3; i++) createTree3.call(this);
  for (i = 0; i < numTrees4; i++) createTree4.call(this);
  for (i = 0; i < numTrees5; i++) createTree5.call(this);
  for (i = 0; i < numTrees8; i++) createTree8.call(this);
  for (i = 0; i < numOtrees1; i++) createOtree1.call(this);
  for (i = 0; i < numOtrees3; i++) createOtree3.call(this);
  for (i = 0; i < numOtrees4; i++) createOtree4.call(this);
  createPlayer.call(this);
  for (i = 0; i < numShirimes; i++) createShirime.call(this);
  for (i = 0; i < numDirs; i++) createDir.call(this, i * 48);
  for (i = 0; i < numStreets; i++) createStreet.call(this, i * 18);
  for (i = 0; i < numRices; i++) createRice1.call(this, i * 48);
  for (i = 0; i < numStreets; i++) createStreet2.call(this, i * 18);
  for (i = 0; i < numOtrees2; i++) createOtree2.call(this);
  for (i = 0; i < numStreets; i++) createStreet3.call(this, i * 18);
  for (i = 0; i < numRices; i++) createRice3.call(this, i * 48);
  for (i = 0; i < numStreets; i++) createStreet4.call(this, i * 18);

  this.add.image(worldWidth, 0, 'tree2').setOrigin(0.5, 0).setDisplaySize(screenWidth / 5, screenHeight);

  for (i = 0; i < numSkeletons; i++) createSkeleton.call(this);
  for (i = 0; i < numGrass; i++) createGrass.call(this, i * 50);
  for (i = 0; i < numGrass1; i++) createGrass1.call(this, i * 50);
  for (i = 0; i < numGrass3; i++) createGrass3.call(this, i * 50);
  for (i = 0; i < numGrass5; i++) createGrass5.call(this, i * 50);
  for (i = 0; i < numStones1; i++) createStone1.call(this);
  for (i = 0; i < numStones2; i++) createStone2.call(this);
  for (i = 0; i < numStones3; i++) createStone3.call(this);
  for (i = 0; i < numStones4; i++) createStone4.call(this);
  for (i = 0; i < numGrass2; i++) createGrass2.call(this, i * 50);
  for (i = 0; i < numGrass4; i++) createGrass4.call(this, i * 50);
  for (i = 0; i < numFlowers; i++) createYflower.call(this);
  for (i = 0; i < numFlowers; i++) createOflower.call(this);
  for (i = 0; i < numFlowers; i++) createPflower.call(this);
  for (i = 0; i < numFlowers; i++) createRflower.call(this);
  for (i = 0; i < numTrees6; i++) createTree6.call(this);
  for (i = 0; i < numTrees7; i++) createTree7.call(this);
  for (i = 0; i < numTrees2; i++) createTree2.call(this);
  for (i = 0; i < numCrows; i++) createCrow.call(this);
  for (i = 0; i < numClouds2; i++) createCloud2.call(this);
  for (i = 0; i < numClouds4; i++) createCloud4.call(this);
  showPauseButton.call(this); // Muestra el botón de pausa
  showScore.call(this);
  for (i = 0; i < numCoins; i++) createCoin.call(this);
  for (i = 0; i < numStars; i++) createStar.call(this);

  //  Loading y Pausa
  loading = this.add.image(0, 0, 'loading')
    .setOrigin(0)
    .setScale(screenWidth / 639, screenHeight / 360)
    .setScrollFactor(0);

  setTimeout(() => {
    loading.setVisible(false);
  }, 1000);
  
  paused = this.add.image(screenWidth/2, screenHeight/2, 'paused')
    .setOrigin(0.5)
    .setScale(screenWidth / 1920, screenHeight / 1080)
    .setScrollFactor(0)      
    .setInteractive()
    .on('pointerdown', () => {
      this.physics.resume();
      paused.setVisible(false);
    });
  paused.setVisible(false);

  this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
  ///////////////////////////////////////
}

function createWorld() {
  this.cameras.main.setBounds(0, 0, maxWorldWidth, screenHeight);
  this.physics.world.setBounds(0, 0, maxWorldWidth, screenHeight);

  // Scene1 Platform
  platform = this.add.rectangle(0, screenHeight, worldWidth, platformHeight, 0x17631B).setOrigin(1);
  this.physics.add.existing(platform);
  platform.body.setCollideWorldBounds(true);

  // Scene2 Platfform
  platform2 = this.add.rectangle(worldWidth, screenHeight, worldWidth, platformHeight, 0x186193).setOrigin(0, 1);
  this.physics.add.existing(platform2);
  platform2.body.setCollideWorldBounds(true);

  // Wall
  wall = this.add.rectangle(0, 0, worldWidth, screenHeight, 0, 0).setOrigin(1);
  this.physics.add.existing(wall);
  wall.body.setCollideWorldBounds(true);
}

function createAnimations() {
  // Player
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }]
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  // Player 2
  this.anims.create({
    key: 'left2',
    frames: this.anims.generateFrameNumbers('dude2', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'turn2',
    frames: [{ key: 'dude2', frame: 6 }]
  });
  this.anims.create({
    key: 'right2',
    frames: this.anims.generateFrameNumbers('dude2', { start: 7, end: 11 }),
    frameRate: 10,
    repeat: -1
  });
  // skeleton
  this.anims.create({
    key: 'burning',
    frames: this.anims.generateFrameNumbers('skeleton', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });
  // Coin
  this.anims.create({
    key: 'rotate',
    frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  // Wizard
  this.anims.create({
    key: 'spell',
    frames: this.anims.generateFrameNumbers('wizard', { start: 0, end: 6 }),
    frameRate: 10,
    repeat: -1,
    yoyo: true,
  });

  // Bomb
  this.anims.create({
    key: 'flame',
    frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
    yoyo: true,
  });

  // Crow
  this.anims.create({
    key: 'flying',
    frames: this.anims.generateFrameNumbers('crow', { start: 0, end: 5 }),
    frameRate: 7,
    repeat: -1
  });

  // Witch
  this.anims.create({
    key: 'magic',
    frames: this.anims.generateFrameNumbers('witch', { start: 0, end: 6 }),
    frameRate: 10,
    repeat: -1,
    yoyo: true,
  });

  // Shirime
  this.anims.create({
    key: 'ass',
    frames: this.anims.generateFrameNumbers('shirime', { start: 0, end: 4 }),
    frameRate: 6,
    repeat: -1,
    yoyo: true,
  });

  // Magic
  this.anims.create({
    key: 'wmagic',
    frames: this.anims.generateFrameNumbers('magic', { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1,
    yoyo: true,
  });

}

function createPlayer() {
  player = this.physics.add.sprite(0, screenHeight - platformHeight, 'dude').setOrigin(1).setSize(80, 100).setScale(1.5).setBounce(0.2).setCollideWorldBounds(true);
  this.physics.add.collider(player, platform);
  this.physics.add.collider(player, platform2);
  this.cameras.main.startFollow(player, true, 0.05, 0.05);

  // Cursor keys and joystick
  cursors = this.input.keyboard.createCursorKeys();
  joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
    x: screenWidth / 2,
    y: screenHeight - joystickSize * 1.5,
    radius: joystickSize
  }).on('update', update, this);
}

function update() {
  if (gameOver) return;

  const numPlayer = player.x < worldWidth ? '' : '2';

  if (cursors.left.isDown || joyStick.left) {
    player.setVelocityX(-velocityX).anims.play('left' + numPlayer, true);
  }
  else if (cursors.right.isDown || joyStick.right) {
    player.setVelocityX(velocityX).anims.play('right' + numPlayer, true);
  }
  else {
    player.setVelocityX(0).anims.play('turn' + numPlayer);
  }

  if ((cursors.up.isDown || joyStick.up) && player.body.touching.down) {
    player.setVelocityY(-velocityY);
  }

  // Activa la pausa cuando se pulsa la tecla P
  if (Phaser.Input.Keyboard.JustDown(this.pKey)) togglePause.call(this);
  /////////////////////////////////

  updateBackground();
}


// CLOUDS

function createCloud1() {
  const x = Phaser.Math.Between(0, maxWorldWidth);
  const y = Phaser.Math.Between(0, screenHeight - platformHeight * 2);
  const scale = Phaser.Math.FloatBetween(0.5, 1.5);
  this.add.image(x, y, 'cloud1').setScale(scale);
}

function createCloud2() {
  const x = Phaser.Math.Between(0, maxWorldWidth);
  const y = Phaser.Math.Between(0, screenHeight - platformHeight * 2);
  const scale = Phaser.Math.FloatBetween(0.5, 1.5);
  this.add.image(x, y, 'cloud2').setScale(scale);
}

function createCloud3() {
  const x = Phaser.Math.Between(0, maxWorldWidth);
  const y = Phaser.Math.Between(0, screenHeight - platformHeight * 2);
  const scale = Phaser.Math.FloatBetween(0.5, 1.5);
  this.add.image(x, y, 'cloud3').setScale(scale);
}

function createCloud4() {
  const x = Phaser.Math.Between(0, maxWorldWidth);
  const y = Phaser.Math.Between(0, screenHeight - platformHeight * 2);
  const scale = Phaser.Math.FloatBetween(0.5, 1.5);
  this.add.image(x, y, 'cloud4').setScale(scale);
}


// ------------------------------------------------------------SCENE 1-----------------------------------------------------------------


// OTHERS


// Activa o desactiva la pausa
function togglePause() {
  if (paused.visible) {
    this.physics.resume();
    paused.setVisible(false);
  } else {
    this.physics.pause();
    paused.setVisible(true);
  }
}
/////////////////////////////////////////

// Muestra el botón de pausa
function showPauseButton() {
  this.add.image(10, 27, 'pause')
    .setScale(0.1)
    .setOrigin(0, 0)
    .setScrollFactor(0)
    .setInteractive().on('pointerdown', () => togglePause.call(this));
}
//////////////////////////////////////////


function showScore() {
  if (!scoreText) scoreText = this.add.text(60, 16, '', { fontSize: (screenWidth / 20) + 'px', fill: '#000' }).setScrollFactor(0);
  scoreText.setText('Score:' + score + ' / Lives:' + lives);
}

function createCoin() {
  const x = Phaser.Math.Between(screenWidth / 2, maxWorldWidth);
  const bounce = Phaser.Math.FloatBetween(0.1, 0.5);
  let coin = this.physics.add.sprite(x, 0, 'coin').setOrigin(1).setScale(3).setBounce(bounce).anims.play('rotate');
  coin.body.setOffset(0, -10);
  this.physics.add.collider(coin, platform);
  this.physics.add.collider(coin, platform2);
  this.physics.add.overlap(player, coin, collectCoin, null, this);
}


// MONSTERS

function createWizard() {
  const x = Phaser.Math.Between(0, worldWidth);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(1, 1.1);
  this.add.sprite(x, y, 'wizard').setOrigin(1).setScale(scale).anims.play('spell');
}

function createBomb() {
  const x = Phaser.Math.Between(0, worldWidth);
  const v = Phaser.Math.Between(-velocityX, velocityX);
  let bomb = this.physics.add.sprite(x, 0, 'bomb').setOrigin(1).setScale(1).setBounce(1).setCollideWorldBounds(true).setVelocity(v, velocityY).anims.play('flame');
  bomb.body.setAllowGravity(false);
  this.physics.add.collider(bomb, platform);
  this.physics.add.collider(bomb, platform2);
  this.physics.add.collider(player, bomb, hitBombOrskeleton, null, this);
}

function createSkeleton() {
  const x = Phaser.Math.Between(0, worldWidth);
  const y = screenHeight - platformHeight;
  let skeleton = this.physics.add.sprite(x, y, 'skeleton').setOrigin(1).setSize(80, 150).setScale(1).setImmovable(true).anims.play('burning', true)
  skeleton.body.setAllowGravity(false);
  this.physics.add.collider(player, skeleton, hitBombOrskeleton, null, this);
}


// ROCKS

function createRock() {
  const x = Phaser.Math.Between(0, worldWidth);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x, y, 'rock').setOrigin(1).setScale(scale);
}

function createRock2() {
  const x = Phaser.Math.Between(0, worldWidth);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x, y, 'rock2').setOrigin(1).setScale(scale);
}


// Trees

function createTree1() {
  const x = Phaser.Math.Between(0, worldWidth);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 2);
  this.add.image(x, y, 'tree1').setOrigin(1).setScale(scale);
}

function createTree2() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.5, 2);
  this.add.image(x, y, 'tree2').setOrigin(1).setScale(scale);
}

function createTree3() {
  const x = Phaser.Math.Between(0, worldWidth);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 2);
  this.add.image(x, y, 'tree3').setOrigin(1).setScale(scale);
}

function createTree4() {
  const x = Phaser.Math.Between(0, worldWidth);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x, y, 'tree4').setOrigin(1).setScale(scale);
}

function createTree5() {
  const x = Phaser.Math.Between(0, worldWidth);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 2);
  this.add.image(x, y, 'tree5').setOrigin(1).setScale(scale);
}

function createTree6() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x, y, 'tree6').setOrigin(1).setScale(scale);
}

function createTree7() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x, y, 'tree7').setOrigin(1).setScale(scale);
}

function createTree8() {
  const x = Phaser.Math.Between(0, worldWidth);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x, y, 'tree8').setOrigin(1).setScale(scale);
}


// STONES

function createStone1() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x, y, 'stone1').setOrigin(1).setScale(scale);
}

function createStone2() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x, y, 'stone2').setOrigin(1).setScale(scale);
}

function createStone3() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x, y, 'stone3').setOrigin(1).setScale(scale);
}

function createStone4() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x, y, 'stone4').setOrigin(1).setScale(scale);
}


// GRASS

function createGrass(x) {
  const y = screenHeight - platformHeight + 15;
  this.add.image(x, y, 'grass').setOrigin(1).setScale(0.25);
}

function createGrass1(x) {
  const y = screenHeight - platformHeight + 50;
  this.add.image(x, y, 'grass1').setOrigin(1).setScale(0.25);
}

function createGrass2(x) {
  const y = screenHeight - platformHeight + 85;
  this.add.image(x, y, 'grass2').setOrigin(1).setScale(0.25);
}

function createGrass3(x) {
  const y = screenHeight - platformHeight + 120;
  this.add.image(x, y, 'grass3').setOrigin(1).setScale(0.25);
}

function createGrass4(x) {
  const y = screenHeight - platformHeight + 155;;
  this.add.image(x, y, 'grass4').setOrigin(1).setScale(0.25);
}

function createGrass5(x) {
  const y = screenHeight - platformHeight + 185;;
  this.add.image(x, y, 'grass5').setOrigin(1).setScale(0.25);
}

function createYflower() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.15, 0.2);
  this.add.image(x, y, 'yflower').setOrigin(1).setScale(scale);
}

function createOflower() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.15, 0.2);
  this.add.image(x, y, 'oflower').setOrigin(1).setScale(scale);
}

function createPflower() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.15, 0.2);
  this.add.image(x, y, 'pflower').setOrigin(1).setScale(scale);
}

function createRflower() {
  const x = Phaser.Math.Between(screenWidth / 2, worldWidth);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.15, 0.2);
  this.add.image(x, y, 'rflower').setOrigin(1).setScale(scale);
}
// ------------------------------------------------------------SCENE 2-----------------------------------------------------------------

function createTree() {
  const x = Phaser.Math.Between(0, worldWidth);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 1.2);
  this.add.image(x + worldWidth, y, 'tree2').setOrigin(1).setScale(scale * 2);
}

function createStar() {
  const x = Phaser.Math.Between(worldWidth, worldWidth * 2);
  const vX = Phaser.Math.Between(-velocityX, velocityX);
  const vY = Phaser.Math.Between(velocityY / 2, velocityY);
  let star = this.physics.add.image(x, 0, 'star').setScale(0.5).setBounce(1).setCollideWorldBounds(true).setVelocity(vX, vY);
  star.body.setAllowGravity(false);
  this.physics.add.collider(star, platform);
  this.physics.add.collider(star, platform2);
  this.physics.add.collider(star, wall);
  this.physics.add.collider(player, star, collectStar, null, this);
  this.physics.add.collider(wall, star, destroyStar, null, this);
}

function createMagic() {
  const x = Phaser.Math.Between(worldWidth, worldWidth * 2);
  const v = Phaser.Math.Between(-velocityX, velocityX);
  let magic = this.physics.add.sprite(x, 0, 'magic').setOrigin(1).setSize(0.8).setScale(0.8).setBounce(1).setCollideWorldBounds(true).setVelocity(v, velocityY).anims.play('wmagic');
  magic.body.setAllowGravity(false);
  this.physics.add.collider(magic, platform);
  this.physics.add.collider(magic, platform2);
  this.physics.add.collider(magic, wall);
  this.physics.add.collider(player, magic, hitBombOrskeleton, null, this);
  this.physics.add.collider(wall, magic, destroyStar, null, this);
}


// Monsters

function createCrow() {
  const x = Phaser.Math.Between(worldWidth, worldWidth * 2);
  const y = Phaser.Math.Between(0, screenHeight - platformHeight);
  const v = Phaser.Math.Between(velocityY / 2, velocityY);
  let crow = this.physics.add.sprite(x, y, 'crow').setOrigin(1).setSize(72, 64).setScale(1).anims.play('flying', true).setBounce(1).setVelocity(0, v);
  crow.body.setAllowGravity(false).setCollideWorldBounds(true);
  this.physics.add.collider(crow, platform2);
  this.physics.add.collider(player, crow, hitCrow, null, this);
}

function createWitch() {
  const x = Phaser.Math.Between(worldWidth, worldWidth * 2);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(1, 1.1);
  this.add.sprite(x, y, 'witch').setOrigin(1).setScale(scale).anims.play('magic');
}

function createShirime() {
  const x = Phaser.Math.Between(worldWidth, worldWidth * 2);
  const y = screenHeight - platformHeight;
  let shirime = this.physics.add.sprite(x, y, 'shirime').setOrigin(1).setSize(80, 150).setScale(0.6).setImmovable(true).anims.play('ass', true)
  shirime.body.setAllowGravity(false);
  this.physics.add.collider(player, shirime, hitBombOrskeleton, null, this);
}

// Trees

function createOtree1() {
  const x = Phaser.Math.Between(worldWidth, worldWidth * 2);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 2);
  this.add.image(x, y, 'otree1').setOrigin(1).setScale(scale);
}

function createOtree2() {
  const x = Phaser.Math.Between(worldWidth, worldWidth * 2);
  const y = Phaser.Math.Between(screenHeight - platformHeight, screenHeight);
  const scale = Phaser.Math.FloatBetween(0.5, 1);
  this.add.image(x, y, 'otree2').setOrigin(1).setScale(scale);
}

function createOtree3() {
  const x = Phaser.Math.Between(worldWidth, worldWidth * 2);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 2);
  this.add.image(x, y, 'otree3').setOrigin(1).setScale(scale);
}

function createOtree4() {
  const x = Phaser.Math.Between(worldWidth, worldWidth * 2);
  const y = screenHeight - platformHeight;
  const scale = Phaser.Math.FloatBetween(0.5, 2);
  this.add.image(x, y, 'otree4').setOrigin(1).setScale(scale);
}

// Street

function createStreet(x) {
  const y = screenHeight - platformHeight + 10;
  this.add.image(worldWidth + x, y, 'street').setOrigin(1).setScale(0.25);
}

function createStreet2(x) {
  const y = screenHeight - platformHeight + 60;
  this.add.image(worldWidth + x, y, 'street2').setOrigin(1).setScale(0.25);
}

function createStreet3(x) {
  const y = screenHeight - platformHeight + 120;
  this.add.image(worldWidth + x, y, 'street').setOrigin(1).setScale(0.25);
}

function createStreet4(x) {
  const y = screenHeight - platformHeight + 180;
  this.add.image(worldWidth + x, y, 'street2').setOrigin(1).setScale(0.25);
}

// Rice

function createRice1(x) {
  const y = screenHeight - platformHeight + 40;
  const scale = Phaser.Math.FloatBetween(0.25, 0.5);
  this.add.image(worldWidth + x, y, 'rice').setOrigin(1).setScale(scale);
}

function createRice3(x) {
  const y = screenHeight - platformHeight + 160;
  const scale = Phaser.Math.FloatBetween(0.25, 0.5);
  this.add.image(worldWidth + x, y, 'rice').setOrigin(1).setScale(scale);
}

// Dir

function createDir(x) {
  const y = screenHeight - platformHeight + 100;
  this.add.image(worldWidth + x, y, 'dir').setOrigin(1).setScale(0.25);
}

// ---------------------------------------------------------------------------------------------------------------------------------

function updateBackground() {  
  if (player.x < worldWidth) {
    if (!background.visible) {
      background.setVisible(true);
      background2.setVisible(false);
    }
  }
  else {
    if (!background2.visible) {
      background.setVisible(false);
      background2.setVisible(true);
    }
  }
}

function collectCoin(player, coin) {
  bell.play();
  coin.destroy();
  createCoin.call(this);
  createBomb.call(this);
  createMagic.call(this);

  score += 10;
  if (score % 100 == 0) lives++;
  showScore();
}

function hitBombOrskeleton(player, thing) {
  if (timeout) return;

  dead.play();
  lives--;
  showScore();
  player.setTint(0xff0000).anims.play('turn');

  if (lives == 0) {
    this.physics.pause();
    gameOver = true;
    this.add.image(screenWidth / 2, screenHeight / 2, 'restart')
      .setScale(1)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => location.reload());
  }
  else {
    thing.destroy();
    setTimeout(() => player.clearTint(), 3000);
  }
}

function showArrow() {
  this.add.image(screenWidth, 0, 'arrow')
    .setOrigin(1, 0)
    .setScale(2)
    .setScrollFactor(0)
    .setInteractive().on('pointerdown', () => {
      player.x = (player.x + worldWidth) % maxWorldWidth;
      updateBackground();
    });
  
}

function protect(color) {
  player.setTint(color);
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => { timeout = false; player.clearTint() }, 3000);
}

function collectStar(player, star) {
  bell2.play();
  star.destroy();
  createStar.call(this);
  protect(0xFFFF00);
  score += 10;
  if (score % 100 == 0) lives++;
  showScore();
}

function destroyStar(wall, star) {
  star.destroy();
  createStar.call(this);
}

function hitCrow(player, crow) {
  if (timeout) return;
  dead.play();
  lives--;
  showScore();
  protect(0xFF0000);
  if (lives == 0) {
    this.physics.pause();
    gameOver = true;
    this.add.image(screenWidth / 2, screenHeight / 2, 'restart')
      .setScale(1)
      .setScrollFactor(0)
      .setInteractive().on('pointerdown', () => location.reload());
  }
  else {
    crow.destroy();
  }
}