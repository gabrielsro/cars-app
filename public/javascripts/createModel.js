const Model = require("../../models/model");

exports.createModel = (modelId, reqBody) => {
  return new Model({
    name: reqBody.model,
    make: modelId,
    year: reqBody.year,
    versions: [],
    cars: [],
  });
};
