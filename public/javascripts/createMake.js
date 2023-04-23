const Make = require("../../models/make");
const { demonymGetter } = require("./demonymGetter");

exports.createMake = (bodyInfo) => {
  return new Make({
    name: bodyInfo.split(",")[0],
    makeId: bodyInfo.split(",")[1],
    country: bodyInfo.split(",")[2],
    makeDemonym: demonymGetter(bodyInfo.split(",")[2]),
  });
};
