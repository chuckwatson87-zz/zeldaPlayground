export default class Main extends Phaser.State {

    create() {

        //Enable Arcade Physics
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set the games background colour
        //this.game.stage.backgroundColor = '#cecece';
        let link = this.game.add.sprite(10, 10, 'link');
        link.frameName = 'link1';
        //link.scale.setTo(0,0);

        //Example of including an object
        //let exampleObject = new ExampleObject(this.game);
    }

    update() {

    }

}
