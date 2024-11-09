import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./serviceMaintenance.css";
import ScrollToTop from "react-scroll-to-top";
import slider1 from "../koi_photo/slider/slider1.jpg";
import slider2 from "../koi_photo/slider/slider2.jpg";
import slider3 from "../koi_photo/slider/slider3.jpg";
import mainTainGuy from "../koi_photo/backgroundPage/MainTainGuy.jpg";
import { FaCheckCircle } from "react-icons/fa";

function ServiceMaintenance() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slider1, slider2, slider3];
  const [maintenanceServices, setMaintenanceServices] = useState([]);

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
        // console.log("Fetched services:", data);
        if (data.code === 9999 && Array.isArray(data.result)) {
          // Filter services to only include maintenance services
          const maintenanceServicesData = data.result.filter(
            (service) => service.serviceType === "Maintenance"
          );
          // console.log(
          //   "Filtered maintenance services:",
          //   maintenanceServicesData
          // );
          setMaintenanceServices(maintenanceServicesData);
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
    <div className="service-maintenance-page">
      <Header isTransparent={true} />
      <section
        className="maintenance-hero"
        style={{ backgroundImage: `url(${mainTainGuy})` }}
      >
        <div className="maintenance-hero-content">
          <h1>Koi Pond Maintenance Services</h1>
          <p>Professional care for a thriving aquatic ecosystem</p>
        </div>
      </section>

      <div className="maintenance-content">
        <section className="maintenance-intro">
          <h2>Expert Koi Pond Maintenance</h2>
          <p>
            At Koi Pond Builders, we understand that a beautiful and healthy Koi
            pond requires regular, professional care. Our expert maintenance
            services ensure that your aquatic paradise remains a thriving
            ecosystem for your prized Koi, while providing you with a serene and
            enjoyable outdoor space.
          </p>
        </section>

        {/* Add this new section for displaying maintenance services */}
        <section className="maintenance-services-list">
          <h2>Our Maintenance Services</h2>
          {maintenanceServices.length > 0 ? (
            <div className="services-grid">
              {maintenanceServices.map((service) => (
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
            <p>Loading maintenance services...</p>
          )}
        </section>

        <section className="maintenance-importance">
          <h2>The Importance of Professional Maintenance</h2>
          <div className="importance-grid">
            {[
              {
                icon: "fas fa-fish",
                title: "Fish Health",
                description:
                  "Regular maintenance ensures optimal water conditions for your Koi, promoting their health and longevity.",
              },
              {
                icon: "fas fa-leaf",
                title: "Ecosystem Balance",
                description:
                  "Professional care maintains the delicate balance of your pond's ecosystem, supporting both fish and plant life.",
              },
              {
                icon: "fas fa-tint",
                title: "Water Quality",
                description:
                  "Our services keep your pond water clean, clear, and properly balanced for optimal aesthetics and fish health.",
              },
              {
                icon: "fas fa-cog",
                title: "Equipment Longevity",
                description:
                  "Regular maintenance of filters, pumps, and other equipment ensures their efficient operation and extends their lifespan.",
              },
            ].map((item, index) => (
              <div key={index} className="importance-item">
                <i className={item.icon}></i>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="maintenance-services">
          <h2>Our Comprehensive Maintenance Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <i className="fas fa-water"></i>
              <h3>Water Quality Management</h3>
              <p>
                Regular testing and balancing of water parameters to ensure
                optimal conditions for your Koi.
              </p>
            </div>
            <div className="service-item">
              <i className="fas fa-broom"></i>
              <h3>Debris Removal</h3>
              <p>
                Routine cleaning to remove leaves, twigs, and other debris from
                the pond surface and bottom.
              </p>
            </div>
            <div className="service-item">
              <i className="fas fa-filter"></i>
              <h3>Filtration System Maintenance</h3>
              <p>
                Regular cleaning and maintenance of filters to ensure efficient
                water purification.
              </p>
            </div>
            <div className="service-item">
              <i className="fas fa-heartbeat"></i>
              <h3>Fish Health Monitoring</h3>
              <p>
                Regular check-ups on your Koi to ensure they remain healthy and
                free from diseases.
              </p>
            </div>
            <div className="service-item">
              <i className="fas fa-leaf"></i>
              <h3>Aquatic Plant Care</h3>
              <p>
                Pruning, fertilizing, and managing aquatic plants to maintain a
                balanced ecosystem.
              </p>
            </div>
            <div className="service-item">
              <i className="fas fa-thermometer-half"></i>
              <h3>Seasonal Adjustments</h3>
              <p>
                Adapting maintenance routines to seasonal changes to ensure
                year-round pond health.
              </p>
            </div>
          </div>
        </section>

        <section className="maintenance-process">
          <h2>Our Maintenance Process</h2>
          <div className="process-timeline">
            {[
              {
                step: 1,
                title: "Initial Assessment",
                description:
                  "We thoroughly evaluate your pond's current condition and specific needs.",
                icon: "🔍",
              },
              {
                step: 2,
                title: "Customized Plan",
                description:
                  "We create a tailored maintenance plan based on your pond's unique requirements.",
                icon: "📝",
              },
              {
                step: 3,
                title: "Regular Maintenance Visits",
                description:
                  "Our experts perform scheduled maintenance tasks to keep your pond in top condition.",
                icon: "🔧",
              },
              {
                step: 4,
                title: "Water Quality Testing",
                description:
                  "We conduct regular water tests to ensure optimal conditions for your Koi.",
                icon: "🧪",
              },
              {
                step: 5,
                title: "Equipment Check and Cleaning",
                description:
                  "We inspect and clean all pond equipment to ensure efficient operation.",
                icon: "⚙️",
              },
              {
                step: 6,
                title: "Detailed Reporting",
                description:
                  "After each visit, we provide a comprehensive report of services performed and recommendations.",
                icon: "📊",
              },
            ].map((item, index) => (
              <div key={index} className="process-step">
                <div className="step-content">
                  <h3>
                    {item.icon} {item.title}
                  </h3>
                  <p>{item.description}</p>
                </div>
                <div className="step-number">{item.step}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="maintenance-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h3>
                How often should I have my Koi pond professionally maintained?
              </h3>
              <p>
                The frequency of professional maintenance depends on various
                factors such as pond size, number of fish, and surrounding
                environment. Generally, we recommend at least monthly
                maintenance visits, with more frequent visits during peak
                seasons.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I perform some maintenance tasks myself?</h3>
              <p>
                While some basic tasks like surface skimming can be done by pond
                owners, professional maintenance ensures thorough care and early
                detection of potential issues. We also provide guidance on daily
                pond care practices for pond owners.
              </p>
            </div>
            <div className="faq-item">
              <h3>How do seasonal changes affect pond maintenance?</h3>
              <p>
                Each season brings unique challenges for Koi ponds. Our
                maintenance plans adapt to these seasonal changes, adjusting
                care routines for spring preparation, summer algae control, fall
                cleanup, and winter protection.
              </p>
            </div>
          </div>
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
