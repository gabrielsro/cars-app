const Make = require("../models/make");
const Model = require("../models/model");
const Version = require("../models/version");
const Car = require("../models/car");
const Pic = require("../models/pic");
const { makesGetter } = require("../public/javascripts/carInfoAPI");
const { createMake } = require("../public/javascripts/createMake");

const { body, validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

exports.makeList = (req, res, next) => {
  Make.find()
    .sort({ name: 1 })
    .then((list) => {
      let promises = [];
      list.forEach((l) => {
        let promise = new Promise((resolve, reject) => {
          Car.countDocuments({ makeName: l.name })
            .then((result) => {
              if (result < 1) {
                //No cars found. Resolves to the count (0)
                resolve({ count: result, oldest: null, newest: null });
              }
              if (result == 1) {
                //Found 1 car. Resolves to the count and the creation date of that one car
                Car.find({ makeName: l.name })
                  .sort({ _id: -1 })
                  .limit(1)
                  .then((date) => {
                    resolve({
                      count: result,
                      oldest: date[0].createdAt.toLocaleDateString(),
                      oldestUrl: date[0].url,
                      newest: null,
                    });
                  })
                  .catch(reject);
              }
              //Found 2 or more cars. Resolves to the count and the creation date of oldest and newest one
              if (result >= 2) {
                Promise.all([
                  Car.find({ makeName: l.name }).sort({ _id: -1 }).limit(1),
                  Car.find({ makeName: l.name }).sort({ _id: 1 }).limit(1),
                ])
                  .then((dates) => {
                    resolve({
                      count: result,
                      oldest: dates[1][0].createdAt.toLocaleDateString(),
                      oldestUrl: dates[1][0].url,
                      newest: dates[0][0].createdAt.toLocaleDateString(),
                      newestUrl: dates[0][0].url,
                    });
                  })
                  .catch(reject);
              }
            })
            .catch(reject);
        });
        promises.push(promise);
      });
      Promise.all(promises)
        .then((results) => {
          let makesInfo = [];
          for (let i = 0; i < results.length; i++) {
            makesInfo.push({
              make: list[i],
              count: results[i].count,
              oldest: results[i].oldest,
              oldestUrl: results[i].oldestUrl ? results[i].oldestUrl : null,
              newest: results[i].newest,
              newestUrl: results[i].newestUrl ? results[i].newestUrl : null,
            });
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
    Car.find(
      { make: req.params.id },
      "make model status price version modelVariant"
    )
      .populate("make", "name")
      .populate("model", "name")
      .populate("version", "energy year")
      .populate("thumbnail"),
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
      let cars = results[2];
      let carList = [];
      for (let i = 0; i < cars.length; i++) {
        carList.push({
          car: cars[i],
          pic: cars[i].thumbnail ? cars[i].thumbnail.thumbnailSrc : undefined,
        });
      }
      res.render("make_detail", {
        make: results[0],
        list: modelsListComplete,
        makeId: req.params.id,
        cars: carList,
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
  Car.find({ make: req.params.id }, "_id pics")
    .populate("pics")
    .then((cars) => {
      const picPromises = [];
      const cloudinaryPromises = [];
      cars.forEach((c) => {
        //Make promise for each Pic model of that car:
        let picPromise = new Promise((resolve, reject) => {
          Pic.deleteMany({ car: { $in: c._id } })
            .then(resolve)
            .catch((err) => reject(err));
        });
        picPromises.push(picPromise);
        //Make promise for each Cloudinary image of that car:
        if (c.pics.length > 0) {
          c.pics.forEach((p) => {
            const cloudnryPromise = new Promise((resolve, reject) => {
              cloudinary.uploader
                .destroy(p.cloudinaryId)
                .then(resolve)
                .catch((err) => reject(err));
            });
            cloudinaryPromises.push(cloudnryPromise);
          });
        }
      });
      Promise.all(cloudinaryPromises)
        .then(
          Promise.all([
            Make.findByIdAndDelete(req.params.id),
            Model.deleteMany({ make: req.params.id }),
            Version.deleteMany({ make: req.params.id }),
            Car.deleteMany({ make: req.params.id }),
            ...picPromises,
          ])
        )
        .then(res.redirect("/inventory/"))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
