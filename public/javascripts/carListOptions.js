const makeSelector = document.getElementById("makeSelector");
const yearSelector = document.getElementById("yearSelector");
const bodySelector = document.getElementById("bodySelector");
const energySelector = document.getElementById("energySelector");
const priceSelector = document.getElementById("priceSelector");
const countrySelector = document.getElementById("countrySelector");
const cards = Array.from(document.querySelectorAll(".list-card"));
const makes = Array.from(makeSelector.querySelectorAll("option"));
const years = Array.from(yearSelector.querySelectorAll("option"));
const bodies = Array.from(bodySelector.querySelectorAll("option"));
const energies = Array.from(energySelector.querySelectorAll("option"));
const prices = Array.from(priceSelector.querySelectorAll("option"));
const countries = Array.from(countrySelector.querySelectorAll("option"));

makeSelector.addEventListener("change", (e) => adjustFilter(e));
yearSelector.addEventListener("change", (e) => adjustFilter(e));
bodySelector.addEventListener("change", (e) => adjustFilter(e));
energySelector.addEventListener("change", (e) => adjustFilter(e));
priceSelector.addEventListener("change", (e) => adjustFilter(e));
countrySelector.addEventListener("change", (e) => adjustFilter(e));

//currentSelections
const selections = {
  currentMake: "all",
  currentYear: "all",
  currentBody: "all",
  currentEnergy: "all",
  currentPrice: "all",
  currentCountry: "all",
};

function adjustFilter(e) {
  if (e.target.getAttribute("id") == "makeSelector") {
    selections.currentMake = e.target.value;
  }
  if (e.target.getAttribute("id") == "yearSelector") {
    selections.currentYear = e.target.value;
  }
  if (e.target.getAttribute("id") == "bodySelector") {
    selections.currentBody = e.target.value;
  }
  if (e.target.getAttribute("id") == "energySelector") {
    selections.currentEnergy = e.target.value;
  }
  if (e.target.getAttribute("id") == "priceSelector") {
    selections.currentPrice = e.target.value;
  }
  if (e.target.getAttribute("id") == "countrySelector") {
    selections.currentCountry = e.target.value;
  }
  updateCards();
}

function updateCards() {
  //newOptions
  const options = {
    newMakes: [],
    newYears: [],
    newBodies: [],
    newEnergies: [],
    newPrices: [],
    newCountries: [],
  };
  for (let i = 0; i < cards.length; i++) {
    const carTitle = cards[i].querySelector(".title p").innerText;
    const carYear = carTitle.split(" ")[0];
    const carMake = cards[i]
      .querySelector(".card-logo img")
      .getAttribute("alt")
      .split(" ")
      .slice(0, -1)
      .join(" ");
    let score = 0;
    //Test make
    if (selections.currentMake == "all") {
      score += 1;
    }
    if (selections.currentMake !== "all") {
      if (selections.currentMake !== carMake) {
        cards[i].classList.add("invisible");
        continue;
      }
      score += 1;
    }
    //Test year
    if (selections.currentYear == "all") {
      score += 1;
    }
    if (selections.currentYear !== "all") {
      if (carYear !== selections.currentYear) {
        cards[i].classList.add("invisible");
        continue;
      }
      score += 1;
    }
    //Test body
    if (selections.currentBody == "all") {
      score += 1;
    }
    if (selections.currentBody !== "all") {
      if (cards[i].dataset.body !== selections.currentBody) {
        cards[i].classList.add("invisible");
        continue;
      }
      score += 1;
    }
    //Test energy
    if (selections.currentEnergy == "all") {
      score += 1;
    }
    if (selections.currentEnergy !== "all") {
      if (cards[i].dataset.energy !== selections.currentEnergy) {
        cards[i].classList.add("invisible");
        continue;
      }
      score += 1;
    }
    //Test price
    if (selections.currentPrice == "all") {
      score += 1;
    }
    if (selections.currentPrice !== "all") {
      if (cards[i].dataset.price !== selections.currentPrice) {
        cards[i].classList.add("invisible");
        continue;
      }
      score += 1;
    }
    //Test country
    if (selections.currentCountry == "all") {
      score += 1;
    }
    if (selections.currentCountry !== "all") {
      if (cards[i].dataset.location !== selections.currentCountry) {
        cards[i].classList.add("invisible");
        continue;
      }
      score += 1;
    }
    //Check if constraints are met
    if (score == 6) {
      cards[i].classList.remove("invisible");
      //Get new options:
      if (options.newMakes.every((m) => m !== carMake)) {
        options.newMakes.push(carMake);
      }
      if (options.newYears.every((y) => y !== carYear)) {
        options.newYears.push(carYear);
      }
      if (options.newBodies.every((b) => b !== cards[i].dataset.body)) {
        options.newBodies.push(cards[i].dataset.body);
      }
      if (options.newEnergies.every((e) => e !== cards[i].dataset.energy)) {
        options.newEnergies.push(cards[i].dataset.energy);
      }
      if (options.newPrices.every((p) => p !== cards[i].dataset.price)) {
        options.newPrices.push(cards[i].dataset.price);
      }
      if (options.newCountries.every((c) => c !== cards[i].dataset.location)) {
        options.newCountries.push(cards[i].dataset.location);
      }
      //Update options:
      makes.forEach((m) => {
        if (options.newMakes.some((n) => n == m.value)) {
          m.classList.remove("invisible");
        }
        if (options.newMakes.every((n) => n !== m.value)) {
          m.classList.add("invisible");
        }
      });
      years.forEach((y) => {
        if (options.newYears.some((n) => n == y.value)) {
          y.classList.remove("invisible");
        }
        if (options.newYears.every((n) => n !== y.value)) {
          y.classList.add("invisible");
        }
      });
      bodies.forEach((b) => {
        if (options.newBodies.some((n) => n == b.value)) {
          b.classList.remove("invisible");
        }
        if (options.newBodies.every((n) => n !== b.value)) {
          b.classList.add("invisible");
        }
      });
      energies.forEach((e) => {
        if (options.newEnergies.some((n) => n == e.value)) {
          e.classList.remove("invisible");
        }
        if (options.newEnergies.every((n) => n !== e.value)) {
          e.classList.add("invisible");
        }
      });
      prices.forEach((p) => {
        if (options.newPrices.some((n) => n == p.value)) {
          p.classList.remove("invisible");
        }
        if (options.newPrices.every((n) => n !== p.value)) {
          p.classList.add("invisible");
        }
      });
      countries.forEach((c) => {
        if (options.newCountries.some((n) => n == c.value)) {
          c.classList.remove("invisible");
        }
        if (options.newCountries.every((n) => n !== c.value)) {
          c.classList.add("invisible");
        }
      });
    }
  }
}

/**
 *
 * OLD CODE
 */

function handleSelectorChange(e) {
  //Options to be shown:
  const newMakes = [];
  const newYears = [];
  const newBodies = [];
  const newEnergies = [];
  const newPrices = [];
  const newCountries = [];

  //Filter cards
  //makeSelector change?
  if (e.target.getAttribute("id") == "makeSelector") {
    currentMake = e.target.value;
    cards.forEach((c) => {
      const carTitle = c.querySelector(".title p").innerText;
      if (!carTitle.match(e.target.value)) {
        c.classList.add("invisible");
        if (hiddenCards.every((h) => h !== c.dataset.number)) {
          hiddenCards.push(c.dataset.number);
        }
      }
      if (
        carTitle.match(e.target.value) &&
        hiddenCards.every((h) => h !== c.dataset.number)
      ) {
        c.classList.remove("invisible");
        newYears.push(carTitle.split(" ")[0]);
        newBodies.push(c.dataset.body);
        newEnergies.push(c.dataset.energy);
        newCountries.push(c.dataset.location);
        newPrices.push(c.dataset.price);
      }
      if (e.target.value == "all") {
        //ALLs ARE A SPECIAL CASE PENDING REVISION
        c.classList.remove("invisible");
      }
    });
  }
  //yearSelector change?
  if (e.target.getAttribute("id") == "yearSelector") {
    currentYear = e.target.value;
    cards.forEach((c) => {
      const carTitle = c.querySelector(".title p").innerText;
      const carYear = carTitle.split(" ")[0];
      const carMake = c
        .querySelector(".card-logo img")
        .getAttribute("alt")
        .split(" ")
        .slice(0, -1)
        .join(" ");
      if (!carYear.match(e.target.value)) {
        c.classList.add("invisible");
        if (hiddenCards.every((h) => h !== c.dataset.number)) {
          hiddenCards.push(c.dataset.number);
        }
      }
      if (
        carYear.match(e.target.value) &&
        hiddenCards.every((h) => h !== c.dataset.number)
      ) {
        c.classList.remove("invisible");
        newBodies.push(c.dataset.body);
        newEnergies.push(c.dataset.energy);
        newCountries.push(c.dataset.location);
        newPrices.push(c.dataset.price);
        newMakes.push(carMake);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }
  //bodySelector change?
  if (e.target.getAttribute("id") == "bodySelector") {
    currentBody = e.target.value;
    cards.forEach((c) => {
      const carMake = c
        .querySelector(".card-logo img")
        .getAttribute("alt")
        .split(" ")
        .slice(0, -1)
        .join(" ");
      const carBody = c.dataset.body;
      if (!carBody.match(e.target.value)) {
        c.classList.add("invisible");
      }
      if (carBody.match(e.target.value)) {
        c.classList.remove("invisible");
        const carTitle = c.querySelector(".title p").innerText;
        newYears.push(carTitle.split(" ")[0]);
        newEnergies.push(c.dataset.energy);
        newCountries.push(c.dataset.location);
        newPrices.push(c.dataset.price);
        newMakes.push(carMake);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }
  //energySelector change?
  if (e.target.getAttribute("id") == "energySelector") {
    currentEnergy = e.target.value;
    cards.forEach((c) => {
      const carMake = c
        .querySelector(".card-logo img")
        .getAttribute("alt")
        .split(" ")
        .slice(0, -1)
        .join(" ");
      const carEnergy = c.dataset.energy;
      if (!carEnergy.match(e.target.value)) {
        c.classList.add("invisible");
      }
      if (carEnergy.match(e.target.value)) {
        c.classList.remove("invisible");
        const carTitle = c.querySelector(".title p").innerText;
        newYears.push(carTitle.split(" ")[0]);
        newBodies.push(c.dataset.body);
        newCountries.push(c.dataset.location);
        newPrices.push(c.dataset.price);
        newMakes.push(carMake);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }
  //priceSelector change?
  if (e.target.getAttribute("id") == "priceSelector") {
    currentPrice = e.target.value;
    cards.forEach((c) => {
      const carMake = c
        .querySelector(".card-logo img")
        .getAttribute("alt")
        .split(" ")
        .slice(0, -1)
        .join(" ");
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
        newMakes.push(carMake);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }
  //countrySelector change?
  if (e.target.getAttribute("id") == "countrySelector") {
    currentCountry = e.target.value;
    cards.forEach((c) => {
      const carMake = c
        .querySelector(".card-logo img")
        .getAttribute("alt")
        .split(" ")
        .slice(0, -1)
        .join(" ");
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
        newPrices.push(c.dataset.price);
        newMakes.push(carMake);
      }
      if (e.target.value == "all") {
        c.classList.remove("invisible");
      }
    });
  }

  //Update yearSelector options:
  if (newYears.length > 0) {
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
  }
  //Update bodySelector options:
  if (newBodies.length > 0) {
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
  }
  //Update energySelector options:
  if (newEnergies.length > 0) {
    energies.forEach((energy) => {
      if (
        energy.value !== "all" &&
        newEnergies.every((b) => b !== energy.value)
      ) {
        energy.classList.add("invisible");
      }
      if (
        energy.value !== "all" &&
        newEnergies.some((b) => b == energy.value)
      ) {
        energy.classList.remove("invisible");
      }
      if (e.target.value == "all") {
        energy.classList.remove("invisible");
      }
    });
  }
  //Update countrySelector options:
  if (newCountries.length > 0) {
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
  }
  //Update priceSelector options:
  if (newPrices.length > 0) {
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
  //Update makeSelector options:
  if (newMakes.length > 0) {
    makes.forEach((make) => {
      if (make.value !== "all" && newMakes.every((b) => b !== make.value)) {
        make.classList.add("invisible");
      }
      if (make.value !== "all" && newMakes.some((b) => b == make.value)) {
        make.classList.remove("invisible");
      }
      if (e.target.value == "all") {
        make.classList.remove("invisible");
      }
    });
  }
}
