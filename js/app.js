import GameModel from './data/game-model.js';
import WelcomeView from './view/welcome-view.js';
import GameScreen from './view/game-screen.js';
import ResultView from './view/result-view.js';

const app = document.querySelector(`.app`);
const footer = app.querySelector(`.copyright`);

const changeView = (page) => {
  const prevPage = app.querySelector(`.main`);

  if (prevPage) {
    prevPage.remove();
  }

  app.insertBefore(page, footer);
};

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeView();
    changeView(welcome.element);
  }

  static showGame() {
    let model = new GameModel();
    console.log(model);
    const gameScreen = new GameScreen(model);
    changeView(gameScreen.element);
    gameScreen.init();
  }

  static showResult(model) {
    const result = new ResultView(model);
    changeView(result.element);
  }
}
