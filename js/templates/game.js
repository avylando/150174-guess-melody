import {createElementFromTemplate, renderPage} from '../utils.js';
import getHeader from '../templates/header.js';
import getResultPage from '../templates/result.js';

export const getGamePage = (Game) => {
  const header = getHeader(Game);
  let content = ``;
  const question = Game.generateQuestion();
  Game.questions--;

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
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

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

  const answerHandler = (isCorrect) => {
    const answer = Game.generateAnswer(isCorrect);
    Game.answers.push(answer);

    if (!isCorrect) {
      Game.mistakes++;

      if (Game.mistakes === 3) {
        renderPage(getResultPage(Game));
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
        let isCorrect = true;

        if (btn.value !== question.content.name) {
          isCorrect = false;
        }

        answerHandler(isCorrect);
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

      if (Game.questions > 0) {
        Game.changeType();
        renderPage(getGamePage(Game));

      } else {
        renderPage(getResultPage(Game));
      }
    });
  }

  console.log(Game);
  // console.log(Game.playerResult);

  return page;
};
