const carForm = document.querySelector("form");
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
    carFormButton.classList.remove("invisible");
    vehicleSectionTitleModel.classList.remove("unselectable");
    contactSectionTitleModel.classList.remove("unselectable");
    additionalSectionTitleModel.classList.remove("unselectable");
    contactSectionTitleModel.classList.add("selectable");
    additionalSectionTitleModel.classList.add("selectable");
  }
  if (!mandatoryFieldsModel.every((f) => f.checkValidity()) && carFormButton) {
    carFormButton.classList.add("invisible");
    contactSectionTitleModel.classList.remove("selectable");
    additionalSectionTitleModel.classList.remove("selectable");
    contactSectionTitleModel.classList.add("unselectable");
    additionalSectionTitleModel.classList.add("unselectable");
  }
}

modelSelector.addEventListener("change", () => {
  if (
    yearInput.value > 1950 &&
    yearInput.value < 3000 &&
    modelSelector.value !== "other"
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
  if (
    yearInput.value > 1950 &&
    yearInput.value < 3000 &&
    modelSelector.value == "other"
  ) {
    newModelLabel.classList.remove("invisible");
    newModelInput.classList.remove("invisible");
    newModelInput.setAttribute("required", "true");
    mandatoryFieldsModel.forEach((m) => m.setAttribute("required", "true"));
  }
});

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
