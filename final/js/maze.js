
var game = new Phaser.Game(600, 450, Phaser.CANVAS, 'canvasContainer', 
    { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','assets/maze/keep/debug-grid-1920x1920.png');
    game.load.image('player','assets/maze/keep/phaser-dude.png');
    game.load.image('horiz','assets/maze/keep/horizWall.png');
    game.load.image('vert','assets/maze/keep/vertWall.png');
}



var player;
var cursors;
var wallgroup;
var wall

// window.setInterval(function(){
function create() {

    game.add.tileSprite(0, 0, 1920, 1920, 'background');


    game.world.setBounds(0, 0, 1920, 1920);

    // Enable engine

    game.physics.startSystem(Phaser.Physics.P2JS);
    // game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.8;

    // //Create collision group. one for player, one for wall

    // var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    // var wallCollisionGroup = game.physics.p2.createCollisionGroup();

    // game.physics.p2.updateBoundsCollisionGroup();

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.p2.enable(player);
    player.body.setCircle(44);

    kinematic1 = game.add.sprite(game.world.centerX+50, game.world.centerY,'vert');

    game.physics.p2.enable( [ kinematic1 ] );

    kinematic1.body.kinematic = true;
    text = game.add.text(game.world.centerX, game.world.centerY+200, 'move with arrow keys', { fill: '#ffffff' });

    // $(document).ready(function (){

    //     var text = $('#text-area').val();
    //     eval(text);
    //     $("#run").click(function() {
    //         var text = $('#text-area').val();
    //         eval(text) });
    // });

    $(document).ready(function (){

        var text = $('#text-area').val();
        eval(text);

        $("#run").click(function() {
            var text = $('#text-area').val();
            eval(text);
        });

        $("#continue").click(function() {
            window.location.href = "index.html";
        });

        $("#hint").click(function() {
            document.getElementById('hinttext').style.display = 'block';
        });

        $("#hidehint").click(function() {
            document.getElementById('hinttext').style.display = 'none';
        });
        
    });
    // for (i = 0; i < 10 ; i++) {
    //     k1 = game.add.sprite(Math.random()*1000, Math.random()*1000,'vert');
    //     game.physics.p2.enable( [ k1 ] );

    //     k1.body.kinematic = true;
    // }

  /// call your function here

    if (player.position.x < game.world.centerX -200 ) 
    {
        kinematicN = game.add.sprite(game.world.centerX-400, game.world.centerY,'vert');

        game.physics.p2.enable( [ kinematicN ] );

        kinematicN.body.kinematic = true;
    }




    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);


}
// }, 0);

function update() {

    player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(300);
    }
    
}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}
