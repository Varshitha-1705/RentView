import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuthenticated =
    localStorage.getItem("rentview_owner_auth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;