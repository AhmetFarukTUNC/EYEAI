
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Signup.css";

const API_URL = "http://localhost:5194/api";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Kullanıcı tekrar yazmaya başladığında
    // eski mesajları temizle
    setError("");
    setMessage("");
  };


  // ========================================
  // REGISTER
  // ========================================

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");


    const {
      username,
      email,
      password,
      confirmPassword,
    } = formData;


    // ----------------------------------------
    // FRONTEND VALIDATION
    // ----------------------------------------

    if (
      !username.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }


    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }


    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }


    try {
      setLoading(true);


      // ----------------------------------------
      // API REQUEST
      // ----------------------------------------

      const response = await fetch(
        `${API_URL}/Auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: username.trim(),
            email: email.trim(),
            password: password,
          }),
        }
      );


      // ----------------------------------------
      // RESPONSE
      // ----------------------------------------

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }


      // ----------------------------------------
      // SUCCESS
      // ----------------------------------------

      if (response.ok) {
        setMessage(
          data.message ||
          "Registration successful! You can now log in."
        );


        // Formu temizle

        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });


        // Login sayfasına git

        setTimeout(() => {
          navigate("/login");
        }, 1500);


        return;
      }


      // ----------------------------------------
      // API ERROR
      // ----------------------------------------

      setError(
        data.message ||
        "Registration failed. Please try again."
      );

    } catch (err) {

      console.error("Registration error:", err);

      setError(
        "Unable to connect to the server. Please make sure the API is running."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="signup-page">

      <Navbar />


      <section className="tc-signup">

        <div className="tc-signup-wrapper">


          {/* =====================================
              BACKGROUND DECORATION
          ====================================== */}

          <div className="tc-signup-glow tc-glow-one"></div>

          <div className="tc-signup-glow tc-glow-two"></div>


          {/* =====================================
              SIGNUP CARD
          ====================================== */}

          <div className="tc-signup-card">


            {/* =================================
                HEADING
            ================================== */}

            <div className="tc-signup-heading">

              <span className="tc-signup-label">
                EYE AI
              </span>


              <h1>
                Create
                <em> account.</em>
              </h1>


              <p>
                Join EYE AI and start exploring
                our AI-powered eye healthcare solutions.
              </p>

            </div>


            {/* =================================
                FORM
            ================================== */}

            <form
              onSubmit={handleRegister}
              className="tc-signup-form"
            >


              {/* USERNAME */}

              <div className="tc-signup-input">

                <label htmlFor="username">
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={loading}
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="tc-signup-input">

                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={loading}
                  required
                />

              </div>


              {/* PASSWORDS */}

              <div className="tc-signup-row">


                {/* PASSWORD */}

                <div className="tc-signup-input">

                  <label htmlFor="password">
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={loading}
                    required
                  />

                </div>


                {/* CONFIRM PASSWORD */}

                <div className="tc-signup-input">

                  <label htmlFor="confirmPassword">
                    Confirm
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={loading}
                    required
                  />

                </div>

              </div>


              {/* =================================
                  REGISTER BUTTON
              ================================== */}

              <button
                type="submit"
                className="tc-signup-button"
                disabled={loading}
              >

                <span>
                  {loading
                    ? "Creating account..."
                    : "Create account"}
                </span>


                <strong>
                  {loading ? "..." : "→"}
                </strong>

              </button>


              {/* =================================
                  SUCCESS MESSAGE
              ================================== */}

              {message && (
                <div
                  className="tc-signup-message tc-signup-success"
                  role="alert"
                >
                  {message}
                </div>
              )}


              {/* =================================
                  ERROR MESSAGE
              ================================== */}

              {error && (
                <div
                  className="tc-signup-message tc-signup-error"
                  role="alert"
                >
                  {error}
                </div>
              )}

            </form>


            {/* =================================
                LOGIN
            ================================== */}

            <div className="tc-signup-login">

              <span>
                Already have an account?
              </span>

              <a href="/login">
                Sign in →
              </a>

            </div>


            {/* =================================
                FOOTER
            ================================== */}

            <div className="tc-signup-bottom">

              <span>
                © 2026 Tunc Collective
              </span>

              <span>
                EYE AI
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

