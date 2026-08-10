import { useState } from "react";
import OwnerLoginModal from "../owner/OwnerLoginModal";

function Navbar() {
  const [showOwnerLogin, setShowOwnerLogin] =
    useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        Rent<span>View</span>
      </div>

      {/* Owner Portal Button */}
      <button
        type="button"
        className="owner-portal-button"
        onClick={() => {
          console.log("Owner Portal clicked");
          setShowOwnerLogin(true);
        }}
      >
        Owner Portal
      </button>

      {/* Owner Login Modal */}
      {showOwnerLogin && (
        <OwnerLoginModal
          onClose={() => {
            setShowOwnerLogin(false);
          }}
        />
      )}
    </nav>
  );
}

export default Navbar;