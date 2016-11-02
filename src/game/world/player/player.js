import {spriteAtlas} from './sprites';
import sprite from 'engine/components/sprites/sprite';


export default class player {
  constructor(canvas) {
    this.canvas = canvas;
  }

  init() {
    let spritePath = 'scripts/resources/sprites/link/sprites.png'
    let player = sprite.create(this.canvas, spritePath, spriteAtlas);
    player.loadSprite(true, 25, 25, 'link_02');
  }

}
