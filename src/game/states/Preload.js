export default class Preload extends Phaser.State {
    preload() {
      //this.load.spritesheet('link', 'scripts/resources/sprites/link.png', 30, 28);
      this.load.atlas('link', 'scripts/resources/sprites/link.png', 'scripts/resources/sprites/link.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    }
    create() {
      this.game.state.start("Main");
    }
}
