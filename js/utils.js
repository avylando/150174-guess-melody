const createElementFromTemplate = (template, ...classNames) => {
  const element = document.createElement(`section`);
  const classes = classNames.join(` `);
  element.className = `main ${classes}`;
  element.innerHTML = template;
  return element;
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
