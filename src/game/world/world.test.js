import {world} from './world';
import engine from 'engine/engine';
import player from './player/player';

import {StageComponent} from 'aurelia-testing';


fdescribe('worldVM', () => {
    let _worldComponent; //canvas = document.createElement('canvas');
    beforeEach(() => {
        _worldComponent = StageComponent
            .withResources('src/my-component')
            .inView('<world engine.bind="engine"></world>')
            .boundTo({ engine: new engine() });
        //_worldVM.mainWorld = canvas;
    });
    afterEach(() => {
    _worldComponent .dispose();
  });

    it('can render the component', done => {
      _worldComponent.create()
     .then(() => {
       const canvasElement = document.querySelector('canvas');
       expect(canvasElement.width).not.toBe(300);
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
