const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const makeSchema = new Schema({
  name: { type: String, required: true },
  makeId: { type: String, required: true },
  country: { type: String, required: true },
  demonym: { type: String },
});

makeSchema.virtual("url").get(function () {
  return `/inventory/make/${this._id}`;
});

makeSchema.virtual("logoSrc").get(function () {
  let splitSpaces = this.name.toLocaleLowerCase().split(" ");
  let ridOfSpaces = splitSpaces.join("_");
  let splitHyphens = ridOfSpaces.split("-");
  return `https://vehapi.com/img/car-logos/${splitHyphens.join("_")}.png`;
});

module.exports = mongoose.model("Make", makeSchema);
