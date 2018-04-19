import ResultView from '../view/result-view.js';
import Application from '../app.js';

export default class ResultScreen {
  constructor(data) {
    this.content = new ResultView(data);
    this.content.screenHandler = () => {
      Application.showWelcome();
    };
  }
}
