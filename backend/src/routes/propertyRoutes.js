const express = require("express");

const {
  getProperties,
  getPropertyById,
  createProperty,
} = require("../controllers/propertyController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// GET all properties
router.get("/", getProperties);

// GET property by ID
router.get("/:id", getPropertyById);

// CREATE a property
router.post("/", upload.fields([
  { name: "images", maxCount: 10 },
  { name: "video", maxCount: 1 },
]), createProperty);

module.exports = router;