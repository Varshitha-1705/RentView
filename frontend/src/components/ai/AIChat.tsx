import { useState } from "react";

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("User message:", message);

    setMessage("");
  };

  return (
    <>
      {/* AI Chat Popup */}
      {isOpen && (
        <div className="ai-chat-window">

          {/* Header */}
          <div className="ai-chat-header">

            <div className="ai-chat-title">

              <div className="ai-chat-icon">
                ✦
              </div>

              <div>
                <h3>RentView AI</h3>

                <span>
                  Property Assistant
                </span>
              </div>

            </div>

            <button
              type="button"
              className="ai-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI chat"
            >
              ×
            </button>

          </div>


          {/* Messages */}
          <div className="ai-chat-messages">

            <div className="ai-message ai-message-bot">

              <div className="ai-message-avatar">
                ✦
              </div>

              <div className="ai-message-content">

                <p>
                  Hi! 👋 I'm RentView AI.
                </p>

                <p>
                  I can help you with questions
                  about available homes, rent,
                  parking, amenities and more.
                </p>

              </div>

            </div>


            {/* Temporary example message */}

            <div className="ai-message ai-message-user">

              <div className="ai-message-content">
                <p>
                  Is parking available?
                </p>
              </div>

            </div>


            <div className="ai-message ai-message-bot">

              <div className="ai-message-avatar">
                ✦
              </div>

              <div className="ai-message-content">

                <p>
                  Sure! I can help you check
                  the parking availability.
                </p>

              </div>

            </div>

          </div>


          {/* Input */}
          <div className="ai-chat-input-area">

            <input
              type="text"
              placeholder="Ask about this home..."
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSend();
                }
              }}
            />

            <button
              type="button"
              onClick={handleSend}
              aria-label="Send message"
            >
              →
            </button>

          </div>

        </div>
      )}


      {/* Floating AI Button */}
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