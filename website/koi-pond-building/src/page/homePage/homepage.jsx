import React, { useEffect, useState } from "react";
import "./HomePage.css";
import person from "../koi_photo/person.png";
import pond1 from "../koi_photo/pond1.jpg";
import pond2 from "../koi_photo/pond2.jpg";
import pond3 from "../koi_photo/pond3.jpg";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  const navigate = useNavigate();
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

  const loginClick = () => {
    navigate("/login");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToServiceDesign = () => {
    navigate("/service-design");
  };

  return (
    <div className="home-page">
      <Header isTransparent={true} />
      <main>
        {/* Your existing main content */}
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
            <div className="service-item" onClick={navigateToServiceDesign}>
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
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ▲
        </button>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
