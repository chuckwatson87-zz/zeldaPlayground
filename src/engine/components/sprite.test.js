import sprite from './sprite';
import {spriteAtlas} from '../../../test/unit/resources/images/sprites.js';

describe('sprite', () => {
    let canvas = document.createElement('canvas'),
        _sprite;

        beforeEach(() => {
            _sprite = sprite.create(canvas, 'base/test/unit/resources/images/sprites.png', spriteAtlas);

        });

        it('exists', () => {
          expect(_sprite).toBeDefined();
        });

        describe('addToWorld method', () => {
            beforeEach(() => {
                spyOn(_sprite, 'render');
            });
            it('should load image call render with the correct parameters', done => {
              _sprite.loadSprite(true, 10, 5, 'frame').then(() => {
                  expect(_sprite.image.src).toBe(window.location.origin + '/base/test/unit/resources/images/sprites.png');
                  expect(_sprite.render).toHaveBeenCalledWith(10, 5, 'frame');
                  done();
              });
            });

            it('should load image and not call render', done => {
              _sprite.loadSprite().then(() => {
                  expect(_sprite.image.src).toBe(window.location.origin + '/base/test/unit/resources/images/sprites.png');
                  expect(_sprite.render).not.toHaveBeenCalled();
                  done();
              });
            });
        });

        describe('render method', () => {
            beforeEach(done => {
              spyOn(_sprite.context, 'drawImage');

                _sprite.loadSprite().then(() => {
                    done();
                });
            });

            it('should call context.drawImage with correct parameters', () => {
                _sprite.render(10, 5, '02');
                expect(_sprite.context.drawImage).toHaveBeenCalledWith(_sprite.image, 32, 33, 15, 16, 10, 5, 15, 16);

            });

        });

        describe('addAnimations method', () => {
            beforeEach(() => {
              _sprite.addAnimations('animation_1', ['01', '02']);
              _sprite.addAnimations('animation_2', ['03', '04'], 55);
            });
            it('should add animations to sprite', () => {
                expect(_sprite.animations['animation_1'].frames).toEqual(['01', '02']);
                expect(_sprite.animations['animation_1'].fps).toBe(60);

                expect(_sprite.animations['animation_2'].frames).toEqual(['03', '04']);
                expect(_sprite.animations['animation_2'].fps).toBe(55);
            });

            describe('run method', () => {
                it('should set running to true', () => {
                  expect(_sprite.animations['animation_1'].running).toBe(false);
                  _sprite.animations['animation_1'].run();
                  expect(_sprite.animations['animation_1'].running).toBe(true);
                });

            });

            describe('stop method', () => {
                it('should set running to true', () => {
                  _sprite.animations['animation_1'].running = true
                  expect(_sprite.animations['animation_1'].running).toBe(true);
                  _sprite.animations['animation_1'].stop();
                  expect(_sprite.animations['animation_1'].running).toBe(false);
                });

            });
        });
});
