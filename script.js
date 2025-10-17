'use strict';

// Functions
// Generating random dice number
const randomNumGenerator = function (range) {
  return Math.trunc(Math.random() * range) + 1;
};

// Removing class from element
const removeClass = function (el, klass) {
  return el.classList.remove(klass);
};

// Adding class to an Element
const addClass = function (el, klass) {
  return el.classList.add(klass);
};

// Defining a function that check if an element contains a specific class
const containsClass = function (el, klass) {
  return el.classList.contains(klass);
};

// Getting element by ID and assigning it a value
const assignContentById = function (elementId, value) {
  return (document.getElementById(elementId).textContent = value);
};

// Getting element by class and assigning it a value
const assignContentByClass = function (elementclass, value) {
  return (document.querrySelector(elementclass).textContent = value);
};

// Toggling  class in element
const toggleClass = function (el, klass) {
  el.classList.toggle(klass);
};

// Switching active player and resetting current score
const switchPlayer = function () {
  assignContentById(`current--${activePlayer}`, 0);
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  toggleClass(player0El, `player--active`);
  toggleClass(player1El, `player--active`);
};

// function for initial state variables
const initaialState = function () {
  // Starting condition
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameOver = false;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameOver = false;
  score0El.textContent = 0;
  score1El.textContent = 0;
  addClass(diceEl, 'hidden');
  assignContentById('current--0', 0);
  assignContentById('current--1', 0);

  // Resetting the player--winner class
  containsClass(player0El, 'player--winner')
    ? removeClass(player0El, 'player--winner')
    : removeClass(player1El, 'player--winner');

  // Resetting default active player
  if (containsClass(player1El, 'player--active')) {
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
  }
};

// DOM ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Starting condition
let scores, currentScore, activePlayer, gameOver;

initaialState();

// Implementing the btn roll functionality
btnRoll.addEventListener('click', function () {
  if (gameOver) return;

  // Generating Random Dice
  const dice = randomNumGenerator(6);

  // Display Dice roll
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // Checking if dice === 1. if yes,
  if (dice !== 1) {
    // Adding to current score
    currentScore += dice;
    assignContentById(`current--${activePlayer}`, currentScore);
  } else {
    switchPlayer();
  }
});

// Handling the hold btn  functionality
btnHold.addEventListener('click', function () {
  // Finidhing game when there's a winner
  if (gameOver) return;

  // Add current score to active player's score
  scores[activePlayer] += currentScore;

  // Display total score
  assignContentById(`score--${activePlayer}`, scores[`${activePlayer}`]);

  //  Active wins if total score is >= 100

  if (scores[0] >= 100 || scores[1] >= 100) {
    // OPtion 1
    activePlayer === 0
      ? addClass(player0El, 'player--winner')
      : addClass(player1El, 'player--winner');
    gameOver = 1;
    diceEl.classList.add('hidden');

    /*   // Option 2
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add(`player--winner`);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove(`player--active`);   
      gameOver = 1;
    diceEl.classList.add('hidden');*/
  } else {
    switchPlayer();
  }
});

// Implementing the reset button functionality
btnNew.addEventListener('click', initaialState);
