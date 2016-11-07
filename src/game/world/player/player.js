import {spriteAtlas} from './sprites';
import sprite from 'engine/components/sprites/sprite';


export default class player {
  constructor(engine) {
    this.engine = engine;
    this.spriteAtlas = spriteAtlas;
  }

  init(spritePath) {
    let sprite = this.engine.addSprite('link', spritePath, this.spriteAtlas);
    return this.loadSprite(sprite);
  }

  loadSprite(sprite) {
    return sprite.loadSprite(true, 25, 25, 'link_05');
  }

}
