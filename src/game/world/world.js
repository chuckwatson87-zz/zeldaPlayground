import player from './player/player'

export class world {
    constructor() {
      console.log('world loaded');
    }


    attached() {
      let p = new player(this.mainWorld);
      p.init();
      //p.addSprite(this.mainWorld);
    }
}
