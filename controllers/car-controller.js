exports.index = (req, res, next) => {
  res.render("index");
};
exports.car_list = (req, res, next) => {
  res.send("Pending car list");
};

exports.add_car_get = (req, res, next) => {
  res.send("Pending Add car get");
};

exports.add_car_post = (req, res, next) => {
  res.send("Pending Add car get");
};

exports.year = (req, res, next) => {
  res.render("years-grid");
};
