export default class Preload extends Phaser.State {
    preload() {
      //this.load.spritesheet('link', 'scripts/resources/sprites/link.png', 30, 28);
      this.load.atlas('player', 'scripts/resources/sprites/link/sprites.png', 'scripts/resources/sprites/link/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    }
    create() {
      this.game.state.start("Main");
    }
}
