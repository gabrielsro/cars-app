const submit = document.querySelector("button");
const year = document.querySelector("select");
const form = document.querySelector("form");

year.addEventListener("change", () => {
  form.submit();
});
