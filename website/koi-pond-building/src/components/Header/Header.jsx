import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import person from "../../page/koi_photo/person.png";
import "./Header.css";

function Header({ isTransparent, isScrolled }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // const handleProfileClick = () => {
  //   navigate(`/customer-profile/${currentUser.id}`);
  // };

  // const loginClick = () => {
  //   navigate("/login");
  // };

  const logoutClick = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  };
  console.log(currentUser);
  const navigateToSection = (sectionId) => {
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""} ${
        isTransparent ? "transparent" : ""
      }`}
    >
      <nav className="navbar">
        <div className="logo">Koi Pond Builders</div>
        <ul className="nav-links">
          <li>
            <a onClick={() => navigateToSection("home")}>Home</a>
          </li>
          <li>
            <a onClick={() => navigateToSection("services")}>Services</a>
          </li>
          <li>
            <a onClick={() => navigateToSection("gallery")}>Gallery</a>
          </li>
          <li>
            <a onClick={() => navigateToSection("about")}>About</a>
          </li>
          <li>
            <a onClick={() => navigateToSection("testimonials")}>
              Testimonials
            </a>
          </li>
          <li>
            <a onClick={() => navigateToSection("contact")}>Contact</a>
          </li>
        </ul>
        <div className="login-container">
          {currentUser ? (
            <>
              {/* onClick={handleProfileClick} */}
              <Link
                to={`/customer-profile/${currentUser.id}`}
                className="user-greeting"
              >
                Welcome, {currentUser.username}!
              </Link>
              <button onClick={logoutClick} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <a href="/login">
                          {/* onClick={loginClick} */}
            <img
              src={person}
              alt="Login"
              className="login-icon"
            /></a>
          )} 
        </div>
      </nav>
    </header>
  );
}

export default Header;