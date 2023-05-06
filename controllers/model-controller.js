const Model = require("../models/model");
const Make = require("../models/make");
const Car = require("../models/car");
const Version = require("../models/version");
const Pic = require("../models/pic");
const { body, validationResult } = require("express-validator");
const {
  makesGetter,
  modelsGetter,
} = require("../public/javascripts/carInfoAPI");

exports.modelList = (req, res, next) => {
  let makes = [];
  Model.find({}, "name make")
    .populate("make")
    .populate("name")
    .then((modelList) => {
      if (modelList.length > 0) {
        makes = [modelList[0].make.name];
        modelList.forEach((ml) => {
          if (!makes.includes(ml.make.name)) {
            makes.push(ml.make.name);
          }
        });
        makes.sort();
        let groupedModels = [];
        makes.forEach((make) => {
          let group = [];
          let modelSubset = [];
          let modelSubsetDetails = [];
          modelList.forEach((model) => {
            if (model.make.name == make && !modelSubset.includes(model.name)) {
              let formatted = model.name.split(" ").join("_");
              modelSubset.push(model.name);
              modelSubsetDetails.push({
                modelName: model.name,
                formattedName: formatted,
                makeId: model.make._id,
                makeName: make,
              });
            }
            modelSubsetDetails.sort((a, b) => {
              if (a.modelName.toUpperCase() < b.modelName.toUpperCase()) {
                return -1;
              }
              if (a.modelName.toUpperCase() > b.modelName.toUpperCase()) {
                return 1;
              } else {
                return 0;
              }
            });
            group.makeModels = modelSubsetDetails;
          });
          group.makeName = make;
          groupedModels.push(group);
        });
        res.render("model_list", { groupedModels });
      } else {
        res.render("model_list", {});
      }
    })
    .catch((err) => next(err));
};

exports.addModelGet = async (req, res, next) => {
  makesGetter()
    .then((makesList) =>
      res.render("model_form", { title: "Add a new model", makesList })
    )
    .catch((err) => next(err));
};

exports.addModelPost = [
  body("make").trim().isLength({ min: 1 }).escape(),
  body("year").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const previousInfo = {
      makePrevious: req.body.make.split(",")[0],
      yearPrevious: req.body.year,
    };
    makesGetter()
      .then((makes) => {
        previousInfo.makesList = makes;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          previousInfo.errors = errors.array();
          res.render("model_form", previousInfo);
          return;
        } else {
          previousInfo.title = "Add a new model";
          modelsGetter(previousInfo.makePrevious, previousInfo.yearPrevious)
            .then((models) => {
              previousInfo.models = models;
              res.render("model_form_models", previousInfo);
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  },
];

exports.addModelPostFinal = [
  body("make").trim().isLength({ min: 1 }).escape(),
  body("year").trim().isLength({ min: 1 }).escape(),
  body("model").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      makesGetter()
        .then((makesList) => {
          const previousInfo = {
            title: "Add a new model",
            makePrevious: req.body.make.split(",")[0],
            yearPrevious: req.body.year,
            errors,
            makesList,
            model: req.body.model,
          };
          modelsGetter(previousInfo.make, previousInfo.yearPrevious)
            .then((models) => {
              previousInfo.models = models;
              res.render("model_form_models", previousInfo);
              return;
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
    Make.find({ name: req.body.make.split(",")[0] })
      .then((result) => {
        if (result.length == 0) {
          const make = new Make({
            name: req.body.make.split(",")[0],
            makeId: req.body.make.split(",")[1],
            country: req.body.make.split(",")[2],
            demonym: req.body.make.split(",")[3],
          });
          make
            .save()
            .then((make) => {
              const model = new Model({
                name: req.body.model,
                make: make._id,
                year: req.body.year,
                versions: [],
                cars: [],
              });
              model
                .save()
                .then((savedModel) => {
                  res.send(res.redirect(savedModel.url));
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        }
        if (result.length !== 0) {
          Model.find({
            make: result[0]._id,
            name: req.body.model,
            year: req.body.year,
          })
            .then((modelResult) => {
              if (modelResult.length == 0) {
                const model = new Model({
                  name: req.body.model,
                  make: result[0]._id,
                  year: req.body.year,
                  versions: [],
                  cars: [],
                });
                model
                  .save()
                  .then((savedModel) => {
                    res.redirect(savedModel.url);
                  })
                  .catch((err) => next(err));
                return;
              }
              if (modelResult.length > 0) {
                res.redirect(modelResult[0].url);
              }
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  },
];

exports.yearFormGet = (req, res, next) => {
  Model.find({}, "year")
    .sort({ year: -1 })
    .then((list) => {
      let yearList = [];
      if (list[0] && list[0].year) {
        yearList.push(list[0].year);
      }
      list.forEach((l) => {
        if (yearList[yearList.length - 1] > l.year) {
          yearList.push(l.year);
        }
      });
      res.render("years-grid", { yearList, list });
    })
    .catch((err) => next(err));
};

exports.yearFormPost = [
  body("year").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("yearCars", { errors: errors.array() });
      return;
    }
    Car.find({ year: req.body.year })
      .populate("make")
      .then((carResult) => {
        let picPromises = [];
        let carList = [];
        carResult.forEach((c) => {
          let picPromise = new Promise((resolve, reject) => {
            Pic.find({ car: c._id, position: 1 }, "image")
              .then(resolve)
              .catch((err) => reject(err));
          });
          picPromises.push(picPromise);
          carList.push({ car: c });
        });
        Promise.all(picPromises)
          .then((picResults) => {
            picResults.forEach((p, index) => {
              carList[index].pic = p[0];
            });
            let makes = [];
            carList.forEach((c) => {
              if (!makes.some((m) => m == c.car.makeName)) {
                makes.push(c.car.makeName);
              }
            });
            res.render("yearCars", {
              year: req.body.year,
              carResult,
              carList,
              makes,
            });
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  },
];

exports.modelDetail = (req, res, next) => {
  Model.findById(req.params.id)
    .populate("make")
    .populate("versions")
    .populate("cars")
    .then((model) => {
      res.render("model_detail", { model });
    })
    .catch((err) => next(err));
};

exports.modelPage = (req, res, next) => {
  let modelName = req.params.modelNameFormatted.split("_").join(" ");
  Model.find({ name: modelName, make: req.params.makeId })
    .populate("make")
    .populate("versions")
    .then((models) => {
      let modelList = [];
      models.forEach((m) => {
        let yearDetails = { year: m.year, versions: [], id: m._id };
        if (m.versions.length > 0) {
          m.versions.forEach((v) => {
            let versionDetails = {
              versionName: v.name,
              versionCarNumber: v.cars.length,
              versionId: v._id,
            };
            yearDetails.versions.push(versionDetails);
          });
        }
        modelList.push(yearDetails);
      });
      res.render("model_page", {
        models,
        modelList,
      });
    })
    .catch((err) => next(err));
};

exports.modelDelete = (req, res, next) => {
  Model.find({ _id: req.params.id }).then((foundModel) => {
    Pic.deleteMany({ car: { $in: foundModel[0].cars } })
      .then(() =>
        Promise.all([
          Model.findByIdAndRemove({ _id: req.params.id }),
          Car.deleteMany({ model: req.params.id }),
          Version.deleteMany({ model: req.params.id }),
        ])
      )
      .then(() => res.redirect("back"))
      .catch((err) => next(err));
  });
};

exports.modelDeleteAll = (req, res, next) => {
  res.send(`pendind delete function for delete all`);
};
