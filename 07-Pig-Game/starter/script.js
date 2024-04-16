'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const popUpQuestion = document.getElementById('pop-up-question');
const inputs = document.querySelector('input');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const LIST_QUESTION = 'LIST_QUESTION';
const questionArr = JSON.parse(getFromStorage(LIST_QUESTION, null)) ?? [];
const arrLength = questionArr.length;

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  btnHold.classList.remove('no-click');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; // change latter
    }

    // check for roled 1: if true, switch
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  loadQuestion();
});

// resetting
btnNew.addEventListener('click', init);

const loadQuestion = function () {
  popUpQuestion.classList.remove('hidden');
  popUpQuestion.innerHTML = '';
  const number = Math.trunc(Math.random() * arrLength);
  // const number = 1;
  const div = document.createElement('div');

  div.innerHTML = `<p>${questionArr[number].question}</p>
  <input type="radio" id="radio-a" name="chemistry" value="a"/>
  <label for="a">${questionArr[number].a}</label><br />
  <input type="radio" id="radio-b" name="chemistry" value="b"/>
  <label for="b">${questionArr[number].b}</label><br />
  <input type="radio" id="radio-c" name="chemistry" value="c"/>
  <label for="c">${questionArr[number].c}</label> <br />
  <input type="radio" id=radio-d" name="chemistry" value="d"/>
  <label for="d">${questionArr[number].d}</label>
  <br>
  <button onclick="result(${number})" id="button-submit" >SUBMIT</button>`;

  popUpQuestion.appendChild(div);
};

const result = function (number) {
  try {
    let value = document.querySelector('input[name="chemistry"]:checked').value;

    if (playing) {
      // add.
      if (questionArr[number].answer === value) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
          scores[activePlayer];
      }

      // check if score is  >= 100
      if (scores[activePlayer] >= 20) {
        // finish
        playing = false;
        popUpQuestion.classList.add('hidden');
        btnHold.classList.add('no-click');
        diceEl.classList.add('hidden');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      } else {
        popUpQuestion.classList.add('hidden');
        // switch
        switchPlayer();
      }
    }
  } catch (err) {
    alert('Hãy chọn đáp án');
  }
};
