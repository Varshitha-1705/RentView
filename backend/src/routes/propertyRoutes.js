const express = require("express");

const {
  getProperties,
  getPropertyById,
  createProperty,
  updatePropertyStatus,
} = require("../controllers/propertyController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// ======================================================
// GET ALL PROPERTIES
// ======================================================

router.get("/", getProperties);

// ======================================================
// GET PROPERTY BY ID
// ======================================================

router.get("/:id", getPropertyById);

// ======================================================
// CREATE PROPERTY
// ======================================================

router.post(
  "/",
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createProperty
);

// ======================================================
// UPDATE PROPERTY STATUS
// ======================================================

router.patch(
  "/:id/status",
  updatePropertyStatus
);

module.exports = router;