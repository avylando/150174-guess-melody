import Loader from './loader.js';
import SplashScreen from './splash/splash-screen.js';
import GameModel from './data/game-model.js';
import WelcomeView from './game/welcome-view.js';
import GameScreen from './game/game-screen.js';
import ResultView from './game/result-view.js';

const app = document.querySelector(`.app`);
const footer = app.querySelector(`.copyright`);

const changeView = (page) => {
  const prevPage = app.querySelector(`.main`);

  if (prevPage) {
    prevPage.remove();
  }

  app.insertBefore(page, footer);
};

let gameData;

export default class Application {
  static start() {
    const splash = new SplashScreen();
    splash.start();
    Loader.loadData()
        .then(Application.showWelcome)
        .catch(Application.showError)
        .then(() => splash.stop());
  }

  static showWelcome(data) {
    gameData = data;
    const welcome = new WelcomeView();
    changeView(welcome.element);
  }

  static showGame() {
    let model = new GameModel(gameData);
    const gameScreen = new GameScreen(model);
    changeView(gameScreen.element);
    gameScreen.init();
  }

  static showResult(model) {
    const result = new ResultView(model);
    changeView(result.element);
  }

  static showError(error) {
    const element = document.createElement(`div`);
    element.style = `width: 200px; height: 50px; color: red; position: absolute; top:50px; left: 50px;`;
    element.textContent = error.message;
    document.body.insertAdjacentElement(`afterBegin`, element);
  }
}
