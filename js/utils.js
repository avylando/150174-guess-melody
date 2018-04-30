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
  if (typeof timer !== `number`) {
    throw new Error(`Incorrect time value`);
  }

  const minutes = Math.floor(timer / 60);
  let seconds = `${timer - (minutes * 60)}`;

  if (seconds.length === 1) {
    seconds = 0 + seconds;
  }

  const time = {minutes, seconds};

  return time;
};

export const createNotice = () => {
  const element = document.createElement(`div`);
  element.style = `width: 200px; height: 50px; color: red; position: absolute; top:50px; left: 50px;`;
  return element;
};
