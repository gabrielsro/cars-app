const deleteOption = document.getElementById("delete-option");
const btnNo = document.getElementById("btn-delete-no");
const btnYes = document.getElementById("btn-delete-yes");
const warning = document.querySelector(".delete-warning");
const makeMore = document.querySelector(".make-more");
let make = document.querySelector("h1").innerText;
if (/^ford/i.test(make)) {
  make = "Ford Motor Company";
}
if (/^jaguar/i.test(make)) {
  make = "Jaguar Cars";
}
if (/^seat/i.test(make)) {
  make = "SEAT";
}
if (/^tesla/i.test(make)) {
  make = "Tesla, Inc.";
}
make = /-/.test(make) ? "Rolls-Royce_Motor_Cars" : make.split("-").join("_");
let showingWarning = false;

let url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exsentences=10&titles=${make}&format=json`;

async function wikipedia(url) {
  const fetched = await fetch(url);
  const json = await fetched.json();
  return Object.values(json.query.pages)[0].extract;
}

wikipedia(url)
  .then((data) => {
    let description = document.createElement("div");
    description.classList.add("makeDescriptionContainer");
    let intro = data.split("<h2>")[0];
    description.innerHTML = intro;
    makeMore.appendChild(description);
  })
  .then(descriptionSize);

//Handle screen resizing:
window.addEventListener("resize", descriptionSize);

function descriptionSize() {
  const descriptionDiv = document.querySelector(".make-more > div");
  if (descriptionDiv.offsetHeight / window.innerHeight > 0.1) {
    const descriptionContainer = document.querySelector(".make-more");
    const showMore = document.createElement("p");
    showMore.innerText = "Show more";
    showMore.classList.add("makeDescriptionController");
    const showLess = document.createElement("p");
    showLess.innerText = "Show less";
    showLess.setAttribute("id", "showLess");
    showLess.classList.add("makeDescriptionController");
    const containerHeight = 0.1 * window.innerHeight;
    descriptionDiv.style.height = `${containerHeight}px`;
    const showController = document.querySelector(".makeDescriptionController");
    if (!showController) {
      descriptionContainer.appendChild(showMore);
    }
    showMore.addEventListener("click", () => {
      descriptionDiv.style.height = "auto";
      descriptionContainer.removeChild(showMore);
      showLess.style.color = "#FF4500";
      descriptionContainer.appendChild(showLess);
    });
    showLess.addEventListener("click", () => {
      let containerHeight = 0.1 * window.innerHeight;
      descriptionDiv.style.height = `${containerHeight}px`;
      descriptionContainer.removeChild(showLess);
      descriptionContainer.appendChild(showMore);
    });
  }
  //Check again to see if descriptionDiv wouldn't surpass height limit on auto
  descriptionDiv.style.height = "auto";
  if (descriptionDiv.offsetHeight / window.innerHeight <= 0.1) {
    const showMore = document.querySelector(".makeDescriptionController");
    if (showMore) {
      const descriptionContainer = document.querySelector(".make-more");
      descriptionContainer.removeChild(showMore);
    }
  }
  const showingLess = document.getElementById("showLess");
  if (descriptionDiv.offsetHeight / window.innerHeight > 0.1 && !showingLess) {
    descriptionDiv.style.height = `${0.1 * window.innerHeight}px`;
  }
}

deleteOption.addEventListener("click", () => showAndHideWarningMessage());
btnNo.addEventListener("click", () => showAndHideWarningMessage());

function showAndHideWarningMessage() {
  if (showingWarning) {
    warning.classList.add("invisible");
    showingWarning = false;
    return;
  }
  if (!showingWarning) {
    warning.classList.remove("invisible");
    showingWarning = true;
    return;
  }
}
