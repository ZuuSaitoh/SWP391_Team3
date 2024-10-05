import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./serviceClean.css";
import ScrollToTop from "react-scroll-to-top";

function ServiceClean() {
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

  return (
    <div className="service-clean-page">
      <Header isTransparent={true} />
      <section className="clean-hero">
        <div className="clean-hero-content">
          <h1>Koi Pond Cleaning Services</h1>
          <p>Professional cleaning for a pristine aquatic environment</p>
        </div>
      </section>
      <div className="clean-content">
        <section className="clean-intro">
          <p>
            A clean Koi pond is essential for the health of your fish and the
            beauty of your outdoor space. Our professional Koi pond cleaning
            services ensure that your pond remains a sparkling, healthy habitat
            for your prized Koi.
          </p>
        </section>

        <section className="clean-standards">
          <h2>Our Koi Pond Cleaning Standards</h2>
          <ol>
            <li>
              <h3>Thorough Debris Removal</h3>
              <p>
                Comprehensive removal of leaves, twigs, and other organic matter
                from the pond surface and bottom.
              </p>
            </li>
            <li>
              <h3>Sludge and Sediment Extraction</h3>
              <p>
                Careful vacuuming of accumulated sludge and sediment to prevent
                water quality issues.
              </p>
            </li>
            <li>
              <h3>Filter and Pump Cleaning</h3>
              <p>
                Thorough cleaning and maintenance of filtration systems and
                pumps to ensure optimal performance.
              </p>
            </li>
            <li>
              <h3>Water Quality Testing</h3>
              <p>
                Comprehensive water quality analysis to identify and address any
                imbalances or issues.
              </p>
            </li>
            <li>
              <h3>Algae Control</h3>
              <p>
                Effective removal of excess algae and implementation of
                preventive measures.
              </p>
            </li>
          </ol>
        </section>

        <section className="clean-benefits">
          <h2>Benefits of Professional Koi Pond Cleaning</h2>
          <ul>
            <li>Improved water clarity and aesthetics</li>
            <li>Enhanced fish health and vitality</li>
            <li>Reduced risk of pond-related issues</li>
            <li>Increased longevity of pond equipment</li>
            <li>More enjoyable pond viewing experience</li>
          </ul>
        </section>

        <section className="clean-why-choose-us">
          <h2>Why Choose Us for Your Koi Pond Cleaning</h2>
          <p>
            Our team of skilled technicians specializes in Koi pond cleaning,
            bringing years of experience and a deep understanding of pond
            ecosystems. We use eco-friendly cleaning methods and
            state-of-the-art equipment to ensure a thorough clean without
            compromising the delicate balance of your pond.
          </p>
        </section>

        <section className="clean-process">
          <h2>Our Cleaning Process</h2>
          <ol>
            <li>Initial Pond Assessment</li>
            <li>Fish and Plant Safeguarding</li>
            <li>Debris Removal and Vacuuming</li>
            <li>Filtration System Cleaning</li>
            <li>Water Quality Testing and Adjustment</li>
            <li>Final Inspection and Recommendations</li>
          </ol>
        </section>

        <section className="clean-testimonials">
          <h2>What Our Clients Say</h2>
          {/* Add testimonials or reviews here */}
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
