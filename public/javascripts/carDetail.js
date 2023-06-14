const mainImg = document.getElementById("main-img");
const firstSideImg = document.querySelector(".side-imgs>img");
const sideImgs = document.querySelectorAll(".side-imgs img");
const controlNext = document.querySelector(".next-control img");
const controlPrevious = document.querySelector(".previous-control img");
const contactIcon = document.querySelector(".car-contact img");
const contactLink = document.querySelector(".car-contact div:first-child a");
const contactWindow = document.querySelector(".car-contact div:nth-child(2)");
const imperialE = document.querySelector(
  "#measurementEfficiency>p:first-child"
);
const metricE = document.querySelector("#measurementEfficiency>p:nth-child(3)");
const imperialP = document.querySelector(
  "#measurementPerformance>p:first-child"
);
const metricP = document.querySelector(
  "#measurementPerformance>p:nth-child(3)"
);
const imperialB = document.querySelector("#measurementBasics>p:first-child");
const metricB = document.querySelector("#measurementBasics>p:nth-child(3)");
const imperialWeight = document.getElementById("imperialWeight");
const metricWeight = document.getElementById("metricWeight");
const imperialHwy = document.getElementById("imperialHwy");
const metricHwy = document.getElementById("metricHwy");
const imperialMixed = document.getElementById("imperialMixed");
const metricMixed = document.getElementById("metricMixed");
const imperialCity = document.getElementById("imperialCity");
const metricCity = document.getElementById("metricCity");
const imperialAcceleration = document.getElementById("imperialAcceleration");
const metricAcceleration = document.getElementById("metricAcceleration");
const imperialSpeed = document.getElementById("imperialSpeed");
const metricSpeed = document.getElementById("metricSpeed");
const imperialDimensions = document.getElementById("imperialDimensions");
const metricDimensions = document.getElementById("metricDimensions");
const deleteCar = document.querySelector(".car-title-controls>p:nth-child(2)");
const deleteModal = document.getElementById("deleteCarDialog");

//Handle delete option:
deleteCar.addEventListener("click", () => {
  deleteModal.open ? deleteModal.close() : deleteModal.show();
  if (deleteModal.open) {
    const deleteYes = document.querySelector(
      "#deleteCarDialog .dialogButtons > button"
    );
    const deleteNo = document.querySelector(
      "#deleteCarDialog .dialogButtons > button:nth-child(2)"
    );
    deleteYes.addEventListener("click", () => {
      window.location.href = `/inventory/car/${deleteYes.dataset.car}/delete`;
    });
    deleteNo.addEventListener("click", () => {
      deleteModal.close();
    });
  }
});

metricB.addEventListener("click", () => {
  if (!metricB.classList.contains("selectedText")) {
    metricB.classList.toggle("selectedText");
    imperialB.classList.toggle("selectedText");
  }
  imperialWeight.classList.add("invisible");
  metricWeight.classList.remove("invisible");
  imperialDimensions.classList.add("invisible");
  if (metricDimensions) {
    metricDimensions.classList.remove("invisible");
  }
});

imperialB.addEventListener("click", () => {
  if (!imperialB.classList.contains("selectedText")) {
    metricB.classList.toggle("selectedText");
    imperialB.classList.toggle("selectedText");
  }
  imperialWeight.classList.remove("invisible");
  if (metricWeight) {
    metricWeight.classList.add("invisible");
  }
  imperialDimensions.classList.remove("invisible");
  if (metricDimensions) {
    metricDimensions.classList.add("invisible");
  }
});

metricP.addEventListener("click", () => {
  if (!metricP.classList.contains("selectedText")) {
    metricP.classList.toggle("selectedText");
    imperialP.classList.toggle("selectedText");
  }
  imperialAcceleration.classList.add("invisible");
  imperialSpeed.classList.add("invisible");
  metricAcceleration.classList.remove("invisible");
  metricSpeed.classList.remove("invisible");
});

imperialP.addEventListener("click", () => {
  if (!imperialP.classList.contains("selectedText")) {
    metricP.classList.toggle("selectedText");
    imperialP.classList.toggle("selectedText");
  }
  imperialAcceleration.classList.remove("invisible");
  imperialSpeed.classList.remove("invisible");
  metricAcceleration.classList.add("invisible");
  metricSpeed.classList.add("invisible");
});

metricE.addEventListener("click", () => {
  if (!metricE.classList.contains("selectedText")) {
    metricE.classList.toggle("selectedText");
    imperialE.classList.toggle("selectedText");
  }
  imperialHwy.classList.add("invisible");
  imperialMixed.classList.add("invisible");
  imperialCity.classList.add("invisible");
  metricHwy.classList.remove("invisible");
  metricMixed.classList.remove("invisible");
  metricCity.classList.remove("invisible");
});

imperialE.addEventListener("click", () => {
  if (!imperialE.classList.contains("selectedText")) {
    metricE.classList.toggle("selectedText");
    imperialE.classList.toggle("selectedText");
  }
  imperialHwy.classList.remove("invisible");
  imperialMixed.classList.remove("invisible");
  imperialCity.classList.remove("invisible");
  metricHwy.classList.add("invisible");
  metricMixed.classList.add("invisible");
  metricCity.classList.add("invisible");
});

let showingContactWindow = false;

contactIcon.addEventListener("click", handleContactClick);

contactLink.addEventListener("click", handleContactClick);

function handleContactClick() {
  if (!showingContactWindow) {
    contactWindow.classList.remove("invisible");
  }
  if (showingContactWindow) {
    contactWindow.classList.add("invisible");
  }
  showingContactWindow = !showingContactWindow;
}

if (firstSideImg) {
  firstSideImg.classList.add("selected");
}

sideImgs.forEach((s) => {
  s.addEventListener("click", (s) => {
    sideImgs.forEach((i) => i.classList.remove("selected"));
    s.target.classList.add("selected");
    mainImg.setAttribute("src", `${s.target.dataset.mid}`);
  });
});

if (controlNext) {
  controlNext.addEventListener("click", () => {
    for (let i = 0; i < sideImgs.length; i++) {
      if (sideImgs[i].classList.contains("selected")) {
        sideImgs[i].classList.remove("selected");
        if (i == sideImgs.length - 1) {
          sideImgs[0].classList.add("selected");
          mainImg.setAttribute("src", `${sideImgs[0].dataset.mid}`);
        } else {
          sideImgs[(i += 1)].classList.add("selected");
          mainImg.setAttribute("src", `${sideImgs[i].dataset.mid}`);
        }
        return;
      }
    }
  });
}

if (controlPrevious) {
  controlPrevious.addEventListener("click", () => {
    for (let i = 0; i < sideImgs.length; i++) {
      if (sideImgs[i].classList.contains("selected")) {
        sideImgs[i].classList.remove("selected");
        if (i == 0) {
          mainImg.setAttribute(
            "src",
            `${sideImgs[sideImgs.length - 1].dataset.mid}`
          );
          sideImgs[sideImgs.length - 1].classList.add("selected");
        } else {
          sideImgs[(i -= 1)].classList.add("selected");
          mainImg.setAttribute("src", `${sideImgs[i].dataset.mid}`);
        }
        return;
      }
    }
  });
}
