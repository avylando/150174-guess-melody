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
    const element = document.createElement(`template`);
    element.innerHTML = this.template;
    return element.content;
  }

  bind() {}

  screenHandler() {}

  get element() {
    if (!this._el) {
      this._el = this.render(this.template);
      this.bind();
    }
    return this._el;
  }
}
