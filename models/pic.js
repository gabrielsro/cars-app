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
  description: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

PicSchema.virtual("miniSrc").get(function () {
  return `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/b_rgb:000000,c_fit,f_auto,q_auto:low,h_50,w_78,r_5,dpr_2/${this.cloudinaryId}`;
});

PicSchema.virtual("smallThumbSrc").get(function () {
  return `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/b_rgb:000000,c_fit,f_auto,q_auto:low,h_165,w_255,r_9,dpr_2/${this.cloudinaryId}`;
});

PicSchema.virtual("thumbnailSrc").get(function () {
  return `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/b_rgb:000000,c_fit,f_auto,q_auto:low,h_203,w_360,r_9,dpr_2/${this.cloudinaryId}`;
});

PicSchema.virtual("midsizeSrc").get(function () {
  return `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/b_rgb:000000,c_fit,f_auto,q_auto:low,w_auto,r_3/${this.cloudinaryId}`;
});

PicSchema.virtual("originalSrc").get(function () {
  return `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/${this.cloudinaryId}`;
});

module.exports = mongoose.model("Pic", PicSchema);
