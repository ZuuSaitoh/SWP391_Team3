import React, { useEffect, useState } from "react";
import "./HomePage.css";
import person from "../koi_photo/person.png";
import pond1 from "../koi_photo/pond1.jpg";
import pond2 from "../koi_photo/pond2.jpg";
import pond3 from "../koi_photo/pond3.jpg";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  // Scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Login button
  const loginClick = () => {
    navigate("/login");
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <nav className="navbar">
          <div className="logo">Koi Pond Builders</div>
          <ul className="nav-links">
            <li>
              <a onClick={() => scrollToSection("home")}>Home</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("services")}>Services</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("gallery")}>Gallery</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("about")}>About</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("testimonials")}>
                Testimonials
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection("contact")}>Contact</a>
            </li>
            <li>
              <img
                src={person}
                alt="Login"
                onClick={loginClick}
                className="login-icon"
              />
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <h1>Create Your Dream Koi Pond</h1>
            <p>Expert design and construction for serene water gardens</p>
            <a href="#contact" className="cta-button">
              Get a Free Quote
            </a>
          </div>
        </section>

        <section id="services" className="services">
          <h2>Our Services</h2>
          <div className="service-list">
            <div className="service-item">
              <i className="fas fa-pencil-ruler"></i>
              <h3>Pond Design</h3>
              <p>Custom designs tailored to your space and preferences</p>
            </div>
            <div className="service-item">
              <i className="fas fa-hard-hat"></i>
              <h3>Pond Cleaner</h3>
              <p>Professional cleaning service for your pond</p>
            </div>
            <div className="service-item">
              <i className="fas fa-tools"></i>
              <h3>Maintenance</h3>
              <p>Regular upkeep to keep your pond pristine</p>
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery">
          <h2>Our Work</h2>
          <div className="gallery-container">
            <div className="gallery-item">
              <img src={pond1} alt="Koi Pond 1" />
              <div className="gallery-item-caption">Serene Backyard Oasis</div>
            </div>
            <div className="gallery-item">
              <img src={pond2} alt="Koi Pond 2" />
              <div className="gallery-item-caption">
                Natural Stone Waterfall
              </div>
            </div>
            <div className="gallery-item">
              <img src={pond3} alt="Koi Pond 3" />
              <div className="gallery-item-caption">Modern Zen Garden</div>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <h2>About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                We are passionate about creating beautiful koi ponds that bring
                tranquility to your outdoor space. With years of experience and
                a dedication to quality, we ensure each project exceeds
                expectations.
              </p>
              <p>
                Our team of experts combines artistic vision with technical
                expertise to create stunning water features that enhance your
                property and provide a peaceful retreat for you and your family.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <h3>15+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>500+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-container">
            <div className="testimonial-item">
              <p>
                "Koi Pond Builders transformed our backyard into a serene oasis.
                Their attention to detail and craftsmanship is unparalleled."
              </p>
              <h4>- Dũng Senpai.</h4>
            </div>
            <div className="testimonial-item">
              <p>
                "The team was professional, punctual, and a pleasure to work
                with. Our new koi pond has become the highlight of our garden."
              </p>
              <h4>- Thầy Phát.</h4>
            </div>
            <div className="testimonial-item">
              <p>
                "From design to completion, the process was smooth and the
                results exceeded our expectations. Highly recommended!"
              </p>
              <h4>- Tuấn Anh.</h4>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <div className="contact-container">
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="tel" placeholder="Your Phone" />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>
                <i className="fas fa-map-marker-alt"></i> 549/44/19 Lê Văn Thọ
              </p>
              <p>
                <i className="fas fa-phone"></i> (084) 0934103416
              </p>
              <p>
                <i className="fas fa-envelope"></i> lamhdse184108@fpt.edu.vn
              </p>
            </div>
          </div>
        </section>
      </main>

      <div
        className={`scroll-to-top ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        ▲
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Koi Pond Builders</h3>
            <p>Creating serene water gardens since 2005</p>
          </div>
          <div className="footer-section">
            <h3>Quick Menu</h3>
            <ul className="quick-menu">
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
                <a href="#testimonials">Testimonials</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Koi Pond Builders. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
