const Car = require("../../models/car");

exports.createCar = (makeRef, modelRef, verRef, reqBody) => {
  return new Car({
    makeName: makeRef.name,
    make: makeRef._id,
    modelName: modelRef.name,
    model: modelRef._id,
    modelVariant: verRef.name,
    year: modelRef.year,
    price: reqBody.price,
    mileage: reqBody.mileage,
    status: reqBody.status,
    color: reqBody.color,
    description: reqBody.description,
    version: verRef._id,
    cars: [],
  });
};
