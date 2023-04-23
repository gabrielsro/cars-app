const { body, validationResult } = require("express-validator");
const Car = require("../models/car");
const Version = require("../models/version");
const Make = require("../models/make");
const Model = require("../models/model");
const { modelList } = require("./model-controller");
const { Types } = require("mongoose");
const {
  makesGetter,
  modelsGetter,
  variantsGetter,
  variantInfoGetter,
} = require("../public/javascripts/carInfoAPI");
const { demonymGetter } = require("../public/javascripts/demonymGetter");
const make = require("../models/make");
const version = require("../models/version");

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
          let make = new Make({
            name: req.body.make.split(",")[0],
            makeId: req.body.make.split(",")[1],
            country: req.body.make.split(",")[2],
            demonym: demonymGetter(req.body.make.split(",")[2]),
          });
          make
            .save()
            .then((savedMake) => {
              let model = new Model({
                name: req.body.model,
                make: savedMake._id,
                year: req.body.year,
                versions: [],
                cars: [],
              });
              model
                .save()
                .then(async (savedModel) => {
                  let variantInfo = await variantInfoGetter(
                    req.body.variant.split(",")[2]
                  );
                  let version = new Version({
                    name: req.body.variant.split(",")[1]
                      ? req.body.variant.split(",")[1]
                      : "Default",
                    model: savedModel._id,
                    versionNumber: req.body.variant.split(",")[2],
                    versionBody: variantInfo.model_body,
                    enginePosition: variantInfo.model_engine_position,
                    engineCC: variantInfo.model_engine_cc,
                    engineCyl: variantInfo.model_engine_cyl,
                    engineType: variantInfo.model_engine_type,
                    engineTorqueNm: variantInfo.model_engine_torque_nm,
                    enginePower: variantInfo.model_engine_power_hp,
                    engineCompression: variantInfo.model_engine_compression,
                    drive: variantInfo.model_drive,
                    transmission: variantInfo.model_transmission_type,
                    weight: variantInfo.model_weight_kg,
                    fuel: variantInfo.model_engine_fuel,
                    fuelEfficiencyHgw: variantInfo.model_mpg_hwy,
                    fuelEfficiencyMixed: variantInfo.model_mpg_mixed,
                    fuelEfficiencyCity: variantInfo.model_mpg_city,
                    cars: [],
                  });
                  version
                    .save()
                    .then((savedVersion) => {
                      let car = new Car({
                        makeName: savedMake.name,
                        make: savedMake._id,
                        modelName: savedModel.name,
                        model: savedModel._id,
                        modelVariant: savedVersion.name,
                        year: savedModel.year,
                        price: req.body.price,
                        mileage: req.body.mileage,
                        status: req.body.status,
                        color: req.body.color,
                        description: req.body.description,
                        version: savedVersion._id,
                        cars: [],
                      });
                      car
                        .save()
                        .then((savedCar) => {
                          savedVersion.cars.push(savedCar._id);
                          savedVersion.save().then((finalVersion) => {
                            savedModel.cars.push(savedCar._id);
                            savedModel.versions.push(finalVersion);
                            savedModel.save().then(res.redirect(savedCar.url));
                          });
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
                //Model doesn't exist. Create model and version
                let model = new Model({
                  name: req.body.model,
                  make: makeResult[0]._id,
                  year: req.body.year,
                  versions: [],
                  cars: [],
                });
                model
                  .save()
                  .then(async (savedModel) => {
                    let variantInfo = await variantInfoGetter(
                      req.body.variant.split(",")[2]
                    );
                    let version = new Version({
                      name: req.body.variant.split(",")[1]
                        ? req.body.variant.split(",")[1]
                        : "Default",
                      versionNumber: req.body.variant.split(",")[2],
                      model: savedModel._id,
                      versionBody: variantInfo.model_body,
                      enginePosition: variantInfo.model_engine_position,
                      engineCC: variantInfo.model_engine_cc,
                      engineCyl: variantInfo.model_engine_cyl,
                      engineType: variantInfo.model_engine_type,
                      engineTorqueNm: variantInfo.model_engine_torque_nm,
                      enginePower: variantInfo.model_engine_power_hp,
                      engineCompression: variantInfo.model_engine_compression,
                      drive: variantInfo.model_drive,
                      transmission: variantInfo.model_transmission_type,
                      weight: variantInfo.model_weight_kg,
                      fuel: variantInfo.model_engine_fuel,
                      fuelEfficiencyHgw: variantInfo.model_mpg_hwy,
                      fuelEfficiencyMixed: variantInfo.model_mpg_mixed,
                      fuelEfficiencyCity: variantInfo.model_mpg_city,
                      cars: [],
                    });
                    version
                      .save()
                      .then((savedVersion) => {
                        let car = new Car({
                          makeName: makeResult[0].name,
                          make: makeResult[0]._id,
                          modelName: savedModel.name,
                          model: savedModel._id,
                          modelVariant: savedVersion.name,
                          year: req.body.year,
                          price: req.body.price,
                          mileage: req.body.mileage,
                          status: req.body.status,
                          color: req.body.color,
                          description: req.body.description,
                          version: savedVersion._id,
                        });
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
                              .then(res.redirect(savedCar.url));
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
                      //Version doesnt exist. Create version
                      let variantInfo = await variantInfoGetter(
                        req.body.variant.split(",")[2]
                      );
                      let version = new Version({
                        name: req.body.variant.split(",")[1],
                        model: modelResult[0]._id,
                        versionNumber: req.body.variant.split(",")[2],
                        versionBody: variantInfo.model_body,
                        enginePosition: variantInfo.model_engine_position,
                        engineCC: variantInfo.model_engine_cc,
                        engineCyl: variantInfo.model_engine_cyl,
                        engineType: variantInfo.model_engine_type,
                        engineTorqueNm: variantInfo.model_engine_torque_nm,
                        enginePower: variantInfo.model_engine_power_hp,
                        engineCompression: variantInfo.model_engine_compression,
                        drive: variantInfo.model_drive,
                        transmission: variantInfo.model_transmission_type,
                        weight: variantInfo.model_weight_kg,
                        fuel: variantInfo.model_engine_fuel,
                        fuelEfficiencyHgw: variantInfo.model_mpg_hwy,
                        fuelEfficiencyMixed: variantInfo.model_mpg_mixed,
                        fuelEfficiencyCity: variantInfo.model_mpg_city,
                        cars: [],
                      });
                      version
                        .save()
                        .then((savedVersion) => {
                          let car = new Car({
                            makeName: makeResult[0].name,
                            make: makeResult[0]._id,
                            modelName: modelResult[0].name,
                            model: modelResult[0]._id,
                            modelVariant: savedVersion.name,
                            year: req.body.year,
                            price: req.body.price,
                            mileage: req.body.mileage,
                            status: req.body.status,
                            color: req.body.color,
                            description: req.body.description,
                            version: savedVersion._id,
                          });
                          car.save().then((savedCar) => {
                            savedVersion.cars.push(savedCar._id);
                            savedVersion
                              .save()
                              .then((finalVersion) => {
                                modelResult[0].versions.push(finalVersion._id);
                                modelResult[0].cars.push(savedCar._id);
                                modelResult[0]
                                  .save()
                                  .then(res.redirect(savedCar.url));
                              })
                              .catch((err) => next(err));
                          });
                        })
                        .catch((err) => next(err));
                      return;
                    }
                    if (versionResult.length > 0) {
                      //Version exists. Create car
                      let car = new Car({
                        makeName: makeResult[0].name,
                        make: makeResult[0]._id,
                        modelName: modelResult[0].name,
                        model: modelResult[0]._id,
                        modelVariant: versionResult[0].name,
                        year: req.body.year,
                        price: req.body.price,
                        mileage: req.body.mileage,
                        status: req.body.status,
                        color: req.body.color,
                        description: req.body.description,
                        version: versionResult[0]._id,
                      });
                      car.save().then((savedCar) => {
                        versionResult[0].cars.push(savedCar._id);
                        modelResult[0].cars.push(savedCar._id);
                        Promise.all([
                          versionResult[0].save(),
                          modelResult[0].save(),
                        ]).then(res.redirect(savedCar.url));
                      });
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
  Car.findById(req.params.id)
    .populate("make")
    .populate("model")
    .populate("version")
    .then((car) => {
      res.render("car_detail", { car });
    })
    .catch((err) => next(err));
};

exports.carUpdate = (req, res, next) => {
  res.send(`Pending update for ${req.params.id}`);
};

exports.carDelete = (req, res, next) => {
  res.send(`Pending delete for ${req.params.id}`);
};
