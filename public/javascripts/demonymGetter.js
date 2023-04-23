const Country = require("countries-api");

exports.demonymGetter = (country) => {
  if (/^uk$/i.test(country)) {
    country = "United Kingdom";
  }
  if (
    /^usa$/i.test(country) ||
    /^u\.*s\.*$/i.test(country) ||
    /^eeu$/.test(country)
  ) {
    country = "United States";
  }
  return Country.findByName(country).data[0].demonym;
};
