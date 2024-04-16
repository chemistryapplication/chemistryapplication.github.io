"use strict";
// Main 1
const submitBtn = document.getElementById("submit-btn");
const nInput = document.getElementById("input-n");
const lInput = document.getElementById("input-l");
const mlInput = document.getElementById("input-ml");
const msInput = document.getElementById("input-ms");
const tableBodyEl = document.getElementById("tbody");
const tableBodyEl2 = document.getElementById("tbody2");

// Main 2
const submitBtn2 = document.getElementById("submit-btn2");
const nNumberInput = document.getElementById("input-n-number");
const lLetterInput = document.getElementById("input-l-letter");
const eInput = document.getElementById("input-e");
const layer = ["k", "l", "m", "n", "o", "p", "q"];
const innerLayer = ["s", "p", "d", "f"];

const cal = function (chemical) {
  const indexArr = [];
  const maxIndex = chemical.l;
  let e = 1;
  //   console.log(maxIndex);
  for (let i = -maxIndex; i <= maxIndex; i++) {
    indexArr.push(i);
  }
  const indexArrLength = indexArr.length;
  //   console.log(indexArr);
  if (chemical.ms > 0) {
    chemical.e = indexArr.indexOf(chemical.ml) + 1;
  } else chemical.e = indexArr.indexOf(chemical.ml) + indexArrLength + 1;
  chemical.n = layer.indexOf(chemical.n) + 1;
  chemical.l = innerLayer[chemical.l];
  renderTableData(chemical);
};

const validateData = function (data) {
  // check empty id
  console.log(typeof data.ms);
  if (data.n === "" || !layer.includes(data.n)) {
    // check question
    alert("n phải thuộc khoảng K và Q");
    return 0;
  }

  // check answer
  //   if (!innerLayer.includes(data.l)) {
  //     alert("l không tồn tại");
  //     return 0;
  //   }

  if (data.l < 0 || data.l > layer.indexOf(data.n)) {
    console.log();
    alert("l thuộc khoảng từ 0 đến n-1");
    return 0;
  }

  // check a
  if (Math.abs(data.ml) < 0 || Math.abs(data.ml) > data.l) {
    alert(`ml phải thuộc từ ${-data.l} đến ${data.l}`);
    return 0;
  }

  if (!data.ms || Math.abs(data.ms) != 0.5) {
    alert(`ms phải là -1/2 hoặc 1/2 `);
    return 0;
  }
  console.log(data);
  return 1;
};

// function render table data
function renderTableData(data) {
  tableBodyEl.innerHTML = "";

  const row = document.createElement("tr");
  // row.innerHTML = "<HTML code>";
  row.innerHTML = `<th scope="row">${data.n}</th>
      <td>${data.l}</td>
      <td>${data.e}</td>`;

  tableBodyEl.appendChild(row);
}
// renderTableData(data);
// function clear input after submitting

// submit button
submitBtn.addEventListener("click", function () {
  const data = {
    n: nInput.value,
    l: parseInt(lInput.value),
    ml: parseInt(mlInput.value),
    ms: parseFloat(msInput.value),
  };

  const validate = validateData(data);
  // if validate === true
  if (validate) {
    // renderTableData(data);
    cal(data);
    alert("Submit successfully");
  }
});

// -----------------Main 2---------------
function isNumber(s) {
  return !isNaN(s);
}

// render table 2
function renderTableData2(data) {
  tableBodyEl2.innerHTML = "";

  const row = document.createElement("tr");
  // row.innerHTML = "<HTML code>";
  row.innerHTML = `<th scope="row">${data.nNumber}</th>
      <td>${data.lLetter}</td>
      <td>${data.mlNumber}</td>
      <td>${data.msNumber}</td>`;

  tableBodyEl2.appendChild(row);
}
// cal2
const cal2 = function (chemical) {
  const indexArr = [];
  const maxIndex = innerLayer.indexOf(chemical.lLetter);
  //   console.log(maxIndex);
  for (let i = -maxIndex; i <= maxIndex; i++) {
    indexArr.push(i);
  }
  const indexArrLength = indexArr.length;
  console.log(indexArr);
  //   console.log(indexArr);
  if (chemical.e <= indexArrLength) {
    chemical.mlNumber = indexArr[chemical.e - 1];
    chemical.msNumber = 0.5;
  } else {
    chemical.mlNumber = indexArr[chemical.e - indexArrLength - 1];
    chemical.msNumber = -0.5;
  }
  chemical.lLetter = innerLayer.indexOf(chemical.lLetter);
  renderTableData2(chemical);
};

const validateData2 = function (data) {
  // check empty id
  console.log(data);
  if (!data.nNumber || data.nNumber < 1 || data.nNumber > 7) {
    // check question
    alert("n phải thuộc từ 1 đến 7");
    return 0;
  }
  function renderTableData(data) {
    tableBodyEl.innerHTML = "";

    const row = document.createElement("tr");
    // row.innerHTML = "<HTML code>";
    row.innerHTML = `<th scope="row">${data.n}</th>
        <td>${data.l}</td>
        <td>${data.e}</td>`;

    tableBodyEl.appendChild(row);
  }
  // check answer
  if (!innerLayer.includes(data.lLetter)) {
    alert("l không tồn tại");
    return 0;
  }

  // if (data.l < 0 || innerLayer.indexOf(data.l) > layer.indexOf(data.n) + 1) {
  //   alert("l thuộc khoảng từ 0 đến n-1");
  //   return 0;
  // }

  // check a
  if (!isNumber(data.e) || data.e < 0) {
    alert("e phải là số tự nhiên");
    return 0;
  }

  return 1;
};

submitBtn2.addEventListener("click", function () {
  const data = {
    nNumber: parseInt(nNumberInput.value),
    lLetter: lLetterInput.value,
    e: parseInt(eInput.value),
    mlNumber: "",
    msNumber: "",
  };

  const validate = validateData2(data);
  // if validate === true
  if (validate) {
    // renderTableData(data);
    cal2(data);
  } else {
    alert("Submit unsuccessfully");
  }
});
