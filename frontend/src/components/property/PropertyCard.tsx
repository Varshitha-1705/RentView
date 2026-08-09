import { useNavigate } from "react-router-dom";
import type { Property } from "../../data/propertyData";

interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();

  return (
    <div className="property-card">

      {/* Property Image */}
      <div className="property-image">
        <img
          src={
            property.images?.[0]
              ? `http://localhost:5000${property.images[0]}`
              : ""
          }
          alt={`${property.houseNumber} main view`}
        />

        <span className="house-number">
          {property.houseNumber}
        </span>
      </div>

      {/* Property Content */}
      <div className="property-content">

        {/* Title + Availability */}
        <div className="property-top">
          <h3>{property.title}</h3>

          <span className="available">
            Available
          </span>
        </div>

        {/* Property Details */}
        <p className="property-details">
          {property.floor} • {property.furnishing} •{" "}
          {property.parking ? "Parking" : "No Parking"}
        </p>

        {/* Rent */}
        <div className="property-price">
          <strong>
            ₹{property.rent.toLocaleString("en-IN")}
          </strong>

          <span>/ month</span>
        </div>

        {/* Explore Button */}
        <button
          type="button"
          className="explore-button"
          onClick={() => navigate(`/property/${property._id}`)}
        >
          Explore Home →
        </button>

      </div>
    </div>
  );
}

export default PropertyCard;