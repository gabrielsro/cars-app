const Version = require("../models/version");
const Model = require("../models/model");
const Pic = require("../models/pic");
const Car = require("../models/car");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

exports.versionList = (req, res, next) => {
  Version.find()
    .populate("cars")
    .then((versions) => {
      const promises = [];
      versions.forEach((v) => {
        if (v.body == "Automobile") {
          if (v.cars.length > 0) {
            for (let i = 0; i < Math.min(11, v.cars.length); i++) {
              const promise = new Promise((resolve, reject) => {
                Car.findById(v.cars[i]._id)
                  .populate("thumbnail")
                  .populate("make")
                  .then((car) => resolve({ car: car, type: v.body }))
                  .catch((err) => reject(err));
              });
              promises.push(promise);
            }
          }
        }
        if (v.body == "SUV") {
          if (v.cars.length > 0) {
            for (let i = 0; i < Math.min(11, v.cars.length); i++) {
              const promise = new Promise((resolve, reject) => {
                Car.findById(v.cars[i]._id)
                  .populate("thumbnail")
                  .populate("make")
                  .then((car) => resolve({ car: car, type: v.body }))
                  .catch((err) => reject(err));
              });
              promises.push(promise);
            }
          }
        }
        if (v.body == "Truck") {
          if (v.cars.length > 0) {
            console.log("im here");
            for (let i = 0; i < Math.min(11, v.cars.length); i++) {
              const promise = new Promise((resolve, reject) => {
                Car.findById(v.cars[i]._id)
                  .populate("thumbnail")
                  .populate("make")
                  .then((car) => resolve({ car: car, type: v.body }))
                  .catch((err) => reject(err));
              });
              promises.push(promise);
            }
          }
        }
        if (v.body == "Van") {
          if (v.cars.length > 0) {
            for (let i = 0; i < Math.min(11, v.cars.length); i++) {
              const promise = new Promise((resolve, reject) => {
                Car.findById(v.cars[i]._id)
                  .populate("thumbnail")
                  .populate("make")
                  .then((car) => resolve({ car: car, type: v.body }))
                  .catch((err) => reject(err));
              });
              promises.push(promise);
            }
          }
        }
        if (v.fuel == "Diesel") {
          if (v.cars.length > 0) {
            for (let i = 0; i < Math.min(11, v.cars.length); i++) {
              const promise = new Promise((resolve, reject) => {
                Car.findById(v.cars[i]._id)
                  .populate("thumbnail")
                  .populate("make")
                  .then((car) => resolve({ car: car, type: v.fuel }))
                  .catch((err) => reject(err));
              });
              promises.push(promise);
            }
          }
        }
        if (v.fuel == "Hybrid") {
          if (v.cars.length > 0) {
            for (let i = 0; i < Math.min(11, v.cars.length); i++) {
              const promise = new Promise((resolve, reject) => {
                Car.findById(v.cars[i]._id)
                  .populate("thumbnail")
                  .populate("make")
                  .then((car) => resolve({ car: car, type: v.fuel }))
                  .catch((err) => reject(err));
              });
              promises.push(promise);
            }
          }
        }
        if (v.fuel == "Electric") {
          if (v.cars.length > 0) {
            for (let i = 0; i < Math.min(11, v.cars.length); i++) {
              const promise = new Promise((resolve, reject) => {
                Car.findById(v.cars[i]._id)
                  .populate("thumbnail")
                  .populate("make")
                  .then((car) => resolve({ car: car, type: v.fuel }))
                  .catch((err) => reject(err));
              });
              promises.push(promise);
            }
          }
        }
        if (v.fuel == "Gasoline") {
          if (v.cars.length > 0) {
            for (let i = 0; i < Math.min(11, v.cars.length); i++) {
              const promise = new Promise((resolve, reject) => {
                Car.findById(v.cars[i]._id)
                  .populate("thumbnail")
                  .populate("make")
                  .then((car) => resolve({ car: car, type: v.fuel }))
                  .catch((err) => reject(err));
              });
              promises.push(promise);
            }
          }
        }
      });
      Promise.all(promises)
        .then((results) => {
          const automobiles = [];
          const trucks = [];
          const suvs = [];
          const vans = [];
          const gasoline = [];
          const diesel = [];
          const hybrid = [];
          const electric = [];
          results.forEach((result) => {
            if (result.type == "Automobile") {
              automobiles.push(result.car);
            }
            if (result.type == "Truck") {
              trucks.push(result.car);
            }
            if (result.type == "SUV") {
              suvs.push(result.car);
            }
            if (result.type == "Van") {
              vans.push(result.car);
            }
            if (result.type == "Gasoline") {
              gasoline.push(result.car);
            }
            if (result.type == "Diesel") {
              diesel.push(result.car);
            }
            if (result.type == "Hybrid") {
              hybrid.push(result.car);
            }
            if (result.type == "Electric") {
              electric.push(result.car);
            }
          });
          //Randomize arrays:
          automobiles.sort(() => {
            return Math.random() - 0.5;
          });
          trucks.sort(() => {
            return Math.random() - 0.5;
          });
          suvs.sort(() => {
            return Math.random() - 0.5;
          });
          vans.sort(() => {
            return Math.random() - 0.5;
          });
          gasoline.sort(() => {
            return Math.random() - 0.5;
          });
          diesel.sort(() => {
            return Math.random() - 0.5;
          });
          hybrid.sort(() => {
            return Math.random() - 0.5;
          });
          electric.sort(() => {
            return Math.random() - 0.5;
          });

          res.render("version_list", {
            automobiles,
            trucks,
            suvs,
            vans,
            gasoline,
            diesel,
            hybrid,
            electric,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.versionDetail = (req, res, next) => {
  Version.findById(req.params.versionId)
    .populate("model")
    .populate("cars")
    .populate("make")
    .then((version) => {
      const promises = [];
      if (version.cars && version.cars.length > 0) {
        version.cars.forEach((c) => {
          let promise = new Promise((resolve, reject) => {
            Car.findById(c._id)
              .populate("thumbnail")
              .populate("make")
              .then((t) =>
                resolve({
                  car: t,
                  pic: t.thumbnail ? t.thumbnail.thumbnailSrc : undefined,
                })
              )
              .catch((err) => reject(err));
          });
          promises.push(promise);
        });
      }
      Promise.all(promises).then((resultados) => {
        let modelName = version.model.name.split(" ").join("_");
        res.render("versionDetail", {
          version,
          modelName,
          carList: resultados,
        });
      });
    })
    .catch((err) => next(err));
};

exports.versionDelete = (req, res, next) => {
  const clnryPromises = [];
  Car.find({ version: req.params.versionId }, "pics")
    .populate("pics")
    .then((cars) => {
      cars.forEach((c) => {
        if (c.pics.length > 0) {
          c.pics.forEach((p) => {
            const clnryPromise = new Promise((resolve, reject) => {
              cloudinary.uploader
                .destroy(p.cloudinaryId)
                .then(resolve)
                .catch((err) => reject(err));
            });
            clnryPromises.push(clnryPromise);
          });
        }
      });
      Promise.all(clnryPromises)
        .then(
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
                .then(res.redirect(`/`))
                .catch((err) => next(err));
            })
            .catch((err) => next(err))
        )
        .catch((err) => next(err));
    });
};
