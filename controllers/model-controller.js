const Model = require("../models/model");

exports.modelList = (req, res, next) => {
  Model.find({}, "name make")
    .populate("make", "name")
    .then((list) => {
      let makes = [];
      let modelsArray = [];
      list.forEach((l) => {
        if (makes.every((m) => m !== l.make.name)) {
          makes.push(l.make.name);
        }
      });
      makes.sort();
      makes.forEach((m) => {
        let models = [];
        list.forEach((l) => {
          if (l.make.name == m) {
            models.push({ id: l._id, name: l.name });
          }
        });
        models.sort((a, b) => {
          if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
          }
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
          } else {
            return 0;
          }
        });
        modelsArray.push({ make: m, models: models });
      });

      res.render("model_list.pug", { list, modelsArray });
    })
    .catch((err) => next(err));
};

exports.addModelGet = (req, res, next) => {
  res.send("Pending add model get");
};
