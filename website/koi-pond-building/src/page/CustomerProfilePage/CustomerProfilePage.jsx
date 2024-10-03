import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";
import "./CustomerProfilePage.css";

// Mock customer data
const mockCustomer = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA 12345",
  profilePicture: "https://via.placeholder.com/150",
  totalOrders: 15,
  loyaltyPoints: 500,
  memberSince: "2022-01-01",
  recentOrders: [
    { id: "001", date: "2023-05-15", total: 150.0, status: "Delivered" },
    { id: "002", date: "2023-04-30", total: 89.99, status: "Shipped" },
    { id: "003", date: "2023-04-15", total: 210.5, status: "Processing" },
  ],
};

function CustomerProfilePage() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(mockCustomer);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedCustomer = { ...editedCustomer };
    if (newProfilePicture) {
      updatedCustomer.profilePicture = newProfilePicture;
    }
    setCustomer(updatedCustomer);
    setIsEditing(false);
    setNewProfilePicture(null);
    console.log("Saving customer data:", updatedCustomer);
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

  return (
    <AnimatedPage>
      <div className="page-background">
        <div className="customer-profile-container">
          <h1>Customer Profile</h1>
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
                    Change Picture
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
                  />
                  <input
                    name="email"
                    value={editedCustomer.email}
                    onChange={handleChange}
                    className="edit-input"
                  />
                  <input
                    name="phone"
                    value={editedCustomer.phone}
                    onChange={handleChange}
                    className="edit-input"
                  />
                  <input
                    name="address"
                    value={editedCustomer.address}
                    onChange={handleChange}
                    className="edit-input"
                  />
                </>
              ) : (
                <>
                  <h2>{customer.name}</h2>
                  <p>Email: {customer.email}</p>
                  <p>Phone: {customer.phone}</p>
                  <p>Address: {customer.address}</p>
                </>
              )}
            </div>
          </div>
          {isEditing ? (
            <div className="edit-buttons">
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleEdit} className="edit-button">
              Edit Profile
            </button>
          )}
          <div className="customer-stats">
            <h3>Customer Statistics</h3>
            <p>Total Orders: {customer.totalOrders}</p>
            <p>Loyalty Points: {customer.loyaltyPoints}</p>
            <p>
              Member Since:{" "}
              {new Date(customer.memberSince).toLocaleDateString()}
            </p>
          </div>
          <div className="recent-orders">
            <h3>Recent Orders</h3>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customer.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default CustomerProfilePage;
