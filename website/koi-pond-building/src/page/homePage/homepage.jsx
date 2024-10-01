import React, { useEffect } from "react";
import "./homepage.css"; // We'll create this file for styling
import person from "../koi_photo/person.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  useEffect(() => {
    console.log("HomePage component rendered");
  }, []);

  const navigate = useNavigate();

  const loginClick = () => {
    navigate("/login");
  };

  return (
    <div className="home-page">
      <header className="header">
        <nav className="navbar">
          <div className="logo">Koi Pond Builders</div>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <img src={person} onClick={loginClick}/>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <h1>Create Your Dream Koi Pond</h1>
          <p>Expert design and construction for serene water gardens</p>
          <a href="#contact" className="cta-button">
            Get a Free Quote
          </a>
        </section>

        <section id="services" className="services">
          <h2>Our Services</h2>
          <div className="service-list">
            <div className="service-item">
              <h3>Pond Design</h3>
              <p>Custom designs tailored to your space and preferences</p>
            </div>
            <div className="service-item">
              <h3>Construction</h3>
              <p>Professional installation with quality materials</p>
            </div>
            <div className="service-item">
              <h3>Maintenance</h3>
              <p>Regular upkeep to keep your pond pristine</p>
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery">
          <h2>Our Work</h2>
          {/* Add image gallery here */}
        </section>

        <section id="about" className="about">
          <h2>About Us</h2>
          <p>
            We are passionate about creating beautiful koi ponds that bring
            tranquility to your outdoor space.
          </p>
        </section>

        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2023 Koi Pond Builders. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
