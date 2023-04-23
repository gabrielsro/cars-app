const makeSelector = document.getElementById("carMake");
const yearInput = document.getElementById("carYear");
const form = document.querySelector("form");
let make = "";
let year = "";
let title = document.querySelector("h1");
let destination = /model/i.test(title.innerText)
  ? "add-model"
  : "add-car/get-models";

if (destination == "add-model") {
  const modelSelector = document.getElementById("modelSelector");
  if (modelSelector) {
    form.setAttribute("action", "/inventory/add-model/final");
    modelSelector.addEventListener("change", () => {
      form.submit();
    });
  }
}

makeSelector.addEventListener("change", () => {
  make = makeSelector.value.split(",")[1].toLowerCase();
  if (yearInput.value) {
    form.setAttribute("action", `/inventory/${destination}`);
    form.submit();
  }
});
yearInput.addEventListener("input", () => {
  year = yearInput.value;
  if (
    typeof Number(year) == "number" &&
    Number(year) > 1950 &&
    Number(year) < 3000 &&
    makeSelector.value
  ) {
    form.setAttribute("action", `/inventory/${destination}`);
    form.submit();
  }
});
