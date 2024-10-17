import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./serviceDesign.css";
import slider1 from "../koi_photo/slider/slider 1- design.jpg";
import slider2 from "../koi_photo/slider/slider 2 - design.jpg";
import slider3 from "../koi_photo/slider/slider 3 - design.jpg";

function ServiceDesign() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slider1, slider2, slider3];

  // Add this new state for designs
  const [designs, setDesigns] = useState([]);

  // Add this new useEffect to fetch designs
  useEffect(() => {
    fetch('http://localhost:8080/designs/fetchAll')
      .then(response => response.json())
      .then(data => {
        if (data.code === 9999 && Array.isArray(data.result)) {
          setDesigns(data.result);
        }
      })
      .catch(error => console.error('Error fetching designs:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.service-content section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="service-design-page">
      <Header isTransparent={true} />
      <section className="service-hero">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide})` }}
            ></div>
          ))}
        </div>
        <div className="service-hero-content">
          <h1>Koi Pond Design and Construction</h1>
          <p>Expert design and construction for serene water gardens</p>
        </div>
        <div className="slider-controls">
          <button onClick={prevSlide} className="slider-control prev">&#10094;</button>
          <button onClick={nextSlide} className="slider-control next">&#10095;</button>
        </div>
      </section>
      <div className="service-content">
        <section className="service-intro">
          <h2>Introduction to Koi Pond Design Services</h2>
          <p>
            With the elegance, longevity, and beautiful colors of Koi fish, it's easy to see why Japanese-style gardens often feature Koi ponds. 
            <strong>Designing a beautiful Koi pond in your garden</strong> not only brings tranquility, luck, and prosperity but also adds a unique aesthetic to your living space.
          </p>
        </section>

        <section className="service-design-standards">
          <h2>Koi Pond Design Standards</h2>
          <div className="standards-grid">
            <div className="standard-item">
              <h3>Pond Shape</h3>
              <p>The shape of the pond will depend on your personal preferences and the overall area of your garden.</p>
            </div>
            <div className="standard-item">
              <h3>Pond Location</h3>
              <p>Koi ponds can be placed in various locations such as outdoors, indoors, on balconies, or rooftops.</p>
            </div>
            <div className="standard-item">
              <h3>Pond Size</h3>
              <p>The size of your Koi pond should be appropriate for the number of fish and the available space in your garden.</p>
            </div>
            <div className="standard-item">
              <h3>Water Depth</h3>
              <p>Proper water depth is crucial for the health and well-being of your Koi fish.</p>
            </div>
            <div className="standard-item">
              <h3>Filtration System</h3>
              <p>A high-quality filtration system is essential for maintaining clean and healthy water for your Koi.</p>
            </div>
          </div>
        </section>

        <section className="service-why-choose-us">
          <h2>Why Choose Us for Your Koi Pond Design</h2>
          <div className="why-choose-us-content">
            <div className="why-choose-us-text">
              <p>With nearly a decade of experience in landscaping and garden design, specializing in Koi pond design and construction, we are confident in providing comprehensive solutions for your Koi pond needs.</p>
            </div>
            <div className="why-choose-us-list">
              <ul>
                <li>High expertise in Koi pond design</li>
                <li>Experienced team of professionals</li>
                <li>Use of high-quality materials and equipment</li>
                <li>Commitment to customer satisfaction</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="service-pricing">
          <h2>Pricing Information</h2>
          <div className="pricing-tables">
            <div className="pricing-table">
              <h3>Architectural Design Pricing</h3>
              <table>
                <thead>
                  <tr>
                    <th>Design Style</th>
                    <th>Price (m²)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Japanese</td>
                    <td>420,000</td>
                  </tr>
                  <tr>
                    <td>Traditional</td>
                    <td>300,000</td>
                  </tr>
                  <tr>
                    <td>Classical</td>
                    <td>520,000</td>
                  </tr>
                  <tr>
                    <td>Modern</td>
                    <td>250,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="pricing-table">
              <h3>Koi Pond Construction Pricing</h3>
              <table>
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10 - 20 m²</td>
                    <td>From 25,000,000/m²</td>
                  </tr>
                  <tr>
                    <td>20 - 50 m²</td>
                    <td>From 21,000,000/m²</td>
                  </tr>
                  <tr>
                    <td>50 - 100 m²</td>
                    <td>From 15,000,000/m²</td>
                  </tr>
                  <tr>
                    <td>Over 100 m²</td>
                    <td>From 9,000,000/m²</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Add this new design showcase */}
            <div className="design-showcase">
              <h3>Our Design Portfolio</h3>
              <div className="design-gallery">
                {designs.map((design) => (
                  <div key={design.designId} className="design-item">
                    <img src={design.imageData} alt={design.designName} />
                    <div className="design-item-caption">
                      <h4>{design.designName}</h4>
                      <p>Version: {design.designVersion}</p>
                      <p>Date: {new Date(design.designDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="service-process">
          <h2>Our Service Process</h2>
          <div className="process-timeline">
            {[ 
              { number: 1, title: "Initial Consultation", description: "We listen to your ideas and desires.", icon: "🤝" },
              { number: 2, title: "Site Survey and Analysis", description: "Thorough assessment of the intended pond area.", icon: "📏" },
              { number: 3, title: "Design Concept Development", description: "Creation of initial sketches and design ideas.", icon: "✏️" },
              { number: 4, title: "Detailed Design and Planning", description: "Finalization of technical drawings and construction plans.", icon: "📐" },
              { number: 5, title: "Construction and Installation", description: "Building the Koi pond according to the approved design.", icon: "🏗️" },
              { number: 6, title: "Final Inspection and Handover", description: "Ensuring everything is perfect before handing over to the client.", icon: "🔍" },
            ].map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3>{step.icon} {step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="service-quote-form">
          <h2>Request a Quote</h2>
          <div className="form-container">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSfP-12Cc2RIe2J899Rh5XHnFOUtv04TTGr9fntgq6BKbuj7Fw/viewform?usp=sf_link" 
              width="100%" 
              height="1000px" 
            >
              Loading...
            </iframe>
          </div>
        </section>
      </div>
      {showScrollTop && (
        <div className="service-scroll-to-top" onClick={scrollToTop}>
          ▲
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ServiceDesign;
