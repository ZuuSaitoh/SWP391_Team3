import React, { useState, useEffect } from "react";
import "./payment.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [address, setAddress] = useState("");
  const [customer, setCustomer] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [usingPoint, setUsingPoint] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      const userString = localStorage.getItem("user");
      if (!userString) {
        console.error("No user data found in local storage");
        toast.error("Please log in to proceed with payment");
        return;
      }

      try {
        const userData = JSON.parse(userString);
        const customerId = userData.id;

        if (!customerId) {
          console.error("No customer ID found in user data");
          toast.error("Invalid user data. Please log in again.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/customers/${customerId}`
        );
        setCustomer(response.data);
        setAddress(response.data.address);
        setFullName(response.data.fullName);
        setPhoneNumber(response.data.phone);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        toast.error("Error loading customer information");
      }
    };

    const fetchSelectedService = () => {
      const serviceData = localStorage.getItem("selectedService");
      console.log("Raw service data from localStorage:", serviceData);
      if (serviceData) {
        try {
          const parsedService = JSON.parse(serviceData);
          console.log("Parsed service data:", parsedService);
          setSelectedService(parsedService);
        } catch (error) {
          console.error("Error parsing service data:", error);
        }
      } else {
        console.log("No service data found in localStorage");
      }
    };

    fetchCustomerData();
    fetchSelectedService();
  }, []);

  const handlePlaceOrder = async () => {
    if (!customer || !selectedService) {
      toast.error("Missing customer or service information");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    try {
      const orderData = {
        customerId: customer.id,
        serviceId: selectedService.serviceId, // Make sure this matches the property name from the API
        price: selectedService.price,
        usingPoint: usingPoint,
        paymentMethod: paymentMethod,
        address: address,
        phoneNumber: phoneNumber,
      };

      console.log("Sending order data:", orderData);

      const response = await axios.post(
        "http://localhost:8080/bookingservices/create",
        orderData
      );

      console.log("Server response:", response.data);

      if (response.data && response.data.code === 1000) {
        toast.success("Order placed successfully!");
        localStorage.removeItem("selectedService");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        toast.error(
          `Error ${error.response.status}: ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error(
          "No response from server. Please check your connection and try again."
        );
      } else {
        console.error("Error details:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Koi Pond Builders</h1>
        <div className="payment-content">
          <div className="payment-info">
            <h2>Payment Information</h2>
            {customer && (
              <div className="payment-user-info">
                <img
                  src={customer.avatar}
                  alt="User"
                  className="payment-user-avatar"
                />
                <div>
                  <p>
                    {customer.fullName} ({customer.mail})
                  </p>
                  <p>Log out</p>
                </div>
              </div>
            )}
            <input
              type="text"
              className="payment-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              type="tel"
              className="payment-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
            <input
              type="text"
              className="payment-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <h3>Payment Method</h3>
            <div className="payment-methods">
              <label className="payment-method">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-method-icon">🚚</span>
                Cash
              </label>
              <label className="payment-method">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="VNPay"
                  checked={paymentMethod === "VNPay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-method-icon">💳</span>
                VNPay
              </label>
            </div>
          </div>
          <div className="payment-order-summary">
            <h3>Order Summary</h3>
            {selectedService ? (
              <div className="selected-service">
                <h4>{selectedService.serviceName}</h4>
                <p>{selectedService.description}</p>
                <p>Service Type: {selectedService.serviceType}</p>
                <p className="service-price">Price: ${selectedService.price}</p>
              </div>
            ) : (
              <p>No service selected</p>
            )}
            <div className="payment-discount-code">
              <input
                type="number"
                className="payment-input"
                placeholder="Use points"
                value={usingPoint}
                onChange={(e) => setUsingPoint(Number(e.target.value))}
              />
            </div>
            <div className="payment-total">
              <p>Subtotal</p>
              <p>${selectedService ? selectedService.price : 0}</p>
            </div>
            <div className="payment-shipping">
              <p>Points used</p>
              <p>-${usingPoint}</p>
            </div>
            <div className="payment-grand-total">
              <p>Total</p>
              <p>
                $
                {selectedService
                  ? Math.max(selectedService.price - usingPoint, 0)
                  : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="payment-buttons">
          <button
            className="payment-submit-button"
            onClick={handlePlaceOrder}
            disabled={!selectedService || !customer || !paymentMethod}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
