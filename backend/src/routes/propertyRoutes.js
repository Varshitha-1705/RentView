const express = require("express");

const {
  getProperties,
  getPropertyById,
  createProperty,
} = require("../controllers/propertyController");

const router = express.Router();

// GET all properties
router.get("/", getProperties);

// GET property by ID
router.get("/:id", getPropertyById);

// CREATE a property
router.post("/", createProperty);

module.exports = router;