const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  name: { type: String, required: true },
  make: { type: Schema.Types.ObjectId, required: true, ref: "Make" },
  version: [{ type: Schema.Types.ObjectId, ref: "Version" }],
});

module.exports = mongoose.model("Model", ModelSchema);
