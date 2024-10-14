import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./dashBoard.css";

const OrderViewDashboard = () => {
  const [order, setOrder] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(
          `http://localhost:8080/orders/${orderId}`
        );
        setOrder(orderResponse.data);

        const contractsResponse = await axios.get(
          `http://localhost:8080/contracts/fetchAll/order/${orderId}`
        );
        if (contractsResponse.data.code === 9999) {
          setContracts(contractsResponse.data.result);
        } else {
          console.warn("Failed to fetch contracts");
        }

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

  const handleUpdateEndDate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/orders/update-end-date/${orderId}`
      );
      if (response.data.code === 9998) {
        setOrder(response.data.result);
        toast.success("End date updated successfully");
      } else {
        toast.error("Failed to update end date");
      }
    } catch (err) {
      console.error("Error updating end date:", err);
      toast.error("An error occurred while updating the end date");
    }
  };

  const InfoRow = ({ label, value }) => (
    <div className="info-row">
      <span className="info-label">{label}:</span>
      <span className="info-value">{value}</span>
    </div>
  );

  if (loading)
    return <div className="dashboard-loading">Loading order details...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!order) return <div className="dashboard-error">Order not found</div>;

  return (
    <div className="order-view-dashboard">
      <h1>Order Details</h1>
      <div className="order-details-grid">
        <div className="info-section">
          <h2>Order Information</h2>
          <InfoRow label="ORDER ID" value={order.orderId} />
          <InfoRow
            label="ORDER DATE"
            value={new Date(order.order_date).toLocaleString()}
          />
          <InfoRow
            label="END DATE"
            value={
              order.end_date ? new Date(order.end_date).toLocaleString() : "N/A"
            }
          />
          <InfoRow label="RATING" value={order.rating || "N/A"} />
          <InfoRow label="FEEDBACK" value={order.feedback || "N/A"} />
          <InfoRow
            label="FEEDBACK DATE"
            value={
              order.feedback_date
                ? new Date(order.feedback_date).toLocaleString()
                : "N/A"
            }
          />
        </div>

        <div className="info-section">
          <h2>Customer Information</h2>
          <InfoRow label="CUSTOMER ID" value={order.customer.id} />
          <InfoRow label="USERNAME" value={order.customer.username} />
          <InfoRow label="FULL NAME" value={order.customer.fullName} />
          <InfoRow label="EMAIL" value={order.customer.mail} />
          <InfoRow label="ADDRESS" value={order.customer.address} />
          <InfoRow label="PHONE" value={order.customer.phone} />
        </div>

        <div className="info-section">
          <h2>Staff Information</h2>
          <InfoRow label="STAFF ID" value={order.staff.staffId} />
          <InfoRow label="USERNAME" value={order.staff.username} />
          <InfoRow label="EMAIL" value={order.staff.mail} />
          <InfoRow label="ROLE" value={order.staff.role} />
        </div>

        <div className="info-section">
          <h2>Design Information</h2>
          {order.design ? (
            <>
              <InfoRow label="DESIGN ID" value={order.design.designId} />
              <InfoRow label="DESIGN NAME" value={order.design.designName} />
              <InfoRow
                label="DESIGN DATE"
                value={new Date(order.design.designDate).toLocaleString()}
              />
              <InfoRow
                label="DESIGN VERSION"
                value={order.design.designVersion}
              />
              <InfoRow label="IMAGE DATA" value={order.design.imageData} />
            </>
          ) : (
            <p>No design information available</p>
          )}
        </div>

        {contracts.map((contract) => (
          <div className="info-section" key={contract.contractId}>
            <h2>Contract Information (ID: {contract.contractId})</h2>
            <InfoRow
              label="UPLOAD DATE"
              value={new Date(contract.uploadDate).toLocaleString()}
            />
            <InfoRow label="DESCRIPTION" value={contract.description} />
            <InfoRow label="IMAGE DATA" value={contract.imageData} />
          </div>
        ))}
      </div>
      <div className="button-container">
        <button
          onClick={handleBackToDashboard}
          className="back-to-dashboard-btn"
        >
          BACK TO DASHBOARD
        </button>
        <button onClick={handleUpdateEndDate} className="update-end-date-btn">
          UPDATE END DATE
        </button>
      </div>
    </div>
  );
};

export default OrderViewDashboard;
