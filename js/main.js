const template = document.querySelector(`#templates`).content;
const welcomeDisplay = template.querySelector(`.main--welcome`);
const artistDisplay = template.querySelector(`.main--level-artist`);
const genreDisplay = template.querySelector(`.main--level-genre`);
const resultDisplays = template.querySelectorAll(`.main--result`);

const displays = [welcomeDisplay, artistDisplay, genreDisplay];

resultDisplays.forEach((el) => displays.push(el));

const app = document.querySelector(`.app`);

let displayIndex = 0;
const MIN_DISPLAY = 0;
const maxDisplay = displays.length - 1;

const Keycode = {
  leftArr: 37,
  rightArr: 39
};

const renderDisplay = (index) => {
  const prevDisplay = app.querySelector(`.main`);

  if (prevDisplay) {
    prevDisplay.remove();
  }

  const currentDisplay = displays[index];
  app.insertAdjacentElement(`afterBegin`, currentDisplay);
};

const documentKeydownHandler = (evt) => {
  if (evt.altKey && evt.keyCode === Keycode.leftArr && displayIndex > MIN_DISPLAY) {
    displayIndex--;
  }

  if (evt.altKey && evt.keyCode === Keycode.rightArr && displayIndex < maxDisplay) {
    displayIndex++;
  }

  renderDisplay(displayIndex);
};

document.addEventListener(`keydown`, documentKeydownHandler);

renderDisplay(displayIndex);
