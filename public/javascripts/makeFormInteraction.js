//https://vehapi.com/img/car-logos/${splitHyphens.join("_")}.png
const selectMake = document.getElementById("makeName");
const logoContainer = document.querySelector(".logoContainer");
selectMake.addEventListener("change", (e) => {
  const makeName = e.target.value.split(",")[1];
  const makeFormatted = /-/.test(makeName)
    ? makeName.split("-").join("_")
    : makeName.split(" ").join("_");
  const logo = document.createElement("img");
  logo.setAttribute("alt", `${makeName} logo`);
  logo.setAttribute(
    "src",
    `https://vehapi.com/img/car-logos/${makeFormatted}.png`
  );
  if (logoContainer.firstChild) {
    logoContainer.removeChild(logoContainer.firstChild);
  }
  logoContainer.appendChild(logo);
});
