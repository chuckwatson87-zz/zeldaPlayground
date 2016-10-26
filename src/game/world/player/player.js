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

    link.onload = () =>  {
      let linkSprite = this.sprite({
          context: canvas.getContext("2d"),
          atlas: spriteAtlas,
          image: link,
      });
      linkSprite.render('link_01');
    }
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
      };


      s.render = (frameName) => {
        let frame = s.atlas.frames[frameName].frame;
        s.context.drawImage(s.image, frame.x, frame.y, frame.w, frame.h, 50, 50, frame.w, frame.h);
      }

      // s.addAnimation = (name, frames, ticksPerFrame) => {
      //         this.tickCount += 1;
      //
      //         if (tickCount > ticksPerFrame) {
      //             tickCount = 0;
      //             // If the current frame index is in range
      //             if (this.frameIndex < frames.length - 1) {
      //                 // Go to the next frame
      //                 s.render(frames[this.frameIndex]);
      //             }
      //             else {
      //               this.frameIndex = 0;
      //             }
      //         }
      // }

      return s;
  }

}
