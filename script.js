'use strict';

// Selecting elements
const player1display = document.querySelector('.player--0');
const player2display = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const diceEL = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');

// Starting conditions

let scores, currentScore, activePlayer, playing;

const restart = function () {
  scores = [0, 0];
  currentScore = 0; // this cannot be defined inside the function because it would be set to zero each time we click roll dice
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEL.classList.add('hidden');
  player1display.classList.remove('player--winner');
  player2display.classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
};

restart();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // Here, we are changing the current value of 'active player' to 1 (if the dice is a 1 and the current active player is 0). This will change 'current--0' to 'current--1' and vice-versa in the code above
  player1display.classList.toggle('player--active');
  player2display.classList.toggle('player--active');
};

// Dice roll
rollDice.addEventListener('click', function () {
  if (playing) {
    // playing is a boolean value, which is true, so the code in the curly braces will be executed
    // 1. Random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // 'dice' is now set to a random number between 1 - 6

    // 2. Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // if dice roll is not 1, add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if the score is 1, and the active player is 0 (player 1), switch to next player
      switchPlayer();
    }
  }
});

holdDice.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // This ensures that the main scores of either player 1 or 2 are called 'score[activePlayer]
    // 'score[activePlayer]' is always the score of the player who is currently active

    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEL.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // the class name for each player is '.player--0'/'/player--1'
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // REMEMBER the dot when selecting a class
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', restart);
