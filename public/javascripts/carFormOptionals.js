const mandatory = document.getElementById("mandatoryFieldset");
const optionalsInfo = document.getElementById("optionalInfo");
const optionalsMore = document.getElementById("optionalMore");
const mandatoryInputs = document.querySelectorAll(".mandatory input");
const mandatorySelects = document.querySelectorAll(".mandatory select");
const mandatoryFields = [...mandatoryInputs, ...mandatorySelects];
const mandatoryButtons = document.querySelector(".mandatory-fieldset-buttons");
const mandatoryButton = document.querySelector(
  ".mandatory-fieldset-buttons button"
);
const mandatoryForm = document.getElementById("mandatoryFieldset");
const optionalInputs = document.querySelectorAll(".optionalInfo input");
const optionalSelects = document.querySelectorAll(".optionalInfo select");
const optionalFields = [...optionalInputs, ...optionalSelects];
const optionalButtonPrevious = document.querySelector(
  ".optional-fieldset-buttons > button:first-child"
);
const optionalButtonNext = document.querySelector(
  ".optional-fieldset-buttons > button:nth-child(2)"
);
const moreButtonPrevious = document.getElementById("morePrevious");
const vehicleSectionTitle = document.querySelector(
  ".form-progress > .stage:first-child h2"
);
const contactSectionTitle = document.querySelector(
  ".form-progress > .stage:nth-child(2) h2"
);
const additionalSectionTitle = document.querySelector(
  ".form-progress > .stage:last-child h2"
);

vehicleSectionTitle.addEventListener("click", () => {
  mandatory.classList.remove("invisible");
  optionalsInfo.classList.add("invisible");
  optionalsMore.classList.add("invisible");
  vehicleSectionTitle.classList.add("selectedText");
  contactSectionTitle.classList.remove("selectedText");
  additionalSectionTitle.classList.remove("selectedText");
  if (mandatoryFields.every((m) => m.checkValidity())) {
    mandatoryButtons.classList.remove("invisible");
  } else {
    mandatoryButtons.classList.add("invisible");
  }
});

contactSectionTitle.addEventListener("click", () => {
  if (contactSectionTitle.classList.contains("selectable")) {
    mandatory.classList.add("invisible");
    optionalsInfo.classList.remove("invisible");
    optionalsMore.classList.add("invisible");
    vehicleSectionTitle.classList.remove("selectedText");
    contactSectionTitle.classList.add("selectedText");
    additionalSectionTitle.classList.remove("selectedText");
  }
});

additionalSectionTitle.addEventListener("click", () => {
  if (additionalSectionTitle.classList.contains("selectable")) {
    mandatory.classList.add("invisible");
    optionalsInfo.classList.add("invisible");
    optionalsMore.classList.remove("invisible");
    vehicleSectionTitle.classList.remove("selectedText");
    contactSectionTitle.classList.remove("selectedText");
    additionalSectionTitle.classList.add("selectedText");
  }
});

mandatoryFields.forEach((f) => {
  f.addEventListener("input", () => {
    if (mandatoryFields.every((m) => m.checkValidity())) {
      mandatoryButtons.classList.remove("invisible");
      contactSectionTitle.classList.remove("unselectable");
      contactSectionTitle.classList.add("selectable");
      additionalSectionTitle.classList.remove("unselectable");
      additionalSectionTitle.classList.add("selectable");
    } else {
      mandatoryButtons.classList.add("invisible");
      contactSectionTitle.classList.add("unselectable");
      contactSectionTitle.classList.remove("selectable");
      additionalSectionTitle.classList.add("unselectable");
      additionalSectionTitle.classList.remove("selectable");
    }
  });
});

mandatoryButton.addEventListener("click", () => {
  mandatoryForm.classList.add("invisible");
  mandatoryButtons.classList.add("invisible");
  optionalsInfo.classList.remove("invisible");
  vehicleSectionTitle.classList.remove("selectedText");
  contactSectionTitle.classList.add("selectedText");
});

optionalFields.forEach((f) => {
  f.addEventListener("input", () => {
    if (optionalFields.every((o) => o.checkValidity())) {
      optionalButtonNext.classList.remove("invisible");
    }
  });
});

optionalButtonPrevious.addEventListener("click", () => {
  optionalsInfo.classList.add("invisible");
  mandatory.classList.remove("invisible");
  contactSectionTitle.classList.remove("selectedText");
  vehicleSectionTitle.classList.add("selectedText");
  if (mandatoryFields.every((m) => m.checkValidity())) {
    mandatoryButtons.classList.remove("invisible");
  } else {
    mandatoryButtons.classList.add("invisible");
  }
});

optionalButtonNext.addEventListener("click", () => {
  optionalsInfo.classList.add("invisible");
  optionalsMore.classList.remove("invisible");
  contactSectionTitle.classList.remove("selectedText");
  additionalSectionTitle.classList.add("selectedText");
});

moreButtonPrevious.addEventListener("click", () => {
  optionalsMore.classList.add("invisible");
  optionalsInfo.classList.remove("invisible");
  additionalSectionTitle.classList.remove("selectedText");
  contactSectionTitle.classList.add("selectedText");
});
