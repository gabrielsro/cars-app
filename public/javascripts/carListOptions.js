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
  //Options that, if selected, can show other cars given the constraints in place:
  const newOptions = {
    newMakes: [],
    newYears: [],
    newBodies: [],
    newEnergies: [],
    newPrices: [],
    newCountries: [],
  };
  //Options that, if selected, can apply more filters to the cars being shown:
  const optionsReduce = {
    makesReduce: [],
    yearsReduce: [],
    bodiesReduce: [],
    energiesReduce: [],
    pricesReduce: [],
    countriesReduce: [],
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

    const filter = Object.entries(selections);
    let passingScore = 0;
    filter.forEach((f) => {
      if (f[1] !== "all") {
        passingScore++;
      }
    });
    let score = 0;
    let fails = [];
    //Test make
    if (selections.currentMake !== "all") {
      if (selections.currentMake !== carMake) {
        cards[i].classList.add("invisible");
        fails.push({ option: "makes", value: carMake });
      } else {
        score += 1;
      }
    }
    //Test year
    if (selections.currentYear !== "all") {
      if (carYear !== selections.currentYear) {
        cards[i].classList.add("invisible");
        fails.push({ option: "years", value: carYear });
      } else {
        score += 1;
      }
    }
    //Test body
    if (selections.currentBody !== "all") {
      if (cards[i].dataset.body !== selections.currentBody) {
        cards[i].classList.add("invisible");
        fails.push({ option: "bodies", value: cards[i].dataset.body });
      } else {
        score += 1;
      }
    }
    //Test energy
    if (selections.currentEnergy !== "all") {
      if (cards[i].dataset.energy !== selections.currentEnergy) {
        cards[i].classList.add("invisible");
        fails.push({ option: "energies", value: cards[i].dataset.energy });
      } else {
        score += 1;
      }
    }
    //Test price
    if (selections.currentPrice !== "all") {
      if (cards[i].dataset.price !== selections.currentPrice) {
        cards[i].classList.add("invisible");
        fails.push({ option: "prices", value: cards[i].dataset.price });
      } else {
        score += 1;
      }
    }
    //Test country
    if (selections.currentCountry !== "all") {
      if (cards[i].dataset.location !== selections.currentCountry) {
        cards[i].classList.add("invisible");
        fails.push({ option: "countries", value: cards[i].dataset.location });
      } else {
        score += 1;
      }
    }
    //Check if constraints are met:
    //If failed test by 1, car COULD be shown by altering 1 option:
    if (score - passingScore == -1) {
      if (fails[0].option == "makes") {
        if (newOptions.newMakes.every((m) => m !== fails[0].value)) {
          newOptions.newMakes.push(fails[0].value);
        }
      }
      if (fails[0].option == "years") {
        if (newOptions.newYears.every((m) => m !== fails[0].value)) {
          newOptions.newYears.push(fails[0].value);
        }
      }
      if (fails[0].option == "bodies") {
        if (newOptions.newBodies.every((m) => m !== fails[0].value)) {
          newOptions.newBodies.push(fails[0].value);
        }
      }
      if (fails[0].option == "energies") {
        if (newOptions.newEnergies.every((m) => m !== fails[0].value)) {
          newOptions.newEnergies.push(fails[0].value);
        }
      }
      if (fails[0].option == "prices") {
        if (newOptions.newPrices.every((m) => m !== fails[0].value)) {
          newOptions.newPrices.push(fails[0].value);
        }
      }
      if (fails[0].option == "countries") {
        if (newOptions.newCountries.every((m) => m !== fails[0].value)) {
          newOptions.newCountries.push(fails[0].value);
        }
      }
    }
    //If passed test, car will be shown:
    if (score == passingScore) {
      cards[i].classList.remove("invisible");
      //Update optionsReduce with car's features:
      if (optionsReduce.makesReduce.every((m) => m !== carMake)) {
        optionsReduce.makesReduce.push(carMake);
      }
      if (optionsReduce.yearsReduce.every((m) => m !== carYear)) {
        optionsReduce.yearsReduce.push(carYear);
      }
      if (
        optionsReduce.bodiesReduce.every((m) => m !== cards[i].dataset.body)
      ) {
        optionsReduce.bodiesReduce.push(cards[i].dataset.body);
      }
      if (
        optionsReduce.energiesReduce.every((m) => m !== cards[i].dataset.energy)
      ) {
        optionsReduce.energiesReduce.push(cards[i].dataset.energy);
      }
      if (
        optionsReduce.pricesReduce.every((m) => m !== cards[i].dataset.price)
      ) {
        optionsReduce.pricesReduce.push(cards[i].dataset.price);
      }
      if (
        optionsReduce.countriesReduce.every(
          (m) => m !== cards[i].dataset.location
        )
      ) {
        optionsReduce.countriesReduce.push(cards[i].dataset.location);
      }
    }
  }
  //Get options to be shown in UI:
  const finalOptions = {
    finalMakes: Object.entries(newOptions)[0][1].concat(
      Object.entries(optionsReduce)[0][1]
    ),
    finalYears: Object.entries(newOptions)[1][1].concat(
      Object.entries(optionsReduce)[1][1]
    ),
    finalBodies: Object.entries(newOptions)[2][1].concat(
      Object.entries(optionsReduce)[2][1]
    ),
    finalEnergies: Object.entries(newOptions)[3][1].concat(
      Object.entries(optionsReduce)[3][1]
    ),
    finalPrices: Object.entries(newOptions)[4][1].concat(
      Object.entries(optionsReduce)[4][1]
    ),
    finalCountries: Object.entries(newOptions)[5][1].concat(
      Object.entries(optionsReduce)[5][1]
    ),
  };
  //Update UI options with found options:
  makes.forEach((m) => {
    if (m.value !== "all") {
      if (finalOptions.finalMakes.some((f) => f == m.value)) {
        m.classList.remove("invisible");
      } else {
        m.classList.add("invisible");
      }
    }
  });
  years.forEach((m) => {
    if (m.value !== "all") {
      if (finalOptions.finalYears.some((f) => f == m.value)) {
        m.classList.remove("invisible");
      } else {
        m.classList.add("invisible");
      }
    }
  });
  bodies.forEach((m) => {
    if (m.value !== "all") {
      if (finalOptions.finalBodies.some((f) => f == m.value)) {
        m.classList.remove("invisible");
      } else {
        m.classList.add("invisible");
      }
    }
  });
  energies.forEach((m) => {
    if (m.value !== "all") {
      if (finalOptions.finalEnergies.some((f) => f == m.value)) {
        m.classList.remove("invisible");
      } else {
        m.classList.add("invisible");
      }
    }
  });
  prices.forEach((m) => {
    if (m.value !== "all") {
      if (finalOptions.finalPrices.some((f) => f == m.value)) {
        m.classList.remove("invisible");
      } else {
        m.classList.add("invisible");
      }
    }
  });
  countries.forEach((m) => {
    if (m.value !== "all") {
      if (finalOptions.finalCountries.some((f) => f == m.value)) {
        m.classList.remove("invisible");
      } else {
        m.classList.add("invisible");
      }
    }
  });
}
