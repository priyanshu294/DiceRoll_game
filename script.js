'use strict';
// Selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Starting conditions
let score, currentScore, activePlayer, playing;

function init() {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();

function SwitchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display  dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      SwitchPlayer();
    }
  }
});

// btn Hold function
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's socre
    score[activePlayer] += currentScore;
    //score[1] = score[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 2. check if player's score is >= 100 then finish the game
    if (score[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // alert(`Player--${activePlayer} is Winner!!🏆🥇`);
    } else {
      //3.switch to the next player
      SwitchPlayer();
    }
  }
});

// Reset the game
btnNew.addEventListener('click', init);
