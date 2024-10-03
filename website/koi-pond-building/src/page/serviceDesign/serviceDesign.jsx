import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./serviceDesign.css";
import serviceHeaderImage from "../koi_photo/homepageheader.jpg";

function ServiceDesign() {
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
    <div className="service-design-page">
      <Header isTransparent={true} />
      <section className="service-hero">
        <div className="service-hero-content">
          <h1>Koi Pond Design and Construction</h1>
          <p>Expert design and construction for serene water gardens</p>
        </div>
      </section>
      <div className="service-content">
        <section className="service-intro">
          <p>
            With the elegance, longevity, and beautiful colors of Koi fish, it's
            easy to see why Japanese-style gardens often feature Koi ponds.
            <strong>Designing a beautiful Koi pond in your garden</strong> not
            only brings tranquility, luck, and prosperity but also adds a unique
            aesthetic to your living space.
          </p>
        </section>

        <section className="service-design-standards">
          <h2>How to Design a Standard Koi Pond</h2>
          <ol>
            <li>
              <h3>Pond Shape</h3>
              <p>
                The shape of the pond will depend on your personal preferences
                and the overall area of your garden.
              </p>
            </li>
            <li>
              <h3>Pond Location</h3>
              <p>
                Koi ponds can be placed in various locations such as outdoors,
                indoors, on balconies, or rooftops.
              </p>
            </li>
            <li>
              <h3>Pond Size</h3>
              <p>
                The size of your Koi pond should be appropriate for the number
                of fish and the available space in your garden.
              </p>
            </li>
            <li>
              <h3>Water Depth</h3>
              <p>
                Proper water depth is crucial for the health and well-being of
                your Koi fish.
              </p>
            </li>
            <li>
              <h3>Filtration System</h3>
              <p>
                A high-quality filtration system is essential for maintaining
                clean and healthy water for your Koi.
              </p>
            </li>
          </ol>
        </section>

        <section className="service-sample-designs">
          <h2>Impressive Koi Pond Design Examples</h2>
          {/* Add image gallery or carousel here */}
        </section>

        <section className="service-why-choose-us">
          <h2>Why Choose Us for Your Garden Design</h2>
          <p>
            With nearly a decade of experience in landscaping and garden design,
            specializing in Koi pond design and construction, we are confident
            in providing comprehensive solutions for your Koi pond needs.
          </p>
        </section>

        <section className="service-process">
          <h2>Our Service Process</h2>
          <ol>
            <li>Initial Consultation</li>
            <li>Site Survey and Analysis</li>
            <li>Design Concept Development</li>
            <li>Detailed Design and Planning</li>
            <li>Construction and Installation</li>
            <li>Final Inspection and Handover</li>
          </ol>
        </section>

        <section className="service-projects">
          <h2>Our Completed Koi Pond Projects</h2>
          {/* Add project showcase here */}
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
