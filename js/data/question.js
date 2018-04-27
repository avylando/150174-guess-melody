class Question {
  constructor(data, gameState) {
    if (new.target === Question) {
      throw new Error(`Cannot create undefined question`);
    }

    this.type = data.type;
    this.title = data.question;
    this.answers = data.answers;
    this.content = null;
    this.game = gameState;
    this.time = this.game.timer;

    if (this.type === `artist`) {
      this.content = data.src;
    }

    if (this.type === `genre`) {
      this.content = data.genre;
    }
  }

  getAnswer() {
  }
}

export class ArtistQuestion extends Question {
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

export class GenreQuestion extends Question {
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
