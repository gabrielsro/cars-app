const submit = document.querySelector("button");
const year = document.getElementById("year-select");
const form = document.querySelector(".years-option-1 form");
const past = document.getElementById("below");
const periods = Array.from(document.querySelectorAll(".year-card img"));
const hidden = document.querySelector(".years-option-1 input");

year.addEventListener("input", () => {
  form.submit();
});

periods.forEach((p) => {
  p.addEventListener("click", (e) => {
    hidden.value = e.target.alt.split(" ")[0];
    console.log(hidden.value);
    form.submit();
  });
});
