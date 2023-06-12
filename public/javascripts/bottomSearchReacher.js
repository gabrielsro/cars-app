const reacher = Array.from(document.querySelectorAll(".reacher"));
const mainSearchBar = document.getElementById("mainSearchBar");
reacher.forEach((r) => {
  r.addEventListener("click", () => {
    mainSearchBar.focus();
  });
});
