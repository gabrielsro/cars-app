const { body, validationResult } = require("express-validator");
const Make = require("../models/make");
const Model = require("../models/model");
const multer = require("multer");
const upload = multer();

exports.fuzzySearch = [
  upload.none(),
  //(req, res, next) => {
  //res.send(req.body.searchText);
  //},
  body("searchText").isLength({ min: 1 }).trim().escape(),
  (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const words = req.body.searchText.split(" ");
      const filtered = words.filter((w) => w !== " ");
      const regExpressions = filtered.map((w) => {
        return new RegExp(escapeRegex(w), "gi");
      });
      const promises = regExpressions.map((r) => {
        const makeAndModelPromise = new Promise((resolve, reject) => {
          Promise.all([
            Make.find({ name: r }, "name").sort({ name: -1 }),
            Model.find({ name: r }, "name make year versions cars")
              .populate("make")
              .populate("versions")
              .sort({ name: -1 }),
          ])
            .then(resolve)
            .catch((err) => reject(err));
        });
        return makeAndModelPromise;
      });
      Promise.all(promises)
        .then((results) => {
          const data = [];
          if (results.length > 0) {
            results.forEach((r) => {
              data.push(prepareAnswer(r[0], r[1]));
            });
          }
          res.send(data);
        })
        .catch((err) => next(err));
    }
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
    }
  },
];

function prepareAnswer(makes, models) {
  const makesReady = [];
  if (makes.length > 0) {
    makes.forEach((m) => {
      makesReady.push({ name: m.name, id: m._id });
    });
  }
  const modelsReady = [];
  if (models.length > 0) {
    models.forEach((m) => {
      modelsReady.push({
        modelYear: m.year,
        modelName: m.name,
        modelFullName: `${m.year} ${m.make.name} ${m.name}`,
        modelId: m._id,
        modelCarCount: m.cars.length,
        modelVersions: prepareVersions(m.versions),
      });
    });
  }
  return {
    makesFound: makesReady,
    modelsFound: modelsReady,
  };
}

function prepareVersions(versions) {
  const versionsList = [];
  versions.forEach((v) => {
    versionsList.push({
      name: v.name,
      carCount: v.cars.length,
      versionId: v._id,
    });
  });
  return versionsList;
}

function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}
