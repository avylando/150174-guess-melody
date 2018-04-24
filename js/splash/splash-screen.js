import SplashView from './splash-view.js';

export default class SplashScreen {
  constructor() {
    this.content = new SplashView();
    this.element = this.content.element;
  }

  start() {
    document.body.insertAdjacentElement(`afterBegin`, this.element);
  }

  stop() {
    document.body.removeChild(this.element);
  }
}
