const mainImg = document.getElementById("main-img");
const firstSideImg = document.querySelector(".side-imgs>img");
const sideImgs = document.querySelectorAll(".side-imgs img");
const controlNext = document.querySelector(".next-control img");
const controlPrevious = document.querySelector(".previous-control img");

firstSideImg.classList.add("selected");

sideImgs.forEach((s) => {
  s.addEventListener("click", (s) => {
    sideImgs.forEach((i) => i.classList.remove("selected"));
    s.target.classList.add("selected");
    mainImg.setAttribute("src", `${s.target.src}`);
  });
});

controlNext.addEventListener("click", () => {
  for (let i = 0; i < sideImgs.length; i++) {
    if (sideImgs[i].classList.contains("selected")) {
      sideImgs[i].classList.remove("selected");
      if (i == sideImgs.length - 1) {
        sideImgs[0].classList.add("selected");
        mainImg.setAttribute("src", `${sideImgs[0].src}`);
      } else {
        sideImgs[(i += 1)].classList.add("selected");
        mainImg.setAttribute("src", `${sideImgs[i].src}`);
      }
      return;
    }
  }
});

controlPrevious.addEventListener("click", () => {
  for (let i = 0; i < sideImgs.length; i++) {
    if (sideImgs[i].classList.contains("selected")) {
      sideImgs[i].classList.remove("selected");
      if (i == 0) {
        mainImg.setAttribute("src", `${sideImgs[sideImgs.length - 1].src}`);
        sideImgs[sideImgs.length - 1].classList.add("selected");
      } else {
        sideImgs[(i -= 1)].classList.add("selected");
        mainImg.setAttribute("src", `${sideImgs[i].src}`);
      }
      return;
    }
  }
});
