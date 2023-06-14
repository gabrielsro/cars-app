const deleteAllWarning = document.getElementById("models-delete-all-warning");
const btnDeleteOne = document.querySelectorAll(".model-delete");
const btnDeleteOneNo = document.querySelectorAll(".btn-delete-no");
const btnDeleteYes = document.getElementById("btn-delete-yes");

let showingWarningAll = false;
let showingWarningOne = false;

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
