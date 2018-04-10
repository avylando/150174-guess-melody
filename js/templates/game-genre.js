import {createElementFromTemplate, renderPage} from '../utils.js';
import {Game} from '../data.js';
import getHeader from '../templates/header.js';
import getResultPage from '../templates/result.js';

const template = `
<section class="main main--level main--level-genre">
  ${getHeader(Game)}
  <div class="main-wrap">
    <h2 class="title">Выберите инди-рок треки</h2>
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
    </form>
  </div>
</section>`;

export default () => {
  const content = createElementFromTemplate(template);
  // const clone = page.cloneNode(true);

  const form = content.querySelector(`.genre`);
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
    renderPage(getResultPage());
  });

  return content;
};
