import {createElementFromTemplate, renderPage} from '../utils.js';
import getHeader from '../templates/header.js';
import getResultPage from '../templates/result.js';

export const getGamePage = (Game) => {
  const header = getHeader(Game);
  const question = Game.generateQuestion();
  Game.questions--;

  let content = ``;
  if (Game.type === `artist`) {
    content = `
    <div class="player-wrapper">
      <div class="player">
        <audio src="${question.content.src}" data-name="${question.content.name}"></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">
      ${question.answers.map((answer, index) =>
    `<div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${answer.name}"/>
      <label class="main-answer" for="answer-${index}">
      <img class="main-answer-preview" src="${answer.image}" alt="${answer.artist}" width="134" height="134">
      ${answer.artist}</label>
    </div>`).join(``)}
    </form>`;
  }

  if (Game.type === `genre`) {
    content = `
    <form class="genre">
      ${question.answers.map((answer, index) =>
    `<div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio src="${answer.src}" data-name="${answer.name}"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="${answer.genre}" id="a-${index}">
      <label class="genre-answer-check" for="a-${index}"></label>
    </div>`).join(``)};

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>`;
  }

  const template = `
  <section class="main main--level main--level-${Game.type}">
    ${header}
    <div class="main-wrap">
      <h2 class="title main-title">${question.title}</h2>
      ${content}
    </div>
  </section>`;

  const page = createElementFromTemplate(template);

  const answerHandler = (answer) => {
    Game.answers.push(answer);

    if (!answer.correct) {
      Game.mistakes++;

      if (Game.mistakes === 3) {
        renderPage(getResultPage(Game));
        return;
      }
    }

    if (Game.questions > 0) {
      Game.changeType();
      renderPage(getGamePage(Game));

    } else {
      renderPage(getResultPage(Game));
    }
  };

  if (Game.type === `artist`) {
    const answerBtns = Array.from(page.querySelectorAll(`.main-answer-r`));

    answerBtns.forEach((btn) => {
      btn.addEventListener(`change`, () => {
        const userAnswer = question.generateAnswer(btn.value);
        answerHandler(userAnswer);
      });
    });
  }

  if (Game.type === `genre`) {
    const form = page.querySelector(`.genre`);
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
      const userAnswer = question.generateAnswer(userOptions);
      answerHandler(userAnswer);
    });
  }

  return page;
};
