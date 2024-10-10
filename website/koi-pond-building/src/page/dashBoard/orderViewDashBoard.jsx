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

  const InfoRow = ({ label, value }) => (
    <div className="info-row">
      <span className="info-label">{label}:</span>
      <span className="info-value">{value}</span>
    </div>
  );

  return (
    <div className="order-view-dashboard">
      <h1>Order Details</h1>
      <div className="order-details-grid">
        <div className="order-section">
          <h2>Order Information</h2>
          <InfoRow label="ORDER ID" value={order.order_id} />
          <InfoRow label="ORDER DATE" value={new Date(order.order_date).toLocaleString()} />
          <InfoRow label="END DATE" value={order.end_date ? new Date(order.end_date).toLocaleString() : "N/A"} />
          <InfoRow label="RATING" value={order.rating || "N/A"} />
          <InfoRow label="FEEDBACK" value={order.feedback || "N/A"} />
          <InfoRow label="FEEDBACK DATE" value={order.feedback_date ? new Date(order.feedback_date).toLocaleString() : "N/A"} />
        </div>

        <div className="customer-section">
          <h2>Customer Information</h2>
          <InfoRow label="CUSTOMER ID" value={order.customer.id} />
          <InfoRow label="USERNAME" value={order.customer.username} />
          <InfoRow label="FULL NAME" value={order.customer.fullName} />
          <InfoRow label="EMAIL" value={order.customer.mail} />
          <InfoRow label="ADDRESS" value={order.customer.address} />
          <InfoRow label="PHONE" value={order.customer.phone} />
          <InfoRow label="POINTS" value={order.customer.point} />
        </div>

        <div className="staff-section">
          <h2>Staff Information</h2>
          <InfoRow label="STAFF ID" value={order.staff.staffId} />
          <InfoRow label="USERNAME" value={order.staff.username} />
          <InfoRow label="FULL NAME" value={order.staff.fullName} />
          <InfoRow label="EMAIL" value={order.staff.mail} />
          <InfoRow label="ADDRESS" value={order.staff.address} />
          <InfoRow label="PHONE" value={order.staff.phone} />
          <InfoRow label="ROLE" value={order.staff.role} />
        </div>

        <div className="design-section">
          <InfoRow label="DESIGN ID" value={order.design_id || "N/A"} />
        </div>
      </div>
      <button onClick={handleBackToDashboard} className="back-to-dashboard-btn">
        Back to Dashboard
      </button>
    </div>
  );
};

export default OrderViewDashboard;
