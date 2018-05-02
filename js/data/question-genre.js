import Question from './question-abstract.js';

export default class GenreQuestion extends Question {
  constructor(data, gameState) {
    super(data, gameState);
    this.content = data.genre;
  }

  getAnswer(userAnswer) {
    const correct = userAnswer.every((it) => it.value === this.content);
    const time = this.time - this.game.timer;
    return {correct, time};
  }
}
