import engine from './engine';
import sprite from 'engine/components/sprites/sprite';
import {spriteAtlas} from '../../test/unit/resources/images/sprites.js';

describe('engineVM', () => {
  let canvas = document.createElement('canvas'),
      _engineVM
    beforeEach(() => {
      _engineVM = new Engine(canvas);
    });
    it('exists', () => {
        expect(_engineVM).toBeDefined();
    });
});
