import WelcomeView from '../templates/welcome-view.js';
import {renderPage} from '../utils.js';
import startGame from '../data/data-game.js';
import {getGamePage} from '../templates/game-screen.js';

export default () => {
  const newGame = startGame();
  const welcomeScreen = new WelcomeView();
  welcomeScreen.screenHandler = () => {
    renderPage(getGamePage(newGame));
  };

  return welcomeScreen.element;
};
