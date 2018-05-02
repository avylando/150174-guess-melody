export default class Question {
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
