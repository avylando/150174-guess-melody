import {createElementFromTemplate, renderPage} from '../utils.js';
import getArtistPage from '../templates/game-artist.js';

const template = `
<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
    Ошибиться можно 3 раза.<br>
    Удачи!
  </p>
</section>`;


export default () => {
  const content = createElementFromTemplate(template);
  // const content = page.cloneNode(true);
  const startBtn = content.querySelector(`.main-play`);

  startBtn.addEventListener(`click`, () => {
    renderPage(getArtistPage());
  });

  return content;
};
