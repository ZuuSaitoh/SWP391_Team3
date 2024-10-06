import React, { useEffect, useState } from "react";
import "./HomePage.css";
import pond1 from "../koi_photo/pond/pond1.jpg";
import pond2 from "../koi_photo/pond/pond2.jpg";
import pond3 from "../koi_photo/pond/pond3.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PondDesignIcon from "../koi_photo/logo-icon/design.png";
import PondCleaningIcon from "../koi_photo/logo-icon/clean.png";
import PondMaintenanceIcon from "../koi_photo/logo-icon/maintenance.png";
import { u } from "framer-motion/client";
import slider1 from "../koi_photo/slider/slider1.jpg";
import slider2 from "../koi_photo/slider/slider2.jpg";
import slider3 from "../koi_photo/slider/slider3.jpg";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slider1, slider2, slider3];

  console.log("da vao home");
  useEffect(() => {
    // Fetch current user information from localStorage or your authentication system
    const user = JSON.parse(localStorage.getItem("user"));
    // toast.success("Login successful! Welcome back!");

    console.log(user);
    if (user) {
      setCurrentUser(user);
    }

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsHeaderScrolled(scrollTop > 50);
      setShowScrollTop(scrollTop > 300);
      console.log("Scroll position:", scrollTop);
      console.log("Show scroll top:", scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    // Call handleScroll initially to set the correct initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loginSuccess = queryParams.get("login");

    if (loginSuccess === "success") {
      // Delay the toast notification slightly to ensure the component is mounted
      setTimeout(() => {
        toast.success("Login successful! Welcome back!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }, 100);

      // Remove the query parameter after showing the toast
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, navigate]);

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

  const navigateToServiceClean = () => {
    navigate("/service-clean");
  };

  const navigateToServiceMaintenance = () => {
    navigate("/service-maintenance");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
//set time to change slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000); 

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="home-page">
      <Header />
      <main>
        <section id="home" className="hero">
          <div className="hero-slider">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide})` }}
              ></div>
            ))}
          </div>
          <div className="hero-content">
            <h1>Create Your Dream Koi Pond</h1>
            <p>Expert design and construction for serene water gardens</p>
            <a href="#contact" className="cta-button">
              Get a Free Quote
            </a>
          </div>
          <div className="slider-controls">
            <button onClick={prevSlide} className="slider-control prev">&#10094;</button>
            <button onClick={nextSlide} className="slider-control next">&#10095;</button>
          </div>
        </section>

        <section id="services" className="services">
          <h2>Our Services</h2>
          <div className="service-list">
            <div className="service-item" onClick={navigateToServiceDesign}>
              <img
                src={PondDesignIcon}
                alt="Pond Design"
                className="service-icon"
              />
              <h3>Pond Design</h3>
              <p>Custom designs tailored to your space and preferences</p>
            </div>
            <div className="service-item" onClick={navigateToServiceClean}>
              <img
                src={PondCleaningIcon}
                alt="Pond Cleaning"
                className="service-icon"
              />
              <h3>Cleaning Pond Service</h3>
              <p>Professional cleaning service for your pond</p>
            </div>
            <div
              className="service-item"
              onClick={navigateToServiceMaintenance}
            >
              <img
                src={PondMaintenanceIcon}
                alt="Pond Maintenance"
                className="service-icon"
              />
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

      <Footer />
      <ToastContainer />
      {showScrollTop && (
        <div className="service-scroll-to-top" onClick={scrollToTop}>
          ▲
        </div>
      )}
    </div>
  );
}

export default HomePage;