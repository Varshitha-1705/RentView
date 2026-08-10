const express = require("express");
const { askAI } = require("../../../ai/aiService");

const router = express.Router();

// ======================================================
// POST /api/ai/ask
// ======================================================

router.post("/ask", async (req, res) => {
  try {
    const { question, context } = req.body;

    // Validate question
    if (
      !question ||
      typeof question !== "string" ||
      question.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // Ask AI service
    const result = await askAI(
      question.trim(),
      context || {}
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "AI request failed",
    });
  }
});

module.exports = router;