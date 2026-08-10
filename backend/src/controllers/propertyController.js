const Property = require("../models/Property");

// ======================================================
// GET ALL PROPERTIES
// ======================================================

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
    console.error("Get properties error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

// ======================================================
// GET PROPERTY BY ID
// ======================================================

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    );

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
    console.error("Get property by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

// ======================================================
// CREATE PROPERTY
// ======================================================

const createProperty = async (req, res) => {
  try {
    const files = req.files || {};

    // --------------------------------------------------
    // IMAGES
    // --------------------------------------------------

    const imagePaths = (
      files.images || []
    ).map(
      (file) => `/uploads/${file.filename}`
    );

    // --------------------------------------------------
    // VIDEO
    // --------------------------------------------------

    const videoPath =
      files.video &&
      files.video.length > 0
        ? `/uploads/${files.video[0].filename}`
        : "";

    // --------------------------------------------------
    // PROPERTY DATA
    // --------------------------------------------------

    const propertyData = {
      ...req.body,

      rent: Number(req.body.rent),

      deposit: Number(req.body.deposit),

      parking:
        req.body.parking === "true" ||
        req.body.parking === true,

      amenities: req.body.amenities
        ? JSON.parse(req.body.amenities)
        : [],

      images: imagePaths,

      video: videoPath,

      description:
        req.body.description || "",

      petPolicy:
        req.body.petPolicy || "",
    };

    // --------------------------------------------------
    // CREATE PROPERTY
    // --------------------------------------------------

    const property =
      await Property.create(
        propertyData
      );

    res.status(201).json({
      success: true,
      message:
        "Property created successfully",
      data: property,
    });
  } catch (error) {
    console.error(
      "Create property error:",
      error
    );

    res.status(400).json({
      success: false,
      message:
        "Failed to create property",
      error: error.message,
    });
  }
};

// ======================================================
// UPDATE PROPERTY STATUS
// ======================================================

const updatePropertyStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // --------------------------------------------------
    // VALIDATE STATUS
    // --------------------------------------------------

    if (
      status !== "available" &&
      status !== "occupied"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be either available or occupied",
      });
    }

    // --------------------------------------------------
    // FIND PROPERTY
    // --------------------------------------------------

    const property =
      await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // --------------------------------------------------
    // UPDATE STATUS
    // --------------------------------------------------

    property.status = status;

    await property.save();

    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    res.status(200).json({
      success: true,
      message:
        "Property status updated successfully",
      data: property,
    });
  } catch (error) {
    console.error(
      "Update property status error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update property status",
      error: error.message,
    });
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updatePropertyStatus,
};