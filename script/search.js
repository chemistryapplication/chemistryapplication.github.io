"use strict";
const containerForm = document.getElementById("container-form");
const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const sidebar = document.getElementById(`sidebar`);
const sidebarHeader = document.querySelector(".sidebar-header");
const inputElements = document.querySelectorAll("[id*='input']");

const LIST_BREED = "LIST_BREED";
const LIST_PET = "LIST_PET";
const petArr = JSON.parse(getFromStorage(LIST_PET, null)) ?? [];
const breedList = JSON.parse(getFromStorage(LIST_BREED, null)) ?? [];

// renderData
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";

  // create petArr.length rows of pet
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    // row.innerHTML = "<HTML code>";
    row.innerHTML = `<th scope="row">${petArr[i].id} </th>
        <td>${petArr[i].name}</td>
        <td>${petArr[i].age}</td>
        <td>${petArr[i].type}</td>
        <td>${petArr[i].weight} kg</td>
        <td>${petArr[i].length} cm</td>
        <td>${petArr[i].breed}</td>
        <td>
          <i class="bi bi-square-fill" style="color: ${petArr[i].color} "></i>
        </td>
        <td><i class="bi bi-${
          petArr[i].vaccinated === true ? "check" : "x"
        }-circle-fill"></i></td>
        <td><i class="bi bi-${
          petArr[i].dewormed === true ? "check" : "x"
        }-circle-fill"></i></td>
        <td><i class="bi bi-${
          petArr[i].sterilized === true ? "check" : "x"
        }-circle-fill"></i></td>
        <td>${petArr[i].date}</td>`;

    tableBodyEl.appendChild(row);
  }
}

// sideBar
sidebarHeader.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});

// renderBreed
function renderTableBreed(breedArr) {
  for (let i = 0; i < breedArr.length; i++) {
    const option = document.createElement("option");

    option.innerHTML = `<option>${breedArr[i].name}</option>`;
    breedInput.appendChild(option);
  }
}
renderTableBreed(breedList);

// function clear input after submitting
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// get type
const checkType = function (el) {
  return el.type;
};

const defFieldToFind = function () {
  // Pet array is corresponding to finding conditions
  let findingPetArr = petArr;
  // COndition to find
  const fieldToFindArr = [];
  // Get id of input
  const inputElArr = inputElements;
  // get index of input's id
  const indexOfElArr = [];

  // start to get id and index
  inputElArr.forEach((el, i) => {
    const type = checkType(el);

    if (type === "text") {
      if (el.value != false) {
        fieldToFindArr.push(el.id);
        indexOfElArr.push(i);
      }
    } else if (type === "select-one") {
      if (el.value != el.options[0].value) {
        fieldToFindArr.push(el.id);
        indexOfElArr.push(i);
      }
    } else if (type === "checkbox") {
      if (el.checked != false) {
        fieldToFindArr.push(el.id);
        indexOfElArr.push(i);
      }
    }
  });

  // get atribute of object by removing string 'input-' of Element's id
  const findingAtrbArr = fieldToFindArr.map((el) => el.slice(6));
  console.log(findingAtrbArr);
  // return if user clicks find btn without typing or selecting.
  if (fieldToFindArr.length === 0) {
    alert("Please select data!");
    renderTableData([]);
    return;
  }

  // start to find: Filter with each atribute => findPetFnc(petArr, key, val)
  findingAtrbArr.forEach((el, i) => {
    findingPetArr = findPetFnc(
      findingPetArr,
      el,
      // inputElArr[index]['check' ? 'val']
      inputElArr[indexOfElArr[i]][
        inputElArr[indexOfElArr[i]].checked === true ? "checked" : "value"
      ]
    );
    console.log(indexOfElArr);
    console.log(inputElArr);
    console.log(
      inputElArr[indexOfElArr[i]][
        inputElArr[indexOfElArr[i]].checked === true ? "checked" : "value"
      ]
    );
  });

  clearInput();
  renderTableData(findingPetArr);
  if (findingPetArr.length === 0) {
    alert("Value not found!");
  }
};

// Find pet fnc
const findPetFnc = function (petArr, key, val) {
  let findingPetArr = petArr;

  // check type
  if (val === true)
    findingPetArr = findingPetArr.filter((pet) => pet[key] === val);
  // select type
  else if (key === "type" || key === "breed")
    findingPetArr = findingPetArr.filter((pet) => pet[key] === val);
  // text type
  else findingPetArr = findingPetArr.filter((pet) => pet[key].includes(val));

  return findingPetArr;
};

findBtn.addEventListener("click", function (e) {
  defFieldToFind();
});
