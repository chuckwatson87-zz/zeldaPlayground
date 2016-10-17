export default class Boot extends Phaser.State {

	create() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.state.start("Preload");
	}

}
