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
          <h2>Expert Koi Pond Maintenance</h2>
          <p>
            At Koi Pond Builders, we understand that a beautiful and healthy Koi pond requires regular, professional care. Our expert maintenance services ensure that your aquatic paradise remains a thriving ecosystem for your prized Koi, while providing you with a serene and enjoyable outdoor space.
          </p>
        </section>

        <section className="maintenance-importance">
          <h2>The Importance of Professional Maintenance</h2>
          <div className="importance-grid">
            <div className="importance-item">
              <i className="fas fa-fish"></i>
              <h3>Fish Health</h3>
              <p>Regular maintenance ensures optimal water conditions for your Koi, promoting their health and longevity.</p>
            </div>
            <div className="importance-item">
              <i className="fas fa-leaf"></i>
              <h3>Ecosystem Balance</h3>
              <p>Professional care maintains the delicate balance of your pond's ecosystem, supporting both fish and plant life.</p>
            </div>
            <div className="importance-item">
              <i className="fas fa-tint"></i>
              <h3>Water Quality</h3>
              <p>Our services keep your pond water clean, clear, and properly balanced for optimal aesthetics and fish health.</p>
            </div>
            <div className="importance-item">
              <i className="fas fa-cog"></i>
              <h3>Equipment Longevity</h3>
              <p>Regular maintenance of filters, pumps, and other equipment ensures their efficient operation and extends their lifespan.</p>
            </div>
          </div>
        </section>

        <section className="maintenance-services">
          <h2>Our Comprehensive Maintenance Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <i className="fas fa-water"></i>
              <h3>Water Quality Management</h3>
              <p>Regular testing and balancing of water parameters to ensure optimal conditions for your Koi.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-broom"></i>
              <h3>Debris Removal</h3>
              <p>Routine cleaning to remove leaves, twigs, and other debris from the pond surface and bottom.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-filter"></i>
              <h3>Filtration System Maintenance</h3>
              <p>Regular cleaning and maintenance of filters to ensure efficient water purification.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-heartbeat"></i>
              <h3>Fish Health Monitoring</h3>
              <p>Regular check-ups on your Koi to ensure they remain healthy and free from diseases.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-leaf"></i>
              <h3>Aquatic Plant Care</h3>
              <p>Pruning, fertilizing, and managing aquatic plants to maintain a balanced ecosystem.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-thermometer-half"></i>
              <h3>Seasonal Adjustments</h3>
              <p>Adapting maintenance routines to seasonal changes to ensure year-round pond health.</p>
            </div>
          </div>
        </section>

        <section className="maintenance-process">
          <h2>Our Maintenance Process</h2>
          <div className="process-timeline">
            {[
              { step: 1, title: "Initial Assessment", description: "We thoroughly evaluate your pond's current condition and specific needs.", icon: "🔍" },
              { step: 2, title: "Customized Plan", description: "We create a tailored maintenance plan based on your pond's unique requirements.", icon: "📝" },
              { step: 3, title: "Regular Maintenance Visits", description: "Our experts perform scheduled maintenance tasks to keep your pond in top condition.", icon: "🔧" },
              { step: 4, title: "Water Quality Testing", description: "We conduct regular water tests to ensure optimal conditions for your Koi.", icon: "🧪" },
              { step: 5, title: "Equipment Check and Cleaning", description: "We inspect and clean all pond equipment to ensure efficient operation.", icon: "⚙️" },
              { step: 6, title: "Detailed Reporting", description: "After each visit, we provide a comprehensive report of services performed and recommendations.", icon: "📊" }
            ].map((item, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{item.step}</div>
                <div className="step-content">
                  <h3>{item.icon} {item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
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
                <li>Seasonal fish health check</li>
              </ul>
              <p className="price">Starting at $X/month</p>
              <button className="plan-cta">Choose Plan</button>
            </div>
            <div className="plan featured">
              <div className="featured-banner">Most Popular</div>
              <h3>Standard Plan</h3>
              <ul>
                <li>Bi-weekly water quality check</li>
                <li>Weekly debris removal</li>
                <li>Monthly filter cleaning</li>
                <li>Bi-monthly fish health check</li>
                <li>Quarterly aquatic plant care</li>
              </ul>
              <p className="price">Starting at $Y/month</p>
              <button className="plan-cta">Choose Plan</button>
            </div>
            <div className="plan">
              <h3>Premium Plan</h3>
              <ul>
                <li>Weekly water quality check</li>
                <li>Twice-weekly debris removal</li>
                <li>Bi-weekly filter cleaning</li>
                <li>Monthly fish health check</li>
                <li>Monthly aquatic plant care</li>
                <li>24/7 emergency support</li>
              </ul>
              <p className="price">Starting at $Z/month</p>
              <button className="plan-cta">Choose Plan</button>
            </div>
          </div>
        </section>

        <section className="maintenance-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h3>How often should I have my Koi pond professionally maintained?</h3>
              <p>The frequency of professional maintenance depends on various factors such as pond size, number of fish, and surrounding environment. Generally, we recommend at least monthly maintenance visits, with more frequent visits during peak seasons.</p>
            </div>
            <div className="faq-item">
              <h3>Can I perform some maintenance tasks myself?</h3>
              <p>While some basic tasks like surface skimming can be done by pond owners, professional maintenance ensures thorough care and early detection of potential issues. We also provide guidance on daily pond care practices for pond owners.</p>
            </div>
            <div className="faq-item">
              <h3>How do seasonal changes affect pond maintenance?</h3>
              <p>Each season brings unique challenges for Koi ponds. Our maintenance plans adapt to these seasonal changes, adjusting care routines for spring preparation, summer algae control, fall cleanup, and winter protection.</p>
            </div>
          </div>
        </section>

        <section className="maintenance-cta">
          <h2>Ready to Ensure Your Koi Pond's Health and Beauty?</h2>
          <p>Contact us today to schedule your professional Koi pond maintenance service or to learn more about our customized maintenance plans.</p>
          <button className="cta-button">Get a Free Consultation</button>
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