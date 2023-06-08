const makeSelector = document.getElementById("makeSelector");
const yearSelector = document.getElementById("yearSelector");
const bodySelector = document.getElementById("bodySelector");
const energySelector = document.getElementById("energySelector");
const priceSelector = document.getElementById("priceSelector");
const countrySelector = document.getElementById("countrySelector");
const cards = Array.from(document.querySelectorAll(".list-card"));
const years = Array.from(yearSelector.querySelectorAll("option"));
const bodies = Array.from(bodySelector.querySelectorAll("option"));
const energies = Array.from(energySelector.querySelectorAll("option"));
const prices = Array.from(priceSelector.querySelectorAll("option"));
const countries = Array.from(countrySelector.querySelectorAll("option"));

makeSelector.addEventListener("change", (e) => handleSelectorChange(e));
yearSelector.addEventListener("change", (e) => handleSelectorChange(e));
bodySelector.addEventListener("change", (e) => handleSelectorChange(e));
energySelector.addEventListener("change", (e) => handleSelectorChange(e));
priceSelector.addEventListener("change", (e) => handleSelectorChange(e));
countrySelector.addEventListener("change", (e) => handleSelectorChange(e));

function handleSelectorChange(e) {
  const newYears = [];
  const newBodies = [];
  const newEnergies = [];
  const newPrices = [];
  const newCountries = [];
  //Filter cards
  //makeSelector change?
  if (e.target.getAttribute("id") == "makeSelector") {
    cards.forEach((c) => {
      const carTitle = c.querySelector(".title p").innerText;
      if (!carTitle.match(e.target.value)) {
        c.classList.add("invisible");
      }
      if (carTitle.match(e.target.value)) {
        c.classList.remove("invisible");
        newYears.push(carTitle.split(" ")[0]);
        newBodies.push(c.dataset.body);
        newEnergies.push(c.dataset.energy);
        newCountries.push(c.dataset.location);
        newPrices.push(c.dataset.price);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }
  //yearSelector change?
  if (e.target.getAttribute("id") == "yearSelector") {
    cards.forEach((c) => {
      const carTitle = c.querySelector(".title p").innerText;
      const carYear = carTitle.split(" ")[0];
      if (!carYear.match(e.target.value)) {
        c.classList.add("invisible");
      }
      if (carYear.match(e.target.value)) {
        c.classList.remove("invisible");
        newYears.push(carTitle.split(" ")[0]);
        newBodies.push(c.dataset.body);
        newEnergies.push(c.dataset.energy);
        newCountries.push(c.dataset.location);
        newPrices.push(c.dataset.price);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }
  //bodySelector change?
  if (e.target.getAttribute("id") == "bodySelector") {
    cards.forEach((c) => {
      const carBody = c.dataset.body;
      if (!carBody.match(e.target.value)) {
        c.classList.add("invisible");
      }
      if (carBody.match(e.target.value)) {
        c.classList.remove("invisible");
        const carTitle = c.querySelector(".title p").innerText;
        newYears.push(carTitle.split(" ")[0]);
        newBodies.push(c.dataset.body);
        newEnergies.push(c.dataset.energy);
        newCountries.push(c.dataset.location);
        newPrices.push(c.dataset.price);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }
  //energySelector change?
  if (e.target.getAttribute("id") == "energySelector") {
    cards.forEach((c) => {
      const carEnergy = c.dataset.energy;
      if (!carEnergy.match(e.target.value)) {
        c.classList.add("invisible");
      }
      if (carEnergy.match(e.target.value)) {
        c.classList.remove("invisible");
        const carTitle = c.querySelector(".title p").innerText;
        newYears.push(carTitle.split(" ")[0]);
        newBodies.push(c.dataset.body);
        newEnergies.push(c.dataset.energy);
        newCountries.push(c.dataset.location);
        newPrices.push(c.dataset.price);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }
  //priceSelector change?
  if (e.target.getAttribute("id") == "priceSelector") {
    cards.forEach((c) => {
      const carPrice = c.dataset.price;
      if (!carPrice.match(e.target.value)) {
        c.classList.add("invisible");
      }
      if (carPrice.match(e.target.value)) {
        c.classList.remove("invisible");
        const carTitle = c.querySelector(".title p").innerText;
        newYears.push(carTitle.split(" ")[0]);
        newBodies.push(c.dataset.body);
        newEnergies.push(c.dataset.energy);
        newCountries.push(c.dataset.location);
        newPrices.push(c.dataset.price);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }
  //countrySelector change?
  if (e.target.getAttribute("id") == "countrySelector") {
    cards.forEach((c) => {
      const carCountry = c.dataset.location;
      if (!carCountry.match(e.target.value)) {
        c.classList.add("invisible");
      }
      if (carCountry.match(e.target.value)) {
        c.classList.remove("invisible");
        const carTitle = c.querySelector(".title p").innerText;
        newYears.push(carTitle.split(" ")[0]);
        newBodies.push(c.dataset.body);
        newEnergies.push(c.dataset.energy);
        newCountries.push(c.dataset.location);
        newPrices.push(c.dataset.price);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }

  //Update yearSelector options:
  years.forEach((year) => {
    if (year.value !== "all" && newYears.every((y) => y !== year.value)) {
      year.classList.add("invisible");
    }
    if (year.value !== "all" && newYears.some((y) => y == year.value)) {
      year.classList.remove("invisible");
    }
    if (e.target.value == "all") {
      year.classList.remove("invisible");
    }
  });
  //Update bodySelector options:
  bodies.forEach((body) => {
    if (body.value !== "all" && newBodies.every((b) => b !== body.value)) {
      body.classList.add("invisible");
    }
    if (body.value !== "all" && newBodies.some((b) => b == body.value)) {
      body.classList.remove("invisible");
    }
    if (e.target.value == "all") {
      body.classList.remove("invisible");
    }
  });
  //Update energySelector options:
  energies.forEach((energy) => {
    if (
      energy.value !== "all" &&
      newEnergies.every((b) => b !== energy.value)
    ) {
      energy.classList.add("invisible");
    }
    if (energy.value !== "all" && newEnergies.some((b) => b == energy.value)) {
      energy.classList.remove("invisible");
    }
    if (e.target.value == "all") {
      energy.classList.remove("invisible");
    }
  });
  //Update countrySelector options:
  countries.forEach((country) => {
    if (
      country.value !== "all" &&
      newCountries.every((b) => b !== country.value)
    ) {
      country.classList.add("invisible");
    }
    if (
      country.value !== "all" &&
      newCountries.some((b) => b == country.value)
    ) {
      country.classList.remove("invisible");
    }
    if (e.target.value == "all") {
      country.classList.remove("invisible");
    }
  });
  //Update priceSelector options:
  prices.forEach((price) => {
    if (price.value !== "all" && newPrices.every((b) => b !== price.value)) {
      price.classList.add("invisible");
    }
    if (price.value !== "all" && newPrices.some((b) => b == price.value)) {
      price.classList.remove("invisible");
    }
    if (e.target.value == "all") {
      price.classList.remove("invisible");
    }
  });
}
