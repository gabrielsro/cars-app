const deleteAllWarning = document.getElementById("models-delete-all-warning");
const btnDeleteAll = document.getElementById("models-delete-all");
const btnDeleteAllNo = document.getElementById("btn-delete-all-no");
const btnDeleteOne = document.querySelectorAll(".model-delete");
const btnDeleteOneNo = document.querySelectorAll(".btn-delete-no");
const btnDeleteYes = document.getElementById("btn-delete-yes");

let showingWarningAll = false;
let showingWarningOne = false;

btnDeleteAll.addEventListener("click", () => {
  if (showingWarningAll) {
    deleteAllWarning.classList.add("invisible");
  }
  if (!showingWarningAll) {
    let allOneWarnings = document.querySelectorAll(".model-delete-warning");
    allOneWarnings.forEach((a) => {
      if (!a.classList.contains("invisible")) {
        a.classList.add("invisible");
      }
    });
    deleteAllWarning.classList.remove("invisible");
  }
  showingWarningAll = !showingWarningAll;
});

btnDeleteOne.forEach((b) => {
  b.addEventListener("click", () => {
    let count = b.getAttribute("id").match(/\d$/)[0];
    let warning = document.getElementById(`model-delete-warning-${count}`);
    let allOneWarnings = document.querySelectorAll(".model-delete-warning");
    if (!showingWarningOne) {
      let allOneWarnings = document.querySelectorAll(".model-delete-warning");
      allOneWarnings.forEach((a) => {
        if (!a.classList.contains("invisible")) {
          a.classList.add("invisible");
        }
      });
      if (!deleteAllWarning.classList.contains("invisible")) {
        deleteAllWarning.classList.add("invisible");
      }
      warning.classList.toggle("invisible");
    }
    if (showingWarningOne) {
      allOneWarnings.forEach((a) => {
        if (!a.classList.contains("invisible")) {
          a.classList.add("invisible");
        }
      });
      warning.classList.add("invisible");
    }
    showingWarningOne = !showingWarningOne;
  });
});

btnDeleteOneNo.forEach((b) => {
  b.addEventListener("click", () => {
    let count = b.getAttribute("id").match(/.$/)[0];
    let warning = document.getElementById(`model-delete-warning-${count}`);
    warning.classList.add("invisible");
    showingWarningOne = !showingWarningOne;
  });
});

btnDeleteAllNo.addEventListener("click", () => {
  deleteAllWarning.classList.add("invisible");
  showingWarningAll = !showingWarningAll;
});
