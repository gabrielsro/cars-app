const Make = require("../models/make");
const Model = require("../models/model");
const Version = require("../models/version");
const Car = require("../models/car");
const Pic = require("../models/pic");
const { makesGetter } = require("../public/javascripts/carInfoAPI");
const { createMake } = require("../public/javascripts/createMake");

const { body, validationResult } = require("express-validator");

exports.makeList = (req, res, next) => {
  Make.find()
    .sort({ name: 1 })
    .then((list) => {
      let promises = [];
      list.forEach((l) => {
        let promise = new Promise((resolve, reject) => {
          Car.countDocuments({ makeName: l.name }).then(resolve).catch(reject);
        });
        promises.push(promise);
      });
      Promise.all(promises)
        .then((results) => {
          let makesInfo = [];
          for (let i = 0; i < results.length; i++) {
            makesInfo.push({ make: list[i], count: results[i] });
          }
          res.render("make_list", { makesInfo });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.addMakeGet = async (req, res, next) => {
  const makesList = await makesGetter();
  res.render("make_form", { title: "Add a new Make", makesList });
};

exports.makeDetail = (req, res, next) => {
  Promise.all([
    Make.findById(req.params.id),
    Model.find({ make: req.params.id }).populate("cars").populate("versions"),
  ])
    .then((results) => {
      let modelsList = results[1];
      let modelsListComplete = [];
      let modelsUniqueList;
      if (modelsList.length > 0) {
        modelsUniqueList = [modelsList[0].name];
        modelsList.forEach((m) => {
          if (!modelsUniqueList.includes(m.name)) {
            modelsUniqueList.push(m.name);
          }
        });
        modelsUniqueList.sort();
        modelsUniqueList.forEach((u) => {
          modelsListComplete.push({
            modelName: u,
            formattedName: u.split(" ").join("_"),
          });
        });
      }
      res.render("make_detail", {
        make: results[0],
        list: modelsListComplete,
        makeId: req.params.id,
      });
    })
    .catch((err) => next(err));
};

exports.addMakePost = [
  body("make").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const make = createMake(req.body.make);
    if (!errors.isEmpty()) {
      makesGetter()
        .then((makesList) => {
          res.render("make_form", {
            title: "Add a new Make",
            make,
            errors: errors.array(),
            makesList,
          });
        })
        .catch((err) => next(err));
    } else {
      Make.find({ makeId: make.makeId })
        .then((makeFound) => {
          if (makeFound.length == 0) {
            make
              .save()
              .then((savedMake) => {
                res.redirect(savedMake.url);
              })
              .catch((err) => next(err));
          } else {
            res.redirect(makeFound[0].url);
          }
        })
        .catch((err) => next(err));
    }
  },
];

exports.makeUpdate = (req, res, next) => {
  res.send(`Pending update for ${req.params.id}`);
};

exports.makeDelete = (req, res, next) => {
  Car.find({ make: req.params.id }, "_id")
    .then((cars) => {
      let picPromises = [];
      cars.forEach((c) => {
        let picPromise = new Promise((resolve, reject) => {
          Pic.deleteMany({ car: { $in: c._id } })
            .then(resolve)
            .catch((err) => reject(err));
        });
        picPromises.push(picPromise);
      });
      Promise.all([
        Make.findByIdAndDelete(req.params.id),
        Model.deleteMany({ make: req.params.id }),
        Version.deleteMany({ make: req.params.id }),
        Car.deleteMany({ make: req.params.id }),
        ...picPromises,
      ]);
    })
    .then(res.redirect("/inventory/"))
    .catch((err) => next(err));
};
