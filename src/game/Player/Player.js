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
    this.player.animations.add('walk_left', ['link_02', 'link_06']);
    this.player.animations.add('walk_up', ['link_03', 'link_07']);

  }

  updateMovement() {
        if (this.cursors.right.isDown)
        {
            this.player.animations.play('walk_right', 14, true)
            this.player.body.velocity.x = 55;
            this.cursors.up.enabled = false;
            this.cursors.left.enabled = false;
            this.cursors.down.enabled = false;
            this.cursors.right.enabled = true;
        }

        else if (this.cursors.down.isDown)
        {
            this.player.animations.play('walk_down', 14, true)
            this.player.body.velocity.y = 55;
            this.cursors.up.enabled = false;
            this.cursors.left.enabled = false;
            this.cursors.down.enabled = true;
            this.cursors.right.enabled = false;
        }

        else if (this.cursors.left.isDown)
        {
            this.player.animations.play('walk_left', 14, true)
            this.player.body.velocity.x = -55;
            this.cursors.up.enabled = false;
            this.cursors.left.enabled = true;
            this.cursors.down.enabled = false;
            this.cursors.right.enabled = false;

        }

        else if (this.cursors.up.isDown)
        {
            this.player.animations.play('walk_up', 14, true)
            this.player.body.velocity.y = -55;
            this.cursors.up.enabled = true;
            this.cursors.left.enabled = false;
            this.cursors.down.enabled = false;
            this.cursors.right.enabled = false;

        }

        else {
          this.player.body.velocity.x = 0;
          //link.body.moveRight(400);
          this.player.body.velocity.y = 0;
          //link.body.moveRight(400);
          this.player.animations.stop('walk_down', true);
          this.player.animations.stop('walk_left', true);
          this.player.animations.stop('walk_right', true);
          this.player.animations.stop('walk_up', true);

          this.cursors.up.enabled = true;
          this.cursors.left.enabled = true;
          this.cursors.right.enabled = true;
          this.cursors.down.enabled = true;
        }
  }

}
