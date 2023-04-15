const async = require("async");
const Car = require("../models/car");
const Version = require("../models/version");
const Make = require("../models/make");
const Model = require("../models/model");

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

exports.add_car_get = (req, res, next) => {
  res.send("Pending Add car get");
};

exports.add_car_post = (req, res, next) => {
  res.send("Pending Add car get");
};
