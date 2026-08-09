import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddProperty from "./pages/owner/AddProperty";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            TENANT ROUTES
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/property/:id"
          element={<PropertyDetails />}
        />

        {/* =========================
            PROTECTED OWNER ROUTES
        ========================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/owner"
            element={<OwnerDashboard />}
          />

          <Route
            path="/owner/add-property"
            element={<AddProperty />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;