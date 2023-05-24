const menuIcon = document.querySelectorAll(".menu img");
const sideBar = document.querySelector(".side-bar");

menuIcon.forEach((m) =>
  m.addEventListener("click", () => {
    if (localStorage.getItem("mode") == "light") {
      sideBar.style.background = "rgba(255,255,255,0.75)";
    }
    if (localStorage.getItem("mode") == "dark") {
      sideBar.style.background = "rgba(0,0,0,0.5)";
    }
    sideBar.classList.toggle("visibleMenu");
  })
);
