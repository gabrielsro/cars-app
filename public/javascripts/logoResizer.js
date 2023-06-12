const logos = Array.from(document.querySelectorAll(".card-logo img"));

logos.forEach((l) => {
  let maxHeight = Math.min(40, window.innerWidth / 11);
  if (
    l.naturalWidth / l.naturalHeight >= 0.8 &&
    l.naturalWidth / l.naturalHeight <= 1.3
  ) {
    maxHeight = Math.min(37, window.innerWidth / 9);
  }
  l.style.maxHeight = `${maxHeight}px`;
});
