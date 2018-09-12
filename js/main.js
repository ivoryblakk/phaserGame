
var playerShip;

var bullets;
var bulletTime;
var fireButton;
var GameState = {
    preload: function () {
        // preload all game asses before the game
        this.load.image('background', 'assets/images/background.png');
        this.load.image('ship', 'assets/images/ship.png');
        this.load.image('enemy', 'assets/images/enemy.png');
        this.load.image('bullet', 'assets/images/laser.png');
        // executed after everything is loaded
    },



    create: function () {


        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y ', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        this.background = this.game.add.sprite(0, 0, 'background');

        this.ship = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "ship");
        // 250 = x and 80 =y
        this.enemy = this.game.add.sprite(250, 80, "enemy");



        this.ship.anchor.setTo(0.5);

        //set the image anchor point to the middle of the image instead of the top left
        this.enemy.anchor.setTo(0.5);

        // changes the scale
        this.ship.scale.setTo(0.09);
        this.enemy.scale.setTo(0.09);
        this.enemy.angle = 90;

        //changes the angle
        this.enemy.angle += 0.5;

        playerShip = this.ship;
    },
    //executed multiple times per second
    update: function () {
        this.enemy.angle += 0.5;


        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            playerShip.x -= 4;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            playerShip.x += 4;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            playerShip.y -= 4;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            playerShip.y += 4;
        }

        if (fireButton.isDown) {
            fireBullet();
        }

    }

};
var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');

function fireBullet() {
    if (game.time.now > bulletTime) {
        bullet = bullets.getFirstExists(false);

        if (bullet) {
            bullet.reset(playerShip.x, playerShip.y);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }

    }
}