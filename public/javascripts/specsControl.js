const show = document.getElementById("showSpecs");
const hide = document.getElementById("hideSpecs");
const specs = document.getElementById("specs");
const mainImage = document.getElementById("main-img");

hide.addEventListener("click", hideSpecs);
show.addEventListener("click", showSpecs);
mainImage.addEventListener("click", () => {
  if (hide.classList.contains("invisible")) {
    showSpecs();
    return;
  }
  if (!hide.classList.contains("invisible")) {
    hideSpecs();
  }
});

function showSpecs() {
  hide.classList.remove("invisible");
  show.classList.add("invisible");
  specs.classList.remove("invisible");
}

function hideSpecs() {
  hide.classList.add("invisible");
  show.classList.remove("invisible");
  specs.classList.add("invisible");
}
