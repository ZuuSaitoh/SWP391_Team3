import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../config/axios"; // Make sure to use the configured axios instance
import AnimatedPage from "../animationpage/AnimatedPage";
import "./CustomerProfilePage.css";
import { useNavigate } from "react-router-dom";
import ViewOrderCustomer from "./ViewOrderCustomer";
import { storage } from "../../config/firebase"; // Make sure this import is correct
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify"; // Make sure you have this import
import { ToastContainer } from "react-toastify";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons

function CustomerProfilePage() {
  const { customerId } = useParams(); // Fetch customerId from URL params
  const [customer, setCustomer] = useState(null); // Initially null before fetching
  const [isLoading, setIsLoading] = useState(true); // To show loading state
  const [isError, setIsError] = useState(false); // To show error state
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingsExpanded, setIsBookingsExpanded] = useState(false);
  const handleOrderUpdate = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === updatedOrder.orderId ? updatedOrder : order
      )
    );
  };
  const [avatarFile, setAvatarFile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [feedbackBookingId, setFeedbackBookingId] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [activeOrderTab, setActiveOrderTab] = useState("inProgress");
  const [forms, setForms] = useState([]);
  const [isFormsExpanded, setIsFormsExpanded] = useState(false);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/customers/${customerId}`
        );
        console.log(response.data);
        const customerData = {
          name: response.data.fullName,
          username: response.data.username,
          email: response.data.mail || "No email provided",
          phone: response.data.phone,
          address: response.data.address,
          loyaltyPoints: response.data.point, // Update this line to use 'point' instead of 'loyaltyPoints'
          profilePicture:
            response.data.avatar || "https://via.placeholder.com/150",
        };
        setCustomer(customerData);
        setEditedCustomer(customerData);
        setIsLoading(false);

        // Fetch customer orders
        const ordersResponse = await axios.get(
          `http://localhost:8080/orders/customer/fetchAll/${customerId}`
        );
        console.log("Orders response:", ordersResponse.data);
        // Access the orders from the result property and sort them
        const ordersList = ordersResponse.data.result || [];
        const sortedOrders = ordersList.sort(
          (a, b) => new Date(b.order_date) - new Date(a.order_date)
        );
        setOrders(sortedOrders);

        // Fetch customer bookings
        const bookingsResponse = await axios.get(
          `http://localhost:8080/bookingservices/fetchAll/customer/${customerId}`
        );
        console.log("Bookings response:", bookingsResponse.data);
        if (bookingsResponse.data.code === 9999) {
          setBookings(bookingsResponse.data.result);
        } else {
          console.warn("Failed to fetch bookings");
        }

        // Fetch customer forms
        const formsResponse = await axios.get(
          `http://localhost:8080/forms/customer/${customerId}`
        );
        console.log("Forms response:", formsResponse.data);
        if (formsResponse.data.code === 1111) {
          setForms(formsResponse.data.result);
        } else {
          console.warn("Failed to fetch forms");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true); // Set error state if fetch fails
      } finally {
        setIsLoading(false); // Stop loading state in case of error
      }
    };

    fetchCustomerData();
  }, [customerId]);

  console.log("Customer ID:", customerId);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const updatedCustomer = {
        fullName: editedCustomer.name,
        mail: editedCustomer.email,
        phone: editedCustomer.phone,
        address: editedCustomer.address,
        // Add any other fields that the API might require
      };

      console.log("Sending update request with data:", updatedCustomer);

      const response = await axios.put(
        `/customers/update/${customerId}`,
        updatedCustomer
      );

      console.log("Update response:", response);

      if (response.status === 200) {
        setCustomer({
          ...customer,
          ...updatedCustomer,
          name: updatedCustomer.fullName,
          email: updatedCustomer.mail,
        });
        setIsEditing(false);
        toast.success("Profile updated successfully");
      } else {
        throw new Error(
          `Failed to update customer data: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error updating customer data:", error.response || error);
      toast.error(
        `Failed to update profile: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedCustomer({ ...customer });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsLoading(true);
        const storageRef = ref(storage, `avatars/${customerId}_${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, file);
        const avatarUrl = await getDownloadURL(snapshot.ref);

        // Update avatar URL in the backend
        const response = await axios.put(
          `/customers/update/avatar/${customerId}`,
          { avatar: avatarUrl }
        );

        if (response.status === 200) {
          setCustomer((prevCustomer) => ({
            ...prevCustomer,
            profilePicture: avatarUrl,
          }));
          setNewProfilePicture(avatarUrl);
          toast.success("Avatar updated successfully"); // This will show the notification immediately
        } else {
          throw new Error("Failed to update avatar");
        }
      } catch (error) {
        console.error("Error updating avatar:", error);
        toast.error("Failed to update avatar. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const handleChangePassword = () => {
    // Implement password change logic here
    console.log("Change password clicked");
    navigate("/change-password");
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseOrderView = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const handleFeedbackSubmit = async (bookingId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/bookingservices/updateFeedback/${bookingId}`,
        { feedback: feedbackText }
      );
      if (response.data.code === 1000) {
        toast.success("Feedback submitted successfully");
        setBookings(
          bookings.map((booking) =>
            booking.bookingServiceId === bookingId
              ? response.data.result
              : booking
          )
        );
        setFeedbackBookingId(null);
        setFeedbackText("");
      } else {
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred while submitting feedback");
    }
  };

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderBookings = () => (
    <div className="customer-bookings">
      <div
        className="bookings-header"
        onClick={() => setIsBookingsExpanded(!isBookingsExpanded)}
      >
        <h3>Bookings</h3>
        {isBookingsExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isBookingsExpanded &&
        (bookings.length > 0 ? (
          <ul className="booking-list">
            {[...bookings].reverse().map((booking) => (
              <li key={booking.bookingServiceId} className="booking-item">
                <div className="booking-info">
                  <div className="booking-main-info">
                    <div className="booking-details">
                      <span className="booking-id">
                        Booking #{booking.bookingServiceId}
                      </span>
                      <span className="booking-service">
                        {booking.service.serviceName}
                      </span>
                      <div className="booking-dates">
                        <span className="booking-date">
                          <i className="far fa-calendar-alt"></i> Start:{" "}
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </span>
                        <span className="booking-date">
                          <i className="far fa-calendar-check"></i> Finish:{" "}
                          {booking.finishDate
                            ? new Date(booking.finishDate).toLocaleDateString()
                            : "Not set"}
                        </span>
                      </div>
                    </div>
                    <span className="booking-price">
                      {formatCurrency(booking.price)} VND
                    </span>
                  </div>
                  <span
                    className={`booking-status ${
                      booking.status ? "completed" : "pending"
                    }`}
                  >
                    {booking.status ? "Completed" : "Pending"}
                  </span>
                  {booking.feedback && (
                    <div className="booking-feedback">
                      <strong>Feedback:</strong> {booking.feedback}
                    </div>
                  )}
                </div>
                <div className="booking-actions">
                  {booking.status && !booking.feedback && (
                    <button
                      className="feedback-btn"
                      onClick={() =>
                        setFeedbackBookingId(booking.bookingServiceId)
                      }
                    >
                      Leave Feedback
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found for this customer.</p>
        ))}
      {feedbackBookingId && (
        <div className="feedback-modal">
          <h4>Leave Feedback</h4>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Enter your feedback here..."
          />
          <div className="feedback-actions">
            <button onClick={() => handleFeedbackSubmit(feedbackBookingId)}>
              Submit
            </button>
            <button onClick={() => setFeedbackBookingId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );

  const filterOrders = (orders) => {
    const currentDate = new Date();
    return {
      inProgress: orders.filter(
        (order) => !order.end_date || new Date(order.end_date) > currentDate
      ),
      completed: orders.filter(
        (order) => order.end_date && new Date(order.end_date) <= currentDate
      ),
    };
  };

  const renderOrders = () => {
    const { inProgress, completed } = filterOrders(orders);

    return (
      <div className="order-status">
        <h3>Recent Orders</h3>
        <div className="order-tabs">
          <button
            className={`tab-button ${
              activeOrderTab === "inProgress" ? "active" : ""
            }`}
            onClick={() => setActiveOrderTab("inProgress")}
          >
            In Progress ({inProgress.length})
          </button>
          <button
            className={`tab-button ${
              activeOrderTab === "completed" ? "active" : ""
            }`}
            onClick={() => setActiveOrderTab("completed")}
          >
            Completed ({completed.length})
          </button>
        </div>

        <div className="order-content">
          {orders.length > 0 ? (
            <ul className="order-list">
              {(activeOrderTab === "inProgress" ? inProgress : completed).map(
                (order) => (
                  <li key={order.orderId} className="order-item">
                    <div className="order-info">
                      <span className="order-id">Order #{order.orderId}</span>
                      <br />
                      <span className="order-date">
                        Order Date:{" "}
                        {new Date(order.order_date).toLocaleDateString()}
                      </span>
                      {order.end_date && (
                        <>
                          <br />
                          <span className="end-date">
                            End Date:{" "}
                            {new Date(order.end_date).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="view-order-button"
                    >
                      View Order
                    </button>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>No orders found for this customer.</p>
          )}
        </div>
      </div>
    );
  };

  const renderForms = () => (
    <div className="customer-forms">
      <div
        className="forms-header"
        onClick={() => setIsFormsExpanded(!isFormsExpanded)}
      >
        <h3>Service Requests</h3>
        {isFormsExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isFormsExpanded &&
        (forms.length > 0 ? (
          <ul className="form-list">
            {forms.map((form) => (
              <li key={form.formId} className="form-item">
                <div className="form-info">
                  <div className="form-main-info">
                    <div className="form-details">
                      <span className="form-id">Request #{form.formId}</span>
                      <span className="form-area">
                        <i className="fas fa-ruler-combined"></i> Area:{" "}
                        {form.area}
                      </span>
                      <span className="form-style">
                        <i className="fas fa-paint-brush"></i> Style:{" "}
                        {form.style}
                      </span>
                      <span className="form-stage">
                        <i className="fas fa-tasks"></i> Stage: {form.stage}
                      </span>
                      <span className="form-contact">
                        <i className="fas fa-comments"></i> Contact via:{" "}
                        {form.contactMethod}
                      </span>
                    </div>
                    <span
                      className={`form-status ${form.stage
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {form.stage}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No service requests found.</p>
        ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loader"></div>Loading customer data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error">
        <i className="fas fa-exclamation-triangle"></i> Failed to load customer
        data. Please try again later.
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className={`page-background ${isModalOpen ? "no-scroll" : ""}`}>
        <div className="customer-profile-container">
          <Link to="/" className="home-link">
            <i className="fas fa-home"></i> Home
          </Link>
          <h1 className="profile-title">Customer Profile</h1>
          <div className="customer-info">
            <div className="profile-picture-container">
              <img
                src={
                  customer.profilePicture || "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="profile-picture"
              />
              <div className="profile-picture-upload">
                <label
                  htmlFor="profile-picture-input"
                  className="profile-picture-label"
                >
                  <i className="fas fa-camera"></i> Change Picture
                </label>
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="profile-picture-input"
                />
              </div>
            </div>
            <div className="customer-details">
              {isEditing ? (
                <>
                  <input
                    name="name"
                    value={editedCustomer.name}
                    onChange={handleChange}
                    className="edit-input"
                    placeholder="Name"
                  />
                  <input
                    name="phone"
                    value={editedCustomer.phone}
                    onChange={handleChange}
                    className="edit-input"
                    placeholder="Phone"
                  />
                  <input
                    name="address"
                    value={editedCustomer.address}
                    onChange={handleChange}
                    className="edit-input"
                    placeholder="Address"
                  />
                </>
              ) : (
                <>
                  <h2>{customer.name}</h2>
                  <p>
                    <i className="fas fa-user"></i> {customer.username}
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i> {customer.email}
                  </p>
                  <p>
                    <i className="fas fa-phone"></i> {customer.phone}
                  </p>
                  <p>
                    <i className="fas fa-map-marker-alt"></i> {customer.address}
                  </p>
                </>
              )}
            </div>
          </div>
          {isEditing ? (
            <div className="edit-buttons">
              <button onClick={handleSave} className="save-button">
                <i className="fas fa-save"></i> Save
              </button>
              <button onClick={handleCancel} className="cancel-button">
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          ) : (
            <div className="profile-buttons">
              <button onClick={handleEdit} className="edit-button">
                <i className="fas fa-edit"></i> Edit Profile
              </button>
              <button
                onClick={handleChangePassword}
                className="change-password-button"
              >
                <i className="fas fa-key"></i> Change Password
              </button>
            </div>
          )}
          <div className="customer-stats">
            <h3>Customer Statistics</h3>
            <div className="stats-container">
              <div className="stat-item">
                <i className="fas fa-star"></i>
                <span className="stat-value">{customer.loyaltyPoints}</span>
                <span className="stat-label">Loyalty Points</span>
              </div>
              {/* Add more stat items here if needed */}
            </div>
          </div>
          {renderBookings()}

          {renderOrders()}

          {selectedOrder && (
            <ViewOrderCustomer
              order={selectedOrder}
              onClose={handleCloseOrderView}
              onOrderUpdate={handleOrderUpdate}
            />
          )}
          {renderForms()}
          <ToastContainer />
        </div>
      </div>
    </AnimatedPage>
  );
}

export default CustomerProfilePage;
