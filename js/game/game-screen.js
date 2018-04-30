
import GameView from './game-view.js';
import HeaderView from './header-view.js';
import Application from '../app.js';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.question = this.model.getQuestion();
    this.header = new HeaderView(this.model.state);
    this.content = new GameView(this.question);

    this.root = document.createElement(`section`);
    this.root.className = `main main--level main--level-${this.question.type}`;
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this._interval = null;
  }

  get element() {
    return this.root;
  }

  startGame() {
    this._interval = setInterval(() => {
      this.timer = this.model.tick();

      if (!this.timer) {
        this.endGame();
      } else {
        this.updateHeader();
      }
    }, 1000);
  }

  endGame() {
    clearInterval(this._interval);
    Application.showResult(this.model);
  }

  restart() {
    this.model.restart();
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  changeContent() {
    this.updateHeader();
    this.question = this.model.getQuestion();
    const view = new GameView(this.question, this.model);
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
    this.bind();
    this.root.className = `main main--level main--level-${this.question.type}`;
  }

  bind() {
    this.content.onAnswer = (answer) => {
      this.model.saveAnswer(answer);

      if (!answer.correct) {
        this.model.onMistake();
      }

      if (this.model.mistakes === 3 || !this.model.isQuestionsRemained()) {
        this.endGame();
      } else {
        this.changeContent();
      }
    };
  }

  init() {
    this.startGame();
    this.bind();
  }
}
