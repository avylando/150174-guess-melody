import AbstractView from '../abstract-view.js';

export default class SplashView extends AbstractView {
  get template() {
    return `
    <div class="blackout">
      <div class="ring"></div>
    </div>`;
  }
}
