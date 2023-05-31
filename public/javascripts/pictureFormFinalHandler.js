const finalForm = document.getElementById("finalForm");

finalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputsToExclude = [
    "picture1",
    "picture2",
    "picture3",
    "picture4",
    "picture5",
  ];
  inputsToExclude.forEach((input) => {
    let theInput = event.target.querySelector(`[name=${input}]`);
    theInput.value = "";
  });
  event.target.submit();
});
