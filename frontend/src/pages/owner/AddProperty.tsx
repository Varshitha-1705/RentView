import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { createProperty } from "../../services/propertyService";

function AddProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    houseNumber: "",
    title: "",
    rent: "",
    deposit: "",
    configuration: "2 BHK",
    floor: "",
    furnishing: "Semi Furnished",
    parking: true,
    parkingType: "Covered Parking",
    petsAllowed: false,
    maintenance: "",
    preferredTenants: "",
    availableFrom: "",
    amenities: [] as string[],
  });

  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const amenitiesList = [
    "24/7 Water Supply",
    "Power Backup",
    "Covered Parking",
    "Security",
    "Balcony",
    "Gym",
    "Swimming Pool",
  ];

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData((previous) => ({
      ...previous,
      amenities: previous.amenities.includes(amenity)
        ? previous.amenities.filter(
            (item) => item !== amenity
          )
        : [...previous.amenities, amenity],
    }));
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    setImages(Array.from(event.target.files));
  };

  const handleVideoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.[0]) return;

    setVideo(event.target.files[0]);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (submitting) return;

    try {
      setSubmitting(true);

      const propertyData = {
        houseNumber: formData.houseNumber.trim(),
        title: formData.title.trim(),
        configuration: formData.configuration,

        building: "VNS Residency",
        location: "Bangalore, Karnataka",

        status: "available" as const,

        rent: Number(formData.rent),
        deposit: Number(formData.deposit),

        floor: formData.floor.trim(),
        furnishing: formData.furnishing,

        parking: formData.parking,

        parkingType: formData.parking
          ? formData.parkingType
          : "",

        petsAllowed: formData.petsAllowed,

        petPolicy: formData.petsAllowed
          ? "Pets allowed"
          : "Pets not allowed",

        maintenance: Number(formData.maintenance),

        preferredTenants:
          formData.preferredTenants.trim(),

        availableFrom:
          formData.availableFrom.trim(),

        amenities: formData.amenities,

        description: `A ${formData.configuration} ${formData.furnishing.toLowerCase()} property in VNS Residency.`,
      };

      console.log("Creating property:", propertyData);
      console.log("Selected images:", images);
      console.log("Selected video:", video);

      await createProperty(
        propertyData,
        images,
        video
      );

      alert("Property added successfully! 🎉");

      navigate("/owner");
    } catch (error) {
      console.error(
        "Failed to create property:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to add property."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <div className="background-effects">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
        <div className="glow glow-three"></div>
      </div>

      <Navbar />

      <main className="add-property-page">

        <section className="add-property-header">
          <Link
            to="/owner"
            className="back-button"
          >
            ← Back to Dashboard
          </Link>

          <p className="section-label">
            RENTVIEW • OWNER PORTAL
          </p>

          <h1>Add New Property</h1>

          <p>
            Add a new home to your building and
            make it available for tenants.
          </p>
        </section>

        <form
          className="property-form"
          onSubmit={handleSubmit}
        >

          {/* BASIC INFORMATION */}

          <section className="form-section">
            <div className="form-section-heading">
              <p className="section-label">
                01 • BASIC INFORMATION
              </p>

              <h2>Property Details</h2>

              <p>
                Enter the basic information about
                this property.
              </p>
            </div>

            <div className="form-grid">

              <div className="form-field">
                <label htmlFor="houseNumber">
                  House Number
                </label>

                <input
                  id="houseNumber"
                  name="houseNumber"
                  type="text"
                  placeholder="e.g. House 105"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="title">
                  Property Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. 2 BHK Apartment"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="rent">
                  Monthly Rent
                </label>

                <div className="input-with-prefix">
                  <span>₹</span>

                  <input
                    id="rent"
                    name="rent"
                    type="number"
                    placeholder="20000"
                    value={formData.rent}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="deposit">
                  Security Deposit
                </label>

                <div className="input-with-prefix">
                  <span>₹</span>

                  <input
                    id="deposit"
                    name="deposit"
                    type="number"
                    placeholder="100000"
                    value={formData.deposit}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="configuration">
                  Configuration
                </label>

                <select
                  id="configuration"
                  name="configuration"
                  value={formData.configuration}
                  onChange={handleChange}
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="floor">
                  Floor
                </label>

                <input
                  id="floor"
                  name="floor"
                  type="text"
                  placeholder="e.g. 4th Floor"
                  value={formData.floor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="furnishing">
                  Furnishing
                </label>

                <select
                  id="furnishing"
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleChange}
                >
                  <option value="Unfurnished">
                    Unfurnished
                  </option>

                  <option value="Semi Furnished">
                    Semi Furnished
                  </option>

                  <option value="Fully Furnished">
                    Fully Furnished
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="maintenance">
                  Monthly Maintenance
                </label>

                <div className="input-with-prefix">
                  <span>₹</span>

                  <input
                    id="maintenance"
                    name="maintenance"
                    type="number"
                    placeholder="2000"
                    value={formData.maintenance}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
              </div>

            </div>
          </section>

          {/* FEATURES */}

          <section className="form-section">
            <div className="form-section-heading">
              <p className="section-label">
                02 • FEATURES
              </p>

              <h2>Property Features</h2>
            </div>

            <div className="feature-options">

              <label className="toggle-option">
                <input
                  type="checkbox"
                  name="parking"
                  checked={formData.parking}
                  onChange={handleCheckboxChange}
                />

                <span>Parking Available</span>
              </label>

              <label className="toggle-option">
                <input
                  type="checkbox"
                  name="petsAllowed"
                  checked={formData.petsAllowed}
                  onChange={handleCheckboxChange}
                />

                <span>Pets Allowed</span>
              </label>

            </div>

            {formData.parking && (
              <div className="form-field narrow-field">
                <label htmlFor="parkingType">
                  Parking Type
                </label>

                <select
                  id="parkingType"
                  name="parkingType"
                  value={formData.parkingType}
                  onChange={handleChange}
                >
                  <option value="Covered Parking">
                    Covered Parking
                  </option>

                  <option value="Open Parking">
                    Open Parking
                  </option>
                </select>
              </div>
            )}
          </section>

          {/* AMENITIES */}

          <section className="form-section">
            <div className="form-section-heading">
              <p className="section-label">
                03 • AMENITIES
              </p>

              <h2>
                What does this property offer?
              </h2>
            </div>

            <div className="amenity-checkbox-grid">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className="amenity-checkbox"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(
                      amenity
                    )}
                    onChange={() =>
                      handleAmenityChange(amenity)
                    }
                  />

                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </section>

          {/* RENTAL INFORMATION */}

          <section className="form-section">
            <div className="form-section-heading">
              <p className="section-label">
                04 • RENTAL INFORMATION
              </p>

              <h2>
                Availability & Preferences
              </h2>
            </div>

            <div className="form-grid">

              <div className="form-field">
                <label htmlFor="preferredTenants">
                  Preferred Tenants
                </label>

                <input
                  id="preferredTenants"
                  name="preferredTenants"
                  type="text"
                  placeholder="e.g. Family / Working Professionals"
                  value={formData.preferredTenants}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="availableFrom">
                  Available From
                </label>

                <input
                  id="availableFrom"
                  name="availableFrom"
                  type="text"
                  placeholder="e.g. Immediately"
                  value={formData.availableFrom}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </section>

          {/* PROPERTY MEDIA */}

          <section className="form-section">
            <div className="form-section-heading">
              <p className="section-label">
                05 • PROPERTY MEDIA
              </p>

              <h2>Photos & Walkthrough</h2>

              <p>
                Upload high-quality photos and a
                walkthrough video of the property.
              </p>
            </div>

            {/* IMAGES */}

            <div className="upload-area">
              <label
                htmlFor="propertyImages"
                className="upload-box"
              >
                <span className="upload-icon">
                  +
                </span>

                <strong>
                  Upload Property Photos
                </strong>

                <span>
                  Select multiple images
                </span>
              </label>

              <input
                id="propertyImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                hidden
              />
            </div>

            {images.length > 0 && (
              <div className="selected-files">
                <p>
                  {images.length} photo
                  {images.length > 1 ? "s" : ""} selected
                </p>

                <div className="file-list">
                  {images.map((image, index) => (
                    <span
                      key={`${image.name}-${index}`}
                    >
                      {image.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* VIDEO */}

            <div className="upload-area">
              <label
                htmlFor="propertyVideo"
                className="upload-box"
              >
                <span className="upload-icon">
                  +
                </span>

                <strong>
                  Upload Walkthrough Video
                </strong>

                <span>
                  MP4, WebM or MOV
                </span>
              </label>

              <input
                id="propertyVideo"
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                hidden
              />
            </div>

            {video && (
              <div className="selected-files">
                <p>Video selected</p>

                <div className="file-list">
                  <span>{video.name}</span>
                </div>
              </div>
            )}
          </section>

          {/* ACTIONS */}

          <div className="form-actions">
            <Link
              to="/owner"
              className="secondary-action"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="primary-action"
              disabled={submitting}
            >
              {submitting
                ? "Adding Property..."
                : "Add Property →"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}

export default AddProperty;