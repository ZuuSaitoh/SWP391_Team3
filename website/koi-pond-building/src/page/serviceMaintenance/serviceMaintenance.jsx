import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./serviceMaintenance.css";

function ServiceMaintenance() {
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
    <div className="service-maintenance-page">
      <Header isTransparent={true} />
      <section className="maintenance-hero">
        <div className="maintenance-hero-content">
          <h1>Koi Pond Maintenance Services</h1>
          <p>Ensuring the longevity and health of your aquatic paradise</p>
        </div>
      </section>
      <div className="maintenance-content">
        <section className="maintenance-intro">
          <p>
            Regular maintenance is key to keeping your Koi pond thriving and
            beautiful. Our comprehensive maintenance services are designed to
            address all aspects of pond care, ensuring a healthy environment for
            your Koi and a stunning feature for your property.
          </p>
        </section>

        <section className="maintenance-services">
          <h2>Our Maintenance Services</h2>
          <ol>
            <li>
              <h3>Water Quality Management</h3>
              <p>
                Regular testing and balancing of water parameters to maintain
                optimal conditions.
              </p>
            </li>
            <li>
              <h3>Filtration System Upkeep</h3>
              <p>
                Routine checks and cleaning of all filtration components to
                ensure peak performance.
              </p>
            </li>
            <li>
              <h3>Algae Prevention and Control</h3>
              <p>
                Proactive measures to prevent algae growth and maintain clear
                water.
              </p>
            </li>
            <li>
              <h3>Seasonal Care</h3>
              <p>
                Tailored maintenance routines to address the changing needs of
                your pond throughout the year.
              </p>
            </li>
            <li>
              <h3>Fish Health Monitoring</h3>
              <p>Regular health checks and preventive care for your Koi.</p>
            </li>
          </ol>
        </section>

        <section className="maintenance-benefits">
          <h2>Benefits of Regular Maintenance</h2>
          {/* Add list or paragraphs about benefits */}
        </section>

        <section className="maintenance-why-choose-us">
          <h2>Why Choose Our Maintenance Services</h2>
          <p>
            Our team of experienced pond specialists brings expertise and
            dedication to every maintenance visit. We use eco-friendly products
            and cutting-edge techniques to ensure your Koi pond remains a
            thriving ecosystem and a beautiful focal point of your outdoor
            space.
          </p>
        </section>

        <section className="maintenance-process">
          <h2>Our Maintenance Process</h2>
          <ol>
            <li>Initial Pond Assessment</li>
            <li>Customized Maintenance Plan</li>
            <li>Regular Scheduled Visits</li>
            <li>Detailed Reporting and Updates</li>
            <li>Emergency Support</li>
            <li>Annual Review and Optimization</li>
          </ol>
        </section>

        <section className="maintenance-packages">
          <h2>Maintenance Packages</h2>
          {/* Add information about different maintenance packages */}
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
