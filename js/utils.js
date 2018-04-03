export const createElementFromTemplate = (template) => {
  const parser = new DOMParser();
  const content = parser.parseFromString(template, `text/html`);
  return content.body.firstElementChild;
};

export const renderPage = (page) => {
  const app = document.querySelector(`.app`);
  const prevPage = app.querySelector(`.main`);

  if (prevPage) {
    prevPage.remove();
  }

  const currentDisplay = page;
  app.insertAdjacentElement(`afterBegin`, currentDisplay);
};

export const countPlayerPoints = (answers, restNotes) => {
  let playerPoints = 0;

  if (restNotes > 0) {
    return -1;
  }

  answers.forEach((answer) => {
    if (answer.correct) {
      if (answer.time < 30) {
        playerPoints += 2;
      } else {
        playerPoints++;
      }
    } else {
      playerPoints -= 2;
    }
  });

  return playerPoints;
};

export const getPlayerResume = (results, playerResult) => {
  if (playerResult.restNotes > 0) {
    if (playerResult.timer > 0) {
      return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
    }

    return `Время вышло! Вы не успели отгадать все мелодии`;
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

  return `Вы заняли ${place}-ое место из ${results.length} игроков. Это лучше, чем у ${statPercent}% игроков`;
};

export const setTimer = (secondsNumber) => {
  if (typeof secondsNumber !== `number` || secondsNumber < 1) {
    throw new Error(`Incorrect time value`);
  }

  const Timer = function () {
    this.time = secondsNumber;
  };

  Timer.prototype.tick = function () {
    this.time--;

    if (this.time === 0) {
      return `Time expired!`;
    }

    return this.time;
  };

  return new Timer();
};

export const setEndings = (number, variants) => {
  if (number === 1) {
    return variants[0];
  }

  if (number === 0 || number % 10 >= 5) {
    return variants[2];
  }

  return variants[1];
};
