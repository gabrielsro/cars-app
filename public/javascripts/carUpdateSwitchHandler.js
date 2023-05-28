const switches = document.querySelectorAll(".carUpdateSwitch");
const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");

inputs.forEach((i) =>
  i.addEventListener("change", (c) => handleUnitConversion(c.target))
);

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
      const mToIn = 39.37;
      conversion = mToIn;
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
      const inToM = 0.0254;
      conversion = inToM;
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
