import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface OwnerLoginModalProps {
  onClose: () => void;
}

function OwnerLoginModal({
  onClose,
}: OwnerLoginModalProps) {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    /*
     * TEMPORARY FRONTEND LOGIN
     *
     * Real authentication will be implemented
     * later using Express + MongoDB.
     */

    if (
      userId === "owner" &&
      password === "rentview123"
    ) {
      localStorage.setItem(
        "rentview_owner_auth",
        "true"
      );

      onClose();

      navigate("/owner");

      return;
    }

    setError("Invalid User ID or Password.");
  };

  const modal = (
    <div
      className="owner-login-overlay"
      onClick={onClose}
    >
      <div
        className="owner-login-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* Close button */}

        <button
          type="button"
          className="owner-login-close"
          onClick={onClose}
          aria-label="Close login"
        >
          ×
        </button>

        {/* Header */}

        <div className="owner-login-header">
          <div className="owner-login-icon">
            ✦
          </div>

          <p className="section-label">
            RENTVIEW
          </p>

          <h2>Owner Portal</h2>

          <p>
            Sign in to manage your properties.
          </p>
        </div>

        {/* Login Form */}

        <form
          className="owner-login-form"
          onSubmit={handleLogin}
        >
          {/* User ID */}

          <div className="form-field">
            <label htmlFor="owner-user-id">
              User ID
            </label>

            <input
              id="owner-user-id"
              type="text"
              placeholder="Enter your user ID"
              value={userId}
              onChange={(event) =>
                setUserId(event.target.value)
              }
              autoComplete="username"
              required
            />
          </div>

          {/* Password */}

          <div className="form-field">
            <label htmlFor="owner-password">
              Password
            </label>

            <input
              id="owner-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />
          </div>

          {/* Error */}

          {error && (
            <p className="owner-login-error">
              {error}
            </p>
          )}

          {/* Login */}

          <button
            type="submit"
            className="owner-login-button"
          >
            Login
            <span>→</span>
          </button>
        </form>

        <p className="owner-login-note">
          Owner access is restricted to authorized
          property managers.
        </p>
      </div>
    </div>
  );

  /*
   * IMPORTANT:
   * Render outside Navbar so fixed positioning
   * is relative to the entire browser viewport.
   */

  return createPortal(
    modal,
    document.body
  );
}

export default OwnerLoginModal;