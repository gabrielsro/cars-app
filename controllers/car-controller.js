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
const { createPics } = require("../public/javascripts/createPics");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { countryList } = require("..//public/javascripts/countryList");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

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
  Car.find({}, "make model status price version modelVariant country year")
    .populate("make", "name")
    .populate("model", "name")
    .populate("version", "fuel year body")
    .populate("thumbnail")
    .then((resultCars) => {
      const makes = [];
      const cars = [];
      const years = [];
      const prices = [];
      const countries = [];
      const bodies = [];
      const energies = [];
      for (let i = 0; i < resultCars.length; i++) {
        if (makes.every((m) => m.makeName != resultCars[i].make.name)) {
          makes.push({
            makeName: resultCars[i].make.name,
            makeId: resultCars[i].make._id,
          });
        }
        const thumb = resultCars[i].thumbnail
          ? resultCars[i].thumbnail.thumbnailSrc
          : undefined;

        cars.push({
          car: resultCars[i],
          pic: thumb,
        });
        if (
          !resultCars[i].country &&
          countries.every((c) => c !== "Unknown Location")
        ) {
          countries.push("Unknown Location");
        }
        if (
          countries.every((c) => c !== resultCars[i].country) &&
          resultCars[i].country
        ) {
          countries.push(resultCars[i].country);
        }
        if (years.every((y) => y !== resultCars[i].year)) {
          years.push(resultCars[i].year);
        }
        if (
          resultCars[i].price < 10000 &&
          prices.every((p) => p !== "< 10.000")
        ) {
          prices[0] = "< 10.000";
        }
        if (
          resultCars[i].price >= 10000 &&
          resultCars[i].price < 20001 &&
          prices.every((p) => p !== "10.000 - 20.000")
        ) {
          prices[1] = "10.000 - 20.000";
        }
        if (
          resultCars[i].price >= 20001 &&
          resultCars[i].price < 30001 &&
          prices.every((p) => p !== "20.000 - 30.000")
        ) {
          prices[2] = "20.000 - 30.000";
        }
        if (
          resultCars[i].price >= 30001 &&
          resultCars[i].price < 40000 &&
          prices.every((p) => p !== "30.000 - 40.000")
        ) {
          prices[3] = "30.000 - 40.000";
        }
        if (
          resultCars[i].price >= 40000 &&
          resultCars[i].price < 60001 &&
          prices.every((p) => p !== "40.000 - 60.000")
        ) {
          prices[4] = "40.000 - 60.000";
        }
        if (
          resultCars[i].price >= 60001 &&
          resultCars[i].price <= 80000 &&
          prices.every((p) => p !== "60.000 - 80.000")
        ) {
          prices[5] = "60.000 - 80.000";
        }
        if (
          resultCars[i].price >= 80001 &&
          resultCars[i].price < 100000 &&
          prices.every((p) => p !== "80.000 - 100.000")
        ) {
          prices[6] = "80.000 - 100.000";
        }
        if (
          resultCars[i].price >= 100000 &&
          resultCars[i].price < 150000 &&
          prices.every((p) => p !== "100.000 - 150.000")
        ) {
          prices[7] = "100.000 - 150.000";
        }
        if (
          resultCars[i].price >= 150000 &&
          resultCars[i].price < 200000 &&
          prices.every((p) => p !== "150.000 - 200.000")
        ) {
          prices[8] = "150.000 - 200.000";
        }
        if (
          resultCars[i].price >= 200000 &&
          resultCars[i].price <= 250000 &&
          prices.every((p) => p !== "200.000 - 250.000")
        ) {
          prices[9] = "200.000 - 250.000";
        }
        if (
          resultCars[i].price > 250000 &&
          prices.every((p) => p !== "> 250.000")
        ) {
          prices[10] = "> 250.000";
        }
        if (
          bodies.every((b) => b !== resultCars[i].version.body) &&
          resultCars[i].version.body
        ) {
          bodies.push(resultCars[i].version.body);
        }
        if (
          energies.every((e) => e !== resultCars[i].version.fuel) &&
          resultCars[i].version.fuel
        ) {
          energies.push(resultCars[i].version.fuel);
        }
      }
      energies.sort();
      bodies.sort();
      years.sort();
      countries.sort();
      const makesLower = makes.map((m) => {
        const lowerFirst = m.makeName[0].toLowerCase();
        const remaining = m.makeName.slice(1, m.makeName.length);
        return lowerFirst.concat(remaining);
      });
      makesLower.sort();
      const makesOrdered = makesLower.map((m) => {
        const upperFirst = m[0].toUpperCase();
        const remaining = m.slice(1, makesLower.length);
        return upperFirst.concat(remaining);
      });
      res.render("car_list", {
        cars,
        makesOrdered,
        years,
        prices,
        countries,
        bodies,
        energies,
      });
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
  if (req.body.make) {
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
  }
};

exports.add_car_get_models_repost = async (req, res, next) => {
  Promise.all([makesGetter(), modelsGetter(req.params.make, req.params.year)])
    .then((results) => {
      res.render("car_form_models", {
        title: "Add a new car",
        makeSelection: req.params.make,
        year: req.params.year,
        models: results[1],
        mileage: req.params.mileage,
        price: req.params.price,
        color: req.params.color,
        status: req.body.status,
        description: req.body.description,
        makesList: results[0],
      });
    })
    .catch((err) => next(err));
};

exports.add_car_get_models_more = async (req, res, next) => {
  let mileageParams = "";
  let colorParams = "";
  let priceParams = "";
  let statusParams = req.params.more.match(
    /(?:status)(\D+)(?:mileage|color|price|$)/
  )[1];
  if (/mileage/.test(req.params.more)) {
    mileageParams = req.params.more.match(/(?<=mileage)(\d+)(?=\D|$)/i)[0];
  }
  if (/color/.test(req.params.more)) {
    colorParams = req.params.more.match(/(?:color|\A)(\D+)(?:price|$)/i)[1];
  }
  if (/price/.test(req.params.more)) {
    priceParams = req.params.more.match(/(?:price|mileage|\A)(\d+)($)/i)[1];
  }
  Promise.all([makesGetter(), modelsGetter(req.params.make, req.params.year)])
    .then((results) => {
      res.render("car_form_models", {
        title: "Add a new car",
        makeSelection: req.params.make,
        year: req.params.year,
        models: results[1],
        mileage: mileageParams,
        price: priceParams,
        color: colorParams,
        status: statusParams,
        description: req.body.description,
        makesList: results[0],
      });
    })
    .catch((err) => next(err));
};

exports.add_car_get_variants_post_modelChange = async (req, res, next) => {
  if (req.params.model == "Other") {
    Promise.all([makesGetter(), modelsGetter(req.params.make, req.params.year)])
      .then((results) => {
        res.render("car_form_variants", {
          otherModel: true,
          title: "Add a new car",
          makeSelection: req.params.make,
          year: req.params.year,
          models: results[1],
          mileage: req.params.mileage,
          price: req.params.price,
          color: req.params.color,
          status: req.params.status,
          description: null,
          makesList: results[0],
          variantsList: [],
          variant: null,
          model: req.params.model,
          countries: countryList(),
        });
      })
      .catch((err) => next(err));
  }
  if (req.params.model !== "Other") {
    Promise.all([
      makesGetter(),
      modelsGetter(req.params.make, req.params.year),
      variantsGetter(req.params.model, req.params.year),
    ])
      .then((results) => {
        res.render("car_form_variants", {
          otherModel: false,
          title: "Add a new car",
          makeSelection: req.params.make,
          year: req.params.year,
          models: results[1],
          mileage: req.params.mileage,
          price: req.params.price,
          color: req.params.color,
          status: req.params.status,
          description: null,
          makesList: results[0],
          variantsList: results[2],
          variant: null,
          model: req.params.model,
          countries: countryList(),
        });
      })
      .catch((err) => next(err));
  }
};

exports.add_car_get_variants_post = async (req, res, next) => {
  if (req.body.model == "Other" && req.body.newVariant) {
    Promise.all([
      makesGetter(),
      modelsGetter(req.body.make.split(",")[1], req.body.year),
    ]).then((results) => {
      res.render("car_form_variants", {
        otherModel: req.body.model == "Other" ? true : false,
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
        variantsList: [],
        variant: req.body.newVariant,
        model: req.body.model,
        newModel: req.body.newModel,
        countries: countryList(),
      });
    });
  }
  if (req.body.model !== "Other") {
    Promise.all([
      makesGetter(),
      modelsGetter(req.body.make.split(",")[1], req.body.year),
      variantsGetter(req.body.model, req.body.year),
    ])
      .then((results) => {
        res.render("car_form_variants", {
          otherModel: req.body.model == "other" ? true : false,
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
          countries: countryList(),
        });
      })
      .catch((err) => next(err));
  }
};

exports.add_car_variants_submit = [
  upload.fields([
    { name: "picture1", maxCount: 1 },
    { name: "picture2", maxCount: 1 },
    { name: "picture3", maxCount: 1 },
    { name: "picture4", maxCount: 1 },
    { name: "picture5", maxCount: 1 },
  ]),
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
  body("carCountry").trim().escape(),
  body("phone").trim().escape(),
  body("email").trim().escape(),
  async (req, res, next) => {
    let receivedPics = [];
    for (let i = 1; i < 6; i++) {
      if (req.files[`picture${i}`]) {
        if (req.files[`picture${i}`][0].buffer) {
          receivedPics.push({
            number: i,
            buffer: req.files[`picture${i}`][0].buffer,
            description: req.body[`pic${i}Description`],
            cloudinaryId: req.body[`picId${i}`],
          });
        }
      }
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(`La cagamos ${errors[0]}, ${Object.entries(errors)}`);
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
                          Promise.all([
                            savedVersion.save().then((finalVersion) => {
                              savedModel.cars.push(savedCar._id);
                              savedModel.versions.push(finalVersion);
                              savedModel.save();
                            }),
                            ...createPics(savedCar._id, receivedPics),
                          ])
                            .then((results) => {
                              let thumbPosition = 6;
                              let thumbId;
                              const carPictures = [];
                              results.forEach((r) => {
                                if (r) {
                                  if (
                                    r.hasOwnProperty("position") &&
                                    r.position < thumbPosition
                                  ) {
                                    thumbPosition = r.position;
                                    thumbId = r.id;
                                  }
                                  if (r.hasOwnProperty("id")) {
                                    carPictures.push(r.id);
                                  }
                                }
                              });
                              Car.findByIdAndUpdate(savedCar._id, {
                                thumbnail: thumbId,
                                pics: carPictures,
                              })
                                .then(
                                  res.redirect(`${savedCar.url}/update/new`)
                                )
                                .catch((err) => next(err));
                            })
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
                            Promise.all([
                              savedVersion.save().then((finalversion) => {
                                savedModel.versions.push(finalversion._id);
                                savedModel.cars.push(savedCar._id);
                                savedModel.save();
                              }),
                              ...createPics(savedCar._id, receivedPics),
                            ])
                              .then((results) => {
                                let thumbPosition = 6;
                                let thumbId;
                                const carPictures = [];
                                results.forEach((r) => {
                                  if (r) {
                                    if (
                                      r.hasOwnProperty("position") &&
                                      r.position < thumbPosition
                                    ) {
                                      thumbPosition = r.position;
                                      thumbId = r.id;
                                    }
                                    if (r.hasOwnProperty("id")) {
                                      carPictures.push(r.id);
                                    }
                                  }
                                });
                                Car.findByIdAndUpdate(savedCar._id, {
                                  thumbnail: thumbId,
                                  pics: carPictures,
                                })
                                  .then(
                                    res.redirect(`${savedCar.url}/update/new`)
                                  )
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
                          car.save().then((savedCar) => {
                            savedVersion.cars.push(savedCar._id);
                            Promise.all([
                              savedVersion.save().then((finalVersion) => {
                                modelResult[0].versions.push(finalVersion._id);
                                modelResult[0].cars.push(savedCar._id);
                                modelResult[0].save();
                              }),
                              ...createPics(savedCar._id, receivedPics),
                            ])
                              .then((results) => {
                                let thumbPosition = 6;
                                let thumbId;
                                const carPictures = [];
                                results.forEach((r) => {
                                  if (r) {
                                    if (
                                      r.hasOwnProperty("position") &&
                                      r.position < thumbPosition
                                    ) {
                                      thumbPosition = r.position;
                                      thumbId = r.id;
                                    }
                                    if (r.hasOwnProperty("id")) {
                                      carPictures.push(r.id);
                                    }
                                  }
                                });
                                Car.findByIdAndUpdate(savedCar._id, {
                                  thumbnail: thumbId,
                                  pics: carPictures,
                                })
                                  .then(
                                    res.redirect(`${savedCar.url}/update/new`)
                                  )
                                  .catch((err) => next(err));
                              })
                              .catch((err) => next(err));
                          });
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
                            ...createPics(savedCar._id, receivedPics),
                          ])
                            .then((results) => {
                              let thumbPosition = 6;
                              let thumbId;
                              const carPictures = [];
                              results.forEach((r) => {
                                if (r) {
                                  if (
                                    r.hasOwnProperty("position") &&
                                    r.position < thumbPosition
                                  ) {
                                    thumbId = r.id;
                                  }
                                  if (r.hasOwnProperty("id")) {
                                    carPictures.push(r.id);
                                  }
                                }
                              });
                              Car.findByIdAndUpdate(savedCar._id, {
                                thumbnail: thumbId,
                                pics: carPictures,
                              })
                                .then(
                                  res.redirect(`${savedCar.url}/update/new`)
                                )
                                .catch((err) => next(err));
                            })
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
  Car.findById(req.params.id)
    .populate("make")
    .populate("model")
    .populate("version")
    .populate("pics")
    .then((car) => {
      const pics = [];
      if (car.pics.length > 0) {
        car.pics.forEach((p) => {
          pics.push({
            full: p.originalSrc,
            mid: p.midsizeSrc,
            mini: p.miniSrc,
          });
        });
      }
      res.render("car_detail", { car, pics });
    })
    .catch((err) => next(err));
};

exports.carAndVersionUpdate = (req, res, next) => {
  if (req.params.carChange == "true" && req.params.versionChange == "true") {
    //Car and Version must be updated
    Car.findByIdAndUpdate(req.params.carId, {
      price: req.body.price,
      mileage: req.body.mileage,
      status: req.body.status,
      color: req.body.color,
      description: req.body.description,
      country: req.body.carCountry,
      email: req.body.email,
      phone: req.body.phone,
    });
    Promise.all([
      Version.findByIdAndUpdate(req.params.versionId, {
        versionBodyType: req.body.body,
        enginePosition: req.body.position,
        engineCC: req.body.displacement,
        engineType: req.body.engineType,
        engineTorqueNm: req.body.torque,
        enginePower: req.body.power,
        engineCompression: req.body.compression,
        drive: req.body.drive,
        transmission: req.body.transmission,
        weight: req.body.weight,
        fuelSpecifics: req.body.fuelSpecifics,
        fuelEfficiencyHgw: req.body.hEff,
        fuelEfficiencyMixed: req.body.mEff,
        fuelEfficiencyCity: req.body.cEff,
        maxSpeed: req.body.speed,
        accel0To100: req.body.acceleration,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height,
      }),
      Car.findByIdAndUpdate(req.params.carId, {
        price: req.body.price,
        mileage: req.body.mileage,
        status: req.body.status,
        color: req.body.color,
        description: req.body.description,
        country: req.body.carCountry,
        email: req.body.email,
        phone: req.body.phone,
      }),
    ]).then(res.redirect(res.redirect(`/inventory/car/${req.params.carId}`)));
  }
  if (req.params.carChange == "false" && req.params.versionChange == "true") {
    //Version must be updated
    Version.findByIdAndUpdate(req.params.versionId, {
      versionBodyType: req.body.body,
      enginePosition: req.body.position,
      engineCC: req.body.displacement,
      engineType: req.body.engineType,
      engineTorqueNm: req.body.torque,
      enginePower: req.body.power,
      engineCompression: req.body.compression,
      drive: req.body.drive,
      transmission: req.body.transmission,
      weight: req.body.weight,
      fuelSpecifics: req.body.fuelSpecifics,
      fuelEfficiencyHgw: req.body.hEff,
      fuelEfficiencyMixed: req.body.mEff,
      fuelEfficiencyCity: req.body.cEff,
      maxSpeed: req.body.speed,
      accel0To100: req.body.acceleration,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
    }).then(res.redirect(`/inventory/car/${req.params.carId}`));
  }
  if (req.params.carChange == "true" && req.params.versionChange == "false") {
    //Car must be updated
    Car.findByIdAndUpdate(req.params.carId, {
      price: req.body.price,
      mileage: req.body.mileage,
      status: req.body.status,
      color: req.body.color,
      description: req.body.description,
      country: req.body.carCountry,
      email: req.body.email,
      phone: req.body.phone,
    })
      .then((car) => {
        res.redirect(`/inventory/car/${car.id}`);
      })
      .catch((err) => next(err));
  }
};

exports.carUpdate = (req, res, next) => {
  Car.findById(req.params.id)
    .populate("version")
    .then((car) => {
      const formTitle =
        req.params.from == "old"
          ? `Update your ${car.year} ${car.makeName} ${car.modelName}`
          : `Review your ${car.year} ${car.makeName} ${car.modelName} information`;
      res.render("car_update", {
        title: formTitle,
        model: `${car.year} ${car.makeName} ${car.modelName}`,
        instructions:
          req.params.from == "new"
            ? "The following is the information you gave us for this vehicle along with the one retrieved by our API. Please review it and change it if needed. You can always modify this information later."
            : "",
        countries: countryList(),
        price: car.price,
        mileage: car.mileage,
        status: car.status,
        color: car.color,
        carCountry: car.country,
        description: car.description,
        email: car.email,
        phone: car.phone,
        body: car.version.versionBodyType,
        fuel: car.version.fuelSpecifics,
        engine: car.version.engineType,
        enginePosition: car.version.enginePosition,
        displacement: car.version.engineCC,
        cylinders: car.version.engineCyl,
        torque: car.version.engineTorqueNm,
        power: car.version.enginePower,
        compression: car.version.engineCompression,
        drive: car.version.drive,
        transmission: car.version.transmission,
        weight: car.version.weight,
        highway: car.version.fuelEfficiencyHgw,
        mixed: car.version.fuelEfficiencyMixed,
        city: car.version.fuelEfficiencyCity,
        speed: car.version.maxSpeed,
        acceleration: car.version.accel0To100,
        length: car.version.length,
        width: car.version.width,
        height: car.version.height,
        id: car._id,
        versionId: car.version._id,
      });
    });
};

exports.carDelete = (req, res, next) => {
  //Get pics ready to be deleten in parallel from cloudinary:
  const promisesCloudinary = [];
  Car.findById(req.params.id)
    .populate("pics")
    .then((car) => {
      if (car.pics.length > 0) {
        const picsToDelete = car.pics.map((p) => {
          return p.cloudinaryId;
        });
        picsToDelete.forEach((pic) => {
          const promiseCloudinary = new Promise((resolve, reject) => {
            cloudinary.uploader
              .destroy(pic)
              .then(resolve)
              .catch((err) => reject(err));
          });
          promisesCloudinary.push(promiseCloudinary);
        });
      }
      Promise.all(promisesCloudinary)
        .then(
          //Delete car and pics from Car and Pic collections
          Car.findByIdAndRemove(req.params.id)
            .then((deletedCar) => {
              Promise.all([
                Version.findByIdAndUpdate(deletedCar.version, {
                  $pull: { cars: deletedCar._id },
                }),
                Model.findByIdAndUpdate(deletedCar.model, {
                  $pull: { cars: deletedCar._id },
                }),
                Pic.deleteMany({ car: req.params.id }),
              ])
                .then(res.redirect(`/inventory/version/${deletedCar.version}`))
                .catch((err) => next(err));
            })
            .catch((err) => next(err))
        )
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
