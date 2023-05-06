const Version = require("../models/version");
const Model = require("../models/model");
const Pic = require("../models/pic");
const Car = require("../models/car");

exports.versionList = (req, res, next) => {
  Version.find()
    .then((versions) => {
      res.render("version_list", { versions });
    })
    .catch((err) => next(err));
};

exports.versionDetail = (req, res, next) => {
  Version.findById(req.params.versionId)
    .populate("model")
    .populate("cars")
    .populate("make")
    .then((version) => {
      let picPromises = [];
      version.cars.forEach((c) => {
        let picPromise = new Promise((resolve, reject) => {
          Pic.find({ car: c._id, position: 1 }, "image")
            .then(resolve)
            .catch((err) => reject(err));
        });
        picPromises.push(picPromise);
      });
      Promise.all(picPromises)
        .then((picResults) => {
          let carList = [];
          for (let i = 0; i < picResults.length; i++) {
            carList.push({ car: version.cars[i], pic: picResults[i][0] });
          }
          let modelName = version.model.name.split(" ").join("_");
          res.render("versionDetail", { version, modelName, carList });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.versionDelete = (req, res, next) => {
  Promise.all([
    Version.findByIdAndRemove(req.params.versionId),
    Car.find({ version: req.params.versionId }, "_id"),
  ])
    .then((results) => {
      Promise.all([
        Model.findByIdAndUpdate(req.params.modelId, {
          $pullAll: { cars: results[1] },
          $pull: { versions: req.params.versionId },
        }),
        Car.deleteMany({ _id: { $in: results[1] } }),
        Pic.deleteMany({ car: { $in: results[1] } }),
      ])
        .then(
          res.redirect(
            `/inventory/model/model-page/${req.params.makeId}/${req.params.modelName}`
          )
        )
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
