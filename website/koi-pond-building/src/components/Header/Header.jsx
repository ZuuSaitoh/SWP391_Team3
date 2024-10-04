import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import person from "../../page/koi_photo/person.png";
import "./Header.css";

function Header({ isTransparent, isScrolled, currentUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const loginClick = () => {
    navigate("/login");
  };

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
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isTransparent ? 'transparent' : ''}`}>
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
            <span className="user-greeting">Hi, {currentUser.username}</span>
          ) : null}
          <img
            src={person}
            alt="Login"
            onClick={loginClick}
            className="login-icon"
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
