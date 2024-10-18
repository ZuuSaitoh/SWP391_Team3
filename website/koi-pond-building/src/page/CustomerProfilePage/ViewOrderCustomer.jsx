import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import "./ViewOrderCustomer.css";
import { toast } from "react-toastify";

function ViewOrderCustomer({ order, onClose, onOrderUpdate }) {
  const [rating, setRating] = useState(order.rating || 0);
  const [feedback, setFeedback] = useState(order.feedback || "");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [contracts, setContracts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    console.log("Statuses state updated:", statuses);
  }, [statuses]);

  const fetchStatuses = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("Fetching statuses for order:", order.orderId);
      const response = await axios.get(
        `http://localhost:8080/status/fetchAll/order/${order.orderId}`
      );
      console.log("Full statuses response:", response);
      if (response.data.code === 9999) {
        console.log("Statuses fetched successfully:", response.data.result);
        setStatuses(response.data.result);
      } else {
        console.warn("Failed to fetch statuses:", response.data);
      }
    } catch (error) {
      console.error("Error fetching statuses:", error);
    } finally {
      setIsLoading(false);
    }
  }, [order.orderId]);

  useEffect(() => {
    console.log("ViewOrderCustomer useEffect triggered");
    setUpdatedOrder(order);
    setRating(order.rating || 0);
    setFeedback(order.feedback || "");

    const fetchContractsAndStatusesAndTransactions = async () => {
      try {
        console.log("Fetching contracts, statuses, and transactions");
        const [contractsResponse] = await Promise.all([
          axios.get(
            `http://localhost:8080/contracts/fetchAll/order/${order.orderId}`
          ),
          fetchStatuses(),
          fetchTransactions(), // Add this line to fetch transactions
        ]);

        console.log("Contracts response:", contractsResponse.data);
        if (contractsResponse.data.code === 9999) {
          setContracts(contractsResponse.data.result);
        } else {
          console.warn("Failed to fetch contracts");
        }
      } catch (error) {
        console.error("Error fetching contracts, statuses, and transactions:", error);
      }
    };

    fetchContractsAndStatusesAndTransactions();
  }, [order, fetchStatuses]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/transaction/fetchAll/order/${order.orderId}`);
      if (response.data.code === 9999) {
        const updatedTransactions = response.data.result.map(transaction => {
          if (transaction.depositMethod === 'vnpay' || transaction.depositMethod === 'cash') {
            handleTransactionDone(transaction);
          }
          return transaction;
        });
        setTransactions(updatedTransactions);
      } else {
        console.warn("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleTransactionDone = async (transaction) => {
    try {
      const response = await axios.put(`http://localhost:8080/transaction/update/${transaction.transactionId}`, {
        ...transaction,
        status: 'COMPLETED'
      });
      if (response.data.code === 1034) { // TRANSACTION_DONE
        toast.success(`Transaction ${transaction.transactionId} completed successfully!`);
        // You might want to update the local state or refetch transactions here
        await fetchTransactions();
      }
    } catch (error) {
      console.error("Error updating transaction status:", error);
      toast.error(`Failed to update transaction ${transaction.transactionId} status`);
    }
  };

  const handlePaymentMethodChange = async (transactionId, newMethod) => {
    try {
      let response;
      if (newMethod === 'cash') {
        response = await axios.get(`http://localhost:8080/transaction/update/payment/cash/${transactionId}`);
      } else if (newMethod === 'vnpay') {
        // Keep the existing VNPay logic
        response = await axios.post('http://localhost:8080/api/vnpay/test-payment', {
          transactionId,
          deposit: transactions.find(t => t.transactionId === transactionId)?.deposit
        });
        if (response.data.code === 6666) {
          window.open(response.data.result, '_blank');
          return; // Exit the function as we don't need to update the UI immediately for VNPay
        }
      } else {
        throw new Error('Unsupported payment method');
      }

      if (response.data.code === 7777 || response.data.code === 9999) {
        toast.success(`Payment method updated to ${newMethod}`);
        // Update the local state
        setTransactions(prevTransactions => 
          prevTransactions.map(transaction => 
            transaction.transactionId === transactionId
              ? { ...transaction, ...response.data.result }
              : transaction
          )
        );
      } else {
        toast.error("Failed to update payment method");
      }
    } catch (error) {
      console.error("Error updating payment method:", error);
      toast.error("An error occurred while updating the payment method");
    }
  };

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

  const handleAccept = async (statusId) => {
    if (!statusId) {
      console.error("Invalid status ID");
      toast.error("Invalid status ID");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending accept request for status ID:", statusId);
      const response = await axios.put(
        `http://localhost:8080/status/update-complete/${statusId}`,
        { complete: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Full status update response:", response);

      if (response.data && response.data.code === 999) {
        console.log("Status updated successfully in backend");
        // Update the local state immediately
        setStatuses((prevStatuses) => {
          const updatedStatuses = prevStatuses.map((status) =>
            status.statusId === statusId
              ? { ...status, complete: 1, checkDate: new Date().toISOString() }
              : status
          );
          console.log("Updated statuses:", updatedStatuses);
          return updatedStatuses;
        });
        toast.success("Status updated successfully");
        // Fetch the updated statuses from the server to ensure consistency
        await fetchStatuses();
      } else {
        console.warn("Unexpected response:", response.data);
        toast.error("Failed to update status: Unexpected response");
      }
    } catch (error) {
      console.error("Error updating status:", error.response || error);
      toast.error(
        `An error occurred while updating the status: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = (status) => {
    setSelectedStatus(status);
    setShowRejectModal(true);
  };

  const sendRejectEmail = async () => {
    try {
      await emailjs.send(
        "service_q4h45rc",
        "template_awodo8g",
        {
          to_email: selectedStatus.staff.mail,
          status_description: selectedStatus.statusDescription,
          reject_reason: rejectReason,
        },
        "gmuh_u6yoFuhyEb4c"
      );
      console.log("Rejection email sent successfully");
    } catch (error) {
      console.error("Error sending rejection email:", error);
    }
  };

  const handleRejectSubmit = async () => {
    if (rejectReason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }
    await sendRejectEmail();
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedStatus(null);
  };

  const handleVNPayment = async (transactionId, deposit) => {
    try {
      const response = await axios.post('http://localhost:8080/api/vnpay/test-payment', {
        transactionId,
        deposit
      });

      if (response.data.code === 6666) {
        // Open the payment URL in a new window
        const paymentWindow = window.open(response.data.result, '_blank');
        
        // Check the transaction status periodically
        const checkTransactionStatus = setInterval(async () => {
          try {
            const statusResponse = await axios.get(`http://localhost:8080/transaction/status/${transactionId}`);
            if (statusResponse.data.code === 1034) { // TRANSACTION_DONE
              clearInterval(checkTransactionStatus);
              paymentWindow.close();
              toast.success("Payment completed successfully!");
              // Refresh the transactions
              await fetchTransactions();
            }
          } catch (error) {
            console.error("Error checking transaction status:", error);
          }
        }, 5000); // Check every 5 seconds

        // Stop checking after 5 minutes (adjust as needed)
        setTimeout(() => {
          clearInterval(checkTransactionStatus);
        }, 300000);
      } else {
        toast.error("Failed to generate payment link");
      }
    } catch (error) {
      console.error("Error generating VNPay link:", error);
      toast.error("An error occurred while generating the payment link");
    }
  };

  return (
    <div className="view-order-overlay">
      <div className="view-order-modal">
        <h2>Order Details</h2>
        {console.log("Rendering order details:", updatedOrder)}
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
              <strong>Design Version:</strong>{" "}
              {updatedOrder.design.designVersion}
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

        <h3>Status Information</h3>
        {console.log("Rendering statuses:", statuses)}
        {isLoading ? (
          <p>Loading statuses...</p>
        ) : statuses.length > 0 ? (
          <div className="status-container">
            {statuses.map((status, index) => (
              <div key={status.statusId} className="status-item">
                <h4>Status {index + 1}</h4>
                <p>
                  <strong>Description:</strong> {status.statusDescription}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(status.statusDate).toLocaleString()}
                </p>
                <p>
                  <strong>Staff:</strong> {status.staff.username} (
                  {status.staff.role})
                </p>
                <p>
                  <strong>Complete:</strong> {status.complete ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Updates:</strong> {status.numberOfUpdate}
                </p>
                {status.checkDate && (
                  <p>
                    <strong>Check Date:</strong>{" "}
                    {new Date(status.checkDate).toLocaleString()}
                  </p>
                )}
                {!status.complete && (
                  <div className="status-actions">
                    <button
                      onClick={() => handleAccept(status.statusId)}
                      className="accept-btn"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(status)}
                      className="reject-btn"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No status information available</p>
        )}

        <h3>Transaction Information</h3>
        {transactions.length > 0 ? (
          <div className="transaction-container">
            {transactions.map((transaction) => (
              <div key={transaction.transactionId} className="transaction-item">
                <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                <p><strong>Deposit Amount:</strong> ${transaction.deposit}</p>
                <p><strong>Description:</strong> {transaction.depositDescription}</p>
                <p><strong>Method:</strong> {transaction.depositMethod || 'Not specified'}</p>
                <p><strong>Date:</strong> {transaction.depositDate ? new Date(transaction.depositDate).toLocaleString() : 'N/A'}</p>
                <p><strong>Deposited By:</strong> {transaction.depositPerson.fullName}</p>
                <p><strong>Transaction Number:</strong> {transaction.transactionNumber || 'N/A'}</p>
                {!transaction.depositMethod && (
                  <div>
                    <button 
                      onClick={() => handlePaymentMethodChange(transaction.transactionId, 'vnpay')}
                      className="payment-method-btn vnpay-btn"
                    >
                      Pay with VNPay
                    </button>
                    <button 
                      onClick={() => handlePaymentMethodChange(transaction.transactionId, 'cash')}
                      className="payment-method-btn cash-btn"
                    >
                      Pay with Cash
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No transaction information available</p>
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
            <button type="submit" className="submit-detail-btn">
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

        {showRejectModal && (
          <div className="reject-modal-overlay">
            <div className="reject-modal">
              <h3>Provide Rejection Reason</h3>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection"
              />
              <div className="reject-modal-actions">
                <button
                  onClick={handleRejectSubmit}
                  className="submit-detail-btn"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="cancel-reject-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewOrderCustomer;
