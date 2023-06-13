const switches = document.querySelectorAll(".carUpdateSwitch");
const inputs = document.querySelectorAll("input");
const selects = document.querySelectorAll("select");
const labels = document.querySelectorAll("label");
const noChanges = document.querySelector(".formNoChanges");
const changesConfirmation = document.querySelector(".formChangesConfirmation");
const restore = document.querySelector(".formChangesConfirmation>p");
const save = document.querySelector(".formChangesConfirmation>p:nth-child(2)");
const savingOptions = document.querySelector(".formChangesOptions");
const looksGood = document.querySelector(".formNoChanges p");
const allVersions = document.querySelector(
  ".formChangesOptions div>p:nth-child(2)"
);
const currentVersion = document.querySelector(".formChangesOptions div>p");
const form = document.getElementById("formUpdateCar");

looksGood.addEventListener("click", () => {
  window.location.href = `/inventory/car/${looksGood.dataset.id}/page/${looksGood.dataset.model}`;
});

changesConfirmation.style.display = "none";

restore.addEventListener("click", () => location.reload());
save.addEventListener("click", () => {
  savingOptions.classList.remove("invisible");
  changesConfirmation.style.display = "none";
  changesConfirmation.setAttribute("data-modification", "true");
});

inputs.forEach((i) =>
  i.addEventListener("input", (c) => {
    handleUnitConversion(c.target);
    noChanges.classList.add("invisible");
    if (!changesConfirmation.getAttribute("data-modification")) {
      changesConfirmation.style.display = "flex";
    }
    if (c.target.classList.contains("car")) {
      allVersions.setAttribute("data-carChange", `true`);
      currentVersion.setAttribute("data-carChange", `true`);
    }
    if (c.target.classList.contains("version")) {
      allVersions.setAttribute("data-versionChange", `true`);
      currentVersion.setAttribute("data-versionChange", `true`);
    }
  })
);

allVersions.addEventListener("click", () => {
  if (
    allVersions.getAttribute("data-versionChange") &&
    allVersions.getAttribute("data-carChange")
  ) {
    //Version and car where changed. Update both
    form.setAttribute(
      "action",
      `/inventory/car_version_update/${allVersions.dataset.car}/${allVersions.dataset.version}/true/true`
    );
    form.submit();
    return;
  }
  if (allVersions.getAttribute("data-versionChange")) {
    //Version was changed. Update version
    form.setAttribute(
      "action",
      `/inventory/car_version_update/${allVersions.dataset.car}/${allVersions.dataset.version}/false/true`
    );
    form.submit();
    return;
  }
  if (allVersions.getAttribute("data-carChange")) {
    //Car was changed. Update car
    form.setAttribute(
      "action",
      `/inventory/car_version_update/${allVersions.dataset.car}/${allVersions.dataset.version}/true/false`
    );
    form.submit();
  }
});

currentVersion.addEventListener("click", () => {
  if (
    currentVersion.getAttribute("data-versionChange") &&
    currentVersion.getAttribute("data-carChange")
  ) {
    //Version and car where changed. Update both
    return;
  }
  if (currentVersion.getAttribute("data-versionChange")) {
    //Version was changed. Update version
    return;
  }
  if (currentVersion.getAttribute("data-carChange")) {
    //Car was changed. Update car
  }
});

selects.forEach((s) => {
  s.addEventListener("input", (c) => {
    noChanges.classList.add("invisible");
    if (!changesConfirmation.getAttribute("data-modification")) {
      changesConfirmation.style.display = "flex";
    }
    if (c.target.classList.contains("car")) {
      allVersions.setAttribute("data-carChange", `true`);
      currentVersion.setAttribute("data-carChange", `true`);
    }
    if (c.target.classList.contains("version")) {
      allVersions.setAttribute("data-versionChange", `true`);
      currentVersion.setAttribute("data-versionChange", `true`);
    }
  });
});

switches.forEach((s) => {
  s.addEventListener("click", (c) => handleSwitchClick(c.target));
});

function initialConversion() {
  inputs.forEach((i) => {
    if (i.value) {
      if (i.classList.contains("imperial") || i.classList.contains("metric")) {
        handleUnitConversion(i);
      }
    }
  });
}

function handleUnitConversion(c) {
  const field = c.classList[0];
  const initialSystem = c.classList[1];
  let conversion;
  if (initialSystem == "metric") {
    if (
      field == "mileage" ||
      field == "speed" ||
      field == "efficiencyHighway" ||
      field == "efficiencyMixed" ||
      field == "efficiencyCity"
    ) {
      const kmToMile = 0.625;
      conversion = kmToMile;
    }
    if (field == "weight") {
      const kgToLb = 2.204;
      conversion = kgToLb;
    }
    if (field == "length" || field == "width" || field == "height") {
      const mMToIn = 0.03937;
      conversion = mMToIn;
    }
    for (let i = 0; i < inputs.length; i++) {
      if (
        inputs[i].classList.contains(field) &&
        inputs[i].classList.contains("imperial")
      ) {
        inputs[i].value = Math.round(conversion * c.value * 100) / 100;
        break;
      }
    }
  }
  if (initialSystem == "imperial") {
    let conversion;
    if (
      field == "mileage" ||
      field == "speed" ||
      field == "efficiencyHighway" ||
      field == "efficiencyMixed" ||
      field == "efficiencyCity"
    ) {
      const mileToKm = 1.6;
      conversion = mileToKm;
    }
    if (field == "weight") {
      const lbToKg = 0.453;
      conversion = lbToKg;
    }
    if (field == "length" || field == "width" || field == "height") {
      const inToMm = 25.4;
      conversion = inToMm;
    }
    for (let i = 0; i < inputs.length; i++) {
      if (
        inputs[i].classList.contains(field) &&
        inputs[i].classList.contains("metric")
      ) {
        inputs[i].value = Math.round(conversion * c.value * 100) / 100;
        break;
      }
    }
  }
}

function handleSwitchClick(c) {
  c.classList.toggle("invisible");
  const field = c.classList[1];
  const system = c.classList[2];
  for (let i = 0; i < labels.length; i++) {
    let count = 0;
    if (
      labels[i].classList.contains(field) &&
      labels[i].classList.contains(system)
    ) {
      labels[i].classList.toggle("invisible");
      count++;
    }
    if (
      labels[i].classList.contains(field) &&
      !labels[i].classList.contains(system)
    ) {
      labels[i].classList.toggle("invisible");
      count++;
    }
    if (count > 1) {
      break;
    }
  }
  for (let i = 0; i < inputs.length; i++) {
    let count = 0;
    if (
      inputs[i].classList.contains(field) &&
      inputs[i].classList.contains(system)
    ) {
      inputs[i].classList.toggle("invisible");
      count++;
    }
    if (
      inputs[i].classList.contains(field) &&
      !inputs[i].classList.contains(system)
    ) {
      inputs[i].classList.toggle("invisible");
      count++;
    }
    if (count > 1) {
      break;
    }
  }
  for (let i = 0; i < switches.length; i++) {
    if (
      switches[i].classList.contains(field) &&
      !switches[i].classList.contains(system)
    ) {
      switches[i].classList.toggle("invisible");
      break;
    }
  }
}

initialConversion();
