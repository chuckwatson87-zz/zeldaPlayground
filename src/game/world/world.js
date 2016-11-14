import player from './player/player';
import engine from 'engine/engine';


export class world {
    //@bindable engine
    bind() {

    }

    attached() {
      // this.engine = new engine(this.mainWorld);
      // this.player = new player(this.engine);
      // this.initializePlayer(this.player);
    }

    initializePlayer(player) {
      return player.init('scripts/resources/sprites/link/sprites.png');
    }
}
