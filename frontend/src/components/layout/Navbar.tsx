import { useState } from "react";
import OwnerLoginModal from "../owner/OwnerLoginModal";

function Navbar() {
  const [showOwnerLogin, setShowOwnerLogin] =
  useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo">
          Rent<span>View</span>
        </div>

        <button
          type="button"
          className="owner-portal-button"
          onClick={() =>
            setShowOwnerLogin(true)
          }
        >
          Owner Portal
        </button>

      </div>
      {showOwnerLogin && (
        <OwnerLoginModal
          onClose={() =>
            setShowOwnerLogin(false)
          }
        />
      )}
    </nav>
  );
}

export default Navbar;