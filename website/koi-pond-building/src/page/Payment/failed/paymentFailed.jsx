import React from "react";
import "./paymentFailed.css";

function PaymentFail() {
  return (
    <div className="payment-failed-container">
      <h1>Payment Failed!</h1>
      <p>
        We're sorry, but there was an issue processing your payment. Please try again.
      </p>
      <p>If you continue to experience issues, please contact our support team.</p>
      <button onClick={() => (window.location.href = "/")}>
        Return to Home
      </button>
    </div>
  );
}

export default PaymentFail;
