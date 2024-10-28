import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./serviceClean.css";
import ScrollToTop from "react-scroll-to-top";
import slider1 from "../koi_photo/slider/slider1.jpg";
import slider2 from "../koi_photo/slider/slider2.jpg";
import slider3 from "../koi_photo/slider/slider3.jpg";
import cleanpic from "../koi_photo/clean/clean1.jpg";

function ServiceClean() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slider1, slider2, slider3];
  const [cleaningServices, setCleaningServices] = useState([]);

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

  useEffect(() => {
    // Fetch all services from the API
    fetch("http://localhost:8080/services/fetchAll")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched services:", data);
        if (data.code === 9999 && Array.isArray(data.result)) {
          // Filter services to only include cleaning services
          const cleaningServicesData = data.result.filter(
            (service) => service.serviceType === "Cleaning Pond Service"
          );
          console.log("Filtered cleaning services:", cleaningServicesData);
          setCleaningServices(cleaningServicesData);
        } else {
          console.error("Unexpected API response format");
        }
      })
      .catch((error) => console.error("Error fetching services:", error));
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
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const handleChooseService = (service) => {
    // Store the selected service in localStorage
    localStorage.setItem("selectedService", JSON.stringify(service));
    // Navigate to the payment page
    navigate("/payment");
  };

  return (
    <div className="service-clean-page">
      <Header isTransparent={true} />
      <section className="clean-hero">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide})` }}
            ></div>
          ))}
        </div>
        <div className="clean-hero-content">
          <h1>Koi Pond Cleaning Services</h1>
          <p>Professional cleaning for a pristine aquatic environment</p>
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

      <div className="clean-content">
        <section className="clean-intro">
          <h2>Professional Koi Pond Cleaning</h2>
          <p>
            A clean Koi pond is essential for the health of your fish and the
            beauty of your outdoor space. Our professional Koi pond cleaning
            services ensure that your pond remains a sparkling, healthy habitat
            for your prized Koi.
          </p>
        </section>

        <section className="cleaning-services">
          <h2>Our Cleaning Services</h2>
          {cleaningServices.length > 0 ? (
            <div className="services-grid">
              {cleaningServices.map((service) => (
                <div key={service.serviceId} className="service-item">
                  <h3>{service.serviceName}</h3>
                  <p>{service.description}</p>
                  <p className="service-price">
                    Price: {service.price.toLocaleString()} VND
                  </p>
                  <button
                    className="choose-service-btn"
                    onClick={() => handleChooseService(service)}
                  >
                    Choose Service
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading cleaning services...</p>
          )}
        </section>

        <section className="clean-standards">
          <h2>Our Koi Pond Cleaning Standards</h2>
          <div className="standards-grid">
            <div className="standard-item">
              <i className="fas fa-leaf"></i>
              <h3>Thorough Debris Removal</h3>
              <p>
                Comprehensive removal of leaves, twigs, and other organic matter
                from the pond surface and bottom.
              </p>
            </div>
            <div className="standard-item">
              <i className="fas fa-water"></i>
              <h3>Sludge and Sediment Extraction</h3>
              <p>
                Careful vacuuming of accumulated sludge and sediment to prevent
                water quality issues.
              </p>
            </div>
            <div className="standard-item">
              <i className="fas fa-filter"></i>
              <h3>Filter and Pump Cleaning</h3>
              <p>
                Thorough cleaning and maintenance of filtration systems and
                pumps to ensure optimal performance.
              </p>
            </div>
            <div className="standard-item">
              <i className="fas fa-vial"></i>
              <h3>Water Quality Testing</h3>
              <p>
                Comprehensive water quality analysis to identify and address any
                imbalances or issues.
              </p>
            </div>
            <div className="standard-item">
              <i className="fas fa-seedling"></i>
              <h3>Algae Control</h3>
              <p>
                Effective removal of excess algae and implementation of
                preventive measures.
              </p>
            </div>
          </div>
        </section>

        <section className="clean-benefits">
          <h2>Benefits of Professional Koi Pond Cleaning</h2>
          <ul className="benefits-list">
            <li>
              <i className="fas fa-check"></i> Improved water clarity and
              aesthetics
            </li>
            <li>
              <i className="fas fa-check"></i> Enhanced fish health and vitality
            </li>
            <li>
              <i className="fas fa-check"></i> Reduced risk of pond-related
              issues
            </li>
            <li>
              <i className="fas fa-check"></i> Increased longevity of pond
              equipment
            </li>
            <li>
              <i className="fas fa-check"></i> More enjoyable pond viewing
              experience
            </li>
          </ul>
        </section>

        <section className="clean-why-choose-us">
          <h2>Why Choose Us for Your Koi Pond Cleaning</h2>
          <div className="why-choose-content">
            <div className="why-choose-text">
              <p>
                Our team of skilled technicians specializes in Koi pond
                cleaning, bringing years of experience and a deep understanding
                of pond ecosystems. We use eco-friendly cleaning methods and
                state-of-the-art equipment to ensure a thorough clean without
                compromising the delicate balance of your pond.
              </p>
            </div>
            <div className="why-choose-image">
              <img src={cleanpic} alt="Our cleaning team at work" />
            </div>
          </div>
        </section>

        <section className="clean-process">
          <h2>Our Cleaning Process</h2>
          <div className="process-timeline">
            {[
              {
                step: 1,
                title: "Initial Pond Assessment",
                description:
                  "We evaluate the current state of your pond and identify specific cleaning needs.",
                icon: "🔍",
              },
              {
                step: 2,
                title: "Fish and Plant Safeguarding",
                description:
                  "We take measures to protect your Koi and aquatic plants during the cleaning process.",
                icon: "🐠",
              },
              {
                step: 3,
                title: "Debris Removal and Vacuuming",
                description:
                  "We thoroughly clean the pond, removing debris and vacuuming sediment.",
                icon: "🧹",
              },
              {
                step: 4,
                title: "Filtration System Cleaning",
                description:
                  "We clean and maintain your pond's filtration system for optimal performance.",
                icon: "🔧",
              },
              {
                step: 5,
                title: "Water Quality Testing and Adjustment",
                description:
                  "We test and adjust water parameters to ensure a healthy environment for your Koi.",
                icon: "🧪",
              },
              {
                step: 6,
                title: "Final Inspection and Recommendations",
                description:
                  "We perform a final check and provide maintenance recommendations for your pond.",
                icon: "✅",
              },
            ].map((item, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{item.step}</div>
                <div className="step-content">
                  <h3>
                    {item.icon} {item.title}
                  </h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {showScrollTop && (
        <div className="clean-scroll-to-top" onClick={scrollToTop}>
          ▲
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ServiceClean;
