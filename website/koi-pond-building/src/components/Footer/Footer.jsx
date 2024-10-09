import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Koi Pond Builders</h3>
          <p>Creating serene water gardens since 2005</p>
          <div className="footer-logo">
            <img src="/path/to/your/logo.png" alt="Koi Pond Builders Logo" />
          </div>
        </div>
        <div className="footer-section">
          <h3>Get in Touch</h3>
          <div className="contact-info">
            <p><i className="fas fa-map-marker-alt"></i> 549/44/19 Lê Văn Thọ</p>
            <p><i className="fas fa-phone"></i> (084) 0934103416</p>
            <p><i className="fas fa-envelope"></i> lamhdse184108@fpt.edu.vn</p>
          </div>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Koi Pond Builders. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
