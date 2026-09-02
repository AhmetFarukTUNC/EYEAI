
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn =
        localStorage.getItem("isLoggedIn") === "true";

      const savedUser =
        localStorage.getItem("user");

      setIsLoggedIn(loggedIn);

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkLogin();

    window.addEventListener("authChange", checkLogin);

    return () => {
      window.removeEventListener("authChange", checkLogin);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    setShowProfileMenu(false);

    window.dispatchEvent(
      new Event("authChange")
    );

    navigate("/");
  };

  return (
    <header className="about-navbar">

      <div
        className="about-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        Eye<span>AI</span>
      </div>

      <nav className="about-menu">

        <a href="/">
          Homepage
        </a>

        <a href="/about">
          About
        </a>

        <a href="/contact">
          Contact
        </a>

        {isLoggedIn && (
          <>
            <a href="/predict">
              Predict
            </a>

            <a href="/patients">
              Patient List
            </a>
          </>
        )}

        {!isLoggedIn && (
          <>
            <a href="/login">
              Login
            </a>

            <a
              href="/signup"
              className="signup-btn"
            >
              Sign Up
            </a>
          </>
        )}

        {isLoggedIn && (
          <div
            className="profile-container"
            ref={profileRef}
          >

            <button
              className="profile-btn"
              onClick={() =>
                setShowProfileMenu(
                  !showProfileMenu
                )
              }
              aria-label="Profile"
            >

              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                />

                <path
                  d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"
                />
              </svg>

            </button>

            {showProfileMenu && (
              <div className="profile-dropdown">

                <div className="profile-user">

                  <div className="profile-avatar">
                    {user?.username
                      ? user.username
                          .charAt(0)
                          .toUpperCase()
                      : "U"}
                  </div>

                  <div className="profile-info">

                    <strong>
                      {user?.username || "User"}
                    </strong>

                    <span>
                      {user?.email || ""}
                    </span>

                  </div>

                </div>

                <div className="profile-divider"></div>

                <button
                  className="profile-menu-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/profile");
                  }}
                >
                  <span className="menu-icon">
                    ◉
                  </span>

                  Profile
                </button>

                <button
                  className="profile-menu-item logout-item"
                  onClick={handleLogout}
                >
                  <span className="menu-icon">
                    ↪
                  </span>

                  Logout
                </button>

              </div>
            )}

          </div>
        )}

      </nav>

    </header>
  );
}

