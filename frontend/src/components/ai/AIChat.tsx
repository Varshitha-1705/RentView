import { useState } from "react";
import { askAI } from "../../services/aiService";

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim() || loading) {
      return;
    }

    try {
      setLoading(true);
      setAnswer("");

      const response = await askAI(question);

      setAnswer(response);
    } catch (error) {
      console.error("AI ERROR:", error);

      setAnswer(
        "Sorry, I couldn't get an answer right now."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* AI POPUP */}

      {isOpen && (
        <div className="ai-chat-popup">
          <div className="ai-chat-header">
            <div>
              <span>✦</span>

              <div>
                <strong>RentView AI</strong>

                <p>
                  Ask about available homes
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI chat"
            >
              ×
            </button>
          </div>

          <div className="ai-chat-body">
            {!answer && !loading && (
              <p className="ai-chat-welcome">
                Hi! 👋 Ask me anything about
                RentView properties.
              </p>
            )}

            {answer && (
              <div className="ai-chat-answer">
                {answer}
              </div>
            )}

            {loading && (
              <div className="ai-chat-answer">
                Thinking...
              </div>
            )}
          </div>

          <div className="ai-chat-input">
            <input
              type="text"
              placeholder="Ask something..."
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAsk();
                }
              }}
            />

            <button
              type="button"
              onClick={handleAsk}
              disabled={
                !question.trim() || loading
              }
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* AI BUTTON */}

      {!isOpen && (
        <button
          type="button"
          className="ai-chat-button"
          onClick={() => setIsOpen(true)}
        >
          <span>✦</span>
          Ask RentView AI
        </button>
      )}
    </>
  );
}

export default AIChat;