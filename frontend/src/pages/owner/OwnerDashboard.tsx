import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import { getProperties } from "../../services/propertyService";
import type { Property } from "../../data/propertyData";

function OwnerDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH PROPERTIES FROM BACKEND
  // --------------------------------------------------

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

  // --------------------------------------------------
  // FILTER PROPERTIES
  // --------------------------------------------------

  const availableProperties = properties.filter(
    (property) => property.status === "available"
  );

  const occupiedProperties = properties.filter(
    (property) => property.status === "occupied"
  );

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="app">
        <Navbar />

        <main className="owner-dashboard">
          <p className="section-label">
            RENTVIEW • OWNER PORTAL
          </p>

          <h1>Loading properties...</h1>
        </main>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error) {
    return (
      <div className="app">
        <Navbar />

        <main className="owner-dashboard">
          <p className="section-label">
            RENTVIEW • OWNER PORTAL
          </p>

          <h1>Unable to load properties</h1>

          <p>{error}</p>
        </main>
      </div>
    );
  }

  // --------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------

  return (
    <div className="app">

      {/* Background Effects */}
      <div className="background-glow"></div>

      {/* Navbar */}
      <Navbar />

      {/* Dashboard */}
      <main className="owner-dashboard">

        {/* =========================
            HEADER
        ========================= */}

        <section className="owner-header">

          <div>

            <p className="section-label">
              RENTVIEW • OWNER PORTAL
            </p>

            <h1>
              Property Dashboard
            </h1>

            <p>
              Manage your building properties,
              availability and rental listings.
            </p>

          </div>

          <Link
            to="/owner/add-property"
            className="primary-action"
          >
            + Add Property
          </Link>

        </section>


        {/* =========================
            STATISTICS
        ========================= */}

        <section className="owner-stats">

          <div className="owner-stat-card">

            <span>
              Total Properties
            </span>

            <strong>
              {properties.length}
            </strong>

          </div>


          <div className="owner-stat-card">

            <span>
              Available
            </span>

            <strong>
              {availableProperties.length}
            </strong>

          </div>


          <div className="owner-stat-card">

            <span>
              Occupied
            </span>

            <strong>
              {occupiedProperties.length}
            </strong>

          </div>

        </section>


        {/* =========================
            PROPERTIES
        ========================= */}

        <section className="owner-properties">

          <div className="section-heading">

            <div>

              <p className="section-label">
                YOUR PROPERTIES
              </p>

              <h2>
                Manage Homes
              </h2>

            </div>

            <p>
              View and manage all properties
              in VNS Residency.
            </p>

          </div>


          {/* =========================
              PROPERTY LIST
          ========================= */}

          <div className="owner-property-list">

            {properties.map((property) => (

              <div
                key={property._id}
                className="owner-property-card"
              >

                {/* Property Image */}

                <div className="owner-property-image">

                  {property.images?.[0] ? (
                    <img
                      src={property.images[0]}
                      alt={property.houseNumber}
                    />
                  ) : (
                    <div className="property-image-placeholder">
                      Property Image
                    </div>
                  )}

                </div>


                {/* Property Information */}

                <div className="owner-property-info">

                  {/* Title + Status */}

                  <div className="owner-property-title">

                    <div>

                      <p className="section-label">
                        {property.houseNumber}
                      </p>

                      <h3>
                        {property.title}
                      </h3>

                    </div>


                    <span
                      className={
                        property.status === "available"
                          ? "available"
                          : "occupied"
                      }
                    >
                      ● {property.status}
                    </span>

                  </div>


                  {/* Details */}

                  <div className="owner-property-details">

                    <span>
                      {property.configuration}
                    </span>

                    <span>
                      {property.floor}
                    </span>

                    <span>
                      {property.furnishing}
                    </span>

                    <span>
                      ₹
                      {property.rent.toLocaleString(
                        "en-IN"
                      )}
                      /month
                    </span>

                  </div>


                  {/* Actions */}

                  <div className="owner-property-actions">

                    <Link
                      to={`/property/${property._id}`}
                      className="secondary-action"
                    >
                      View Property
                    </Link>

                    <button
                      type="button"
                      className="secondary-action"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="secondary-action"
                    >
                      {property.status === "available"
                        ? "Mark Occupied"
                        : "Mark Available"}
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default OwnerDashboard;