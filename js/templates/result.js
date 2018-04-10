import {createElementFromTemplate, renderPage, getPlayerResume} from '../utils.js';
import {results, playerResult} from '../data.js';
import getStartPage from '../templates/welcome.js';

const template = `
<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  ${getPlayerResume(results, playerResult)}
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`;

export default () => {
  const content = createElementFromTemplate(template);
  const replayBtn = content.querySelector(`.main-replay`);

  replayBtn.addEventListener(`click`, () => {
    renderPage(getStartPage());
  });

  return content;
};
