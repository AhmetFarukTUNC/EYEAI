
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };


  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");


    // ----------------------------------------
    // VALIDATION
    // ----------------------------------------

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }


    try {

      const response = await fetch(
        "http://localhost:5194/api/Auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );


      const data = await response.json();


      // ======================================
      // LOGIN SUCCESS
      // ======================================

      if (response.ok) {
  // Login durumunu kaydet
  localStorage.setItem("isLoggedIn", "true");

  // Backend'den gelen kullanıcı bilgisini kaydet
  localStorage.setItem("user", JSON.stringify(data.user));

  setMessage("Login successful!");

  setTimeout(() => {
    navigate("/");
  }, 1500);
} else {

        // ==================================
        // LOGIN ERROR
        // ==================================

        setError(
          data.message ||
          "Login failed. Please check your credentials."
        );

      }


    } catch (err) {

      console.error(
        "Login error:",
        err
      );

      setError(
        "Network error. Could not connect to the server."
      );

    }

  };


  return (

    <div className="login-page">

      <Navbar />


      <section className="tc-login">

        <div className="tc-login-wrapper">


          {/* =================================
              LOGIN FORM
          ================================== */}

          <div className="tc-login-form-area">

            <div className="tc-login-form-card">


              {/* =================================
                  HEADING
              ================================== */}

              <div className="tc-login-heading">

                <span className="tc-login-small-title">
                  ACCOUNT
                </span>


                <h2>
                  Sign in
                </h2>


                <p>
                  Enter your details to access your account.
                </p>

              </div>


              {/* =================================
                  FORM
              ================================== */}

              <form
                onSubmit={handleLogin}
                className="tc-login-form"
              >


                {/* EMAIL */}

                <div className="tc-input-group">

                  <label htmlFor="email">
                    Email address
                  </label>


                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />

                </div>


                {/* PASSWORD */}

                <div className="tc-input-group">

                  <div className="tc-password-label">

                    <label htmlFor="password">
                      Password
                    </label>


                    <a href="#">
                      Forgot password?
                    </a>

                  </div>


                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                </div>


                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  className="tc-login-button"
                >

                  <span>
                    Sign in
                  </span>


                  <strong>
                    →
                  </strong>

                </button>


                {/* SUCCESS MESSAGE */}

                {message && (

                  <div
                    className="tc-login-message tc-login-success"
                    role="alert"
                  >
                    {message}
                  </div>

                )}


                {/* ERROR MESSAGE */}

                {error && (

                  <div
                    className="tc-login-message tc-login-error"
                    role="alert"
                  >
                    {error}
                  </div>

                )}

              </form>


              {/* =================================
                  REGISTER
              ================================== */}

              <div className="tc-login-register">

                <span>
                  Don't have an account?
                </span>


                <a href="/signup">
                  Create an account →
                </a>

              </div>


              {/* =================================
                  FOOTER
              ================================== */}

              <div className="tc-login-footer">

                <span>
                  © 2026 Tunc Collective
                </span>


                <span>
                  EYE AI
                </span>

              </div>


            </div>

          </div>

        </div>

      </section>

    </div>

  );
}

