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
const search = document.querySelector(".search input");
const options = document.querySelectorAll(".option select");
const carTitle = document.querySelector(".car-title");
const carBasicInfo = document.querySelector(".car-basic-info");
const technicalCards = document.querySelectorAll(".card-technical");
const makeHeader = document.querySelector(".make-header");
const versionHeader = document.querySelector(".version-header");
const formProgress = document.querySelector(".form-progress");
const blackIcons = document.querySelectorAll(".black");
const whiteIcons = document.querySelectorAll(".white");
const sidebar = document.querySelector(".side-bar");
const topBar = document.querySelector(".top");
const fzySearch = document.querySelector(".searchFuzzyResults");

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
    if (carTitle) {
      carTitle.style.background = "#eee";
      carBasicInfo.style.background = "#eee";
      technicalCards.forEach(
        (t) => (t.style.background = "rgb(238, 238, 238)")
      );
    }
    if (makeHeader) {
      makeHeader.style.background = "#eee";
    }
    if (versionHeader) {
      versionHeader.style.background = "#eee";
      technicalCards.forEach(
        (t) => (t.style.background = "rgb(238, 238, 238,0.3)")
      );
    }
    if (formProgress) {
      formProgress.style.background = "#eee";
    }
    blackIcons.forEach((b) => (b.style.display = "block"));
    whiteIcons.forEach((w) => (w.style.display = "none"));
    if (window.innerWidth < 945) {
      topBar.style.background = "white";
    }
    fzySearch.classList.remove("frozenBlack");
    fzySearch.classList.add("frozenWhite");
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
      if (carTitle) {
        carTitle.style.background = "black";
        carBasicInfo.style.background = "black";
        technicalCards.forEach((t) => {
          t.style.background = "rgb(0, 0, 0,0.7)";
          t.style.border = "1px solid #333333";
        });
      }
      if (makeHeader) {
        makeHeader.style.background = "black";
      }
      if (versionHeader) {
        versionHeader.style.background = "black";
        technicalCards.forEach((t) => (t.style.background = "#1a1a1a"));
      }
      if (formProgress) {
        formProgress.style.background = "#1a1a1a";
      }
      blackIcons.forEach((b) => (b.style.display = "none"));
      whiteIcons.forEach((w) => (w.style.display = "block"));
      if (window.innerWidth < 945) {
        topBar.style.background = "black";
      }
      fzySearch.classList.remove("frozenWhite");
      fzySearch.classList.add("frozenBlack");
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
      if (carTitle) {
        carTitle.style.background = "#eee";
        carBasicInfo.style.background = "#eee";
        technicalCards.forEach((t) => {
          t.style.background = "rgb(238, 238, 238,0.7)";
          t.style.border = "";
        });
      }
      if (makeHeader) {
        makeHeader.style.background = "#eee";
      }
      if (versionHeader) {
        versionHeader.style.background = "#eee";
        technicalCards.forEach((t) => (t.style.background = "#eee"));
      }
      if (formProgress) {
        formProgress.style.background = "#eee";
      }
      blackIcons.forEach((b) => (b.style.display = "block"));
      whiteIcons.forEach((w) => (w.style.display = "none"));
      if (window.innerWidth < 945) {
        topBar.style.background = "white";
      }
      fzySearch.classList.remove("frozenBlack");
      fzySearch.classList.add("frozenWhite");
    }
  }
}

setMode();

highBeamBlack.addEventListener("click", () => handleModeSelection("light"));
highBeamWhite.addEventListener("click", () => handleModeSelection("light"));
lowBeamBlack.addEventListener("click", () => handleModeSelection("dark"));
lowBeamWhite.addEventListener("click", () => handleModeSelection("dark"));

function handleModeSelection(modeSelection) {
  if (sidebar.classList.contains("visibleMenu")) {
    sidebar.classList.remove("visibleMenu");
  }
  localStorage.setItem("mode", modeSelection);
  setMode();
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 945) {
    sidebar.style.background = "";
    topBar.style.background = "";
    nav.classList.add("invisible");
  }
  if (window.innerWidth > 945 && sidebar.classList.contains("visibleMenu")) {
    sidebar.classList.remove("visibleMenu");
  }
  if (window.innerWidth < 945) {
    if (localStorage.getItem("mode") == "light") {
      topBar.style.background = "white";
      nav.classList.remove("invisible");
    }
    if (localStorage.getItem("mode") == "dark") {
      topBar.style.background = "black";
      nav.classList.remove("invisible");
    }
  }
});
