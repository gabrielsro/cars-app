const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VerisonSchema = new Schema({
  name: { type: String, required: true },
  model: { type: Schema.Types.ObjectId, ref: "Model" },
  versionNumber: { type: Number },
  versionBody: { type: String },
  enginePosition: { type: String },
  engineCC: { type: Number },
  engineCyl: { type: Number },
  engineType: { type: String },
  engineTorqueNm: { type: Number },
  enginePower: { type: Number },
  engineCompression: { type: String },
  drive: { type: String },
  transmission: { type: String },
  weight: { type: Number },
  fuel: { type: String },
  fuelEfficiencyHgw: { type: Number },
  fuelEfficiencyMixed: { type: Number },
  fuelEfficiencyCity: { type: Number },
  cars: [{ type: Schema.Types.ObjectId, ref: "Car" }],
});

module.exports = mongoose.model("Version", VerisonSchema);
