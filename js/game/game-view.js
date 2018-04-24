import AbstractView from '../abstract-view.js';

export default class GameView extends AbstractView {
  constructor(question) {
    super();
    this.data = question;
  }

  get template() {
    switch (this.data.type) {
      case `artist`:
        return `
        <div class="main-wrap">
        <h2 class="title main-title">${this.data.title}</h2>
          <div class="player-wrapper">
            <div class="player">
              <audio src="${this.data.content}" autoplay></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <form class="main-list">
            ${this.data.answers.map((answer, index) =>
    `<div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${answer.title}"/>
      <label class="main-answer" for="answer-${index}">
      <img class="main-answer-preview" src="${answer.image.url}" alt="${answer.title}" width="${answer.image.width}" height="${answer.image.height}">
      ${answer.title}</label>
    </div>`).join(``)}
          </form>
        </div>`;

      case `genre`:
        return `
        <div class="main-wrap">
        <h2 class="title main-title">${this.data.title}</h2>
          <form class="genre">
              ${this.data.answers.map((answer, index) =>
    `<div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio src="${answer.src}" id="track-${index}"></audio>
          <button class="player-control" data-target="track-${index}"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="${answer.genre}" id="a-${index}">
      <label class="genre-answer-check" for="a-${index}"></label>
    </div>`).join(``)};

            <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
        </div>`;

      default:
        throw new Error(`Unknown data type: ${this.data.type}`);
    }
  }

  bind() {
    switch (this.data.type) {
      case `artist`:
        const track = this.element.querySelector(`audio`);
        const control = this.element.querySelector(`.player-control`);

        control.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          control.classList.toggle(`player-control--pause`);

          if (control.classList.contains(`player-control--pause`)) {
            track.play();
          } else {
            track.pause();
          }
        });

        const answerBtns = Array.from(this.element.querySelectorAll(`.main-answer-r`));

        answerBtns.forEach((btn) => {
          btn.addEventListener(`change`, (evt) => {
            evt.preventDefault();
            const answer = this.data.getAnswer(btn.value);
            this.onAnswer(answer);
          });
        });

        break;

      case `genre`:
        const controls = this.element.querySelectorAll(`.player-control`);

        controls.forEach((ctrl) => {
          ctrl.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            ctrl.classList.toggle(`player-control--pause`);
            let audio = this.element.querySelector(`#${ctrl.dataset.target}`);

            if (ctrl.classList.contains(`player-control--pause`)) {
              audio.play();
            } else {
              audio.pause();
            }
          });
        });

        const form = this.element.querySelector(`.genre`);
        const checkboxes = Array.from(form.querySelectorAll(`input[type='checkbox']`));
        const formBtn = form.querySelector(`.genre-answer-send`);

        formBtn.setAttribute(`disabled`, `disabled`);

        const checkActive = () => {
          return checkboxes.some((checkbox) => {
            return checkbox.checked;
          });
        };

        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
          checkbox.addEventListener(`change`, () => {
            const active = checkActive();

            if (checkbox.checked) {
              formBtn.removeAttribute(`disabled`);
            } else if (!active) {
              formBtn.setAttribute(`disabled`, `disabled`);
            }
          });
        });

        form.addEventListener(`submit`, (evt) => {
          evt.preventDefault();
          const userOptions = Array.from(form.querySelectorAll(`input[type='checkbox']:checked`));
          const answer = this.data.getAnswer(userOptions);
          this.onAnswer(answer);
        });

        break;

      default:
        throw new Error(`Unknown data type: ${this.data.type}`);
    }
  }

  onAnswer() {

  }
}
