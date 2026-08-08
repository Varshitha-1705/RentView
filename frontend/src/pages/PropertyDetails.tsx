import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { properties } from "../data/propertyData";

function PropertyDetails() {
  const { id } = useParams<{ id: string }>();

  const property = properties.find(
    (item) => item.id === id
  );

  // --------------------------------------------------
  // HANDLE INVALID PROPERTY
  // --------------------------------------------------

  if (!property) {
    return (
      <div className="app">
        <Navbar />

        <main className="property-details-page">
          <div className="property-info-card">
            <p className="section-label">RENTVIEW</p>

            <h1>Property Not Found</h1>

            <p>
              The property you are looking for does not
              exist or is no longer available.
            </p>

            <Link
              to="/"
              className="primary-action"
            >
              ← Back to available homes
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // --------------------------------------------------
  // PROPERTY MEDIA
  // --------------------------------------------------

  const mainImage =
    property.images[0] || "";

  // --------------------------------------------------
  // AI CHAT STATE
  // --------------------------------------------------

  const [messages, setMessages] = useState<
    { role: "ai" | "user"; text: string }[]
  >([
    {
      role: "ai",
      text: `Hi! I'm your ${property.houseNumber} assistant. Ask me anything about this property.`,
    },
  ]);

  const [input, setInput] = useState("");

  // --------------------------------------------------
  // AI RESPONSE LOGIC
  // --------------------------------------------------

  const getAnswer = (question: string) => {
    const q = question.toLowerCase();

    if (q.includes("parking")) {
      return property.parking
        ? `Yes. ${property.houseNumber} has ${property.parkingType}.`
        : `No, ${property.houseNumber} does not have parking.`;
    }

    if (q.includes("deposit")) {
      return `The security deposit for ${
        property.houseNumber
      } is ₹${property.deposit.toLocaleString("en-IN")}.`;
    }

    if (
      q.includes("furnished") ||
      q.includes("furniture")
    ) {
      return `${property.houseNumber} is ${property.furnishing.toLowerCase()}.`;
    }

    if (q.includes("pet")) {
      return property.petsAllowed
        ? "Yes, pets are allowed in this property."
        : "Sorry, pets are not allowed in this property.";
    }

    if (
      q.includes("rent") ||
      q.includes("price")
    ) {
      return `The monthly rent for ${
        property.houseNumber
      } is ₹${property.rent.toLocaleString("en-IN")}.`;
    }

    if (q.includes("maintenance")) {
      return `The monthly maintenance is ₹${property.maintenance.toLocaleString(
        "en-IN"
      )}.`;
    }

    if (
      q.includes("visit") ||
      q.includes("tomorrow")
    ) {
      return "You can submit a visit request using the I'm Interested button. The owner can then confirm the available visiting time.";
    }

    if (q.includes("available")) {
      return property.status === "available"
        ? `${property.houseNumber} is currently available for rent.`
        : `${property.houseNumber} is currently occupied.`;
    }

    if (q.includes("floor")) {
      return `${property.houseNumber} is located on the ${property.floor}.`;
    }

    if (
      q.includes("amenities") ||
      q.includes("facilities")
    ) {
      return `The available amenities include ${property.amenities.join(
        ", "
      )}.`;
    }

    return `I currently have information about ${property.houseNumber}'s rent, deposit, furnishing, parking, pets policy, maintenance, floor, amenities and visit requests. Try asking me about one of these.`;
  };

  // --------------------------------------------------
  // SEND MESSAGE
  // --------------------------------------------------

  const sendMessage = (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) return;

    const answer = getAnswer(trimmedQuestion);

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        text: trimmedQuestion,
      },
      {
        role: "ai",
        text: answer,
      },
    ]);

    setInput("");
  };

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <div className="app">
      <Navbar />

      <main className="property-details-page">

        {/* BACK BUTTON */}

        <Link
          to="/"
          className="back-button"
        >
          ← Back to available homes
        </Link>

        {/* =====================================================
            PROPERTY HEADER
        ===================================================== */}

        <section className="property-page-header">

          <div>

            <p className="section-label">
              RENTVIEW •{" "}
              {property.houseNumber.toUpperCase()}
            </p>

            <h1>
              {property.title}
            </h1>

            <p className="property-location">
              {property.building} •{" "}
              {property.location}
            </p>

          </div>

          <span className="available">
            ●{" "}
            {property.status === "available"
              ? "Available"
              : "Occupied"}
          </span>

        </section>

        {/* =====================================================
            VIDEO WALKTHROUGH
        ===================================================== */}

        <section className="walkthrough-section">

          <div className="section-title">

            <div>

              <p className="section-label">
                PROPERTY WALKTHROUGH
              </p>

              <h2>
                Take a virtual look around
              </h2>

            </div>

          </div>

          <div className="video-container">

            <video
              className="property-video"
              controls
              preload="metadata"
              poster={mainImage}
            >

              <source
                src={property.video}
                type="video/mp4"
              />

              Your browser does not support the video tag.

            </video>

          </div>

        </section>

        {/* =====================================================
            PROPERTY PHOTOS
        ===================================================== */}

        <section className="photos-section">

          <div className="section-title">

            <div>

              <p className="section-label">
                PROPERTY PHOTOS
              </p>

              <h2>
                Explore the space
              </h2>

            </div>

          </div>

          <div className="photo-grid">

            {property.images.map(
              (image, index) => (

                <div
                  key={image}
                  className={
                    index === 0
                      ? "photo-card large"
                      : "photo-card"
                  }
                >

                  <img
                    src={image}
                    alt={`${property.houseNumber} view ${
                      index + 1
                    }`}
                  />

                </div>

              )
            )}

          </div>

        </section>

        {/* =====================================================
            PROPERTY INFORMATION + AI
        ===================================================== */}

        <section className="property-main-grid">

          {/* =================================================
              PROPERTY INFORMATION
          ================================================= */}

          <div className="property-info-card">

            <p className="section-label">
              {property.houseNumber.toUpperCase()}
            </p>

            <h2>
              Everything you need to know
            </h2>

            {/* PROPERTY STATS */}

            <div className="property-stats">

              <div>

                <span>
                  Monthly Rent
                </span>

                <strong>
                  ₹{property.rent.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div>

                <span>
                  Security Deposit
                </span>

                <strong>
                  ₹{property.deposit.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div>

                <span>
                  Configuration
                </span>

                <strong>
                  {property.configuration}
                </strong>

              </div>

              <div>

                <span>
                  Floor
                </span>

                <strong>
                  {property.floor}
                </strong>

              </div>

              <div>

                <span>
                  Furnishing
                </span>

                <strong>
                  {property.furnishing}
                </strong>

              </div>

              <div>

                <span>
                  Parking
                </span>

                <strong>
                  {property.parking
                    ? "Available"
                    : "Not Available"}
                </strong>

              </div>

            </div>

            {/* AMENITIES */}

            <div className="amenities">

              <h3>
                Amenities
              </h3>

              <div className="amenity-list">

                {property.amenities.map(
                  (amenity) => (

                    <span key={amenity}>
                      ✓ {amenity}
                    </span>

                  )
                )}

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="property-description">

              <h3>
                About this home
              </h3>

              <p>
                A comfortable{" "}
                {property.configuration}{" "}
                {property.furnishing.toLowerCase()}{" "}
                apartment located at{" "}
                {property.building}. The property
                offers essential amenities and is{" "}
                {property.status === "available"
                  ? "available for immediate occupancy."
                  : "currently occupied."}
              </p>

            </div>

            {/* ACTION BUTTONS */}

            <div className="property-actions">

              <button className="primary-action">
                I'm Interested
              </button>

              <button className="secondary-action">
                Contact Owner
              </button>

            </div>

          </div>

          {/* =================================================
              AI ASSISTANT
          ================================================= */}

          <aside className="ai-panel">

            {/* AI HEADER */}

            <div className="ai-header">

              <div className="ai-icon">
                ✦
              </div>

              <div>

                <h3>
                  RentView AI
                </h3>

                <p>
                  {property.houseNumber} Assistant
                </p>

              </div>

              <span className="ai-status"></span>

            </div>

            {/* AI MESSAGES */}

            <div className="ai-messages">

              {messages.map(
                (message, index) => (

                  <div
                    key={index}
                    className={
                      message.role === "user"
                        ? "ai-message user-message"
                        : "ai-message"
                    }
                  >

                    <span className="message-icon">
                      {message.role === "ai"
                        ? "✦"
                        : "You"}
                    </span>

                    <p>
                      {message.text}
                    </p>

                  </div>

                )
              )}

              {/* SUGGESTED QUESTIONS */}

              <div className="suggested-questions">

                <button
                  onClick={() =>
                    sendMessage(
                      "Is parking available?"
                    )
                  }
                >
                  Is parking available?
                </button>

                <button
                  onClick={() =>
                    sendMessage(
                      "What is the deposit?"
                    )
                  }
                >
                  What is the deposit?
                </button>

                <button
                  onClick={() =>
                    sendMessage(
                      "Is it furnished?"
                    )
                  }
                >
                  Is it furnished?
                </button>

                <button
                  onClick={() =>
                    sendMessage(
                      "Are pets allowed?"
                    )
                  }
                >
                  Are pets allowed?
                </button>

                <button
                  onClick={() =>
                    sendMessage(
                      "Can I visit tomorrow?"
                    )
                  }
                >
                  Can I visit tomorrow?
                </button>

              </div>

            </div>

            {/* AI INPUT */}

            <div className="ai-input-area">

              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage(input);
                  }
                }}
                placeholder={`Ask about ${property.houseNumber}...`}
              />

              <button
                type="button"
                onClick={() =>
                  sendMessage(input)
                }
                aria-label="Send message"
              >
                ➤
              </button>

            </div>

            {/* DISCLAIMER */}

            <p className="ai-disclaimer">
              AI answers are based on information
              provided for{" "}
              {property.houseNumber}.
            </p>

          </aside>

        </section>

      </main>
    </div>
  );
}

export default PropertyDetails;