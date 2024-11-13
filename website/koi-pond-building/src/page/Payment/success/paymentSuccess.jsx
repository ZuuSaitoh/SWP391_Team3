import React from "react";
import "./paymentSuccess.css"; // Assuming you have some styles for this component

function PaymentSuccess() {
  return (
    <div className="payment-success-container">
      <h1>Payment Successful!</h1>
      <p>
        Thank you for your purchase. Your transaction has been completed
        successfully.
      </p>
      <p>If you have any questions, please contact our support team.</p>
      <button onClick={() => (window.location.href = "/")}>
        Return to Home
      </button>
    </div>
  );
}

export default PaymentSuccess;
