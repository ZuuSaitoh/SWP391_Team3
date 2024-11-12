import React from "react";
import "./Footer.css";
import locationIcon from "../../page/koi_photo/logo-icon/location.png";
import mailIcon from "../../page/koi_photo/logo-icon/mail.png";
import phoneIcon from "../../page/koi_photo/logo-icon/phone-call.png";
import securityIcon from "../../page/koi_photo/logo-icon/security.png";
import facebookIcon from "../../page/koi_photo/logo-icon/Facebook_Logo_Primary.png";
import zaloIcon from "../../page/koi_photo/logo-icon/zalo-logo.png";
import telegramIcon from "../../page/koi_photo/logo-icon/telegram.jpg";
import twitterIcon from "../../page/koi_photo/logo-icon/Twitter.jpg";
import koiLogo from "../../page/koi_photo/logo-icon/koilogo.jpg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Koi Pond Builders</h3>
          <p>Creating serene water gardens since 2005</p>
          <div className="footer-logo">
            <img src={koiLogo} alt="Koi Pond Builders Logo" className="koi-logo-small" />
          </div>
        </div>
        <div className="footer-section">
          <h3>Get in Touch</h3>
          <div className="contact-info">
            <p><img src={locationIcon} alt="Address" className="footer-icon" /> <span>549/44/19 Lê Văn Thọ</span></p>
            <p><img src={phoneIcon} alt="Phone" className="footer-icon" /> <span>(084) 0934103416</span></p>
            <p><img src={mailIcon} alt="Email" className="footer-icon" /> <span>lamhdse184108@fpt.edu.vn</span></p>
            <p><img src={securityIcon} alt="Security" className="footer-icon" /> <span>Business License No. 0101507251, 6th issuance in 2019</span></p>
          </div>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=100043132098637" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <img src={facebookIcon} alt="Facebook" className="social-icon facebook" />
            </a>
            <a href="https://zalo.me/0934103416" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <img src={zaloIcon} alt="Zalo" className="social-icon zalo" />
            </a>
            <a href="https://t.me/phat2105" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <img src={telegramIcon} alt="Telegram" className="social-icon telegram" />
            </a>
            <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <img src={twitterIcon} alt="Twitter" className="social-icon twitter" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Koi Pond Builders. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
