const express = require("express");
const cors = require("cors");

const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ======================================================
// CORS
// ======================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    credentials: true,
  })
);

// ======================================================
// BODY PARSER
// ======================================================

app.use(express.json());

// ======================================================
// UPLOADS
// ======================================================

app.use(
  "/uploads",
  express.static("uploads")
);

// ======================================================
// ROOT
// ======================================================

app.get("/", (req, res) => {
  res.json({
    message: "RentView Backend is running 🚀",
  });
});

// ======================================================
// AUTHENTICATION ROUTES
// ======================================================

app.use(
  "/api/auth",
  authRoutes
);

// ======================================================
// PROPERTY ROUTES
// ======================================================

app.use(
  "/api/properties",
  propertyRoutes
);

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================================================
// ERROR HANDLER
// ======================================================

app.use((error, req, res, next) => {
  console.error("SERVER ERROR:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

module.exports = app;