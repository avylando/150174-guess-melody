const createElementFromTemplate = (template) => {
  const parser = new DOMParser();
  const content = parser.parseFromString(template, `text/html`);
  return content.body.firstElementChild;
};

const renderPage = (page) => {
  const app = document.querySelector(`.app`);
  const prevPage = app.querySelector(`.main`);

  if (prevPage) {
    prevPage.remove();
  }

  const currentDisplay = page;
  app.insertAdjacentElement(`afterBegin`, currentDisplay);
};

export {createElementFromTemplate, renderPage};
