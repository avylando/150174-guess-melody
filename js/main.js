import {renderPage} from '../js/utils.js';
import getStartPage from '../js/templates/welcome.js';
// import getArtistPage from '../js/templates/game-artist.js';
// import getGenrePage from '../js/templates/game-genre.js';
// import getResultPage from '../js/templates/result.js';
// import getResultTimePage from '../js/templates/result-time.js';
// import getResultAttemptsPage from '../js/templates/result-attempts.js';

// const results = [resultWinPage, resultTimePage, resultAttemptsPage];

// const startPageHandler = () => {
//   const startBtn = document.querySelector(`.main-play`);

//   startBtn.addEventListener(`click`, () => {
//     renderPage(getArtistPage());
//     artistPageHandler();
//   });
// };

// const artistPageHandler = () => {
//   const answerBtns = Array.from(document.querySelectorAll(`.main-answer-r`));

//   answerBtns.forEach((btn) => {
//     btn.addEventListener(`click`, () => {
//       renderPage(getGenrePage());
//       genrePageHandler();
//     });
//   });
// };

// const genrePageHandler = () => {
//   const form = document.querySelector(`.genre`);
//   const checkboxes = Array.from(form.querySelectorAll(`input[type='checkbox']`));
//   const formBtn = form.querySelector(`.genre-answer-send`);

//   formBtn.setAttribute(`disabled`, `disabled`);

//   const checkActive = () => {
//     return checkboxes.some((checkbox) => {
//       return checkbox.checked;
//     });
//   };

//   checkboxes.forEach((checkbox) => {
//     checkbox.checked = false;
//     checkbox.addEventListener(`change`, () => {
//       const active = checkActive();

//       if (checkbox.checked) {
//         formBtn.removeAttribute(`disabled`);
//       } else if (!active) {
//         formBtn.setAttribute(`disabled`, `disabled`);
//       }
//     });
//   });

//   form.addEventListener(`submit`, (evt) => {
//     evt.preventDefault();
//     renderPage(getResultPage());
//     resultPageHandler();
//   });
// };

// const resultPageHandler = () => {
//   const replayBtn = document.querySelector(`.main-replay`);

//   replayBtn.addEventListener(`click`, () => {
//     renderPage(getStartPage());
//     // startPageHandler();
//   });
// };

renderPage(getStartPage());
// startPageHandler();
