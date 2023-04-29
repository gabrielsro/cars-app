const deleteOption = document.getElementById("delete-option");
const btnNo = document.getElementById("btn-delete-no");
const btnYes = document.getElementById("btn-delete-yes");
const warning = document.querySelector(".delete-warning");
let showingWarning = false;

deleteOption.addEventListener("click", () => showAndHideWarningMessage());
btnNo.addEventListener("click", () => showAndHideWarningMessage());

function showAndHideWarningMessage() {
  if (showingWarning) {
    warning.classList.add("invisible");
    showingWarning = false;
    return;
  }
  if (!showingWarning) {
    warning.classList.remove("invisible");
    showingWarning = true;
    return;
  }
}
