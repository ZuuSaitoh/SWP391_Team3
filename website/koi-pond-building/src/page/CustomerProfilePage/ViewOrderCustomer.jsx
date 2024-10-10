import React from 'react';
import './ViewOrderCustomer.css';

function ViewOrderCustomer({ order, onClose }) {
  return (
    <div className="view-order-overlay">
      <div className="view-order-modal">
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> {order.order_id}</p>
        <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
        <p><strong>End Date:</strong> {order.end_date ? new Date(order.end_date).toLocaleString() : 'Not completed'}</p>
        <p><strong>Staff:</strong> {order.staff.fullName}</p>
        <p><strong>Rating:</strong> {order.rating || 'Not rated'}</p>
        <p><strong>Feedback:</strong> {order.feedback || 'No feedback provided'}</p>
        {order.feedback_date && (
          <p><strong>Feedback Date:</strong> {new Date(order.feedback_date).toLocaleString()}</p>
        )}
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
}

export default ViewOrderCustomer;
