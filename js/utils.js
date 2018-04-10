export const createElementFromTemplate = (template) => {
  const element = document.createElement(`template`);
  element.innerHTML = template;
  return element.content;
};

export const renderPage = (page) => {
  const app = document.querySelector(`.app`);
  const prevPage = app.querySelector(`.main`);

  if (prevPage) {
    prevPage.remove();
  }

  app.appendChild(page);
};

export const countPlayerPoints = (answers, restNotes) => {
  let playerPoints = 0;

  if (restNotes > 0) {
    return -1;
  }

  answers.forEach((answer) => {
    if (answer.correct) {
      playerPoints += answer.time < 30 ? 2 : 1;
    } else {
      playerPoints -= 2;
    }
  });

  return playerPoints;
};

export const setEndings = (number, variants) => {
  if (number === 1) {
    return variants[0];
  }

  if (number % 10 >= 5 || number % 10 === 0) {
    return variants[2];
  }

  return variants[1];
};

export const formatTime = (seconds) => {
  if (typeof seconds !== `number` || seconds < 1) {
    throw new Error(`Incorrect time value`);
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 1) {
    return `За&nbsp;${seconds}&nbsp;секунд`;
  }

  const restSeconds = seconds - (minutes * 60);
  return `За&nbsp;${minutes}&nbsp;${setEndings(minutes, [`минуту`, `минуты`, `минут`])} и ${restSeconds}&nbsp;${setEndings(restSeconds, [`секунду`, `секунды`, `секунд`])}`;
};


export const getPlayerResume = (results, playerResult) => {
  if (playerResult.restNotes > 0) {
    if (playerResult.timer > 0) {
      return `
      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>`;
    }

    return `
    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>`;
  }

  results.push(playerResult);
  results.sort((res1, res2) => {
    if (res1.points === res2.points) {
      return 1;
    }
    return res2.points - res1.points;
  });

  const place = results.indexOf(playerResult) + 1;
  const statPercent = Math.floor(((results.length - place) / results.length) * 100);

  return `
  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">${formatTime(playerResult.timer)}
    <br>вы&nbsp;набрали ${playerResult.points} баллов (${playerResult.fast} быстрых)
    <br>совершив ${playerResult.mistakes} ${setEndings(playerResult.mistakes, [`ошибку`, `ошибки`, `ошибок`])}</div>
    <span class="main-comparison">Вы заняли ${place}-ое место из ${results.length} игроков. Это лучше, чем у ${statPercent}% игроков</span>
  </div>`;
};


export const setTimer = (seconds) => {
  if (typeof seconds !== `number` || seconds < 1) {
    throw new Error(`Incorrect time value`);
  }

  class Timer {
    constructor() {
      this.time = seconds;
    }

    tick() {
      this.time--;

      if (this.time === 0) {
        return `Time expired!`;
      }

      return this.time;
    }
  }

  return new Timer();
};
