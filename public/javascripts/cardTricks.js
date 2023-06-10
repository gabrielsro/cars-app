const listCards = Array.from(document.querySelectorAll(".list-card"));

listCards.forEach((c) => {
  let container = c.querySelector(".card-text");
  let subText = c.querySelector(".subtitle p");
  let footer = c.querySelector(".footer p");
  let title = c.querySelector(".title p");
  c.addEventListener("mouseover", () => {
    if (subText.scrollWidth > container.offsetWidth) {
      subText.classList.add("autoScrollOnce");
    }
    if (footer.scrollWidth > container.offsetWidth) {
      footer.classList.add("autoScrollOnce");
    }
    if (title.scrollWidth > container.offsetWidth) {
      title.classList.add("autoScrollOnce");
    }
  });
  c.addEventListener("mouseout", () => {
    subText.classList.remove("autoScrollOnce");
    footer.classList.remove("autoScrollOnce");
    title.classList.remove("autoScrollOnce");
  });
});
