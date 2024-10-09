import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./dashBoard.css";

const OrderViewDashboard = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/orders/${orderId}`
        );
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to fetch order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading)
    return <div className="dashboard-loading">Loading order details...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!order) return <div className="dashboard-error">Order not found</div>;

  return (
    <div className="order-view-dashboard">
      <h1>Order Details</h1>
      <div className="order-details">
        <p>
          <strong>Order ID:</strong> {order.order_id}
        </p>
        <p>
          <strong>Customer Name:</strong> {order.customer_id.fullName}
        </p>
        <p>
          <strong>Customer Email:</strong> {order.customer_id.mail}
        </p>
        <p>
          <strong>Staff Name:</strong> {order.staff_id.fullName}
        </p>
        <p>
          <strong>Staff Role:</strong> {order.staff_id.role}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.order_date).toLocaleString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {order.end_date ? new Date(order.end_date).toLocaleString() : "N/A"}
        </p>
        <p>
          <strong>Rating:</strong> {order.rating || "N/A"}
        </p>
        <p>
          <strong>Feedback:</strong> {order.feedback || "N/A"}
        </p>
        <p>
          <strong>Feedback Date:</strong>{" "}
          {order.feedback_date
            ? new Date(order.feedback_date).toLocaleString()
            : "N/A"}
        </p>
      </div>
      <button onClick={handleBackToDashboard} className="back-to-dashboard-btn">
        Back to Dashboard
      </button>
    </div>
  );
};

export default OrderViewDashboard;
