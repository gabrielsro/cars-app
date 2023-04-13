const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const makeSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
});

makeSchema.virtual("url").get(function () {
  return `/inventory/make/${this._id}`;
});

module.exports = mongoose.model("Make", makeSchema);
