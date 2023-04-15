const Version = require("../models/version");

exports.versionList = (req, res, next) => {
  Version.find()
    .then((versions) => {
      res.render("version_list", { versions });
    })
    .catch((err) => next(err));
};

exports.addVersionGet = (req, res, next) => {
  res.send("Pending add version get");
};

exports.year = (req, res, next) => {
  Version.find({}, "year")
    .sort({ year: -1 })
    .then((list) => {
      res.render("years-grid", { list });
    })
    .catch((err) => next(err));
};
