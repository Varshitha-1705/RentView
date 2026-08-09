import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { getPropertyById } from "../services/propertyService";
import type { Property } from "../data/propertyData";

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

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${BACKEND_URL}${
    path.startsWith("/") ? path : `/${path}`
  }`;
};

// ======================================================
// PROPERTY DETAILS
// ======================================================

function PropertyDetails() {
  const { id } = useParams<{ id: string }>();

  const [property, setProperty] =
    useState<Property | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showContactForm, setShowContactForm] =
    useState(false);

  const [contactForm, setContactForm] = useState({
    name: "",
    occupation: "",
    people: "1",
    phone: "",
    visitTime: "",
  });

  // ====================================================
  // FETCH PROPERTY
  // ====================================================

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setError("Property ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (error) {
        console.error(
          "Failed to load property:",
          error
        );

        setError("Unable to load property.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <div className="app">
        <Navbar />

        <main className="property-details-page">
          <div className="property-info-card">
            <p className="section-label">
              RENTVIEW
            </p>

            <h1>Loading property...</h1>

            <p>
              Please wait while we load the property
              details.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ====================================================
  // ERROR
  // ====================================================

  if (error || !property) {
    return (
      <div className="app">
        <Navbar />

        <main className="property-details-page">
          <div className="property-info-card">
            <p className="section-label">
              RENTVIEW
            </p>

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

  // ====================================================
  // MEDIA
  // ====================================================

  const mainImage = getMediaUrl(
    property.images?.[0]
  );

  const videoUrl = getMediaUrl(property.video);

  // ====================================================
  // SUBMIT VISIT REQUEST
  // ====================================================

  const handleContactSubmit = () => {
    if (
      !contactForm.name.trim() ||
      !contactForm.occupation.trim() ||
      !contactForm.phone.trim() ||
      !contactForm.visitTime
    ) {
      alert("Please fill in all the details.");
      return;
    }

    alert(
      `Visit request submitted successfully!\n\nProperty: ${property.houseNumber}\nName: ${contactForm.name}\nPeople: ${contactForm.people}\nPreferred Time: ${contactForm.visitTime}`
    );

    setContactForm({
      name: "",
      occupation: "",
      people: "1",
      phone: "",
      visitTime: "",
    });

    setShowContactForm(false);
  };

  // ====================================================
  // PAGE
  // ====================================================

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

        {/* PROPERTY HEADER */}

        <section className="property-page-header">

          <div>
            <p className="section-label">
              RENTVIEW •{" "}
              {property.houseNumber.toUpperCase()}
            </p>

            <h1>{property.title}</h1>

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

        {/* ==================================================
            VIDEO WALKTHROUGH
        ================================================== */}

        {videoUrl && (
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
                poster={mainImage || undefined}
              >
                <source
                  src={videoUrl}
                  type="video/mp4"
                />

                Your browser does not support the
                video tag.
              </video>
            </div>

          </section>
        )}

        {/* ==================================================
            PROPERTY PHOTOS
        ================================================== */}

        {property.images &&
          property.images.length > 0 && (
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
                  (image, index) => {
                    const imageUrl =
                      getMediaUrl(image);

                    return (
                      <div
                        key={`${image}-${index}`}
                        className={
                          index === 0
                            ? "photo-card large"
                            : "photo-card"
                        }
                      >
                        <img
                          src={imageUrl}
                          alt={`${property.houseNumber} view ${
                            index + 1
                          }`}
                        />
                      </div>
                    );
                  }
                )}

              </div>

            </section>
          )}

        {/* ==================================================
            PROPERTY INFORMATION + AI
        ================================================== */}

        <section className="property-main-grid">

          {/* PROPERTY INFORMATION */}

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
                <span>Monthly Rent</span>

                <strong>
                  ₹
                  {property.rent.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div>
                <span>Security Deposit</span>

                <strong>
                  ₹
                  {property.deposit.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div>
                <span>Configuration</span>

                <strong>
                  {property.configuration}
                </strong>
              </div>

              <div>
                <span>Floor</span>

                <strong>
                  {property.floor}
                </strong>
              </div>

              <div>
                <span>Furnishing</span>

                <strong>
                  {property.furnishing}
                </strong>
              </div>

              <div>
                <span>Parking</span>

                <strong>
                  {property.parking
                    ? "Available"
                    : "Not Available"}
                </strong>
              </div>

            </div>

            {/* AMENITIES */}

            <div className="amenities">

              <h3>Amenities</h3>

              <div className="amenity-list">

                {property.amenities?.map(
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

              <h3>About this home</h3>

              <p>
                {property.description ||
                  `A comfortable ${
                    property.configuration
                  } ${
                    property.furnishing.toLowerCase()
                  } apartment located at ${
                    property.building
                  }.`}
              </p>

            </div>

            {/* PET POLICY */}

            <div className="property-description">

              <h3>Pet Policy</h3>

              <p>
                {property.petPolicy}
              </p>

            </div>

            {/* CONTACT OWNER BUTTON */}

            <div className="property-actions">

              <button
                type="button"
                className="secondary-action"
                onClick={() =>
                  setShowContactForm(true)
                }
              >
                Contact Owner
              </button>

            </div>

          </div>

          {/* AI ASSISTANT */}

          <PropertyAI
            property={property}
          />

        </section>

      </main>

      {/* ==================================================
          CONTACT OWNER POPUP
      ================================================== */}

      {showContactForm && (
        <div
          className="contact-owner-popup"
          onClick={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setShowContactForm(false);
            }
          }}
        >

          <div className="contact-owner-form">

            {/* POPUP HEADER */}

            <div className="section-title">

              <div>
                <p className="section-label">
                  CONTACT OWNER
                </p>

                <h3>
                  Request a Visit
                </h3>

                <p>
                  Share your details and choose a
                  convenient time to visit the home.
                </p>
              </div>

              <button
                type="button"
                className="contact-popup-close"
                onClick={() =>
                  setShowContactForm(false)
                }
                aria-label="Close"
              >
                ×
              </button>

            </div>

            {/* NAME */}

            <div className="form-field">

              <label htmlFor="visitorName">
                Full Name
              </label>

              <input
                id="visitorName"
                type="text"
                value={contactForm.name}
                onChange={(event) =>
                  setContactForm({
                    ...contactForm,
                    name: event.target.value,
                  })
                }
                placeholder="Enter your full name"
              />

            </div>

            {/* OCCUPATION */}

            <div className="form-field">

              <label htmlFor="visitorOccupation">
                Occupation
              </label>

              <input
                id="visitorOccupation"
                type="text"
                value={contactForm.occupation}
                onChange={(event) =>
                  setContactForm({
                    ...contactForm,
                    occupation:
                      event.target.value,
                  })
                }
                placeholder="e.g. Software Engineer"
              />

            </div>

            {/* NUMBER OF PEOPLE */}

            <div className="form-field">

              <label htmlFor="visitorPeople">
                Number of People
              </label>

              <select
                id="visitorPeople"
                value={contactForm.people}
                onChange={(event) =>
                  setContactForm({
                    ...contactForm,
                    people: event.target.value,
                  })
                }
              >
                <option value="1">
                  1 Person
                </option>

                <option value="2">
                  2 People
                </option>

                <option value="3">
                  3 People
                </option>

                <option value="4">
                  4 People
                </option>

                <option value="5">
                  5 People
                </option>

                <option value="6">
                  6 People
                </option>
              </select>

            </div>

            {/* PHONE */}

            <div className="form-field">

              <label htmlFor="visitorPhone">
                Phone Number
              </label>

              <input
                id="visitorPhone"
                type="tel"
                value={contactForm.phone}
                onChange={(event) =>
                  setContactForm({
                    ...contactForm,
                    phone: event.target.value,
                  })
                }
                placeholder="Enter your phone number"
              />

            </div>

            {/* VISIT TIME */}

            <div className="form-field">

              <label htmlFor="visitTime">
                Preferred Visit Time
              </label>

              <select
                id="visitTime"
                value={contactForm.visitTime}
                onChange={(event) =>
                  setContactForm({
                    ...contactForm,
                    visitTime:
                      event.target.value,
                  })
                }
              >

                <option value="">
                  Select owner's available time
                </option>

                <option value="10:00 AM - 12:00 PM">
                  10:00 AM - 12:00 PM
                </option>

                <option value="12:00 PM - 2:00 PM">
                  12:00 PM - 2:00 PM
                </option>

                <option value="2:00 PM - 4:00 PM">
                  2:00 PM - 4:00 PM
                </option>

                <option value="4:00 PM - 6:00 PM">
                  4:00 PM - 6:00 PM
                </option>

                <option value="6:00 PM - 8:00 PM">
                  6:00 PM - 8:00 PM
                </option>

              </select>

            </div>

            {/* OWNER EMAIL */}

            <div className="owner-contact-info">

              <p>Owner's Email</p>

              <strong>
                owner@rentview.com
              </strong>

            </div>

            {/* POPUP ACTIONS */}

            <div className="property-actions">

              <button
                type="button"
                className="secondary-action"
                onClick={() =>
                  setShowContactForm(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-action"
                onClick={handleContactSubmit}
              >
                Send Visit Request →
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

// ======================================================
// AI ASSISTANT
// ======================================================

interface PropertyAIProps {
  property: Property;
}

function PropertyAI({
  property,
}: PropertyAIProps) {

  const [messages, setMessages] = useState<
    { role: "ai" | "user"; text: string }[]
  >([
    {
      role: "ai",
      text: `Hi! I'm your ${
        property.houseNumber
      } assistant. Ask me anything about this property.`,
    },
  ]);

  const [input, setInput] = useState("");

  // ====================================================
  // AI ANSWERS
  // ====================================================

  const getAnswer = (
    question: string
  ): string => {

    const q = question.toLowerCase();

    if (q.includes("parking")) {
      return property.parking
        ? `Yes. ${property.houseNumber} has parking available.`
        : `No, ${property.houseNumber} does not have parking.`;
    }

    if (q.includes("deposit")) {
      return `The security deposit for ${
        property.houseNumber
      } is ₹${property.deposit.toLocaleString(
        "en-IN"
      )}.`;
    }

    if (
      q.includes("furnished") ||
      q.includes("furniture")
    ) {
      return `${
        property.houseNumber
      } is ${property.furnishing.toLowerCase()}.`;
    }

    if (q.includes("pet")) {
      return property.petPolicy;
    }

    if (
      q.includes("rent") ||
      q.includes("price")
    ) {
      return `The monthly rent for ${
        property.houseNumber
      } is ₹${property.rent.toLocaleString(
        "en-IN"
      )}.`;
    }

    if (q.includes("floor")) {
      return `${
        property.houseNumber
      } is located on the ${property.floor}.`;
    }

    if (
      q.includes("amenities") ||
      q.includes("facilities")
    ) {
      return `The available amenities include ${
        property.amenities.join(", ")
      }.`;
    }

    if (q.includes("available")) {
      return property.status === "available"
        ? `${property.houseNumber} is currently available for rent.`
        : `${property.houseNumber} is currently occupied.`;
    }

    if (
      q.includes("visit") ||
      q.includes("tomorrow")
    ) {
      return "You can contact the owner to request a property visit and choose an available visiting time.";
    }

    return `I currently have information about ${
      property.houseNumber
    }'s rent, deposit, furnishing, parking, pet policy, floor, amenities and visit requests. Try asking me about one of these.`;
  };

  // ====================================================
  // SEND MESSAGE
  // ====================================================

  const sendMessage = (
    question: string
  ) => {

    const trimmedQuestion =
      question.trim();

    if (!trimmedQuestion) {
      return;
    }

    const answer =
      getAnswer(trimmedQuestion);

    setMessages(
      (previousMessages) => [
        ...previousMessages,

        {
          role: "user",
          text: trimmedQuestion,
        },

        {
          role: "ai",
          text: answer,
        },
      ]
    );

    setInput("");
  };

  // ====================================================
  // AI UI
  // ====================================================

  return (
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
            type="button"
            onClick={() =>
              sendMessage(
                "Is parking available?"
              )
            }
          >
            Is parking available?
          </button>

          <button
            type="button"
            onClick={() =>
              sendMessage(
                "What is the deposit?"
              )
            }
          >
            What is the deposit?
          </button>

          <button
            type="button"
            onClick={() =>
              sendMessage(
                "Is it furnished?"
              )
            }
          >
            Is it furnished?
          </button>

          <button
            type="button"
            onClick={() =>
              sendMessage(
                "Are pets allowed?"
              )
            }
          >
            Are pets allowed?
          </button>

          <button
            type="button"
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
          placeholder={`Ask about ${
            property.houseNumber
          }...`}
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
  );
}

export default PropertyDetails;