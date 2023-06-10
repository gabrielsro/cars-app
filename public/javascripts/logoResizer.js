const logos = Array.from(document.querySelectorAll(".card-logo img"));

logos.forEach((l) => {
  if (
    l.naturalWidth / l.naturalHeight >= 0.8 &&
    l.naturalWidth / l.naturalHeight <= 1.3
  ) {
    l.style.maxHeight = "37px";
  }
});
