var GAME_WIDTH = 600;
var GAME_HEIGHT = 450;

//Game Variables
var ship;
var lasers;
var target;
var mouseTouchDown = false;
var score = 0;
var cursors;

// Create a Phaser game instance
var game = new Phaser.Game(
	GAME_WIDTH,
	GAME_HEIGHT,
	Phaser.AUTO,
	'container',
	{ preload: preload, create: create, update: update, init: init, render: render }
);

// Preload assets
function preload() {
	var dir = 'static/img/assets/';
	game.load.image('target', dir + 'target.png');
	game.load.image('watergun', dir + 'watergun.png');
	game.load.image('laser', dir + 'laserBlue02.png');
}

// Init
function init() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.ENTER];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);

	cursors = game.input.keyboard.createCursorKeys();
}

// Assets are available in create
function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	target = game.add.group();
	target.enableBody = true;
	
	var targetSprite = target.create(game.world.centerX, game.world.centerY - 150, 'target');
	targetSprite.anchor.setTo(0.5, 0.5);
	targetSprite.body.immovable = true;

	// Create the group using the group factory
	lasers = game.add.group();
	// To move the sprites later on, we have to enable the body
	lasers.enableBody = true;
	// We're going to set the body type to the ARCADE physics, since we don't need any advanced physics
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	/*

		This will create 20 sprites and add it to the stage. They're inactive and invisible, but they're there for later use.
		We only have 20 laser bullets available, and will 'clean' and reset they're off the screen.
		This way we save on precious resources by not constantly adding & removing new sprites to the stage

	*/
	lasers.createMultiple(20, 'laser');

	/*
		Create a ship using the sprite factory
		game.add is an instance of Phaser.GameObjectFactory, and helps us to quickly create common game objects.
		The sprite is already added to the stage
	*/
	ship = game.add.sprite(game.world.centerX, game.world.centerY, 'watergun');
	game.physics.arcade.enable(ship);
	// Set the anchorpoint to the middle
	ship.anchor.setTo(0.5, 0.5);
	ship.body.collideWorldBounds = true;
	

	/*

		Behind the scenes, this will call the following function on all lasers:
			- events.onOutOfBounds.add(resetLaser)
		Every sprite has an 'events' property, where you can add callbacks to specific events.
		Instead of looping over every sprite in the group manually, this function will do it for us.

	*/
	lasers.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	// Same as above, set the anchor of every sprite to 0.5, 1.0
	lasers.callAll('anchor.setTo', 'anchor', 0.5, 1.0);

	// This will set 'checkWorldBounds' to true on all sprites in the group
	lasers.setAll('checkWorldBounds', true);
}

function resetLaser(laser) {
	laser.kill();
}

function resertTarget(target) {
	target.x = game.rnd.between(25, game.width - 25);
}

function collideCallback(lasers, target) {
	score += 100;
	resetLaser(lasers);
	resertTarget(target);
}

// Update
function update() {

	game.physics.arcade.collide(lasers, target, collideCallback);

	// Loop over the keys
	for (var index in phaserKeys) {
		// Save a reference to the current key
		var key = phaserKeys[index];
		// If the key was just pressed, fire a laser
		if (key.justDown) {
			fireLaser();
		}
	}

	// Game.input.activePointer is either the first finger touched, or the mouse
	if (game.input.activePointer.isDown) {
		// We'll manually keep track if the pointer wasn't already down
		if (!mouseTouchDown) {
			touchDown();
		}
	} else {
		if (mouseTouchDown) {
			touchUp();
		}
	}

	ship.body.velocity.x = 0;
	ship.body.velocity.y = 0;

	if (cursors.left.isDown) {
        //ship.body.velocity.x = -250;
        ship.angle -= 1;
    }
    else if (cursors.right.isDown) {
        //ship.body.velocity.x = 250;
        ship.angle += 1;
    }

}

function playWaterGunGame(angle) {
	ship.angle = angle;
	fireLaser();
}

function touchDown() {
	// Set touchDown to true, so we only trigger this once
	mouseTouchDown = true;
	fireLaser();
}

function touchUp() {
	// Set touchDown to false, so we can trigger touchDown on the next click
	mouseTouchDown = false;
}

function fireLaser() {
	// Get the first laser that's inactive, by passing 'false' as a parameter
	var laser = lasers.getFirstExists(false);
	if (laser) {
		// If we have a laser, set it to the starting position
		laser.reset(ship.x, ship.y);
		laser.angle = ship.angle
		// Give it a velocity of -500 so it starts shooting
		laser.body.velocity.x = 500*Math.sin(laser.angle*Math.PI/180);
		laser.body.velocity.y = -500*Math.cos(laser.angle*Math.PI/180);
	}

}

// Render some debug text on screen
function render() {
	game.debug.text('CodeCaptain Shooting Demo', 10, 30);
	game.debug.text('Click or press space / enter to shoot', 10, 55);
}

function runCode() {

	eval($('#textbox')[0].value)
}

$('#runCode').click(runCode)