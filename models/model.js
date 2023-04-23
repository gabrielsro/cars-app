const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  name: { type: String, required: true },
  make: { type: Schema.Types.ObjectId, required: true, ref: "Make" },
  year: { type: Number, required: true },
  versions: [{ type: Schema.Types.ObjectId, ref: "Version" }],
  cars: [{ type: Schema.Types.ObjectId, ref: "Car" }],
});

ModelSchema.virtual("url").get(function () {
  return `/inventory/model/${this._id}`;
});

module.exports = mongoose.model("Model", ModelSchema);
