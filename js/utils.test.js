import {countPlayerPoints, getPlayerResume, setEndings, setTimer} from '../js/utils.js';
import {assert} from 'chai';


describe(`Points Counter`, () => {
  const testArray = [
    {correct: true, time: 48},
    {correct: true, time: 68},
    {correct: true, time: 87},
    {correct: true, time: 120},
    {correct: true, time: 32},
    {correct: true, time: 70},
    {correct: true, time: 61},
    {correct: true, time: 48},
    {correct: true, time: 35},
    {correct: true, time: 185}
  ];

  it(`should return -1 when the rest notes > 0`, () => {
    assert.equal(-1, countPlayerPoints(testArray, 1));
  });

  it(`should return 10 when the all answers is correct and all answer times > 30`, () => {
    assert.equal(10, countPlayerPoints(testArray, 0));
  });

  it(`should return 7 when the one answer is incorrect and all answer times > 30`, () => {
    testArray[0].correct = false;
    assert.equal(7, countPlayerPoints(testArray, 0));
  });

  it(`should return 8 when the one answer is incorrect and one answer time < 30`, () => {
    testArray[1].time = 20;
    assert.equal(8, countPlayerPoints(testArray, 0));
  });

  it(`should return 10 when the one answer is incorrect and three answers time < 30`, () => {
    testArray[2].time = 20;
    testArray[3].time = 20;
    assert.equal(10, countPlayerPoints(testArray, 0));
  });

  it(`should return 16 when the one answer is incorrect and the rest answers times < 30`, () => {
    testArray.map((el) => {
      el.time = 20;
    });
    assert.equal(16, countPlayerPoints(testArray, 0));
  });

  it(`should return 12 when the two answers is incorrect and the rest answers times < 30`, () => {
    testArray[1].correct = false;
    assert.equal(12, countPlayerPoints(testArray, 0));
  });
});


describe(`Player Result`, () => {
  const results = [
    {points: 16, restNotes: 0, timer: 10},
    {points: 10, restNotes: 0, timer: 84},
    {points: 7, restNotes: 0, timer: 160},
    {points: 6, restNotes: 0, timer: 19}
  ];

  it(`should return expired attempts message when the rest notes > 0 and timer > 0`, () => {
    const playerResult = {points: 7, restNotes: 2, timer: 100};
    assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, getPlayerResume(results, playerResult));
  });

  it(`should return expired time message when the timer = 0 and rest notes > 0`, () => {
    const playerResult = {points: 7, restNotes: 2, timer: 0};
    assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, getPlayerResume(results, playerResult));
  });

  it(`should return success message when the rest notes = 0`, () => {
    const playerResult = {points: 12, restNotes: 0, timer: 85};
    assert.equal(`Вы заняли 2-ое место из 5 игроков. Это лучше, чем у 60% игроков`, getPlayerResume(results, playerResult));
  });

  it(`should return success message when the rest notes = 0 and points are equal`, () => {
    const playerResult = {points: 16, restNotes: 0, timer: 85};
    assert.equal(`Вы заняли 1-ое место из 6 игроков. Это лучше, чем у 83% игроков`, getPlayerResume(results, playerResult));
  });
});

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
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => setTimer({}), /Incorrect time value/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => setTimer(``), /Incorrect time value/);
  });

  it(`should not allow set negative value`, () => {
    assert.throws(() => setTimer(-1), /Incorrect time value/);
  });

  it(`should not allow set 0`, () => {
    assert.throws(() => setTimer(0), /Incorrect time value/);
  });
});
