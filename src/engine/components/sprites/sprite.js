let sprite = {
  create(context, name, imagePath, atlas) {
      let s = {
        context: context,
        name: name,
        imagePath: imagePath,
        atlas: atlas
      };
      s.animations = {};

      s.loadSprite = (renderOnLoad, x, y, renderFrame) => {
        return new Promise((resolve, reject) => {
          s.image = new Image();
          s.image.src = s.imagePath;
          let render = renderOnLoad ? renderOnLoad : false;
          s.image.onload = () =>  {
            //let frame = startingFrame ? startingFrame : null;
            if (render) {
                s.render(x, y, renderFrame);
            }
            resolve(true)
          }
          s.image.onerror = () => {
            reject("Error loadingImage")
          }
        });

      }

      s.render = (x, y, frameName) => {
        let frame = frameName ? s.atlas.frames[frameName].frame :  s.atlas.frames[Object.keys(s.atlas.frames)[0]].frame;
        s.context.drawImage(s.image, frame.x, frame.y, frame.w, frame.h, x, y, frame.w, frame.h);
      }

      s.addAnimations = (animationName, frames, defaultFps) => {
          s.animations[animationName] = {
            frames: frames,
            fps: defaultFps ? defaultFps : 60,
            running: false
          }

          let currentAnimation = s.animations[animationName];
          currentAnimation.run = () => {
            currentAnimation.running = true;
          }

          currentAnimation.stop = () => {
            currentAnimation.running = false;
          }
      }

      return s;
  }
}


export default sprite;
