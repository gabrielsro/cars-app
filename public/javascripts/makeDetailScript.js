const deleteOption = document.getElementById("delete-option");
const btnNo = document.getElementById("btn-delete-no");
const btnYes = document.getElementById("btn-delete-yes");
const warning = document.querySelector(".delete-warning");
const makeMore = document.querySelector(".make-more");
let make = document.querySelector("h1").innerText;
if (/^ford/i.test(make)) {
  make = "Ford Motor Company";
}
if (/^jaguar/i.test(make)) {
  make = "Jaguar Cars";
}
if (/^seat/i.test(make)) {
  make = "SEAT";
}
if (/^tesla/i.test(make)) {
  make = "Tesla, Inc.";
}
make = /-/.test(make) ? "Rolls-Royce_Motor_Cars" : make.split("-").join("_");
let showingWarning = false;

let url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exsentences=10&titles=${make}&format=json`;

async function wikipedia(url) {
  const fetched = await fetch(url);
  const json = await fetched.json();
  return Object.values(json.query.pages)[0].extract;
}

wikipedia(url).then((data) => {
  let description = document.createElement("div");
  let intro = data.split("<h2>")[0];
  description.innerHTML = intro;
  makeMore.appendChild(description);
});

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
