import musicData from '../data/data-melodies.js';
import {formatTime, setEndings} from '../utils.js';

const gameTypes = [`artist`, `genre`];
const genres = [...new Set(musicData.map((it) => it.genre))];
// const playerResult = {points: 12, restNotes: 0, timer: 100, mistakes: 0, fast: 2};

const results = [
  {points: 16, restNotes: 0, timer: 10, mistakes: 0, fast: 6},
  {points: 15, restNotes: 0, timer: 84, mistakes: 0, fast: 5},
  {points: 10, restNotes: 0, timer: 160, mistakes: 1, fast: 0},
  {points: 10, restNotes: 0, timer: 19, mistakes: 0, fast: 0}
];

class Game {
  constructor() {
    this.type = gameTypes[Math.floor(Math.random() * gameTypes.length)];
    this.startTime = 300;
    this.timer = 100;
    this.questions = 10;
    this.answers = [];
    this.mistakes = 0;
    this.results = results;
  }

  changeType() {
    this.type = gameTypes[Math.floor(Math.random() * gameTypes.length)];
  }

  generateQuestion() {
    return new Question(this.type);
  }

  generateAnswer(value) {
    return new Answer(value);
  }

  get playerResult() {
    const answers = this.answers;
    let points = 0;
    let fast = 0;

    answers.forEach((answer) => {
      if (answer.correct) {
        points++;
        if (answer.time < 30) {
          points++;
          fast++;
        }

      } else {
        points -= 2;
      }

    });

    const result = {
      points,
      restNotes: this.questions,
      timer: this.timer,
      mistakes: this.mistakes,
      fast
    };

    return result;
  }

  get playerResume() {
    const result = this.playerResult;
    const stats = this.results;

    if (result.restNotes > 0) {
      if (result.timer > 0) {
        return `
        <h2 class="title">Какая жалость!</h2>
        <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>`;
      }

      return `
      <h2 class="title">Увы и ах!</h2>
      <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>`;
    }

    stats.push(result);
    stats.sort((res1, res2) => {
      if (res1.points === res2.points) {
        return res2.timer - res1.timer;
      }

      return res2.points - res1.points;
    });

    const place = stats.indexOf(result) + 1;
    const statPercent = Math.floor(((stats.length - place) / stats.length) * 100);
    const expiredTime = this.startTime - result.timer;
    const time = formatTime(expiredTime);

    return `
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${time.minutes}&nbsp;${setEndings(time.minutes, [`минуту`, `минуты`, `минут`])} и ${time.seconds}&nbsp;${setEndings(time.seconds, [`секунду`, `секунды`, `секунд`])}
      <br>вы&nbsp;набрали ${result.points} баллов (${result.fast} быстрых)
      <br>совершив ${result.mistakes} ${setEndings(result.mistakes, [`ошибку`, `ошибки`, `ошибок`])}</div>
      <span class="main-comparison">Вы заняли ${place}-ое место из ${stats.length} игроков. Это лучше, чем у ${statPercent}% игроков</span>
    </div>`;
  }
}

class Question {
  constructor(gameType) {
    this.library = musicData.sort(() => {
      return Math.random() - 0.5;
    });

    if (gameType === `artist`) {
      this.title = `Кто исполняет эту песню?`;
      this.content = this.library[2];
      this.answers = this.library.slice(0, 3);
    }

    if (gameType === `genre`) {
      this.genre = genres[Math.floor(Math.random() * genres.length)];
      this.title = `Выберите ${this.genre} треки`;
      this.content = this.library.slice(1, 3);
      this.answers = this.library.slice(0, 4);
    }
  }
}

class Answer {
  constructor(value) {
    this.correct = value;
    this.time = 30;
  }
}

export default () => {
  return new Game();
};
