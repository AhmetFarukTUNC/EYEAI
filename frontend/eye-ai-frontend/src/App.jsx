
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Predict from "./pages/Predict";
import Dataset from "./pages/Dataset";
import PatientList from "./pages/PatientList";


// ==========================================
// AUTH CHECK
// ==========================================

function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}


// ==========================================
// PROTECTED ROUTE
// ==========================================

function ProtectedRoute({ children }) {

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// ==========================================
// APP
// ==========================================

export default function App() {

  return (

    <Routes>

      {/* =====================================
          PUBLIC PAGES
      ====================================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* =====================================
          PROTECTED PAGES
      ====================================== */}

      <Route
        path="/predict"
        element={
          <ProtectedRoute>
            <Predict />
          </ProtectedRoute>
        }
      />


      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <PatientList />
          </ProtectedRoute>
        }
      />


      <Route
        path="/dataset"
        element={
          <ProtectedRoute>
            <Dataset />
          </ProtectedRoute>
        }
      />


      {/* =====================================
          UNKNOWN URL
      ====================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>

  );
}

