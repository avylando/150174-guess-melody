import musicData from '../data/data-melodies.js';
import {formatTime, setEndings} from '../utils.js';

const gameTypes = [`artist`, `genre`];
// const genres = [...new Set(musicData.map((it) => it.genre))];

const results = [
  {points: 16, restNotes: 0, time: 10, mistakes: 0, fast: 6},
  {points: 15, restNotes: 0, time: 84, mistakes: 0, fast: 5},
  {points: 10, restNotes: 0, time: 160, mistakes: 1, fast: 0},
  {points: 10, restNotes: 0, time: 19, mistakes: 0, fast: 0}
];

class Game {
  constructor() {
    this.type = gameTypes[Math.floor(Math.random() * gameTypes.length)];
    this.startTime = 300;
    this.timer = 200;
    this.questions = 10;
    this.answers = [];
    this.mistakes = 0;
    this.results = results;
  }

  changeType() {
    this.type = gameTypes[Math.floor(Math.random() * gameTypes.length)];
  }

  generateQuestion() {
    this.questions--;
    return new Question(this);
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
      time: this.timer,
      mistakes: this.mistakes,
      fast
    };

    return result;
  }

  get playerResume() {
    const result = this.playerResult;
    const stats = this.results;

    if (result.restNotes > 0) {
      if (result.time > 0) {
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
        return res2.time - res1.time;
      }

      return res2.points - res1.points;
    });

    const place = stats.indexOf(result) + 1;
    const statPercent = Math.floor(((stats.length - place) / stats.length) * 100);
    const expiredTime = this.startTime - result.time;
    const time = formatTime(expiredTime);

    return `
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${time.minutes}&nbsp;${setEndings(time.minutes, [`минуту`, `минуты`, `минут`])} и ${time.seconds}&nbsp;${setEndings(time.seconds, [`секунду`, `секунды`, `секунд`])}
      <br>вы&nbsp;набрали ${result.points} ${setEndings(result.points, [`балл`, `балла`, `баллов`])} (${result.fast} быстрых),
      <br>совершив ${result.mistakes} ${setEndings(result.mistakes, [`ошибку`, `ошибки`, `ошибок`])}</div>
      <span class="main-comparison">Вы заняли ${place}-ое место из ${stats.length} игроков. Это лучше, чем у ${statPercent}% игроков</span>
    </div>`;
  }
}

class Question {
  constructor(game) {
    this.type = game.type;
    this.library = musicData.sort(() => {
      return Math.random() - 0.5;
    });

    if (this.type === `artist`) {
      this.title = `Кто исполняет эту песню?`;
      this.content = this.library[2];
      this.answers = this.library.slice(0, 3);
    }

    if (this.type === `genre`) {
      this.answers = this.library.slice(0, 4);
      this.genre = this.answers[Math.floor(Math.random() * this.answers.length)].genre;
      this.title = `Выберите ${this.genre} треки`;
    }
  }

  generateAnswer(userAnswer) {
    return new Answer(userAnswer, this);
  }
}

class Answer {
  constructor(userAnswer, question) {
    this.time = 30;
    if (question.type === `artist`) {
      this.correct = userAnswer === question.content.name ? true : false;
    }

    if (question.type === `genre`) {
      this.correct = userAnswer.every((it) => it.value === question.genre);
    }
  }
}

export default () => {
  return new Game();
};
