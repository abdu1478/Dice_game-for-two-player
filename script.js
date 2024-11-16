'use strict';

const playerSections = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const scoreEls = [
  document.getElementById('score--0'),
  document.getElementById('score--1'),
];
const currentScoreEls = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];
const winnerMessage = [
  document.querySelector('.winner--0'),
  document.querySelector('.winner--1'),
];
const diceEl = document.querySelector('.dice');

let activePlayer, scores, currentScore, isGameActive;

const initGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGameActive = true;

  scoreEls.forEach(scoreEl => (scoreEl.textContent = 0));
  currentScoreEls.forEach(currentEl => (currentEl.textContent = 0));
  diceEl.classList.add('hidden');
  playerSections.forEach(player =>
    player.classList.remove('player--winner', 'player--active')
  );
  playerSections[0].classList.add('player--active');
  winnerMessage.forEach(message => message.classList.add('hidden'));
};

const switchPlayer = function () {
  currentScoreEls[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerSections.forEach(player => player.classList.toggle('player--active'));
};

btnRoll.addEventListener('click', () => {
  if (isGameActive) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    diceEl.src = `dice-${diceNumber}.png`;
    diceEl.classList.remove('hidden');

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      currentScoreEls[activePlayer].textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (isGameActive) {
    scores[activePlayer] += currentScore;
    scoreEls[activePlayer].textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      isGameActive = false;
      diceEl.classList.add('hidden');
      playerSections[activePlayer].classList.add('player--winner');
      playerSections[activePlayer].classList.remove('player--active');
      winnerMessage[activePlayer].classList.remove('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);

initGame();
