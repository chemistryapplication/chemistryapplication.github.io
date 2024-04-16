"use strict";
const containerForm = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const questionInput = document.getElementById("input-question");
const answerInput = document.getElementById("input-answer");
const aInput = document.getElementById("input-a");
const bInput = document.getElementById("input-b");
const cInput = document.getElementById("input-c");
const dInput = document.getElementById("input-d");
const tableBodyEl = document.getElementById("tbody");
const sidebar = document.getElementById(`sidebar`);
const sidebarHeader = document.querySelector(".sidebar-header");

const LIST_QUESTION = "LIST_QUESTION";
const questionArr = JSON.parse(getFromStorage(LIST_QUESTION, null)) ?? [];

let currQuestion;
const validateData = function (data) {
  // check question
  if (data.question == "") {
    alert("Hãy điền câu hỏi");
    return 0;
  }

  // check answer
  if (data.answer == "") {
    alert("Hãy điền đáp án");
    return 0;
  }

  // check a
  if (data.a == "") {
    alert("Hãy điền câu a");
    return 0;
  }

  // check b
  if (data.b == "") {
    alert("Hãy điền câu b");
    return 0;
  }

  // check c
  if (data.c == "") {
    alert("Hãy điền câu c");
    return 0;
  }

  // check d
  if (data.d == "") {
    alert("Hãy điền câu b");
    return 0;
  }

  return 1;
};

function renderTableData(questionArr) {
  tableBodyEl.innerHTML = "";

  // create questionArr.length rows of pet
  for (let i = 0; i < questionArr.length; i++) {
    const row = document.createElement("tr");
    // row.innerHTML = "<HTML code>";
    row.innerHTML = `<th scope="row">${questionArr[i].id}</th>
    <td>${questionArr[i].answer}</td>
    <td>${questionArr[i].question}</td>
    <td>${questionArr[i].a}</td>
    <td>${questionArr[i].b}</td>
    <td>${questionArr[i].c}</td>
    <td>${questionArr[i].d}</td>
    <td>
    <button class="btn btn-warning" onclick="startEditQuestion('${questionArr[i].id}')">Edit</button>
    </td>`;

    tableBodyEl.appendChild(row);
  }
}

renderTableData(questionArr);

// startEditQuestion
const startEditQuestion = (questionId) => {
  containerForm.classList.remove("hide");

  currQuestion = questionArr.findIndex(
    (question) => question.id === questionId
  );
  questionInput.value = questionArr[currQuestion].question;
  answerInput.value = questionArr[currQuestion].answer;
  aInput.value = questionArr[currQuestion].a;
  bInput.value = questionArr[currQuestion].b;
  cInput.value = questionArr[currQuestion].c;
  dInput.value = questionArr[currQuestion].d;
};

// clear Input
// const clearInput = () => {
//   idInput.value = "";
//   questionInput.value = "";
//   answerInput.value = "";
//   aInput.value = "Select Type";
//   bInput.value = "";
//   cInput.value = "";
//   dInput.value = "Select Breed";
// };

sidebarHeader.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});

// submit btn
submitBtn.addEventListener("click", function () {
  const data = {
    id: questionArr[currQuestion].id,
    question: questionInput.value,
    answer: answerInput.value,
    a: aInput.value,
    b: bInput.value,
    c: cInput.value,
    d: dInput.value,
  };

  const validate = validateData(data);
  // if validate === true
  if (validate) {
    questionArr[currQuestion] = data;
    saveToStorage(LIST_QUESTION, JSON.stringify(questionArr));
    // clearInput();

    alert("Submit successfully");
    renderTableData(questionArr);
  }
});
