export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Invalid target, AbstractView cannot be created directly`);
    }
  }

  get template() {
    if (this instanceof AbstractView) {
      throw new Error(`No template for abstract view`);
    }
  }

  render() {
    const parser = new DOMParser();
    const result = parser.parseFromString(this.template, `text/html`);
    return result.body.firstElementChild;
  }

  bind() {}

  get element() {
    if (!this._el) {
      this._el = this.render();
      this.bind();
    }
    return this._el;
  }
}
