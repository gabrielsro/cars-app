const Pic = require("../../models/pic");

exports.createPics = (carId, files) => {
  let picPromises = [];
  if (files.length > 0) {
    files.forEach((f, i) => {
      let pic = new Pic({
        car: carId,
        position: (i += 1),
        image: f.buffer,
        description: "test",
      });
      let picPromise = new Promise((resolve, reject) => {
        pic
          .save()
          .then(resolve)
          .catch((err) => reject(err));
      });
      picPromises.push(picPromise);
    });
  }
  return picPromises;
};
