import {createElementFromTemplate} from '../utils.js';

const template = `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

<h2 class="title">Увы и ах!</h2>
<div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
<span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>`;

const page = createElementFromTemplate(template, `main--result`);

export default page;
