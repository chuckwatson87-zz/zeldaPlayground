export default class Player {
  constructor(game) {
    this.game = game;
    this.player;
    //this.init();
  }

  init() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player = this.game.add.sprite(0, 0, 'player');
    this.addAnimations();
    this.game.physics.arcade.enable(this.player);
  }

  addAnimations() {
    this.player.animations.add('walk_right', ['link_08', 'link_04']);
    this.player.animations.add('walk_down', ['link_01', 'link_05']);

  }

  updateMovement() {
    if (this.cursors.right.isDown)
    {
        this.player.animations.play('walk_right', 14, true)
        this.player.body.velocity.x = 55;
    }
    // if (this.cursors.right.isUp) {
    //     this.player.body.velocity.x = 0;
    //     //link.body.moveRight(400);
    //     this.player.animations.stop('walk_right', true);
    // }

    else if (this.cursors.down.isDown)
    {
        this.player.animations.play('walk_down', 14, true)
        this.player.body.velocity.y = 55;
    }
    // if (this.cursors.down.isUp) {
    //     this.player.body.velocity.y = 0;
    //     //link.body.moveRight(400);
    //     this.player.animations.stop('walk_down', true);
    // }

    else {
      this.player.body.velocity.x = 0;
      //link.body.moveRight(400);
      this.player.animations.stop('walk_right', true);

      this.player.body.velocity.y = 0;
      //link.body.moveRight(400);
      this.player.animations.stop('walk_down', true);
    }
  }

}
