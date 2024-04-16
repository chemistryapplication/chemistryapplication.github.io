"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const questionInput = document.getElementById("input-question");
const answerInput = document.getElementById("input-answer");
const aInput = document.getElementById("input-a");
const bInput = document.getElementById("input-b");
const cInput = document.getElementById("input-c");
const dInput = document.getElementById("input-d");
const sidebar = document.getElementById(`sidebar`);
const sidebarHeader = document.querySelector(".sidebar-header");
const tableBodyEl = document.getElementById("tbody");

// const questionArr = [];
const LIST_QUESTION = "LIST_QUESTION";
const questionArr = JSON.parse(getFromStorage(LIST_QUESTION, null)) ?? [];

// const quest1 = {
//   id: "1",
//   question: "Cấu hình electron của ion nào sau đây ở trạng thái cơ bản?",
//   answer: "a",
//   a: "1s2 2s2 2p6 3s2 3p6 3d2 4s0",
//   b: "1s2 2s2 2p6 3s2 3p6 3d7 4s2",
//   c: "1s2 2s2 2p6 3s2 3p5 3d1 4s2",
//   d: "1s2 2s2 2p6 3s2 3p3 3d3 4s2",
// };

// const quest2 = {
//   id: "2",
//   question:
//     "Nguyên tố X có electron cuối cùng xác định bởi 4 số lượng tử; n=4, U=1,m=0,5= - 1/2. Điện tích hạt nhân của nguyên tố X có điện tích hạt nhân là",
//   answer: "b",
//   a: "17+",
//   b: "35+ ",
//   c: "8+",
//   d: "16+",
// };

// const quest3 = {
//   id: "3",
//   question:
//     "Cấu hình electron của S (Z = 16) là 1s 2s2 2p6 3s2 3p4. Hàm sóng (n, l, m, s ), xác định electron cuối cùng đặc trưng cho nguyên tử S là:",
//   answer: "a",
//   a: "(3,1,-1,-1/2)",
//   b: "(3,1,0,-1/2)",
//   c: "(3,0,0,-1/2)",
//   d: "(3,1,-1,+1/2)",
// };

// const quest4 = {
//   id: "4",
//   question:
//     "Cấu hình electron của Mg (Z = 12).1s2 2s2 2p6 3s2. Hàm súng (n, l, m, s ) xác định electron cuối cùng đặc trưng cho nguyên tử Mg là:",
//   answer: "c",
//   a: "(3,1,-1,-1/2)",
//   b: "(3,1,0,-1/2)",
//   c: "(3,0,0,-1/2)",
//   d: "(3,0,0,+1/2)",
// };

// const quest5 = {
//   id: "5",
//   question: "Cấu hình electron của nguyên tố Ca (Z=20) là:",
//   answer: "a",
//   a: "1s2 2s2 2p6 3s2 3p6 4s2",
//   b: "1s2 2s2 2p6 3s2 3p6 3d2",
//   c: "1s2 2s2 2p6 3s2 3p6 3d1 4s1",
//   d: "1s2 2s2 2p6 3s2 3p4 3d4",
// };

// const quest6 = {
//   id: "6",
//   question: " Cấu hình electron của nguyên tố Fe (Z = 26)",
//   answer: "b",
//   a: "1s2 2s2 2p6 3s2 3p6 4s2 3d5",
//   b: "1s2 2s2 2p6 3s2 3p6 3d6 4s2",
//   c: "1s2 2s2 2p6 3s2 3p6 3d1 4s1",
//   d: "1s2 2s2 2p6 3s2 3p4 3d4",
// };

// const quest7 = {
//   id: "7",
//   question: "Cấu hình electron của ion Fe2+ (Z=26)",
//   answer: "b",
//   a: "1s2 2s2 2p6 3s2 3p6 4s2 3d4",
//   b: "1s2 2s2 2p6 3s2 3p6 3d6",
//   c: "1s2 2s2 2p6 3s2 3p6 3d4 4s2",
//   d: "1s2 2s2 2p6 3s2 3p4 3d8",
// };

// const quest8 = {
//   id: "8",
//   question:
//     "Cấu hình electron của Cr (Z = 24).1s2 2s2 2p6 3s2 3p63d5 4s1. Cho biết vị trí (chu kỳ và phân nhóm) trong bảng hệ thống tuần hoàn.",
//   answer: "c",
//   a: "Chu kỳ 4, phân nhóm VIA.",
//   b: "Chu kỳ 4, phân nhóm IA.",
//   c: "Chu kỳ 4, phân nhóm VIB.",
//   d: "Chu kỳ 4, phân nhóm IB.",
// };

// const quest9 = {
//   id: "9",
//   question:
//     "Trong các cấu hình electrong. Cấu hình electron của nguyên tố thuộc nhóm VA là",
//   answer: "b",
//   a: "1s2 2s2 2p6 3s2 3p6 3d5 4s2",
//   b: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p3",
//   c: "1s2 2s2 2p6 3s2 3p6 3d7 4s2",
//   d: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p5",
// };

// const quest10 = {
//   id: "10",
//   question:
//     "Electron cuối cùng điền vào cấu hình electron của nguyên tử Mn (Z = 25) có bộ 4 số lượng tử là:",
//   answer: "c",
//   a: "n = 3, l = 2, m = +1, s = –1/2",
//   b: "n = 3, l = 0, m = 0, s = –1/2",
//   c: "n = 3, l = 2, m = +2, s = +1/2",
//   d: "n = 3, l = 2, m = -2, s = +1/2",
// };

// const quest11 = {
//   id: "11",
//   question:
//     "Một nguyên tử có electron cuối cùng ứng với 4 số lượng tử : n = 3, l = 2, m = +2, s = -1/2, nguyên tử đó có cấu hình phân lớp cuối là:",
//   answer: "c",
//   a: "3d8",
//   b: "3d9",
//   c: "3d10",
//   d: "3d6",
// };

// const quest12 = {
//   id: "12",
//   question:
//     "Cấu trúc lớp electron hóa trị của nguyên tử nguyên tố X được biểu diễn như sau 4s2 4p4. X là nguyên tố có điện tích hạt nhân là:",
//   answer: "c",
//   a: "16",
//   b: "14",
//   c: "34",
//   d: "24",
// };

// const quest13 = {
//   id: "13",
//   question:
//     "Trong 4 Nguyên tố K (Z = 19), Sc (Z = 21), Cr (Z = 24), và Cu (Z = 29), nguyên tử của các nguyên tố có cấu hình electron lớp ngoài cùng là 4s1:",
//   answer: "a",
//   a: "K, Cr, Cu",
//   b: "K, Sc, Cr",
//   c: "K, Sc, Cu",
//   d: "Cr, Cu, Sc",
// };

// const quest14 = {
//   id: "14",
//   question:
//     "Cho 5 nguyên tố: V (Z = 23), Mn (Z = 25), Co (Z = 27), Ni (Z = 28), As (Z =33). Ở trạng thái cơ bản , các nguyên tố có cùng số e độc thân là:",
//   answer: "a",
//   a: "V, Co và As",
//   b: "Mn, Co và Ni",
//   c: "Co, Ni và As",
//   d: "V, Mn và Co",
// };

// const quest15 = {
//   id: "15",
//   question:
//     "Nguyên tử của các nguyên tố trong cùng một chu kỳ, có chung một đặc điểm là:",
//   answer: "d",
//   a: "cùng số nơtron",
//   b: "cùng số electron",
//   c: "cùng số proton",
//   d: "cùng số lớp electron",
// };

// const quest16 = {
//   id: "16",
//   question:
//     "Cấu hình electron của Cl (Z = 17) là 1s2 2s2 2p6 3s2 3p5 . Vị trí (chu kỳ và phân nhóm) trong bảng hệ thống tuần hoàn là:",
//   answer: "c",
//   a: "Chu kỳ 3, phân nhóm VA.",
//   b: "Chu kỳ 3, phân nhóm IIA.",
//   c: "Chu kỳ 3, phân nhóm VIIA.",
//   d: "Chu kỳ 2, phân nhóm VIIA.",
// };

// const quest17 = {
//   id: "27",
//   question: "Cấu hình electron nguyên tử nào sau đây ở trạng thái cơ bản?",
//   answer: "c",
//   a: " 1s2 2s2 2p5 3s1",
//   b: "1s2 2s2 2p 3s1 3ps",
//   c: "1s2 2s2 2p 3s2 3p 3d1o4s2",
//   d: "1s2 2s2 2p 3s2 3p3 4d",
// };
// questionArr.push(
//   quest1,
//   quest2,
//   quest3,
//   quest4,
//   quest5,
//   quest6,
//   quest7,
//   quest8,
//   quest9,
//   quest10,
//   quest11,
//   quest12,
//   quest13,
//   quest14,
//   quest15,
//   quest16,
//   quest17
// );
// saveToStorage(LIST_QUESTION, JSON.stringify(questionArr));
// function validate data
const validateData = function (data) {
  // check empty id
  if (data.id === "") {
    alert("Không để trống ID");
    return 0;
  }
  // check unique id
  for (let i = 0; i < questionArr.length; i++) {
    if (data.id === questionArr[i].id) {
      console.log(questionArr);
      alert("ID phải là giá trị duy nhất");
      return 0;
    }
  }
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

// function render table data
function renderTableData(questionArr) {
  tableBodyEl.innerHTML = "";

  // create questionArr.length rows of pet
  for (let i = 0; i < questionArr.length; i++) {
    const row = document.createElement("tr");
    // row.innerHTML = "<HTML code>";
    row.innerHTML = `<th scope="row">${questionArr[i].id}</th>
    <td>${questionArr[i].answer}</td>
    <td>${questionArr[i].question}</td>
    <td data-number="1">${questionArr[i].a}</td>
    <td>${questionArr[i].b}</td>
    <td>${questionArr[i].c}</td>
    <td>${questionArr[i].d}</td>
    <td>
    <button class="btn btn-danger" onclick="deleteQuestion('${questionArr[i].id}')">Delete</button>
    </td>`;

    tableBodyEl.appendChild(row);
  }
}
renderTableData(questionArr);
// function clear input after submitting
const clearInput = () => {
  idInput.value = "";
  questionInput.value = "";
  answerInput.value = "";
  aInput.value = "Select Type";
  bInput.value = "";
  cInput.value = "";
  dInput.value = "Select Breed";
};

// function delete pet
const deleteQuestion = (questionId) => {
  // Confirm before deleteQuestion
  if (confirm("Are you sure?")) {
    const index = questionArr.findIndex(
      (question) => question.id === questionId
    );
    questionArr.splice(index, 1);
    saveToStorage(LIST_QUESTION, JSON.stringify(questionArr));

    renderTableData(questionArr);
  }
};

// submit button
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
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
    questionArr.push(data);
    saveToStorage(LIST_QUESTION, JSON.stringify(questionArr));
    clearInput();
    renderTableData(questionArr);
    alert("Submit successfully");
  }
});

// healthy button

sidebarHeader.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});
