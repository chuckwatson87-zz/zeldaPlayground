import Boot from './states/Boot';
import Preload from './states/Preload';
import Main from './states/Main';

export class game extends Phaser.Game {
    constructor() {
      super(500, 500, Phaser.AUTO, "game-container");
      //console.log(this);
      this.state.add('Boot', Boot, false);
      this.state.add('Preload', Preload, false);
      this.state.add('Main', Main, false);



      this.state.start('Boot');
      console.log('game loaded');
    }
}
