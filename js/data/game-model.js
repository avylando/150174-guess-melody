import {formatTime, setEndings} from '../utils.js';
import ArtistQuestion from '../data/question-artist.js';
import GenreQuestion from '../data/question-genre.js';

const INITIAL_STATE = {
  startTime: 300,
  timer: 300,
  questionsRemained: 10,
  answers: [],
  mistakes: 0,
  attempts: 3
};

export default class GameModel {
  constructor(data) {
    this.restart();
    this.questions = [...data];
    this.stats = [];
  }

  get state() {
    return this._state;
  }

  get timer() {
    return this._state.timer;
  }

  get mistakes() {
    return this._state.mistakes;
  }

  get attempts() {
    return this._state.attempts;
  }

  get playerResult() {
    const answers = this.state.answers;
    const averageAnswerTime = 30;
    let points = 0;
    let fast = 0;

    answers.forEach((answer) => {
      if (answer.correct) {
        points++;
        if (answer.time < averageAnswerTime) {
          points++;
          fast++;
        }

      } else {
        points -= 2;
      }

    });

    const result = {
      points,
      restNotes: this.state.questionsRemained,
      time: this.state.timer,
      mistakes: this.state.mistakes,
      fast
    };

    return result;
  }

  get playerResume() {
    const result = this.playerResult;
    const stats = this.stats;

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
    const expiredTime = this.state.startTime - result.time;
    const time = formatTime(expiredTime);

    return `
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${time.minutes}&nbsp;${setEndings(time.minutes, [`минуту`, `минуты`, `минут`])} и ${time.seconds}&nbsp;${setEndings(time.seconds, [`секунду`, `секунды`, `секунд`])}
      <br>вы&nbsp;набрали ${result.points} ${setEndings(result.points, [`балл`, `балла`, `баллов`])} (${result.fast} быстрых),
      <br>совершив ${result.mistakes} ${setEndings(result.mistakes, [`ошибку`, `ошибки`, `ошибок`])}</div>
      <span class="main-comparison">Вы заняли ${place}-ое место из ${stats.length} игроков. Это лучше, чем у ${statPercent}% игроков</span>
    </div>`;
  }

  restart() {
    this._state = Object.assign({}, INITIAL_STATE);
  }

  isQuestionsRemained() {
    return this.state.questionsRemained > 0 && this.questions.length > 0;
  }

  getQuestion() {
    if (this.isQuestionsRemained()) {
      const question = this.questions.pop();
      this._state.questionsRemained--;
      switch (question.type) {
        case `artist`: return new ArtistQuestion(question, this.state);
        case `genre`: return new GenreQuestion(question, this.state);
        default: throw new Error(`Unknown question type: ${question.type}`);
      }
    }

    return false;
  }

  saveAnswer(answer) {
    this._state.answers.push(answer);
  }

  tick() {
    if (this.timer === 0) {
      return false;
    }

    return this._state.timer--;
  }

  onMistake() {
    this._state.mistakes++;
  }

  isCompleted() {
    return !this.isQuestionsRemained() && this.mistakes < this.attempts && this.timer > 0;
  }

  setStats(results) {
    this.stats = results;
  }
}
