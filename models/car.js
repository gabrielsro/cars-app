const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  makeName: { type: String, required: true },
  make: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Make",
  },
  modelName: { type: String, required: true },
  model: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Model",
  },
  modelVariant: { type: String },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Sold"],
    default: "Available",
  },
  color: {
    type: String,
    required: true,
    enum: [
      "Black",
      "Blue",
      "Brown",
      "Grey",
      "Green",
      "Red",
      "Silver",
      "White",
      "Yellow",
      "Other",
    ],
  },
  description: { type: String },
  version: { type: Schema.Types.ObjectId, required: true, ref: "Version" },
});

CarSchema.virtual("url").get(function () {
  return `/inventory/car/${this._id}`;
});

module.exports = mongoose.model("Car", CarSchema);
