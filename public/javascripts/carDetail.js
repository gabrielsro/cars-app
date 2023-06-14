const body = document.querySelector("body");
const mainImg = document.getElementById("main-img");
const firstSideImg = document.querySelector(".side-imgs>img");
const sideImgs = document.querySelectorAll(".side-imgs img");
const controlNext = document.querySelector(".next-control img");
const controlPrevious = document.querySelector(".previous-control img");
const contactIcon = document.querySelector(".car-contact img");
const contactLink = document.querySelector(".car-contact div:first-child a");
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
const contactDialog = document.getElementById("contactDialog");
const messageText = document.querySelector("#contactDialog input");
const sendIcon = document.querySelector("#contactDialog img");
const sendIcon1 = document.getElementById("sendIcon1");
const sendIcon2 = document.getElementById("sendIcon2");
const messageContainer = document.querySelector("#contactDialog div");

//Handle contact option:
contactIcon.addEventListener("click", handleContactClick);
contactLink.addEventListener("click", handleContactClick);

function handleContactClick() {
  contactDialog.open ? contactDialog.close() : contactDialog.showModal();
  if (contactDialog.open) {
    sendIcon.classList.remove("sendIconAnimation");
    sendIcon2.classList.remove("sendIconAnimation");
    sendIcon.addEventListener("animationend", () => {
      sendIcon.classList.remove("sendIconAnimation");
    });
    sendIcon2.addEventListener("animationend", () => {
      sendIcon2.classList.remove("sendIconAnimation");
    });
    sendIcon.addEventListener("click", () => {
      if (messageText.value) {
        messageText.style.color = "#00b7ff";
        messageText.style.fontWeight = "bold";
        messageText.value = "Your message was sent!";
        sendIcon.classList.add("sendIconAnimation");
        setTimeout(() => {
          messageText.value = "";
          messageText.style.fontWeight = "normal";
          messageText.style.color = "black";
          contactDialog.close();
        }, 1200);
      }
    });
    sendIcon2.addEventListener("click", () => {
      if (messageText.value) {
        messageText.style.color = "#00b7ff";
        messageText.style.fontWeight = "bold";
        messageText.value = "Your message was sent!";
        sendIcon2.classList.add("sendIconAnimation");
        setTimeout(() => {
          messageText.value = "";
          messageText.style.fontWeight = "normal";
          messageText.style.color = "black";
          contactDialog.close();
        }, 1200);
      }
    });
    messageText.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        const clickIconEvent = new Event("click");
        if (messageText.value) {
          if (window.getComputedStyle(sendIcon) == "none") {
            sendIcon.classList.add("sendIconAnimation");
          }
          if (window.getComputedStyle(sendIcon2) == "none") {
            sendIcon2.classList.add("sendIconAnimation");
          }
          sendIcon.dispatchEvent(clickIconEvent);
          sendIcon2.dispatchEvent(clickIconEvent);
        }
      }
    });
  }
}

contactDialog.addEventListener("click", (e) => {
  const dialogDimensions = contactDialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    contactDialog.close();
  }
});

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
