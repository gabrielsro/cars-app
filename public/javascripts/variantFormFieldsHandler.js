const modelField = document.getElementById("carModel");
const makeField = document.getElementById("carMake");
const yearField = document.getElementById("carYear");
const lastMandatoryForm = document.querySelector(".form-add-car");
const mileageField = document.getElementById("carMileage");
const priceField = document.getElementById("carPrice");
const colorField = document.getElementById("carColor");
const statusField = document.getElementById("carStatus");
const newModelLbl = document.getElementById("labelForNewModel");
const newModelInpt = document.getElementById("newModelFromVariantForm");
const newVariantLbl = document.getElementById("labelForNewVariant");
const newVariantInpt = document.getElementById("newVariantFromVariantForm");
const variantLabel = document.querySelector(".variantLabel");
const variantSelect = document.getElementById("carVariants");
const lastBtn = document.getElementById("lastBtn");

lastBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (newModelInput.value) {
    newModelInput.setAttribute("name", "model");
    modelSelector.setAttribute("name", "");
  }
  if (modelSelector.value !== "Other") {
    newModelInpt.setAttribute("name", "");
    modelSelector.setAttribute("name", "model");
  }
  carForm.submit();
});

//Listen for changes on Model select element
modelField.addEventListener("change", () => {
  if (
    yearField.value &&
    yearField.value > 1950 &&
    yearField.value < 3000 &&
    modelField.value
  ) {
    const colorVal = colorField.value ? colorField.value : "unspecified";
    const statusVal = statusField.value ? statusField.value : "unspecified";
    const priceVal = priceField.value ? priceField.value : "unspecified";
    const mileageVal = mileageField.value ? mileageField.value : "unspecified";
    lastMandatoryForm.setAttribute(
      "action",
      `/inventory/add-car/get-models-model-change/${yearField.value}/${
        makeField.value.split(",")[1]
      }/${modelField.value}/${mileageVal}/${priceVal}/${colorVal}/${statusVal}`
    );
    lastMandatoryForm.submit();
  }
  if (modelField.value == "Other") {
    newModelLbl.classList.remove("invisible");
    newModelInpt.classList.remove("invisible");
    newModelInpt.setAttribute("required", "true");
    variantLabel.classList.add("invisible");
    variantSelect.setAttribute("required", "false");
    variantSelect.classList.add("invisible");
  }
  if (modelField.value !== "Other") {
    newModelLbl.classList.add("invisible");
    newModelInpt.classList.add("invisible");
    newModelInpt.value = "";
    newModelInpt.setAttribute("required", "false");
    newVariantLbl.classList.add("invisible");
    newVariantInpt.classList.add("invisible");
    newVariantInpt.value = "";
    newVariantInpt.setAttribute("required", "false");
    variantLabel.classList.remove("invisible");
    variantSelect.setAttribute("required", "true");
    variantSelect.classList.remove("invisible");
  }
});

//Listen for input on newModelInpt element
newModelInpt.addEventListener("input", () => {
  if (newModelInpt.value !== "") {
    newVariantLbl.classList.remove("invisible");
    newVariantInpt.classList.remove("invisible");
    newVariantInpt.setAttribute("required", "true");
  }
  if (newModelInpt.value == "") {
    newVariantLbl.classList.add("invisible");
    newVariantInpt.classList.add("invisible");
    newVariantInpt.setAttribute("required", "false");
  }
});
