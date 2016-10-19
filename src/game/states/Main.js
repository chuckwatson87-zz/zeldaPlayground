let link, cursors;

export default class Main extends Phaser.State {

    create() {

        //Enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.startSystem(Phaser.Physics.BOX2D);
        //Set the games background colour
        //this.game.stage.backgroundColor = '#cecece';
        link = this.game.add.sprite(10, 10, 'link');
        // link.frameName = 'link7';
        link.animations.add('walk', ['link_04', 'link_08']);

        //link.animations.play('walk', 60, true)
        //link.scale.setTo(0,0);

        //  Enable for physics. This creates a default rectangular body.
        this.game.physics.arcade.enable(link);

        //  Modify a few body properties
        link.body.fixedRotation = true;

        //Example of including an object
        //let exampleObject = new ExampleObject(this.game);
        cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
      if (cursors.right.isDown)
      {
          link.animations.play('walk', 60, true)
          link.body.velocity.x = 60;
      }
      else if (cursors.right.isUp) {
          link.body.velocity.x = 0;
          //link.body.moveRight(400);
          link.animations.stop(null, true);
      }

    }

}
