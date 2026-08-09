const express = require("express");
const cors = require("cors");

const propertyRoutes = require("./routes/propertyRoutes");

const app = express();


// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    message: "RentView Backend is running 🚀",
  });
});

// Property routes
app.use("/api/properties", propertyRoutes);

module.exports = app;