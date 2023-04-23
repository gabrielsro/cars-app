const { demonymGetter } = require("../javascripts/demonymGetter");

exports.makesGetter = async () => {
  const makesRequest = await fetch(
    "https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes"
  );
  let makes = await makesRequest.text();
  let makesArray = makes.split("");
  makesArray.splice(0, 2);
  makesArray.splice(makesArray.length - 2, 2);
  makesString = makesArray.join("");
  makesObject = JSON.parse(makesString);
  makesObjectArray = makesObject.Makes;
  let makesList = [];
  makesObjectArray.forEach((m) => {
    makesList.push({
      name: m.make_display,
      makeId: m.make_id,
      makeCountry: m.make_country,
      makeDemonym: demonymGetter(m.make_country),
    });
  });
  return makesList;
};

//returns array of models
exports.modelsGetter = async (make, year) => {
  const modelsRequest = await fetch(
    `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=${make}&year=${year}`
  );
  const modelsText = await modelsRequest.text();
  let modelsArray = modelsText.split("");
  modelsArray.splice(0, 2);
  modelsArray.splice(modelsArray.length - 2, 2);
  let modelsString = modelsArray.join("");
  let modelsList = JSON.parse(modelsString).Models;
  return modelsList;
};

//returns array of variants
exports.variantsGetter = async (model, year) => {
  let modelQuery;
  model.split(" ").length > 1
    ? (modelQuery = model.split(" ").join("+"))
    : (modelQuery = model);
  const variants = await fetch(
    `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&model=${modelQuery}&year=${year}`
  );
  const variantsText = await variants.text();
  let variantsArray = variantsText.split("");
  variantsArray.splice(0, 2);
  variantsArray.splice(variantsArray.length - 2, 2);
  let variantsString = variantsArray.join("");
  let variantsList = JSON.parse(variantsString).Trims;
  return variantsList;
};

exports.variantInfoGetter = async (idNumber) => {
  const variantInfo = await fetch(
    `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModel&model=${idNumber}`
  );
  const variantText = await variantInfo.text();
  let variantArray = variantText.split("");
  variantArray.splice(0, 3);
  variantArray.splice(variantArray.length - 3, 3);
  let variantString = variantArray.join("");
  let variantObject = JSON.parse(variantString);
  return variantObject;
};
