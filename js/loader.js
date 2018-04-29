import {createNotice} from './utils.js';

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 21041991;

const onError = (error) => {
  const notice = createNotice();
  notice.textContent = error.message;
  document.body.insertAdjacentElement(`afterBegin`, notice);
};

const onDataLoad = (response) => {
  if (response.ok) {
    return response.json();
  }

  return onError(`Произошла ошибка: ${response.status} ${response.statusText}`);
};

const onResultsLoad = (response) => {
  if (response.ok) {
    return response.json();
  } else if (response.status === 404) {
    return [];
  }

  return onError(`Произошла ошибка: ${response.status} ${response.statusText}`);
};

const onResultSave = (response) => {
  if (!response.ok) {
    return onError(`Произошла ошибка: ${response.status} ${response.statusText}`);
  }

  return true;
};

export default class Loader {
  constructor() {

  }

  static loadData() {
    const URL = `${SERVER_URL}/questions`;
    const whenDataLoaded = window.fetch(URL);
    return whenDataLoaded.then(onDataLoad).catch(onError);
  }

  static loadResults() {
    const URL = `${SERVER_URL}/stats/${APP_ID}`;
    const whenDataLoaded = window.fetch(URL);
    return whenDataLoaded.then(onResultsLoad).catch(onError);
  }

  static saveResult(playerResult) {
    const URL = `${SERVER_URL}/stats/${APP_ID}`;
    const options = {
      method: `POST`,
      body: JSON.stringify(playerResult),
      headers: {
        'Content-Type': `application/json`
      }
    };

    const whenResultSaved = window.fetch(URL, options);
    return whenResultSaved.then(onResultSave).catch(onError);
  }
}
