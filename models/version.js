const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VerisonSchema = new Schema({
  year: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Automobile", "Motorcycle", "SUV", "Truck", "Van"],
  },
  energy: {
    type: String,
    required: true,
    enum: ["Gas", "Diesel", "Hybrid", "Electric"],
  },
});

module.exports = mongoose.model("Version", VerisonSchema);
