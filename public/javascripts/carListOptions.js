const makeSelector = document.getElementById("makeSelector");
const yearSelector = document.getElementById("yearSelector");
const bodySelector = document.getElementById("bodySelector");
const energySelector = document.getElementById("energySelector");
const priceSelector = document.getElementById("priceSelector");
const countrySelector = document.getElementById("countrySelector");
const cards = Array.from(document.querySelectorAll(".list-card"));
const years = Array.from(yearSelector.querySelectorAll("option"));

makeSelector.addEventListener("change", (e) => {
  const newYears = [];
  //Filter cards
  cards.forEach((c) => {
    const carTitle = c.querySelector(".title p").innerText;
    if (!carTitle.match(e.target.value)) {
      c.classList.add("invisible");
    }
    if (carTitle.match(e.target.value)) {
      c.classList.remove("invisible");
      newYears.push(carTitle.split(" ")[0]);
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
});
