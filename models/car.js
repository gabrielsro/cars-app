const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema(
  {
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
    version: { type: Schema.Types.ObjectId, required: true, ref: "Version" },
    pics: [{ type: Schema.Types.ObjectId, ref: "Pic" }],
    thumbnail: { type: Schema.Types.ObjectId, ref: "Pic" },
    description: { type: String },
    country: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

CarSchema.virtual("url").get(function () {
  return `/inventory/car/${this._id}`;
});

module.exports = mongoose.model("Car", CarSchema);
