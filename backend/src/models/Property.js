const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    // =========================
    // BASIC PROPERTY INFORMATION
    // =========================

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

    // =========================
    // AVAILABILITY
    // =========================

    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },

    availableFrom: {
      type: String,
      default: "",
    },

    // =========================
    // RENTAL DETAILS
    // =========================

    rent: {
      type: Number,
      required: true,
    },

    deposit: {
      type: Number,
      required: true,
    },

    maintenance: {
      type: Number,
      default: 0,
    },

    preferredTenants: {
      type: String,
      default: "",
    },

    // =========================
    // PROPERTY FEATURES
    // =========================

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

    parkingType: {
      type: String,
      default: "",
    },

    // =========================
    // PET POLICY
    // =========================

    petsAllowed: {
      type: Boolean,
      default: false,
    },

    petPolicy: {
      type: String,
      default: "",
    },

    // =========================
    // AMENITIES
    // =========================

    amenities: {
      type: [String],
      default: [],
    },

    // =========================
    // PROPERTY MEDIA
    // =========================

    images: {
      type: [String],
      default: [],
    },

    video: {
      type: String,
      default: "",
    },

    // =========================
    // DESCRIPTION
    // =========================

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);