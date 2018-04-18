import ResultView from '../templates/result-view.js';
import {renderPage} from '../utils.js';
import getStartPage from '../templates/welcome-screen.js';

export default (Game) => {
  const resultScreen = new ResultView(Game);
  resultScreen.screenHandler = () => {
    renderPage(getStartPage());
  };

  return resultScreen.element;
};
