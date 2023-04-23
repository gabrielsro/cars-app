const Version = require("../models/version");

exports.versionList = (req, res, next) => {
  Version.find()
    .then((versions) => {
      res.render("version_list", { versions });
    })
    .catch((err) => next(err));
};
