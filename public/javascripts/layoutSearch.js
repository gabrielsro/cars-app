const mainSearch = document.getElementById("mainSearchBar");
const mainForm = document.getElementById("mainForm");
const fuzzySearch = document.querySelector(".searchFuzzyResults");

mainSearch.addEventListener("input", async (e) => {
  if (!/\w+/.test(e.target.value)) {
    while (fuzzySearch.firstChild !== null) {
      fuzzySearch.removeChild(fuzzySearch.firstChild);
    }
  }
  if (e.target.value !== " ") {
    const formData = new FormData();
    formData.append("searchText", e.target.value);
    const data = await fetch("/inventory/fuzzy_search", {
      method: "POST",
      body: formData,
    });
    const dataObject = await data.json();
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
              if (
                models[index].modelYears.every(
                  (y) => y.modelYear !== modelFound.modelYear
                )
              ) {
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
              if (models[i].modelName !== found.modelName) {
                models.push({
                  modelName: found.modelName,
                  modelNameFormatted: found.modelNameFormatted,
                  makeId: found.makeId,
                  makeName: found.makeName,
                  modelYears: [found],
                });
              }
            }
          });
        }
      });
      const makesDiv = document.createElement("div");
      const modelsDiv = document.createElement("div");
      if (makes.length > 0) {
        makes.forEach((m) => {
          const makeRow = document.createElement("div");
          const makeName = document.createElement("a");
          makeName.innerText = m.name;
          makeName.setAttribute("href", `/inventory/make/${m.id}`);
          makeRow.appendChild(makeName);
          makesDiv.appendChild(makeRow);
        });
      }
      if (models.length > 0) {
        models.forEach((m) => {
          let count = 0;
          for (let i = 0; i < m.modelYears.length; i++) {
            count += m.modelYears[i].modelCarCount;
          }
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
      }
      while (fuzzySearch.firstChild !== null) {
        fuzzySearch.removeChild(fuzzySearch.firstChild);
      }
      fuzzySearch.appendChild(makesDiv);
      fuzzySearch.appendChild(modelsDiv);
    }
  }
});
