const mainImg = document.getElementById("main-img");
const firstSideImg = document.querySelector(".side-imgs>img");
const sideImgs = document.querySelectorAll(".side-imgs img");
const controlNext = document.querySelector(".next-control img");
const controlPrevious = document.querySelector(".previous-control img");

firstSideImg.classList.add("selected-thumbnail");

sideImgs.forEach((s) => {
  s.addEventListener("click", (s) => {
    sideImgs.forEach((i) => i.classList.remove("selected-thumbnail"));
    s.target.classList.add("selected-thumbnail");
    mainImg.setAttribute("src", `${s.target.src}`);
  });
});

controlNext.addEventListener("click", () => {
  for (let i = 0; i < sideImgs.length; i++) {
    if (sideImgs[i].classList.contains("selected-thumbnail")) {
      sideImgs[i].classList.remove("selected-thumbnail");
      if (i == sideImgs.length - 1) {
        sideImgs[0].classList.add("selected-thumbnail");
      } else {
        sideImgs[(i += 1)].classList.add("selected-thumbnail");
      }
    }
  }
});

controlPrevious.addEventListener("click", () => {
  for (let i = 0; i < sideImgs.length; i++) {
    if (sideImgs[i].classList.contains("selected-thumbnail")) {
      sideImgs[i].classList.remove("selected-thumbnail");
    } /*
    if (i == 0) {
      sideImgs[sideImgs.length - 1].classList.add("selected-thumbnail");
    } else {
      sideImgs[(i -= 1)].classList.add("selected-thumbnail");
    }*/
  }
});
