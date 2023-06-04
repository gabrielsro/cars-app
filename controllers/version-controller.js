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
      const promises = [];
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
                .then(res.redirect(`back`))
                .catch((err) => next(err));
            })
            .catch((err) => next(err))
        )
        .catch((err) => next(err));
    });
};
