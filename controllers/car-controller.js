const Car = require("../models/car");
const Version = require("../models/version");
const Make = require("../models/make");
const Model = require("../models/model");
const Pic = require("../models/pic");
const { createMake } = require("../public/javascripts/createMake");
const { createModel } = require("../public/javascripts/createModel");
const { createVersion } = require("../public/javascripts/createVersion");
const { createCar } = require("../public/javascripts/createCar");
const {
  makesGetter,
  modelsGetter,
  variantsGetter,
} = require("../public/javascripts/carInfoAPI");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const { reject } = require("async");
const upload = multer({ storage: multer.memoryStorage() });

exports.index = (req, res, next) => {
  Car.find({}, "make version status price")
    .populate("version", "type")
    .populate("make", "name")
    .then((result) => {
      let makes = [];
      result.forEach((c) => {
        if (makes.every((m) => m != c.make.name)) {
          makes.push(c.make.name);
        }
        makes.sort();
      });
      res.render("index", { cars: result, makes });
    })
    .catch((err) => next(err));
};

exports.car_list = (req, res, next) => {
  Car.find({}, "make model status price version")
    .populate("make", "name")
    .populate("model", "name")
    .populate("version", "energy year")
    .then((result) => {
      let makes = [];
      result.forEach((c) => {
        if (makes.every((m) => m.makeName != c.make.name)) {
          makes.push({ makeName: c.make.name, makeId: c.make._id });
        }
      });
      res.render("car_list", { result, makes });
    })
    .catch((err) => next(err));
};

exports.add_car_get = async (req, res, next) => {
  try {
    const makesList = await makesGetter();
    res.render("car_form", {
      title: "Add a new car",
      makesList,
    });
  } catch (err) {
    return next(err);
  }
};

exports.add_car_get_models_post = async (req, res, next) => {
  Promise.all([
    makesGetter(),
    modelsGetter(req.body.make.split(",")[1], req.body.year),
  ])
    .then((results) => {
      res.render("car_form_models", {
        title: "Add a new car",
        makeSelection: req.body.make.split(",")[1],
        year: req.body.year,
        models: results[1],
        mileage: req.body.mileage,
        price: req.body.price,
        color: req.body.color,
        status: req.body.status,
        description: req.body.description,
        makesList: results[0],
      });
    })
    .catch((err) => next(err));
};

exports.add_car_get_variants_post = async (req, res, next) => {
  Promise.all([
    makesGetter(),
    modelsGetter(req.body.make.split(",")[1], req.body.year),
    variantsGetter(req.body.model, req.body.year),
  ])
    .then((results) => {
      res.render("car_form_variants", {
        title: "Add a new car",
        makeSelection: req.body.make.split(",")[1],
        year: req.body.year,
        models: results[1],
        mileage: req.body.mileage,
        price: req.body.price,
        color: req.body.color,
        status: req.body.status,
        description: req.body.description,
        makesList: results[0],
        variantsList: results[2],
        model: req.body.model,
      });
    })
    .catch((err) => next(err));
};

exports.add_car_variants_submit = [
  upload.array("picture", 5),
  body("make", "make cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("year").trim().escape(),
  body("model").trim().isLength({ min: 1 }).escape(),
  body("variant").trim().isLength({ min: 1 }).escape(),
  body("mileage").trim().escape(),
  body("color").trim().isLength({ min: 1 }).escape(),
  body("price").trim().escape(),
  body("status").trim().isLength({ min: 1 }).escape(),
  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return;
    }
    Make.find({ name: req.body.make.split(",")[0] })
      .then((makeResult) => {
        if (makeResult.length == 0) {
          //Make doesn't exists. Create make, model, version and car
          let make = createMake(req.body.make);
          make
            .save()
            .then((savedMake) => {
              let model = createModel(savedMake._id, req.body);
              model
                .save()
                .then(async (savedModel) => {
                  let version = await createVersion(
                    savedModel.make._id,
                    savedModel._id,
                    savedModel.year,
                    req.body.variant
                  );
                  version
                    .save()
                    .then((savedVersion) => {
                      let car = createCar(
                        savedMake,
                        savedModel,
                        savedVersion,
                        req.body
                      );
                      car
                        .save()
                        .then((savedCar) => {
                          savedVersion.cars.push(savedCar._id);
                          let pics = [];
                          if (req.files.length > 0) {
                            req.files.forEach((f, i) => {
                              let picN = new Pic({
                                car: savedCar._id,
                                position: (i += 1),
                                image: f.buffer,
                                description: "image upload test",
                              });
                              let picPromise = new Promise(
                                (resolve, reject) => {
                                  picN
                                    .save()
                                    .then(resolve)
                                    .catch((err) => reject(err));
                                }
                              );
                              pics.push(picPromise);
                            });
                          }
                          Promise.all([
                            savedVersion.save().then((finalVersion) => {
                              savedModel.cars.push(savedCar._id);
                              savedModel.versions.push(finalVersion);
                              savedModel.save();
                            }),
                            ...pics,
                          ])
                            .then(res.redirect(savedCar.url))
                            .catch((err) => next(err));
                        })
                        .catch((err) => next(err));
                    })
                    .catch((err) => next(err));
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
          return;
        }
        if (makeResult.length > 0) {
          //Make exists. Check for model and version
          Model.find({
            make: makeResult[0]._id,
            name: req.body.model,
            year: req.body.year,
          })
            .then((modelResult) => {
              if (modelResult.length == 0) {
                //Model doesn't exist. Create model, version and car
                let model = createModel(makeResult[0]._id, req.body);
                model
                  .save()
                  .then(async (savedModel) => {
                    let version = await createVersion(
                      savedModel.make._id,
                      savedModel._id,
                      savedModel.year,
                      req.body.variant
                    );
                    version
                      .save()
                      .then((savedVersion) => {
                        let car = createCar(
                          makeResult[0],
                          savedModel,
                          savedVersion,
                          req.body
                        );
                        car
                          .save()
                          .then((savedCar) => {
                            savedVersion.cars.push(savedCar._id);
                            savedVersion
                              .save()
                              .then((finalversion) => {
                                savedModel.versions.push(finalversion._id);
                                savedModel.cars.push(savedCar._id);
                                savedModel.save();
                              })
                              .then(res.redirect(savedCar.url))
                              .catch((err) => next(err));
                          })
                          .catch((err) => next(err));
                      })
                      .catch((err) => next(err));
                  })
                  .catch((err) => next(err));
                return;
              }
              if (modelResult.length > 0) {
                //Model exists. Check for version
                Version.find({
                  model: modelResult[0]._id,
                  name: req.body.variant.split(",")[1],
                })
                  .then(async (versionResult) => {
                    if (versionResult.length == 0) {
                      //Version doesn't exist. Create version and car
                      let version = await createVersion(
                        modelResult[0].make._id,
                        modelResult[0]._id,
                        modelResult[0].year,
                        req.body.variant
                      );
                      version
                        .save()
                        .then((savedVersion) => {
                          let car = createCar(
                            makeResult[0],
                            modelResult[0],
                            savedVersion,
                            req.body
                          );
                          car
                            .save()
                            .then((savedCar) => {
                              savedVersion.cars.push(savedCar._id);
                              savedVersion.save().then((finalVersion) => {
                                modelResult[0].versions.push(finalVersion._id);
                                modelResult[0].cars.push(savedCar._id);
                                modelResult[0]
                                  .save()
                                  .then(res.redirect(savedCar.url))
                                  .catch((err) => next(err));
                              });
                            })
                            .catch((err) => next(err));
                        })
                        .catch((err) => next(err));
                      return;
                    }
                    if (versionResult.length > 0) {
                      //Version exists. Create car
                      let car = createCar(
                        makeResult[0],
                        modelResult[0],
                        versionResult[0],
                        req.body
                      );
                      car
                        .save()
                        .then((savedCar) => {
                          versionResult[0].cars.push(savedCar._id);
                          modelResult[0].cars.push(savedCar._id);
                          Promise.all([
                            versionResult[0].save(),
                            modelResult[0].save(),
                          ])
                            .then(res.redirect(savedCar.url))
                            .catch((err) => next(err));
                        })
                        .catch((err) => next(err));
                    }
                  })
                  .catch((err) => next(err));
              }
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  },
];

exports.carDetail = (req, res, next) => {
  Promise.all([
    Car.findById(req.params.id)
      .populate("make")
      .populate("model")
      .populate("version"),
    Pic.find({ car: req.params.id }),
  ])
    .then((results) => {
      let picsSorted = results[1].sort((a, b) => {
        return a.position - b.position;
      });
      res.render("car_detail", { car: results[0], pics: picsSorted });
    })
    .catch((err) => next(err));
};

exports.carUpdate = (req, res, next) => {
  res.send(`Pending update for ${req.params.id}`);
};

exports.carDelete = (req, res, next) => {
  Car.findByIdAndRemove(req.params.id)
    .then((deletedCar) => {
      Promise.all([
        Version.findByIdAndUpdate(deletedCar.version, {
          $pull: { cars: deletedCar._id },
        }),
        Model.findByIdAndUpdate(deletedCar.mode, {
          $pull: { cars: deletedCar._id },
        }),
      ])
        .then(res.redirect(`/inventory/version/${deletedCar.version}`))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
