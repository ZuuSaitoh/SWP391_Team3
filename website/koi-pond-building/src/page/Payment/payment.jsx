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
  const [availablePoints, setAvailablePoints] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const navigate = useNavigate();

  const pointToVND = (points) => points * 1000;
  const VNDToPoint = (vnd) => Math.floor(vnd / 1000);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const userString = localStorage.getItem("user");
      if (!userString) {
        console.error("No user data found in local storage");
        toast.error("Please log in to proceed with payment");
        return;
      }

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
      setAvailablePoints(response.data.point || 0); // Set available points
    };

    const fetchSelectedService = () => {
      const serviceData = localStorage.getItem("selectedService");
      if (serviceData && !selectedService) {
        const parsedService = JSON.parse(serviceData);
        setSelectedService(parsedService);
        console.log("Fetched service data:", parsedService); // Log only once
      }
    };

    fetchCustomerData();
    fetchSelectedService();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (selectedService) {
      const newDiscountedPrice = Math.max(
        selectedService.price - pointToVND(usingPoint),
        0
      );
      setDiscountedPrice(newDiscountedPrice);
    }

    if (discountedPrice === 0 && paymentMethod === "VNPay") {
      setPaymentMethod("COD");
    }
  }, [selectedService, usingPoint, discountedPrice, paymentMethod]);

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
        serviceId: selectedService.serviceId,
        price: discountedPrice, // Use the discounted price
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

        // Save the discounted price to local storage
        localStorage.setItem("lastOrderPrice", discountedPrice.toString());

        localStorage.removeItem("selectedService");

        const bookingServiceId = response.data.result.bookingServiceId;
        if (!bookingServiceId) {
          toast.error("Booking service ID not found.");
          return;
        }

        if (paymentMethod === "VNPay") {
          try {
            const vnpayResponse = await axios.post(
              "http://localhost:8080/serviceTransaction/test-payment",
              { bookingServiceId: response.data.result.bookingServiceId }
            );

            if (vnpayResponse.data && vnpayResponse.data.code === 6666) {
              window.location.href = vnpayResponse.data.result;
            } else {
              toast.error("Failed to initiate VNPay payment.");
            }
          } catch (error) {
            console.error("Error initiating VNPay payment:", error);
            toast.error("An error occurred while processing VNPay payment.");
          }
        } else {
          navigate("/");
        }
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

  // Add this function to format numbers with thousand separators
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleUsePoints = (value) => {
    const numValue = Number(value);
    const maxPointsAllowed = VNDToPoint(
      selectedService ? selectedService.price : 0
    );
    if (numValue < 0) {
      setUsingPoint(0);
    } else if (numValue > availablePoints) {
      setUsingPoint(availablePoints);
    } else if (numValue > maxPointsAllowed) {
      setUsingPoint(maxPointsAllowed);
    } else {
      setUsingPoint(numValue);
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
              <label
                className={`payment-method ${
                  discountedPrice === 0 ? "disabled" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="VNPay"
                  checked={paymentMethod === "VNPay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={discountedPrice === 0}
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
                <p className="service-price">
                  Price: {formatNumber(selectedService.price)} VND
                </p>
              </div>
            ) : (
              <p>No service selected</p>
            )}
            <div className="payment-discount-code">
              <p>Available Points: {formatNumber(availablePoints)}</p>
              <input
                type="number"
                className="payment-input"
                placeholder="Use points"
                value={usingPoint}
                onChange={(e) => handleUsePoints(e.target.value)}
                min="0"
                max={Math.min(
                  availablePoints,
                  VNDToPoint(selectedService ? selectedService.price : 0)
                )}
              />
            </div>
            <div className="payment-total">
              <p>Subtotal</p>
              <p>
                {selectedService ? formatNumber(selectedService.price) : 0} VND
              </p>
            </div>
            <div className="payment-shipping">
              <p>Points used ({usingPoint} points)</p>
              <p>-{formatNumber(pointToVND(usingPoint))} VND</p>
            </div>
            <div className="payment-grand-total">
              <p>Total</p>
              <p>
                {selectedService
                  ? formatNumber(selectedService.price - pointToVND(usingPoint))
                  : 0}{" "}
                VND
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
