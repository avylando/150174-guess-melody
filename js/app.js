import GameModel from './data/game-model.js';
import WelcomeScreen from './view/welcome-screen.js';
import GameScreen from './view/game-screen.js';
import ResultScreen from './view/result-screen.js';

const app = document.querySelector(`.app`);

const changeView = (page) => {
  const prevPage = app.querySelector(`.main`);

  if (prevPage) {
    prevPage.remove();
  }

  app.appendChild(page);
};

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    changeView(welcome.element);
  }

  static showGame() {
    const model = new GameModel();
    const gameScreen = new GameScreen(model);
    changeView(gameScreen.element);
    gameScreen.init();
  }

  static showResult(model) {
    const result = new ResultScreen(model);
    changeView(result.element);
  }
}
