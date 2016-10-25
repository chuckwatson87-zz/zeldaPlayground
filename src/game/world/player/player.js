import {spriteAtlas} from './sprites';


export default class player {
  constructor(game) {
    this.player;
    //this.init();
  }

  addSprite(canvas) {
    let link = new Image();
    link.src = 'scripts/resources/sprites/link/sprites.png'
    console.log(spriteAtlas);
    let linkSprite = this.sprite({
        context: canvas.getContext("2d"),
        atlas: spriteAtlas,
        image: link,
    });

    linkSprite.render('link_01');

  }

  addAnimations() {

  }

  updateMovement() {
  }

  sprite(options) {
      let s = {
        context: options.context,
        atlas: options.atlas,
        image: options.image
      }

      s.render = (frameName) => {
        let frame = s.atlas.frames[frameName];
        s.context.drawImage(s.image, frame.x, frame.y, frame.w, frame.h, 0, 0, frame.w, frame.h);
      }

      return s;
  }

}
