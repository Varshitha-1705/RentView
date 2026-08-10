const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Owner = require("../models/Owner");

// ======================================================
// OWNER LOGIN
// ======================================================

const ownerLogin = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // --------------------------------------------------
    // Validate input
    // --------------------------------------------------

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID and password are required",
      });
    }

    // --------------------------------------------------
    // Find owner
    // --------------------------------------------------

    const owner = await Owner.findOne({
      userId: userId.trim(),
    });

    if (!owner) {
      return res.status(401).json({
        success: false,
        message: "Invalid User ID or Password",
      });
    }

    // --------------------------------------------------
    // Compare password
    // --------------------------------------------------

    const passwordMatches = await bcrypt.compare(
      password,
      owner.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid User ID or Password",
      });
    }

    // --------------------------------------------------
    // Create JWT
    // --------------------------------------------------

    const token = jwt.sign(
      {
        ownerId: owner._id.toString(),
        userId: owner.userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // --------------------------------------------------
    // Send response
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      owner: {
        id: owner._id,
        userId: owner.userId,
      },
    });
  } catch (error) {
    console.error("Owner login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// ======================================================
// CREATE OWNER
// ======================================================
//
// We will use this once to create your initial owner.
// This endpoint will NOT be exposed publicly in the
// final version.
//

const createOwner = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // --------------------------------------------------
    // Validate input
    // --------------------------------------------------

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID and password are required",
      });
    }

    // --------------------------------------------------
    // Check if owner already exists
    // --------------------------------------------------

    const existingOwner = await Owner.findOne({
      userId: userId.trim(),
    });

    if (existingOwner) {
      return res.status(409).json({
        success: false,
        message: "Owner already exists",
      });
    }

    // --------------------------------------------------
    // Hash password
    // --------------------------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // --------------------------------------------------
    // Create owner
    // --------------------------------------------------

    const owner = await Owner.create({
      userId: userId.trim(),
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Owner created successfully",
      owner: {
        id: owner._id,
        userId: owner.userId,
      },
    });
  } catch (error) {
    console.error("Create owner error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create owner",
    });
  }
};

module.exports = {
  ownerLogin,
  createOwner,
};