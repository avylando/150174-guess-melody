const onError = (error) => {
  const element = document.createElement(`div`);
  element.style = `width: 200px; height: 50px; color: red; position: absolute; top:50px; left: 50px;`;
  element.textContent = error.message;
  document.body.insertAdjacentElement(`afterBegin`, element);
};

const onLoad = (response) => {
  if (response.ok) {
    return response.json();
  }

  throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
};

export default class Loader {
  constructor() {

  }

  static loadData() {
    const URL = `https://es.dump.academy/guess-melody/questions`;
    const whenDataLoaded = window.fetch(URL);
    return whenDataLoaded.then(onLoad).catch(onError);
  }
}
