import {world} from 'game/world/world';
import engine from 'engine/engine';
import player from 'game/world/player/player';

import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';


xdescribe('worldVM', () => {
    let _worldComponent; //canvas = document.createElement('canvas');
    //engine: new engine()
    beforeEach(() => {
      define('text!game/world/world.css', ['module'], function(module) { module.exports = 'world {\n  flex: 1;\n  color: white; }\n  world canvas {\n    background-color: white; }\n'; });
        _worldComponent = StageComponent
            .withResources('game/world/world')
            .inView('<world engine.bind=\'engine\'></world>')
            .boundTo({ engine: new engine() });
        //_worldVM.mainWorld = canvas;
    });
    afterEach(() => {
    _worldComponent .dispose();
  });

  it('can render the component', done => {
    _worldComponent.create(bootstrap)
   .then(() => {
     const canvasElement = document.querySelector('canvas');
     expect(canvasElement.width).toBe(300);
    //expect(true).toBeTrue();
    //done();
   })
  .then(done);
});

    xdescribe('attached method', () => {
        beforeEach(() => {
          spyOn(_worldVM, 'initializePlayer');
        });

        it('should call init, and addSprite', () => {
            expect(_worldVM.engine).toBeNull();
            expect(_worldVM.engine).toBeNull();
            _worldVM.attached();
            expect(_worldVM.engine).not.toBeNull();
            expect(_worldVM.engine).not.toBeNull();
            expect(_worldVM.initializePlayer).toHaveBeenCalled();
        });
    });

    xdescribe('initializePlayer method', () => {
        let playerVM, engineVM;
        beforeEach(() => {
            engineVM = new engine(canvas);
            playerVM = new player(engineVM);
            spyOn(playerVM, 'init').and.returnValue(Promise.resolve(true));

        });
        it('should call init with correct paramter', done => {
            _worldVM.initializePlayer(playerVM).then(() => {
              expect(playerVM.init).toHaveBeenCalledWith('scripts/resources/sprites/link/sprites.png');
              done();
            })
        })

    });
});
