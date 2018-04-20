import AbstractView from '../view/abstract-view.js';
import Application from '../app.js';

export default class ResultView extends AbstractView {
  constructor(game) {
    super();
    this.data = game;
  }

  get template() {
    return `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      ${this.data.playerResume}
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
  }

  bind() {
    const replayBtn = this.element.querySelector(`.main-replay`);

    replayBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      Application.showWelcome();
    });
  }
}
