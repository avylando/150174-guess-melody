
import GameView from '../view/game-view.js';
import HeaderView from '../view/header-view.js';
// import {renderPage} from '../utils.js';
// import getResultPage from '../templates/result-screen.js';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.question = this.model.getQuestion();
    this.header = new HeaderView(this.model.state);
    this.content = new GameView(this.question, this.model);
    this.content.screenHandler = this.onAnswer;

    this.root = document.createElement(`section`);
    this.root.className = `main main--level main--level-${this.question.type}`;
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this._interval = null;
  }

  get element() {
    return this.root;
  }

  init() {
    this._interval = setInterval(() => {
      this.model.tick();
      this.updateHeader();
    }, 1000);
  }

  stopGame() {
    clearInterval(this._interval);
  }

  restart() {
    this.model.restart();
  }

  changeContent(view, type) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
    this.root.className = `main main--level main--level-${type}`;
  }

  onAnswer(answer) {
    this.model.saveAnswer(answer);

    if (!answer.correct) {
      this.model.onMistake();

      if (this.model.mistakes === 3) {
        return false;
      }
    }

    if (this.model.isQuestionsRemained()) {
      return this.changeScreen();
    }

    return false;
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  changeScreen() {
    this.updateHeader();
    this.question = this.model.getQuestion();
    const view = new GameView(this.question, this.model);

    this.changeContent(view, this.question.type);
  }
}
