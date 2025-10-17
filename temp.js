'use strict';

// My own toggle function
/*const removeOrAddClass = (el, klass) =>
  el.classList.contains(klass)
    ? el.classList.remove(klass)
    : el.classList.add(klass); */

// Functions

// Function that sets game to it initial state
const init = function () {
  //  Reset to initial state
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  gameOver = 0;
  addClass(diceEl, `hidden`);
  removeClass(player0El, `player--winner`);
  removeClass(player1El, `player--winner`);

  // switch player
  addClass(player0El, `player--active`);
  removeClass(player1El, `player--active`);
};

// Random number generator
const generateRandomNum = range => Math.trunc(Math.random() * range) + 1;

// DOM Element Selector Via Class
const domClassSelector = klass => document.querySelector(klass);

// DOM Element Selector Via ID
const domIdSelector = id => document.getElementById(id);

// Function for adding a class to an element
const addClass = (el, klass) => el.classList.add(klass);

// Class Remover
const removeClass = (el, klass) => el.classList.remove(klass);

// Function for toggling class
const toggleClass = (el, klass) => el.classList.toggle(klass);

// Combination of DOM Selector via class and the add class function
const domAddClassSelector = (el, klass) => {
  domClassSelector(el).classList.add(klass);
};

// Combination of DOM Selector via class and the remove class function
const domRemoveClassSelector = (el, klass) => {
  domClassSelector(el).classList.remove(klass);
};

// The switch player function
const switchPlayer = () => {
  // switch player
  domIdSelector(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Defining active Player
  activePlayer = activePlayer === 0 ? 1 : 0;
  toggleClass(player0El, `player--active`);
  toggleClass(player1El, `player--active`);
};

// DOM ELEMENTS
const player0El = domClassSelector(`.player--0`);
const player1El = domClassSelector(`.player--1`);
const score0El = domIdSelector(`score--0`);
const score1El = domIdSelector(`score--1`);
const current0El = domIdSelector(`current--0`);
const current1El = domIdSelector(`current--1`);
const diceEl = domClassSelector(`.dice`);
const btnRoll = domClassSelector(`.btn--roll`);
const btnHold = domClassSelector(`.btn--hold`);
const btnNew = domClassSelector(`.btn--new`);

// STATE VARIABLES
let scores, currentScore, activePlayer, gameOver;

init();

btnRoll.addEventListener(`click`, function () {
  if (gameOver) return;

  // Generate Random Dice Roll
  const dice = generateRandomNum(6);

  // Display Dice
  diceEl.src = `dice-${dice}.png`;
  removeClass(diceEl, `hidden`);

  // Checking if dice === 1. if yes,
  if (dice !== 1) {
    // Add dice roll to current
    currentScore += dice;
    domIdSelector(`current--${activePlayer}`).textContent = currentScore;
  } else {
    // switch Players
    switchPlayer();
  }
});

// Implementing the hold button functionality
btnHold.addEventListener(`click`, function () {
  // chcking if game is over
  if (gameOver) return;

  // Adding current score to total score
  scores[`${activePlayer}`] += currentScore;
  domIdSelector(`score--${activePlayer}`).textContent =
    scores[`${activePlayer}`];

  // checking if total score >= 100
  if (scores[activePlayer] >= 100) {
    domAddClassSelector(`.player--${activePlayer}`, `player--winner`);
    domRemoveClassSelector(`.player--${activePlayer}`, `player--active`);
    addClass(diceEl, `hidden`);
    gameOver = 1;
  } else {
    switchPlayer();
  }
});

// Implementing the reset button functionality
btnNew.addEventListener(`click`, init);
