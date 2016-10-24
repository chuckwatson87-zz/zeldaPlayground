//import spriteAtlas from './sprites.js';


export default class player {
  constructor(game) {
    this.player;
    //this.init();
  }

  addSprite(canvas) {
    var link = new Image();
    link.src = 'sprites.png'
    //console.log(spriteAtlas);
    var linkSprite = this.sprite({
        context: canvas.getContext("2d"),
        width: 20,
        height: 20,
        image: link,
    });
  }

  addAnimations() {

  }

  updateMovement() {
  }

  sprite(options) {
      return {
        context: options.context,
        width: options.width,
        height: options.height,
        image: options.image
      }
  }

}
