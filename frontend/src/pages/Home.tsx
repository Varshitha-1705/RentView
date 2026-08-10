import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import PropertyCard from "../components/property/PropertyCard";
import AIChat from "../components/ai/AIChat";

import { getProperties } from "../services/propertyService";
import type { Property } from "../data/propertyData";

function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // FETCH PROPERTIES
  // ======================================================

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProperties();

        setProperties(data);
      } catch (error) {
        console.error("Failed to load properties:", error);

        setError("Unable to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // ======================================================
  // AVAILABLE PROPERTIES
  // ======================================================

  const availableProperties = properties.filter(
    (property) => property.status === "available"
  );

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="app home-page">

      {/* ==================================================
          BACKGROUND EFFECTS
      ================================================== */}

      <div className="background-glow"></div>

      <div className="background-orb background-orb-one"></div>

      <div className="background-orb background-orb-two"></div>

      <div className="background-orb background-orb-three"></div>

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <Navbar />

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="home-container">

        {/* ==================================================
            BUILDING HEADER
        ================================================== */}

        <section className="building-header">

          <p className="eyebrow">
            RENTVIEW
          </p>

          <h1>
            VNS Residency
          </h1>

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

        {/* ==================================================
            AVAILABLE HOUSES
        ================================================== */}

        <section className="properties-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                AVAILABLE NOW
              </p>

              <h2>
                Choose your home
              </h2>

            </div>

            <p className="section-description">
              Explore the available homes in this
              building and find the one that fits you.
            </p>

          </div>

          {/* ==================================================
              LOADING
          ================================================== */}

          {loading && (
            <div className="property-loading">
              <p>
                Loading properties...
              </p>
            </div>
          )}

          {/* ==================================================
              ERROR
          ================================================== */}

          {!loading && error && (
            <div className="property-error">
              <p>
                {error}
              </p>
            </div>
          )}

          {/* ==================================================
              PROPERTY GRID
          ================================================== */}

          {!loading &&
            !error &&
            availableProperties.length > 0 && (
              <div className="property-grid">

                {availableProperties.map(
                  (property) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                    />
                  )
                )}

              </div>
            )}

          {/* ==================================================
              NO AVAILABLE PROPERTIES
          ================================================== */}

          {!loading &&
            !error &&
            availableProperties.length === 0 && (
              <div className="property-empty">

                <p className="section-label">
                  CURRENTLY UNAVAILABLE
                </p>

                <h3>
                  No homes are available right now.
                </h3>

                <p>
                  Check back later for new
                  availability.
                </p>

              </div>
            )}

        </section>

      </main>

      {/* ==================================================
          AI CHAT
      ================================================== */}

      <AIChat />

    </div>
  );
}

export default Home;