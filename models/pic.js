const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PicSchema = new Schema({
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  position: {
    type: Number,
  },
  image: {
    type: Buffer,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Pic", PicSchema);
