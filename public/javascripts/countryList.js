const Countries = require("countries-api");

exports.countryList = () => {
  let list = Countries.findAll().data;
  let namesList = [];
  list.forEach((c) => {
    namesList.push(c.name.common);
  });
  return namesList;
};
