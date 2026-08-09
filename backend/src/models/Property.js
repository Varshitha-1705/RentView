const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    houseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    configuration: {
      type: String,
      required: true,
    },

    building: {
      type: String,
      required: true,
      default: "VNS Residency",
    },

    location: {
      type: String,
      required: true,
      default: "Bangalore, Karnataka",
    },

    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },

    rent: {
      type: Number,
      required: true,
    },

    deposit: {
      type: Number,
      required: true,
    },

    floor: {
      type: String,
      required: true,
    },

    furnishing: {
      type: String,
      required: true,
    },

    parking: {
      type: Boolean,
      default: false,
    },

    amenities: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    video: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    petPolicy: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);