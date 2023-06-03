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
  cloudinaryId: {
    type: String,
  },
});

PicSchema.virtual("thumbnailSrc").get(function () {
  return `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/b_rgb:000000,c_fit,h_203,w_360/${this.cloudinaryId}`;
});

PicSchema.virtual("midsizeSrc").get(function () {
  return `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/b_rgb:000000,c_fit,h_310,w_550/${this.cloudinaryId}`;
});

PicSchema.virtual("originalSrc").get(function () {
  return `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/${this.cloudinaryId}`;
});

module.exports = mongoose.model("Pic", PicSchema);
