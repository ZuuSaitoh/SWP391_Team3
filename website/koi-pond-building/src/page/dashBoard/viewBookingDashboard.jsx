import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./dashBoard.css";

const ViewBookingDashboard = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const { bookingId } = useParams();
  const navigate = useNavigate();

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

    fetchBookingDetails();
    fetchStaffs();
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!booking) return <div className="not-found">Booking not found</div>;

  return (
    <div className="staff-profile">
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
          className="back-to-dashboard-btn"
        >
          Back to Dashboard
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
            <button onClick={handleAssignStaff} className="edit-staff-btn">
              Assign Staff
            </button>
          </div>
        )}
        <button onClick={handleDeleteBooking} className="delete-staff-btn">
          Delete Booking
        </button>
      </div>
    </div>
  );
};

export default ViewBookingDashboard;
