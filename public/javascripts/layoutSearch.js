const mainSearch = document.getElementById("mainSearchBar");
const mainForm = document.getElementById("mainForm");
const fuzzySearch = document.querySelector(".searchFuzzyResults");

mainSearch.addEventListener("input", async (e) => {
  if (e.target.value !== " ") {
    while (fuzzySearch.firstChild !== null) {
      fuzzySearch.removeChild(fuzzySearch.firstChild);
    }
    const formData = new FormData();
    formData.append("searchText", e.target.value);
    const data = await fetch("/inventory/fuzzy_search", {
      method: "POST",
      body: formData,
    });
    const dataObject = await data.json();
    console.log(dataObject);
    if (dataObject.length > 0) {
      let makes = [];
      let models = [];
      dataObject.forEach((d) => {
        //Makes:
        if (d.makesFound.length > 0 && makes > 0) {
          d.makesFound.forEach((makeFound) => {
            if (
              makes.every((m) => {
                m.name !== makeFound.name;
              })
            ) {
              makes.push(makeFound);
            }
          });
        }
        if (makes < 1 && d.makesFound.length > 0) {
          makes = d.makesFound;
        }
        //Models:
        if (d.modelsFound.length > 0 && models.length > 0) {
          d.modelsFound.forEach((modelFound) => {
            let index;
            if (
              models.some((m, i) => {
                if (m.modelName == modelFound.modelName) {
                  index = i;
                  return true;
                }
              })
            ) {
              if (models[index].modelYears.every(y !== modelFound.modelYear)) {
                models[index].modelYears.push(modelFound);
              }
            }
          });
        }
        if (models.length < 1 && d.modelsFound.length > 0) {
          //Add the first model
          models.push({
            modelName: d.modelsFound[0].modelName,
            modelNameFormatted: d.modelsFound[0].modelNameFormatted,
            makeId: d.modelsFound[0].makeId,
            makeName: d.modelsFound[0].makeName,
            modelYears: [d.modelsFound[0]],
          });

          //Check if there are 2 equal model names. If there are, check that they dont have same year. If they dont, add model
          d.modelsFound.forEach((found) => {
            for (let i = 0; i < models.length; i++) {
              if (models[i].modelName == found.modelName) {
                if (
                  models[i].modelYears.every(
                    (y) => y.modelYear !== found.modelYear
                  )
                ) {
                  models[i].modelYears.push(found);
                }
              }
            }
          });
        }
      });
      if (makes.length > 0) {
        const makesDiv = document.createElement("div");
        makes.forEach((m) => {
          const makeRow = document.createElement("div");
          const makeName = document.createElement("a");
          makeName.innerText = m.name;
          makeName.setAttribute("href", `/inventory/make/${m.id}`);
          makeRow.appendChild(makeName);
          makesDiv.appendChild(makeRow);
        });
        fuzzySearch.appendChild(makesDiv);
      }
      if (models.length > 0) {
        const modelsDiv = document.createElement("div");
        models.forEach((m) => {
          let count = 0;
          for (let i = 0; i < m.modelYears.length; i++) {
            count += m.modelYears[i].modelCarCount;
          }
          console.log(count);
          const modelRow = document.createElement("div");
          const modelName = document.createElement("a");
          modelName.innerText = `${m.makeName} ${m.modelName} - ${count} cars`;
          modelName.setAttribute(
            "href",
            `/inventory/model/model-page/${m.makeId}/${m.modelNameFormatted}`
          );
          modelRow.appendChild(modelName);
          modelsDiv.appendChild(modelRow);
        });
        fuzzySearch.appendChild(modelsDiv);
      }
    }
  }
});
