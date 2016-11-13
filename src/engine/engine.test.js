import engine from 'engine/engine';
import sprite from 'engine/components/sprites/sprite';

describe('engineVM', () => {
  let canvas = document.createElement('canvas'),
      _engineVM
    beforeEach(() => {
      _engineVM = new engine(canvas);
    });
    it('exists', () => {
        expect(_engineVM).toBeDefined();
    });

    describe('addSprites method', () => {
        beforeEach(() => {
          spyOn(sprite, 'create').and.callThrough();
        })

        it('should call sprite.create with correct parameters and add to collection', () => {
            _engineVM.addSprite('sprite_01', 'my/img/path', 'my/atlas/path');
            _engineVM.addSprite('sprite_02', 'my/img/path_2', 'my/atlas/path_2');
            expect(sprite.create.calls.argsFor(0)).toEqual([_engineVM.context, 'sprite_01', 'my/img/path', 'my/atlas/path']);
            expect(sprite.create.calls.argsFor(1)).toEqual([_engineVM.context, 'sprite_02', 'my/img/path_2', 'my/atlas/path_2']);
            expect(_engineVM.spritesCollection[0].name).toBe('sprite_01');
            expect(_engineVM.spritesCollection[1].name).toBe('sprite_02');
        });
    });

});
