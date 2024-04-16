'use strict';
// Selecting elements
const popUpQuestion = document.getElementById('pop-up-question');
const inputs = document.querySelector('input');

const LIST_QUESTION = 'LIST_QUESTION';
const questionArr = JSON.parse(getFromStorage(LIST_QUESTION, null)) ?? [];
const arrLength = questionArr.length;
let currQuestion;
let score;

const loadQuestion = function () {
  popUpQuestion.innerHTML = '';
  // const number = Math.trunc(Math.random() * arrLength) + 1;
  const number = currQuestion;
  const div = document.createElement('div');

  div.innerHTML = `<h2>${currQuestion + 1}/${arrLength}</h2>
  <h2 class="display-score">Đúng ${score}/${arrLength}</h2>
  <p>${questionArr[number].question}</p>
  <input type="radio" id="radio-a" name="chemistry" value="a"/>
  <label for="a">${questionArr[number].a}</label><br />
  <input type="radio" id="radio-b" name="chemistry" value="b"/>
  <label for="b">${questionArr[number].b}</label><br />
  <input type="radio" id="radio-c" name="chemistry" value="c"/>
  <label for="c">${questionArr[number].c}</label> <br />
  <input type="radio" id=radio-d" name="chemistry" value="d"/>
  <label for="d">${questionArr[number].d}</label>
  <br>
  <button onclick="result(${number})" id="button-submit" class="btn">Submit</button>
  <button onclick="nextQuestion()" id="button-next" class="btn hidden">Next</button>
  <p id="success" class=" hidden">Bạn lảm đúng</p>
    <p id="danger" class=" hidden">Đáp án đúng: ${
      questionArr[number].answer
    }</p>`;

  popUpQuestion.appendChild(div);
};
const init = function () {
  currQuestion = 0;
  score = 0;
  loadQuestion();
};
init();

const result = function (number) {
  try {
    let value = document.querySelector('input[name="chemistry"]:checked').value;

    if (questionArr[number].answer === value) {
      score++;
      document.getElementById('success').classList.remove('hidden');
    } else {
      document.getElementById('danger').classList.remove('hidden');
    }

    const displayScore = document.querySelector('.display-score');
    displayScore.innerHTML = `Đúng ${score}/${arrLength}`;
    document.getElementById('button-submit').classList.add('hidden');
    document.getElementById('button-next').classList.remove('hidden');
  } catch (err) {
    alert('Hãy chọn đáp án');
  }
};
const nextQuestion = function () {
  if (currQuestion === arrLength - 1) {
    popUpQuestion.innerHTML = '';
    console.log('Long');
    const div = document.createElement('div');

    div.innerHTML = `<h1>Kết Thúc</h1>
    <h2>Tổng điểm:${score}/${arrLength}</h2>
    <button onclick="init()" class="btn btn-redo">Làm lại</button>`;
    console.log('Long');
    popUpQuestion.appendChild(div);
  } else {
    console.log(currQuestion);
    currQuestion++;
    loadQuestion();
    document.querySelector('.success').classList.add('hidden');
    document.querySelector('.danger').classList.add('hidden');
    document.getElementById('button-next').classList.add('hidden');
  }
};
