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

makeSelector.addEventListener("change", (e) => {
  const newYears = [];
  const newBodies = [];
  const newEnergies = [];
  const newPrices = [];
  const newCountries = [];
  //Filter cards
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
});
