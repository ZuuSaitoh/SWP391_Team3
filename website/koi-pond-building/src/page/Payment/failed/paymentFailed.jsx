import React from "react";
import { Link } from "react-router-dom";
import "./paymentFailed.css";

const PaymentFail = () => {
  return (
    <div className="payment-fail-container">
      <div className="payment-fail-content">
        <h1>Payment Failed</h1>
        <p>We're sorry, but there was an issue processing your payment.</p>
        <div className="icon-container">
          <i className="fas fa-times-circle"></i>
        </div>
        <p>Please check your payment details and try again.</p>
        <Link to="/checkout" className="try-again-button">
          Try Again
        </Link>
        <Link to="/" className="home-button">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFail;
