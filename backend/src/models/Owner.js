const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;