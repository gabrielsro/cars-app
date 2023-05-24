const highBeamBlack = document.getElementById("highBeamBlack");
const highBeamWhite = document.getElementById("highBeamWhite");
const lowBeamBlack = document.getElementById("lowBeamBlack");
const lowBeamWhite = document.getElementById("lowBeamWhite");
const searchBlack = document.getElementById("searchBlack");
const searchWhite = document.getElementById("searchWhite");
const nav = document.querySelector("nav");
const all = document.querySelector("*");
const cardTitle = document.querySelectorAll(".card-text .title p");
const cardFooter = document.querySelectorAll(".card-text .footer p");
const search = document.querySelector(".search-bar input");
const options = document.querySelectorAll(".option select");

function setMode() {
  let mode = localStorage.getItem("mode");
  if (!mode) {
    all.classList.remove("dark");
    nav.classList.remove("dark");
    cardTitle.forEach((p) => (p.style.color = "black"));
    cardFooter.forEach((p) => (p.style.color = "black"));
    search.style.background = "white";
    search.style.color = "black";
    options.forEach((o) => (o.style.background = "grey"));
  }
  if (mode) {
    if (mode == "dark") {
      all.classList.add("dark");
      nav.classList.add("dark");
      highBeamBlack.classList.add("invisible");
      lowBeamBlack.classList.add("invisible");
      searchBlack.classList.add("invisible");
      highBeamWhite.classList.remove("invisible");
      lowBeamWhite.classList.remove("invisible");
      searchWhite.classList.remove("invisible");
      cardTitle.forEach((p) => (p.style.color = "white"));
      cardFooter.forEach((p) => (p.style.color = "white"));
      search.style.background = "#1a1a1a";
      search.style.color = "white";
      options.forEach((o) => {
        o.style.background = "#1a1a1a";
        o.style.color = "white";
        o.style.border = "1px solid #1a1a1a";
      });
    }
    if (mode == "light") {
      all.classList.remove("dark");
      nav.classList.remove("dark");
      highBeamBlack.classList.remove("invisible");
      lowBeamBlack.classList.remove("invisible");
      searchBlack.classList.remove("invisible");
      highBeamWhite.classList.add("invisible");
      lowBeamWhite.classList.add("invisible");
      searchWhite.classList.add("invisible");
      cardTitle.forEach((p) => (p.style.color = "black"));
      cardFooter.forEach((p) => (p.style.color = "black"));
      search.style.background = "white";
      search.style.color = "black";
      options.forEach((o) => {
        o.style.background = "white";
        o.style.border = "1px solid grey";
        o.style.color = "black";
      });
    }
  }
}

setMode();

highBeamBlack.addEventListener("click", () => handleModeSelection("light"));
highBeamWhite.addEventListener("click", () => handleModeSelection("light"));
lowBeamBlack.addEventListener("click", () => handleModeSelection("dark"));
lowBeamWhite.addEventListener("click", () => handleModeSelection("dark"));

function handleModeSelection(modeSelection) {
  localStorage.setItem("mode", modeSelection);
  setMode();
}
