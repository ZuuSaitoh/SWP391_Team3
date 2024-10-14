import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../config/axios"; // Make sure to use the configured axios instance
import AnimatedPage from "../animationpage/AnimatedPage";
import "./CustomerProfilePage.css";
import { useNavigate } from "react-router-dom";
import ViewOrderCustomer from "./ViewOrderCustomer";

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
  const handleOrderUpdate = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === updatedOrder.orderId ? updatedOrder : order
      )
    );
  };

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
          email: response.data.mail || "No email provided", // Handle null email
          phone: response.data.phone,
          address: response.data.address,
          loyaltyPoints: response.data.point,
          profilePicture: "https://via.placeholder.com/150", // Placeholder as the backend doesn't provide it
        };
        setCustomer(customerData);
        setEditedCustomer(customerData); // Set this so you can edit the customer
        setIsLoading(false); // Data fetched, no longer loading

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
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true); // Set error state if fetch fails
      } finally {
        setIsLoading(false); // Stop loading state in case of error
      }
    };

    fetchCustomerData();
  }, [customerId]);

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
        // Note: We're not updating the profile picture or loyalty points here
      };

      const response = await axios.put(
        `/customers/update/${customerId}`,
        updatedCustomer
      );

      if (response.status === 200) {
        setCustomer(editedCustomer);
        setIsEditing(false);
        setNewProfilePicture(null);
        console.log("Customer data updated successfully:", response.data);
      } else {
        throw new Error("Failed to update customer data");
      }
    } catch (error) {
      console.error("Error updating customer data:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedCustomer(customer);
    setIsEditing(false);
    setNewProfilePicture(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
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
  };

  const handleCloseOrderView = () => {
    setSelectedOrder(null);
  };

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
      <div className="page-background">
        <div className="customer-profile-container">
          <Link to="/" className="home-link">
            <i className="fas fa-home"></i> Home
          </Link>
          <h1 className="profile-title">Customer Profile</h1>
          <div className="customer-info">
            <div className="profile-picture-container">
              <img
                src={newProfilePicture || customer.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              {isEditing && (
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
              )}
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
          <div className="order-status">
            <h3>Recent Orders</h3>
            {orders.length > 0 ? (
              <ul className="order-list">
                {orders.map((order) => (
                  <li key={order.orderId} className="order-item">
                    <div className="order-info">
                      <span className="order-id">Order #{order.orderId}</span>
                      <br />
                      <span className="order-date">
                        {new Date(order.order_date).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="view-order-button"
                    >
                      View Order
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found for this customer.</p>
            )}
          </div>
          {selectedOrder && (
            <ViewOrderCustomer
              order={selectedOrder}
              onClose={handleCloseOrderView}
              onOrderUpdate={handleOrderUpdate}
            />
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default CustomerProfilePage;
