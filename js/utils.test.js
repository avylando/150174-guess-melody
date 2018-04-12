import {setEndings, setTimer} from '../js/utils.js';
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

describe(`Timer`, () => {
  it(`should return 99`, () => {
    const timer = setTimer(100);
    assert.equal(99, timer.tick());
  });

  it(`should return 'Time expired!'`, () => {
    const timer = setTimer(1);
    assert.equal(`Time expired!`, timer.tick());
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => setTimer(null), /Incorrect time value/);
    assert.throws(() => setTimer({}), /Incorrect time value/);
    assert.throws(() => setTimer(``), /Incorrect time value/);
  });

  it(`should not allow set negative value`, () => {
    assert.throws(() => setTimer(-1), /Incorrect time value/);
  });
});
