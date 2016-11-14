import sprite from 'engine/components/sprites/sprite';

export default class engine{
  constructor(canvas = null) {
    this.context = canvas != null ? canvas.getContext('2d') : null;
    this.spritesCollection = [];
  }

  addContext(canvas) {
    this.context = canvas.getContext('2d');
  }

  addSprite(spriteName, imagePath, atlasPath) {
      let addedSprite = sprite.create(this.context, spriteName, imagePath, atlasPath);
      this.spritesCollection.push(addedSprite);
      return addedSprite;
  }
}
