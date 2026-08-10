const askAI = async (question, context) => {
  // AI connection will be added next.
  // For now, just confirm the data is reaching the AI service.

  return {
    answer: `I received your question: "${question}"`,
    context,
  };
};

module.exports = {
  askAI,
};