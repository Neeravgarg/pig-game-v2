'use strict';
const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');
const playerName_0 = document.querySelector('#name--0');
const score0 = document.querySelector('#score--0');
const current0 = document.querySelector('#current--0');
const playerName_1 = document.querySelector('#name--1');
const score1 = document.querySelector('#score--1');
const current1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const hold = document.querySelector('.hold');
const again = document.querySelector('.again');
const roll = document.querySelector('.roll');

//functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player_0.classList.toggle('player-active');
  player_1.classList.toggle('player-active');
};

//
let scores, currentScore, activePlayer, playing;

// Strating conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  dice.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player_0.classList.remove('player--winner');
  player_1.classList.remove('player--winner');
  player_0.classList.add('player-active');
  player_1.classList.remove('player-active');
};

init();
// Rolling dice functionality
roll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    var randomNumber = parseInt(Math.random() * 6) + 1;
    console.log(randomNumber);
    // 2. Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${randomNumber}.png`;

    // 3. Check for rolled 1: if true, switch the next player
    if (randomNumber !== 1) {
      // Add randomNumber to the current score
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
      activePlayer = activePlayer === 0 ? 1 : 0;
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    switchPlayer();
    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
      document
        .querySelector(`.player--${activePlayer == 1 ? 0 : 1}`)
        .classList.toggle('player-active');
      dice.classList.add('hidden');
    }
    // Finish the game

    // Switch to the next player
    activePlayer = activePlayer === 0 ? 1 : 0;
  }
});

again.addEventListener('click', function () {
  init();
});
