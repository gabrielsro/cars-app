const Pic = require("../../models/pic");

exports.createPics = (carId, files) => {
  let picPromises = [];
  if (files.length > 0) {
    files.forEach((f, i) => {
      let pic = new Pic({
        car: carId,
        position: f.number,
        image: f.buffer,
        description: f.description,
        cloudinaryId: f.cloudinaryId,
      });
      let picPromise = new Promise((resolve, reject) => {
        pic
          .save()
          .then((savedPic) => savedPic)
          .then((thePic) =>
            resolve({ position: thePic.position, id: thePic._id })
          )
          .catch((err) => reject(err));
      });
      picPromises.push(picPromise);
    });
  }
  return picPromises;
};
