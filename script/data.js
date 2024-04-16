"use strict";
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

const LIST_QUESTION = "LIST_QUESTION";
const questionArr = JSON.parse(getFromStorage(LIST_QUESTION, null)) ?? [];

const saveDinamicDataToFile = function () {
  let fileName = "chemistry.json";
  var blob = new Blob([JSON.stringify(questionArr)], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, fileName);
};

const readFile = function () {
  const fr = new FileReader();

  try {
    fr.readAsText(fileInput.files[0]);
    fr.addEventListener("load", function () {
      const clientChemistryArr = JSON.parse(fr.result) ?? [];

      // overide client data with new local data
      questionArr.forEach((localPet) => {
        const index = clientChemistryArr.findIndex(
          (clientPet) => localPet.id === clientPet.id
        );
        clientChemistryArr.splice(index, 1);
      });

      questionArr = questionArr.concat(clientChemistryArr);
      saveToStorage(LIST_PET, JSON.stringify(questionArr));
      alert("Import successfully");
    });
  } catch (err) {
    alert("Please choose the file!");
  }
};
// export btn
exportBtn.addEventListener("click", saveDinamicDataToFile);

// import btn
importBtn.addEventListener("click", readFile);
