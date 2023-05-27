const model = document.querySelector("h1").innerText.split(" ").join("_");
const modelMore = document.querySelector(".modelMore");
const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exsentences=20&titles=${model}&format=json`;

async function wikipedia(url) {
  const fetched = await fetch(url);
  const json = await fetched.json();
  return Object.values(json.query.pages)[0].extract;
}

wikipedia(url)
  .then((data) => {
    if (data) {
      let description = document.createElement("div");
      description.classList.add("modelDescriptionContainer");
      let intro = data.split("<h2>")[0];
      description.innerHTML = intro;
      modelMore.appendChild(description);
    }
  })
  .then(descriptionSize)
  .catch((err) => console.log(err));

//Handle screen resizing:
window.addEventListener("resize", descriptionSize);

function descriptionSize() {
  const descriptionDiv = document.querySelector(".modelMore > div");
  if (descriptionDiv.offsetHeight / window.innerHeight > 0.1) {
    const descriptionContainer = document.querySelector(".modelMore");
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
