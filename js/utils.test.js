import {setEndings} from '../js/utils.js';
import {assert} from 'chai';

describe(`Set endings`, () => {
  it(`should return 'яблоко'`, () => {
    assert.equal(`яблоко`, setEndings(1, [`яблоко`, `яблока`, `яблок`]));
  });

  it(`should return 'яблока'`, () => {
    assert.equal(`яблока`, setEndings(4, [`яблоко`, `яблока`, `яблок`]));
  });

  it(`should return 'яблок'`, () => {
    assert.equal(`яблок`, setEndings(15, [`яблоко`, `яблока`, `яблок`]));
  });
});
