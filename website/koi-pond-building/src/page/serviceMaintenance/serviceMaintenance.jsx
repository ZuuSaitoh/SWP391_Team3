import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./serviceMaintenance.css";
import ScrollToTop from "react-scroll-to-top";
import slider1 from "../koi_photo/slider/slider1.jpg";
import slider2 from "../koi_photo/slider/slider2.jpg";
import slider3 from "../koi_photo/slider/slider3.jpg";

function ServiceMaintenance() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slider1, slider2, slider3];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="service-maintenance-page">
      <Header isTransparent={true} />
      <section className="maintenance-hero">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide})` }}
            ></div>
          ))}
        </div>
        <div className="maintenance-hero-content">
          <h1>Koi Pond Maintenance Services</h1>
          <p>Professional care for a thriving aquatic ecosystem</p>
        </div>
        <div className="slider-controls">
          <button onClick={prevSlide} className="slider-control prev">&#10094;</button>
          <button onClick={nextSlide} className="slider-control next">&#10095;</button>
        </div>
      </section>
      
      <div className="maintenance-content">
        <section className="maintenance-intro">
          <h2>Professional Koi Pond Maintenance</h2>
          <p>
            Regular maintenance is crucial for the health and longevity of your Koi pond. Our professional maintenance services ensure that your pond remains a beautiful and thriving ecosystem for your prized Koi.
          </p>
        </section>

        <section className="maintenance-services">
          <h2>Our Maintenance Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <i className="fas fa-water"></i>
              <h3>Water Quality Management</h3>
              <p>Regular testing and balancing of water parameters to ensure optimal conditions for your Koi.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-leaf"></i>
              <h3>Debris Removal</h3>
              <p>Routine cleaning to remove leaves, twigs, and other debris from the pond surface and bottom.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-filter"></i>
              <h3>Filtration System Maintenance</h3>
              <p>Regular cleaning and maintenance of filters to ensure efficient water purification.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-fish"></i>
              <h3>Fish Health Monitoring</h3>
              <p>Regular check-ups on your Koi to ensure they remain healthy and free from diseases.</p>
            </div>
          </div>
        </section>

        <section className="maintenance-plans">
          <h2>Maintenance Plans</h2>
          <div className="plans-container">
            <div className="plan">
              <h3>Basic Plan</h3>
              <ul>
                <li>Monthly water quality check</li>
                <li>Bi-weekly debris removal</li>
                <li>Quarterly filter cleaning</li>
              </ul>
              <p className="price">Starting at $X/month</p>
            </div>
            <div className="plan">
              <h3>Standard Plan</h3>
              <ul>
                <li>Bi-weekly water quality check</li>
                <li>Weekly debris removal</li>
                <li>Monthly filter cleaning</li>
                <li>Quarterly fish health check</li>
              </ul>
              <p className="price">Starting at $Y/month</p>
            </div>
            <div className="plan">
              <h3>Premium Plan</h3>
              <ul>
                <li>Weekly water quality check</li>
                <li>Twice-weekly debris removal</li>
                <li>Bi-weekly filter cleaning</li>
                <li>Monthly fish health check</li>
                <li>24/7 emergency support</li>
              </ul>
              <p className="price">Starting at $Z/month</p>
            </div>
          </div>
        </section>

        <section className="maintenance-cta">
          <h2>Ready to Maintain Your Koi Pond?</h2>
          <p>Contact us today to schedule your professional Koi pond maintenance service!</p>
          <a href="#contact" className="cta-button">Get a Free Quote</a>
        </section>
      </div>
      
      {showScrollTop && (
        <div className="maintenance-scroll-to-top" onClick={scrollToTop}>
          ▲
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ServiceMaintenance;
