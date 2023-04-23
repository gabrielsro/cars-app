const carForm = document.querySelector("form");
const modelSelector = document.getElementById("carModel");
const yearInput = document.getElementById("carYear");
const makeSelector = document.getElementById("carMake");

modelSelector.addEventListener("change", () => {
  if (yearInput.value > 1950 && yearInput.value < 3000) {
    carForm.setAttribute("action", "/inventory/add-car/get-variants");
    carForm.submit();
  }
});

yearInput.addEventListener("input", () => {
  if (
    typeof Number(yearInput.value) == "number" &&
    Number(yearInput.value) > 1950 &&
    Number(yearInput.value) < 3000 &&
    makeSelector.value
  ) {
    carForm.setAttribute("action", "/inventory/add-car/get-models");
    carForm.submit();
  }
});

makeSelector.addEventListener("change", () => {
  make = makeSelector.value.split(",")[1].toLowerCase();
  if (yearInput.value) {
    carForm.setAttribute("action", "/inventory/add-car/get-models");
    console.log(make);
    carForm.submit();
  }
});
