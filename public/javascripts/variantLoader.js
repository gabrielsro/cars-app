const carForm = document.querySelector(".form-add-car");
const modelSelector = document.getElementById("carModel");
const yearInput = document.getElementById("carYear");
const makeSelector = document.getElementById("carMake");
const newModelLabel = document.getElementById("newModelLabel");
const newModelInput = document.getElementById("newModel");
const newVariantLabel = document.getElementById("newVariantLabel");
const newVariant = document.getElementById("newVariant");
const mandatoryInputsModel = document.querySelectorAll(".mandatory input");
const mandatorySelectsModel = document.querySelectorAll(".mandatory select");
const mandatoryFieldsModel = [
  ...mandatoryInputsModel,
  ...mandatorySelectsModel,
];
const carMileage = document.getElementById("carMileage");
const carPrice = document.getElementById("carPrice");
const carColor = document.getElementById("carColor");
const carStatus = document.getElementById("carStatus");
const carFormButton = document.querySelector(".car-form-button button");
const vehicleSectionTitleModel = document.querySelector(
  ".form-progress > .stage:first-child h2"
);
const contactSectionTitleModel = document.querySelector(
  ".form-progress > .stage:nth-child(2) h2"
);
const additionalSectionTitleModel = document.querySelector(
  ".form-progress > .stage:last-child h2"
);
const mandatoryNextButton = document.querySelector(
  ".mandatory-fieldset-buttons button"
);

mandatoryInputsModel.forEach((m) =>
  m.addEventListener("input", () => checkFields())
);

mandatorySelectsModel.forEach((m) =>
  m.addEventListener("change", () => checkFields())
);

function checkFields() {
  if (
    mandatoryFieldsModel.every((f) => f.checkValidity()) &&
    carFormButton &&
    newModelInput.value
  ) {
    carForm.submit();
    vehicleSectionTitleModel.classList.remove("unselectable");
    contactSectionTitleModel.classList.remove("unselectable");
    additionalSectionTitleModel.classList.remove("unselectable");
    contactSectionTitleModel.classList.add("selectable");
    additionalSectionTitleModel.classList.add("selectable");
  }
  if (!mandatoryFieldsModel.every((f) => f.checkValidity()) && carFormButton) {
    contactSectionTitleModel.classList.remove("selectable");
    additionalSectionTitleModel.classList.remove("selectable");
    contactSectionTitleModel.classList.add("unselectable");
    additionalSectionTitleModel.classList.add("unselectable");
  }
}

//Check for "Other" model input previously entered
if (newModelInput) {
  if (newModelInput.value !== "") {
    newVariantLabel.classList.remove("invisible");
    newVariant.classList.remove("invisible");
    newVariant.setAttribute("required", "true");
  }
}

//Check for "Other" model previously selected
modelSelector.addEventListener("change", () => {
  if (
    yearInput.value > 1950 &&
    yearInput.value < 3000 &&
    modelSelector.value !== "Other" &&
    !mandatoryNextButton
  ) {
    if (newModelInput) {
      mandatoryFieldsModel.forEach((m) => {
        if (
          m.getAttribute("id") !== "carMake" ||
          m.getAttribute("id") !== "carYear" ||
          m.getAttribute("id") !== "carModel"
        ) {
          m.setAttribute("required", "false");
        }
      });
    }
    carForm.setAttribute("action", "/inventory/add-car/get-variants");
    carForm.submit();
  }
  //Listen for "Other" model selection
  if (
    yearInput.value > 1950 &&
    yearInput.value < 3000 &&
    modelSelector.value == "Other" &&
    !mandatoryNextButton
  ) {
    newModelLabel.classList.remove("invisible");
    newModelInput.classList.remove("invisible");
    newModelInput.setAttribute("required", "true");
    mandatoryFieldsModel.forEach((m) => m.setAttribute("required", "true"));
  }
});

//Listen for "Other" model name input
if (newModelInput) {
  newModelInput.addEventListener("input", () => {
    if (
      newModelInput.value !== "" &&
      newVariantLabel.classList.contains("invisible") &&
      newVariant.classList.contains("invisible")
    ) {
      newVariantLabel.classList.remove("invisible");
      newVariant.classList.remove("invisible");
      newVariant.setAttribute("required", "true");
    }
    if (newModelInput.value == "") {
      newVariant.value = "";
      newVariantLabel.classList.add("invisible");
      newVariant.classList.add("invisible");
      newVariant.setAttribute("required", "flase");
    }
  });
}

//Listen for year changes on year input
yearInput.addEventListener("input", () => {
  handleYearOrMakeChange();
});

//Listen for make changes on variant form
makeSelector.addEventListener("click", () => {
  handleYearOrMakeChange();
});

//Handle year or make changes on variant form
function handleYearOrMakeChange() {
  if (
    typeof Number(yearInput.value) == "number" &&
    Number(yearInput.value) > 1950 &&
    Number(yearInput.value) < 3000 &&
    makeSelector.value
  ) {
    carForm.setAttribute("action", "/inventory/add-car/get-models");
    carForm.submit();
  }
  if (
    typeof Number(yearInput.value) == "number" &&
    Number(yearInput.value) > 1950 &&
    Number(yearInput.value) < 3000 &&
    mandatoryNextButton //make sure form is variant one
  ) {
    let url = `/inventory/add-car/get-models-more/${yearInput.value}/${
      makeSelector.value.split(",")[1]
    }/status${carStatus.value}`;
    if (carMileage.value !== "") {
      url += `mileage${carMileage.value}`;
    }
    if (carColor.value !== "") {
      url += `color${carColor.value}`;
    }
    if (carPrice.value !== "") {
      url += `price${carPrice.value}`;
    }
    if (/mileage/.test(url) || /color/.test(url) || /price/.test(url)) {
      carForm.setAttribute("action", url);
    }
    if (!/mileage/.test(url) && !/color/.test(url) && !/price/.test(url)) {
      carForm.setAttribute(
        "action",
        `/inventory/add-car/get-models/${yearInput.value}/${
          makeSelector.value.split(",")[1]
        }`
      );
    }
    carForm.submit();
  }
}
