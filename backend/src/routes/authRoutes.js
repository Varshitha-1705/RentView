const express = require("express");

const {
  ownerLogin,
  createOwner,
} = require("../controllers/authController");

const router = express.Router();

// ======================================================
// OWNER LOGIN
// ======================================================

router.post("/login", ownerLogin);

// ======================================================
// CREATE OWNER
// ======================================================
//
// Temporary route for creating the first owner.
// We will remove/protect this later.
//

router.post("/create", createOwner);

module.exports = router;