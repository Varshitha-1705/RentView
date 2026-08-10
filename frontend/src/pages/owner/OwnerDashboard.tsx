import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import {
  getProperties,
  updatePropertyStatus,
} from "../../services/propertyService";

import type { Property } from "../../data/propertyData";

// ======================================================
// BACKEND URL
// ======================================================

const BACKEND_URL = "http://localhost:5000";

// ======================================================
// MEDIA URL HELPER
// ======================================================

const getMediaUrl = (
  path: string | undefined | null
): string => {
  if (!path) {
    return "";
  }

  // Already a complete URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  // Backend path such as:
  // /uploads/image.jpg
  //
  // becomes:
  // http://localhost:5000/uploads/image.jpg

  return `${BACKEND_URL}${
    path.startsWith("/") ? path : `/${path}`
  }`;
};

// ======================================================
// OWNER DASHBOARD
// ======================================================

function OwnerDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingPropertyId, setUpdatingPropertyId] =
    useState<string | null>(null);

  // ====================================================
  // FETCH PROPERTIES
  // ====================================================

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProperties();

        setProperties(data);
      } catch (error) {
        console.error(
          "Failed to load properties:",
          error
        );

        setError("Unable to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // ====================================================
  // FILTER PROPERTIES
  // ====================================================

  const availableProperties = properties.filter(
    (property) =>
      property.status === "available"
  );

  const occupiedProperties = properties.filter(
    (property) =>
      property.status === "occupied"
  );

  // ====================================================
  // MARK PROPERTY OCCUPIED / AVAILABLE
  // ====================================================

  const togglePropertyStatus = async (
    property: Property
  ) => {
    if (!property._id) {
      return;
    }

    const newStatus =
      property.status === "available"
        ? "occupied"
        : "available";

    try {
      setUpdatingPropertyId(property._id);

      // Update backend
      const updatedProperty =
        await updatePropertyStatus(
          property._id,
          newStatus
        );

      // Update frontend using backend response
      setProperties((previousProperties) =>
        previousProperties.map(
          (currentProperty) =>
            currentProperty._id === property._id
              ? updatedProperty
              : currentProperty
        )
      );
    } catch (error) {
      console.error(
        "STATUS UPDATE ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update property status."
      );
    } finally {
      setUpdatingPropertyId(null);
    }
  };

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <div className="app">

        <div className="background-glow"></div>

        <Navbar />

        <main className="owner-dashboard">

          <p className="section-label">
            RENTVIEW • OWNER PORTAL
          </p>

          <h1>
            Loading properties...
          </h1>

          <p>
            Please wait while your properties
            are being loaded.
          </p>

        </main>

      </div>
    );
  }

  // ====================================================
  // ERROR
  // ====================================================

  if (error) {
    return (
      <div className="app">

        <div className="background-glow"></div>

        <Navbar />

        <main className="owner-dashboard">

          <p className="section-label">
            RENTVIEW • OWNER PORTAL
          </p>

          <h1>
            Unable to load properties
          </h1>

          <p>
            {error}
          </p>

          <button
            type="button"
            className="primary-action"
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>

        </main>

      </div>
    );
  }

  // ====================================================
  // DASHBOARD
  // ====================================================

  return (
    <div className="app">

      {/* Background */}

      <div className="background-glow"></div>

      {/* Navbar */}

      <Navbar />

      {/* Dashboard */}

      <main className="owner-dashboard">

        {/* ==================================================
            HEADER
        ================================================== */}

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

        {/* ==================================================
            STATISTICS
        ================================================== */}

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

        {/* ==================================================
            YOUR PROPERTIES
        ================================================== */}

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

          {/* ==================================================
              PROPERTY LIST
          ================================================== */}

          <div className="owner-property-list">

            {properties.length === 0 ? (

              <div className="property-info-card">

                <p className="section-label">
                  NO PROPERTIES
                </p>

                <h2>
                  No properties yet
                </h2>

                <p>
                  Add your first property to
                  start managing your listings.
                </p>

                <Link
                  to="/owner/add-property"
                  className="primary-action"
                >
                  + Add Property
                </Link>

              </div>

            ) : (

              properties.map((property) => {

                // ------------------------------------------
                // PROPERTY IMAGE
                // ------------------------------------------

                const imageUrl =
                  getMediaUrl(
                    property.images?.[0]
                  );

                // ------------------------------------------
                // STATUS
                // ------------------------------------------

                const isAvailable =
                  property.status === "available";

                const isUpdating =
                  updatingPropertyId ===
                  property._id;

                return (

                  <div
                    key={property._id}
                    className="owner-property-card"
                  >

                    {/* ==================================================
                        PROPERTY IMAGE
                    ================================================== */}

                    <div className="owner-property-image">

                      {imageUrl ? (

                        <img
                          src={imageUrl}
                          alt={`${property.houseNumber} property`}
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <div className="property-image-placeholder">
                          Property Image
                        </div>

                      )}

                    </div>

                    {/* ==================================================
                        PROPERTY INFORMATION
                    ================================================== */}

                    <div className="owner-property-info">

                      {/* TITLE + STATUS */}

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
                            isAvailable
                              ? "available"
                              : "occupied"
                          }
                        >
                          ●{" "}
                          {isAvailable
                            ? "Available"
                            : "Occupied"}
                        </span>

                      </div>

                      {/* ==================================================
                          PROPERTY DETAILS
                      ================================================== */}

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

                      {/* ==================================================
                          ACTIONS
                      ================================================== */}

                      <div className="owner-property-actions">

                        {/* VIEW PROPERTY */}

                        <Link
                          to={`/property/${property._id}`}
                          className="secondary-action"
                        >
                          View Property
                        </Link>

                        {/* MARK OCCUPIED / AVAILABLE */}

                        <button
                          type="button"
                          className="secondary-action"
                          disabled={isUpdating}
                          onClick={() =>
                            togglePropertyStatus(
                              property
                            )
                          }
                        >
                          {isUpdating
                            ? "Updating..."
                            : isAvailable
                            ? "Mark Occupied"
                            : "Mark Available"}
                        </button>

                      </div>

                    </div>

                  </div>

                );
              })

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default OwnerDashboard;