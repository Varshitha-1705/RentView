const Property = require("../models/Property");

// GET all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

// GET property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

// CREATE a property
const createProperty = async (req, res) => {
  try {
    const files = req.files || {};

    // Uploaded image paths
    const imagePaths = (files.images || []).map(
      (file) => `/uploads/${file.filename}`
    );

    // Uploaded video path
    const videoPath =
      files.video && files.video.length > 0
        ? `/uploads/${files.video[0].filename}`
        : "";

    const propertyData = {
      ...req.body,

      // Convert string values from FormData
      rent: Number(req.body.rent),
      deposit: Number(req.body.deposit),

      // Convert parking string to boolean
      parking:
        req.body.parking === "true" ||
        req.body.parking === true,

      // Convert amenities string back to array
      amenities: req.body.amenities
        ? JSON.parse(req.body.amenities)
        : [],

      // Save uploaded media paths
      images: imagePaths,
      video: videoPath,

      // Optional fields
      description: req.body.description || "",
      petPolicy: req.body.petPolicy || "",
    };

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    console.error("Create property error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
    });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
};