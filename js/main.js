const template = document.querySelector(`#templates`).content;
const displays = template.querySelectorAll(`.main`);
const app = document.querySelector(`.app`);

let displayIndex = 0;
const MIN_DISPLAY = 0;
const maxDisplay = displays.length - 1;

const renderDisplay = (index) => {
  let prevDisplay = app.querySelector(`.main`);

  if (prevDisplay) {
    prevDisplay.remove();
  }

  let currentDisplay = displays[index];
  app.insertAdjacentElement(`afterBegin`, currentDisplay);
};

const Keycodes = {
  leftArr: 37,
  rightArr: 39
};

const documentKeydownHandler = (evt) => {
  if (evt.altKey && evt.keyCode === Keycodes.leftArr) {
    if (displayIndex > MIN_DISPLAY) {
      displayIndex--;
    }
  }

  if (evt.altKey && evt.keyCode === Keycodes.rightArr) {
    if (displayIndex < maxDisplay) {
      displayIndex++;
    }
  }

  renderDisplay(displayIndex);
};

document.addEventListener(`keydown`, documentKeydownHandler);

renderDisplay(displayIndex);
