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

export const setEndings = (number, variants) => {
  if (number === 1) {
    return variants[0];
  }

  if (number % 10 >= 5 || number % 10 === 0) {
    return variants[2];
  }

  return variants[1];
};

export const formatTime = (timer) => {
  if (typeof timer !== `number` || timer < 1) {
    throw new Error(`Incorrect time value`);
  }

  const minutes = Math.floor(timer / 60);

  if (minutes < 1) {
    return `За&nbsp;${timer}&nbsp;секунд`;
  }

  let seconds = `${timer - (minutes * 60)}`;

  if (seconds.length === 1) {
    seconds = 0 + seconds;
  }

  const time = {minutes, seconds};

  return time;
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
