import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "./dashBoard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faExchangeAlt,
  faArrowLeft,
  faUserPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ViewBookingDashboard = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionCreated, setTransactionCreated] = useState(false);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bookingservices/${bookingId}`
        );
        if (response.data) {
          setBooking(response.data);
        } else {
          setError("Failed to fetch booking details");
        }
      } catch (err) {
        console.error("Error fetching booking details:", err);
        setError("An error occurred while fetching booking details");
      } finally {
        setLoading(false);
      }
    };

    const fetchStaffs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/staffs/fetchAll"
        );
        if (response.data.code === 9999) {
          setStaffs(response.data.result);
        } else {
          console.warn("Failed to fetch staffs");
        }
      } catch (err) {
        console.error("Error fetching staffs:", err);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/serviceTransaction/fetchAll`
        );
        if (response.data.code === 9999) {
          setTransactions(response.data.result);
        } else {
          console.warn("Failed to fetch transactions");
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchBookingDetails();
    fetchStaffs();
    fetchTransactions();
  }, [bookingId]);

  const handleStatusChange = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/bookingservices/updateStatus/${bookingId}`
      );
      if (response.data.code === 1000) {
        setBooking(response.data.result);
        toast.success("Booking status updated successfully");
      } else {
        toast.error("Failed to update booking status");
      }
    } catch (err) {
      console.error("Error updating booking status:", err);
      toast.error("An error occurred while updating booking status");
    }
  };

  const handleAssignStaff = async () => {
    if (!selectedStaffId) {
      toast.error("Please select a staff member");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/bookingservices/update/staff/${bookingId}`,
        { staffId: selectedStaffId }
      );
      if (response.data.code === 1000) {
        setBooking(response.data.result);
        toast.success("Staff assigned successfully");
      } else {
        toast.error("Failed to assign staff");
      }
    } catch (err) {
      console.error("Error assigning staff:", err);
      toast.error("An error occurred while assigning staff");
    }
  };

  const handleDeleteBooking = async () => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/bookingservices/delete/${bookingId}`
        );
        if (response.data.code === 9876) {
          toast.success("Booking deleted successfully");
          navigate("/dashboard"); // Navigate back to the dashboard
        } else {
          toast.error("Failed to delete booking");
        }
      } catch (err) {
        console.error("Error deleting booking:", err);
        toast.error("An error occurred while deleting the booking");
      }
    }
  };

  const handleCreateCashTransaction = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/serviceTransaction/create/cash`,
        { bookingServiceId: bookingId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.code === 2222) {
        toast.success("Transaction created successfully");
        setTransactions([...transactions, response.data.result]);
        setTransactionCreated(true);
      } else if (response.data.code === 1035) {
        toast.warning("Transaction has already been paid");
        setTransactionCreated(true);
      } else {
        console.error("Unexpected response:", response.data);
        toast.error(
          `Failed to create transaction: ${
            response.data.message || "Unknown error"
          }`
        );
      }
    } catch (err) {
      console.error("Error creating transaction:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
        if (err.response.data.message === "Transaction has been pay!") {
          toast.warning("Transaction has already been paid");
          setTransactionCreated(true);
        } else {
          toast.error(
            `Error: ${err.response.data.message || err.response.statusText}`
          );
        }
      } else if (err.request) {
        console.error("Request:", err.request);
        toast.error("No response received from the server");
      } else {
        console.error("Error message:", err.message);
        toast.error(`An error occurred: ${err.message}`);
      }
    }
  };

  const handleViewTransaction = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/serviceTransaction/${bookingId}`
      );
      if (response.data.code === 9999) {
        setTransaction(response.data.result);
        setShowTransactionModal(true);
      } else {
        toast.error("Failed to fetch transaction details");
      }
    } catch (err) {
      console.error("Error fetching transaction:", err);
      toast.error("An error occurred while fetching transaction details");
    }
  };

  const TransactionModal = ({ transaction, onClose }) => {
    if (!transaction) return null;

    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Transaction Information</h2>
          <div className="status-item">
            <InfoRow label="Transaction ID" value={transaction.transactionId} />
            <InfoRow label="Deposit Method" value={transaction.depositMethod} />
            <InfoRow
              label="Deposit Date"
              value={new Date(transaction.depositDate).toLocaleString()}
            />
            <InfoRow
              label="Deposit Person"
              value={transaction.depositPerson.username}
            />
            <InfoRow
              label="Booking ID"
              value={transaction.bookingService.bookingServiceId}
            />
            <InfoRow
              label="Service"
              value={transaction.bookingService.service.serviceName}
            />
            <InfoRow
              label="Price"
              value={`$${transaction.bookingService.price.toFixed(2)}`}
            />
          </div>
          <button onClick={onClose} className="close-modal-btn">
            Close
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!booking) return <div className="not-found">Booking not found</div>;

  return (
    <div className="staff-profile">
      <ToastContainer />
      <h2>Booking Details</h2>
      <div className="profile-info">
        <p>
          <strong>Booking ID:</strong> {booking.bookingServiceId}
        </p>
        <p>
          <strong>Customer:</strong> {booking.customer.username}
        </p>
        <p>
          <strong>Service:</strong> {booking.service.serviceName}
        </p>
        <p>
          <strong>Price:</strong> ${booking.price.toFixed(2)}
        </p>
        <p>
          <strong>Booking Date:</strong>{" "}
          {new Date(booking.bookingDate).toLocaleString()}
        </p>
        <p>
          <strong>Status:</strong> {booking.status ? "Completed" : "Pending"}
        </p>
        <p>
          <strong>Using Points:</strong> {booking.usingPoint}
        </p>
        {booking.staff && (
          <p>
            <strong>Assigned Staff:</strong> {booking.staff.username}
          </p>
        )}
        {booking.finishDate && (
          <p>
            <strong>Finish Date:</strong>{" "}
            {new Date(booking.finishDate).toLocaleString()}
          </p>
        )}
        {booking.feedback && (
          <div>
            <p>
              <strong>Feedback:</strong> {booking.feedback}
            </p>
            <p>
              <strong>Feedback Date:</strong>{" "}
              {new Date(booking.feedbackDate).toLocaleString()}
            </p>
          </div>
        )}
      </div>
      <div className="profile-actions">
        <button
          onClick={() => navigate("/dashboard")}
          className="action-btn back-btn"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
        </button>
        {!booking.staff && (
          <div className="assign-staff">
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
            >
              <option value="">Select a staff member</option>
              {staffs.map((staff) => (
                <option key={staff.staffId} value={staff.staffId}>
                  {staff.username} ({staff.role})
                </option>
              ))}
            </select>
            <button
              onClick={handleAssignStaff}
              className="action-btn assign-btn"
            >
              <FontAwesomeIcon icon={faUserPlus} /> Assign Staff
            </button>
          </div>
        )}
        <button onClick={handleDeleteBooking} className="action-btn delete-btn">
          <FontAwesomeIcon icon={faTrash} /> Delete Booking
        </button>
        <button
          onClick={handleCreateCashTransaction}
          className="action-btn create-transaction-btn"
          disabled={transactionCreated}
        >
          <FontAwesomeIcon icon={faMoneyBillWave} />
          {transactionCreated
            ? "Transaction Created"
            : "Create Cash Transaction"}
        </button>
        <button
          onClick={handleViewTransaction}
          className="action-btn view-transaction-btn"
        >
          <FontAwesomeIcon icon={faExchangeAlt} /> View Transaction
        </button>
      </div>
      {showTransactionModal && (
        <TransactionModal
          transaction={transaction}
          onClose={() => setShowTransactionModal(false)}
        />
      )}
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="info-row">
    <span className="info-label">{label}:</span>
    <span className="info-value">{value}</span>
  </div>
);

export default ViewBookingDashboard;
