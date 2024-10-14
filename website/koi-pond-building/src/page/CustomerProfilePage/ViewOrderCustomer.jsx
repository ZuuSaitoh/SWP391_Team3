import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewOrderCustomer.css";

function ViewOrderCustomer({ order, onClose, onOrderUpdate }) {
  const [rating, setRating] = useState(order.rating || 0);
  const [feedback, setFeedback] = useState(order.feedback || "");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    setUpdatedOrder(order);
    setRating(order.rating || 0);
    setFeedback(order.feedback || "");

    const fetchContracts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/contracts/fetchAll/order/${order.orderId}`
        );
        if (response.data.code === 9999) {
          setContracts(response.data.result);
        } else {
          console.warn("Failed to fetch contracts");
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchContracts();
  }, [order]);

  const renderStars = (count, onStarClick) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= count ? "star filled" : "star"}
          onClick={() => onStarClick && onStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedback.length <= 5) {
      alert("Feedback must be more than 5 characters long.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/orders/update-rating-and-feedback/${order.orderId}`,
        { rating, feedback }
      );
      if (response.data.code === 9997) {
        const newUpdatedOrder = {
          ...updatedOrder,
          rating: rating,
          feedback: feedback,
          feedback_date: new Date().toISOString(),
        };
        setUpdatedOrder(newUpdatedOrder);
        setIsEditing(false);
        if (onOrderUpdate) {
          onOrderUpdate(newUpdatedOrder);
        }
        alert("Rating and feedback updated successfully");
      } else {
        console.warn("Unexpected response:", response.data);
        alert("An error occurred while updating rating and feedback");
      }
    } catch (error) {
      console.error("Error updating rating and feedback:", error);
      alert("An error occurred while updating rating and feedback");
    }
  };

  return (
    <div className="view-order-overlay">
      <div className="view-order-modal">
        <h2>Order Details</h2>
        <p>
          <strong>Order ID:</strong> {updatedOrder.orderId}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(updatedOrder.order_date).toLocaleString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {updatedOrder.end_date
            ? new Date(updatedOrder.end_date).toLocaleString()
            : "Not completed"}
        </p>
        <p>
          <strong>Staff:</strong> {updatedOrder.staff.fullName}
        </p>

        <h3>Design Information</h3>
        {updatedOrder.design ? (
          <>
            <p>
              <strong>Design ID:</strong> {updatedOrder.design.designId}
            </p>
            <p>
              <strong>Design Name:</strong> {updatedOrder.design.designName}
            </p>
            <p>
              <strong>Design Date:</strong>{" "}
              {new Date(updatedOrder.design.designDate).toLocaleString()}
            </p>
            <p>
              <strong>Design Version:</strong> {updatedOrder.design.designVersion}
            </p>
            <p>
              <strong>Image Data:</strong> {updatedOrder.design.imageData}
            </p>
          </>
        ) : (
          <p>No design information available</p>
        )}

        <h3>Contract Information</h3>
        {contracts.length > 0 ? (
          contracts.map((contract) => (
            <div key={contract.contractId}>
              <p>
                <strong>Contract ID:</strong> {contract.contractId}
              </p>
              <p>
                <strong>Upload Date:</strong>{" "}
                {new Date(contract.uploadDate).toLocaleString()}
              </p>
              <p>
                <strong>Description:</strong> {contract.description}
              </p>
              <p>
                <strong>Image Data:</strong> {contract.imageData}
              </p>
            </div>
          ))
        ) : (
          <p>No contract information available</p>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <p>
              <strong>Rating:</strong> {renderStars(rating, setRating)}
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback"
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p>
              <strong>Rating:</strong> {renderStars(updatedOrder.rating)}
            </p>
            <p>
              <strong>Feedback:</strong>{" "}
              {updatedOrder.feedback || "No feedback provided"}
            </p>
            {updatedOrder.feedback_date && (
              <p>
                <strong>Feedback Date:</strong>{" "}
                {new Date(updatedOrder.feedback_date).toLocaleString()}
              </p>
            )}
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit Rating & Feedback
            </button>
          </>
        )}

        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewOrderCustomer;
