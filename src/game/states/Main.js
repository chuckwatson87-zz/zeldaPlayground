import Player from '../Player/Player';


let player;

export default class Main extends Phaser.State {

    create() {

        //Enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        player = new Player(this.game)
        player.init();
        // link.frameName = 'link7';
        //link.animations.add('walk_right', [, 'link_08', 'link_04']);

        //link.animations.play('walk', 60, true)
        //link.scale.setTo(0,0);

        //  Enable for physics. This creates a default rectangular body.


        //  Modify a few body properties
        //link.body.fixedRotation = true;

        //Example of including an object
        //let exampleObject = new ExampleObject(this.game);
        //cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {

        player.updateMovement();

    }

}
