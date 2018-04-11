import {createElementFromTemplate, renderPage} from '../utils.js';
import getStartPage from '../templates/welcome.js';

export default (Game) => {
  const template = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    ${Game.playerResume}
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;
  const content = createElementFromTemplate(template);
  const replayBtn = content.querySelector(`.main-replay`);

  replayBtn.addEventListener(`click`, () => {
    renderPage(getStartPage());
  });

  return content;
};
