import {createElementFromTemplate, renderPage} from '../utils.js';
import startGame from '../data/data-game.js';
import {getGamePage} from '../templates/game.js';

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
  const newGame = startGame();
  const content = createElementFromTemplate(template);
  const startBtn = content.querySelector(`.main-play`);

  startBtn.addEventListener(`click`, () => {
    renderPage(getGamePage(newGame));
  });

  return content;
};
