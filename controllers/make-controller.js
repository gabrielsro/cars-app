const Make = require("../models/make");

exports.makeList = (req, res, next) => {
  Make.find()
    .sort({ name: 1 })
    .then((list) => {
      res.render("make_list", { list });
    })
    .catch((err) => next(err));
};

exports.addMakeGet = (req, res, next) => {
  res.render("make_form", { title: "Add a new Make" });
};
