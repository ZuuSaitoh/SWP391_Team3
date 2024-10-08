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
          <div className="why-choose-content">
            <p>
              With nearly a decade of experience in landscaping and garden design, specializing in Koi pond design and construction, we are confident in providing comprehensive solutions for your Koi pond needs.
            </p>
            <ul>
              <li>High expertise in Koi pond design</li>
              <li>Experienced team of professionals</li>
              <li>Use of high-quality materials and equipment</li>
              <li>Commitment to customer satisfaction</li>
            </ul>
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
              src="https://forms.gle/NEW5QpTiPUphsY7Q9" 
              width="100%" 
              height="1000px" 
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0"
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