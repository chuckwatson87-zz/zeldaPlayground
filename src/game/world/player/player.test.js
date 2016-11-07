import player from './player';
import engine from 'engine/engine';

describe('playerVM', () => {
let canvas, _engine, _playerVM;

      beforeEach(() => {
          canvas = document.createElement('canvas');
          _engine = new engine(canvas);
          _playerVM = new player(_engine);
      });

      it('should exist', () => {
          expect(_playerVM).toBeDefined();
      });

      describe('init method', () => {
        beforeEach(() => {
            spyOn(_playerVM.engine, 'addSprite').and.callThrough();
            spyOn(_playerVM, 'loadSprite').and.returnValue(Promise.resolve(true));
        });
        it('should add sprite to collection, and load it', done => {
            _playerVM.init('base/test/unit/resources/images/sprites.png').then(() => {
                expect(_playerVM.engine.addSprite).toHaveBeenCalledWith('link', 'base/test/unit/resources/images/sprites.png', _playerVM.spriteAtlas);
                expect(_playerVM.loadSprite).toHaveBeenCalledWith(_playerVM.engine.spritesCollection[0]);
                done();
            });
        });
      });

      describe('loadSprite method', () => {
        let spriteArg = {
          loadSprite: () => {
            return Promise.resolve(true);
          }
        }
        beforeEach(() => {
          spyOn(spriteArg, 'loadSprite').and.callThrough();
        });
        it('should call loadSprite with correct parameters', () => {
            _playerVM.loadSprite(spriteArg).then(() => {
              expect(spriteArg.loadSprite).toHaveBeenCalledWith(true, 25, 25, 'link_02');
            });
        });

      });


});
