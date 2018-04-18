import {ArtistGameView, GenreGameView} from '../templates/game-view.js';
import {renderPage} from '../utils.js';
import Header from '../templates/header-view.js';
import getResultPage from '../templates/result-screen.js';

export const getGamePage = (Game) => {
  const header = new Header(Game.timer, Game.mistakes);
  const question = Game.generateQuestion();

  const ScreenType = {
    artist: new ArtistGameView(header.template, question),
    genre: new GenreGameView(header.template, question)
  };

  const gameScreen = ScreenType[Game.type];

  gameScreen.screenHandler = (answer) => {
    Game.answers.push(answer);

    if (!answer.correct) {
      Game.mistakes++;

      if (Game.mistakes === 3) {
        renderPage(getResultPage(Game));
        return;
      }
    }

    if (Game.questions > 0) {
      Game.changeType();
      renderPage(getGamePage(Game));

    } else {
      renderPage(getResultPage(Game));
    }
  };

  return gameScreen.element;
};
