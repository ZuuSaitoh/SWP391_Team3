import React, { useEffect, useState, useRef } from "react";
import "./HomePage.css";
import pond1 from "../koi_photo/pond/pond1.jpg";
import pond2 from "../koi_photo/pond/pond2.jpg";
import pond3 from "../koi_photo/pond/pond3.jpg";
import pond4 from "../koi_photo/pond/pond4.jpg";
import pond5 from "../koi_photo/pond/pond5.jpg";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
import member1 from "../koi_photo/member/member 1.jpg";
import member2 from "../koi_photo/member/member 2.jpg";
import member3 from "../koi_photo/member/member 3.png";
import blog1 from "../koi_photo/pond/koi_pond.jpg";
import blog2 from "../koi_photo/pond/koi_pond2.jpg";
import blog3 from "../koi_photo/pond/pond3.jpg";
import avatarDung from "../koi_photo/member/member 1.jpg";
import avatarPhat from "../koi_photo/member/member 2.jpg";
import avatarTuan from "../koi_photo/member/member 3.png";
import axios from "axios"; // Make sure to import axios

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slider1, slider2, slider3];
  const [animatedStats, setAnimatedStats] = useState({
    years: 0,
    projects: 0,
    satisfaction: 0,
    awards: 0,
  });
  const animationTriggered = useRef(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    area: "", // Changed from text input to dropdown
    style: "",
    stage: "",
    contactMethod: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

      const aboutSection = document.getElementById("about");
      if (aboutSection && !animationTriggered.current) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          animateStats();
          animationTriggered.current = true;
        }
      }
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
      // Use toast.success directly
      toast.success("Login successful! Welcome back!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Remove the query parameter after showing the toast
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

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
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const animateStats = () => {
    const duration = 2000; // Animation duration in ms
    const frameDuration = 1000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setAnimatedStats({
        years: Math.floor(easeOutQuad(progress) * 15),
        projects: Math.floor(easeOutQuad(progress) * 500),
        satisfaction: Math.floor(easeOutQuad(progress) * 100),
        awards: Math.floor(easeOutQuad(progress) * 50),
      });

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  // Easing function for smoother animation
  const easeOutQuad = (t) => t * (2 - t);

  const handleGetRequest = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData({
      location: "",
      area: "",
      style: "",
      stage: "",
      contactMethod: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const customerId = user ? user.id : null;

      if (!customerId) {
        toast.error("User not found. Please log in again.");
        return;
      }

      const requestData = {
        customerId: customerId,
        location: formData.location,
        style: formData.style,
        area: formData.area,
        stage: formData.stage,
        contactMethod: formData.contactMethod,
      };

      const response = await axios.post(
        "http://localhost:8080/forms/create",
        requestData
      );

      if (response.data.code === 1000 || response.data.code === 1005) {
        console.log("Form submitted successfully:", response.data);
        toast.success("Request submitted successfully!");
        handleClosePopup();
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="home-page">
      <Header />
      <main className="home-content">
        {/* Wrap the content inside a container */}
        <div className="content-container">
          <section id="home" className="hero">
            <div className="hero-slider">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`hero-slide ${
                    index === currentSlide ? "active" : ""
                  }`}
                  style={{ backgroundImage: `url(${slide})` }}
                ></div>
              ))}
            </div>
            <div className="hero-content">
              <h1>Create Your Dream Koi Pond</h1>
              <p>Expert design and construction for serene water gardens</p>
              {isLoggedIn && (
                <button className="cta-button" onClick={handleGetRequest}>
                  Send Request Now
                </button>
              )}
            </div>
            <div className="slider-controls">
              <button onClick={prevSlide} className="slider-control prev">
                &#10094;
              </button>
              <button onClick={nextSlide} className="slider-control next">
                &#10095;
              </button>
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
                <div className="gallery-item-caption">
                  Serene Backyard Oasis
                </div>
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
              <div className="gallery-item">
                <img src={pond4} alt="Koi Pond 4" />
                <div className="gallery-item-caption">Pond Resort Retreat</div>
              </div>
              <div className="gallery-item">
                <img src={pond5} alt="Koi Pond 5" />
                <div className="gallery-item-caption">Tropical Paradise</div>
              </div>
            </div>
          </section>

          <section id="about" className="about">
            <h2>About Us</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  At Koi Pond Builders, we are passionate about creating
                  beautiful koi ponds that bring tranquility and elegance to
                  your outdoor spaces. Founded in 2008, our company has grown
                  from a small team of enthusiasts to a leading name in custom
                  koi pond design and construction.
                </p>
                <p>
                  Our journey began with a simple love for the serene beauty of
                  koi ponds and a desire to share that beauty with others. Over
                  the years, we've honed our skills, embraced innovative
                  techniques, and assembled a team of experts dedicated to
                  turning your aquatic dreams into reality.
                </p>
                <p>
                  What sets us apart is our holistic approach to pond building.
                  We don't just construct ponds; we create entire ecosystems.
                  Our designs seamlessly blend water, stone, and plant life to
                  create a harmonious environment that's as healthy for its
                  inhabitants as it is beautiful for its owners.
                </p>
                <p>
                  We pride ourselves on our attention to detail, from the
                  initial consultation to the final touches. Our team of skilled
                  designers, engineers, and horticulturists work collaboratively
                  to ensure that each project is tailored to our clients' unique
                  visions and the specific requirements of their space.
                </p>
                <p>
                  Sustainability is at the heart of our philosophy. We utilize
                  eco-friendly materials and energy-efficient systems in our
                  designs, ensuring that your koi pond is not only a beautiful
                  addition to your property but also an environmentally
                  responsible one.
                </p>
                <p>
                  Education is also a key part of our mission. We believe that
                  informed clients make the best pond owners, which is why we
                  offer comprehensive guidance on pond maintenance and koi care.
                  Our relationship with our clients doesn't end at installation;
                  we're here to support you throughout your koi pond journey.
                </p>
                <p>
                  As we look to the future, we're excited to continue pushing
                  the boundaries of what's possible in koi pond design. Whether
                  you're dreaming of a small meditation pond or an expansive koi
                  paradise, we have the passion, expertise, and creativity to
                  bring your vision to life.
                </p>
                <p>
                  Thank you for considering Koi Pond Builders for your project.
                  We look forward to helping you create your own slice of
                  aquatic paradise.
                </p>
              </div>
              <div className="about-stats">
                <div className="stat-item">
                  <h3>{animatedStats.years}+</h3>
                  <p>Years of Experience</p>
                </div>
                <div className="stat-item">
                  <h3>{animatedStats.projects}+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat-item">
                  <h3>{animatedStats.satisfaction}%</h3>
                  <p>Client Satisfaction</p>
                </div>
                <div className="stat-item">
                  <h3>{animatedStats.awards}+</h3>
                  <p>Awards Won</p>
                </div>
              </div>
            </div>
          </section>

          <section id="team" className="team">
            <h2>Our Team</h2>
            <div className="team-container">
              <div className="team-member">
                <img src={member2} alt="Kazuto Kirigaya" />
                <div className="team-member-info">
                  <h3>Kazuto Kirigaya</h3>
                  <p>Founder & CEO</p>
                </div>
              </div>
              <div className="team-member">
                <img src={member1} alt="Asada Shino" />
                <div className="team-member-info">
                  <h3>Asada Shino</h3>
                  <p>COO</p>
                </div>
              </div>
              <div className="team-member">
                <img src={member3} alt="Asuna Yuuki" />
                <div className="team-member-info">
                  <h3>Asuna Yuuki</h3>
                  <p>Architect</p>
                </div>
              </div>
            </div>
          </section>

          <section id="testimonials" className="testimonials">
            <h2>What Our Clients Say</h2>
            <div className="testimonial-container">
              <div className="testimonial-item">
                <div className="testimonial-avatar">
                  <img src={avatarDung} alt="Dũng Senpai" />
                </div>
                <p>
                  "Koi Pond Builders transformed our backyard into a serene
                  oasis. Their attention to detail and craftsmanship is
                  unparalleled."
                </p>
                <h4>- Dũng Senpai</h4>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-avatar">
                  <img src={avatarPhat} alt="Thầy Phát" />
                </div>
                <p>
                  "The team was professional, punctual, and a pleasure to work
                  with. Our new koi pond has become the highlight of our
                  garden."
                </p>
                <h4>- Thầy Phát</h4>
              </div>
              <div className="testimonial-item">
                <div className="testimonial-avatar">
                  <img src={avatarTuan} alt="Tuấn Anh" />
                </div>
                <p>
                  "From design to completion, the process was smooth and the
                  results exceeded our expectations. Highly recommended!"
                </p>
                <h4>- Tuấn Anh</h4>
              </div>
            </div>
          </section>

          <section id="blog" className="blog">
            <h2>Latest News</h2>
            <div className="blog-container">
              <div className="blog-post">
                <div className="blog-image">
                  <img src={blog1} alt="Blog post 1" />
                </div>
                <div className="blog-content">
                  <h3>The Benefits of Koi Ponds for Mental Health</h3>
                  <p>
                    Discover how a koi pond can improve your well-being and
                    create a peaceful atmosphere in your backyard.
                  </p>
                  <Link to="/blog/1" className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div className="blog-post">
                <div className="blog-image">
                  <img src={blog2} alt="Blog post 2" />
                </div>
                <div className="blog-content">
                  <h3>Top 5 Koi Varieties for Beginners</h3>
                  <p>
                    Learn about the best koi varieties for those just starting
                    their journey into the world of koi keeping.
                  </p>
                  <Link to="/blog/2" className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div className="blog-post">
                <div className="blog-image">
                  <img src={blog3} alt="Blog post 3" />
                </div>
                <div className="blog-content">
                  <h3>Seasonal Maintenance Tips for Your Koi Pond</h3>
                  <p>
                    Essential maintenance tasks to keep your koi pond healthy
                    and beautiful throughout the year.
                  </p>
                  <Link to="/blog/3" className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Request a Koi Pond Design</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Project location"
                required
              />
              <select
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                required
              >
                <option value="">Select estimated construction area</option>
                <option value="50m2 - 100m2">50m2 - 100m2</option>
                <option value="100m2 - 200m2">100m2 - 200m2</option>
                <option value="200m2 - 300m2">200m2 - 300m2</option>
                <option value="300m2 - 500m2">300m2 - 500m2</option>
                <option value="500m2 - 1000m2">500m2 - 1000m2</option>
                <option value="Custom">Custom</option>
              </select>
              <select
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                required
              >
                <option value="">Select preferred style</option>
                <option value="Japanese">Japanese</option>
                <option value="Modern">Modern</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Custom">Custom</option>
              </select>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleInputChange}
                required
              >
                <option value="">Select design stage</option>
                <option value="stage1">Stage 1</option>
                <option value="stage2">Stage 2</option>
                <option value="stage3">Stage 3</option>
                <option value="stage4">Stage 4</option>
              </select>
              <select
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleInputChange}
                required
              >
                <option value="">Select contact method</option>
                <option value="zalo">Zalo</option>
                <option value="phone">Phone</option>
                <option value="message">Message</option>
              </select>
              <button type="submit">Submit Request</button>
            </form>
            <button className="close-popup" onClick={handleClosePopup}>
              ×
            </button>
          </div>
        </div>
      )}

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
