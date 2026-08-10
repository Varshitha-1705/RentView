import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import PropertyCard from "../components/property/PropertyCard";
import { getProperties } from "../services/propertyService";
import type { Property } from "../data/propertyData";

function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // AI CHAT
  const [showAiChat, setShowAiChat] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const availableProperties = properties.filter(
    (property) => property.status === "available"
  );

  return (
    <div>
      <Navbar />

      <main className="home-container">
        {/* Building Header */}
        <section className="building-header">
          <p className="eyebrow">RENTVIEW</p>

          <h1>VNS Residency</h1>

          <p className="building-location">
            Bangalore, Karnataka
          </p>

          {!loading && !error && (
            <div className="availability-badge">
              <span></span>

              {availableProperties.length}{" "}
              {availableProperties.length === 1
                ? "Home"
                : "Homes"}{" "}
              Available
            </div>
          )}
        </section>

        {/* Available Houses */}
        <section className="properties-section">
          <div className="section-heading">
            <div>
              <p className="section-label">AVAILABLE NOW</p>

              <h2>Choose your home</h2>
            </div>

            <p className="section-description">
              Explore the available homes in this building
              and find the one that fits you.
            </p>
          </div>

          {/* Loading */}
          {loading && <p>Loading properties...</p>}

          {/* Error */}
          {!loading && error && <p>{error}</p>}

          {/* Properties */}
          {!loading && !error && (
            <div className="property-grid">
              {availableProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ==================================================
          AI CHAT
      ================================================== */}

      {showAiChat && (
        <div className="ai-chat-popup">
          <div className="ai-chat-popup-header">
            <div>
              <strong>RentView AI</strong>
              <span>Property Assistant</span>
            </div>

            <button
              type="button"
              className="ai-chat-close"
              onClick={() => setShowAiChat(false)}
              aria-label="Close AI chat"
            >
              ×
            </button>
          </div>

          <div className="ai-chat-popup-body">
            <p>
              👋 Hi! I’m RentView AI.
            </p>

            <p>
              I can help you find the right home
              at VNS Residency.
            </p>
          </div>

          <div className="ai-chat-popup-input">
            <input
              type="text"
              placeholder="Ask about properties..."
            />

            <button type="button">
              →
            </button>
          </div>
        </div>
      )}

      {/* AI Chat Button */}
      <button
        type="button"
        className="ai-chat-button"
        onClick={() => setShowAiChat((previous) => !previous)}
      >
        <span>✦</span>
        Ask RentView AI
      </button>
    </div>
  );
}

export default Home;