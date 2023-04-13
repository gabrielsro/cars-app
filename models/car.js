const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
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
      "Gray",
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

module.exports = mongoose.model("Car", CarSchema);
