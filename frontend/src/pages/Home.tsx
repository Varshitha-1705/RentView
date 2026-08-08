import Navbar from "../components/layout/Navbar";
import PropertyCard from "../components/property/PropertyCard";
import { properties } from "../data/propertyData";
import AIChat from "../components/ai/AIChat";

function Home() {
  const availableProperties = properties.filter(
    (property) => property.status === "available"
  );

  return (
    <div className="app">
      <div className="background-effects">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
        <div className="glow glow-three"></div>
      </div>

      <Navbar />

      <main className="home-container">
        {/* Building Header */}
        <section className="building-header">
          <p className="eyebrow">RENTVIEW</p>

          <h1>VNS Residency</h1>

          <p className="building-location">
            Bangalore, Karnataka
          </p>

          <div className="availability-badge">
            <span></span>
            {availableProperties.length}{" "}
            {availableProperties.length === 1
              ? "Home"
              : "Homes"}{" "}
            Available
          </div>
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

          {/* Dynamic Property Cards */}
          <div className="property-grid">
            {availableProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        </section>
      </main>

      {/* AI Chat Button */}
      <AIChat />
    </div>
  );
}

export default Home;