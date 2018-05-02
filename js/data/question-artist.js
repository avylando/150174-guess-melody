import Question from './question-abstract.js';

export default class ArtistQuestion extends Question {
  constructor(data, gameState) {
    super(data, gameState);
    this.content = data.src;
  }

  getAnswer(userAnswer) {
    const correct = this.answers.reduce((result, answer) => {
      return userAnswer === answer.title ? answer.isCorrect : result;
    }, false);

    const time = this.time - this.game.timer;
    return {correct, time};
  }
}
