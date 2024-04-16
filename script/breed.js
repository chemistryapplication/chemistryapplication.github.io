"use strict";
const submitBreedBtn = document.getElementById("submit-btn");
const nameInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");
const sidebar = document.getElementById(`sidebar`);
const sidebarHeader = document.querySelector(".sidebar-header");

const LIST_BREED = "LIST_BREED";
const breedArr = JSON.parse(getFromStorage(LIST_BREED, null)) ?? [];
// auto ++ breedId
let breedId;

// validate breed
const validateData = function (data) {
  if (data.name == "") {
    alert("Attribute name is missing");
    return 0;
  }

  if (data.type === "Select Type") {
    alert("Please select Type!");
    return 0;
  }

  const dupIndex = breedArr.findIndex(
    (el) => el.name === data.name && el.type === data.type
  );

  // console.log(dupIndex, typeof dupIndex, dupIndex);
  if (dupIndex != -1) {
    alert("Breed's already existed");
    return 0;
  }
  return 1;
};

// Avoiding duplicate id
const calId = function (breedArr) {
  let i = 0;
  const idArr = breedArr.map((el) => el.id);
  do {
    i++;
  } while (idArr.includes(i));
  return i;
};

// render breed
function renderTableData(breedArr) {
  tableBodyEl.innerHTML = "";

  // create petArr.length rows of pet

  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${breedArr[i].id} </th>
      <td>${breedArr[i].name}</td>
      <td>${breedArr[i].type}</td>
      
      <td>
      <button class="btn btn-danger" onclick="deleteBrred('${breedArr[i].id}')">Delete</button>
      </td>`;

    tableBodyEl.appendChild(row);
  }
}
renderTableData(breedArr);

// delete breed
const deleteBrred = (id) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    const index = breedArr.findIndex((breed) => breed.id === Number(id));
    breedArr.splice(index, 1);
    saveToStorage(LIST_BREED, JSON.stringify(breedArr));
    renderTableData(breedArr);
  }
};

// function clear input after submitting
const clearInput = () => {
  nameInput.value = "";
  typeInput.value = "Select Type";
};

// submit breed btn
submitBreedBtn.addEventListener("click", function (e) {
  const data = {
    id: calId(breedArr),
    name: nameInput.value,
    type: typeInput.value,
  };

  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    renderTableData(breedArr);
    breedId++;

    saveToStorage(LIST_BREED, JSON.stringify(breedArr));
    alert("Submit successfully");
    clearInput();
  }
});

// sidebar
sidebarHeader.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});
