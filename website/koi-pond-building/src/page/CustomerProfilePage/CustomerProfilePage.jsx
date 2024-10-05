import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../config/axios"; // Make sure to use the configured axios instance
import AnimatedPage from "../animationpage/AnimatedPage";
import "./CustomerProfilePage.css";

function CustomerProfilePage() {
  const { customerId } = useParams(); // Fetch customerId from URL params
  const [customer, setCustomer] = useState(null); // Initially null before fetching
  const [isLoading, setIsLoading] = useState(true); // To show loading state
  const [isError, setIsError] = useState(false); // To show error state
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  console.log(customerId);
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/customers/${customerId}`
        );
        console.log(response.data);
        const customerData = {
          name: response.data.fullName,
          email: response.data.mail || "No email provided", // Handle null email
          phone: response.data.phone,
          address: response.data.address,
          loyaltyPoints: response.data.point,
          profilePicture: "https://via.placeholder.com/150", // Placeholder as the backend doesn't provide it
        };
        setCustomer(customerData);
        setEditedCustomer(customerData); // Set this so you can edit the customer
        setIsLoading(false); // Data fetched, no longer loading
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setIsError(true); // Set error state if fetch fails
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

  if (isLoading) {
    return <p>Loading customer data...</p>; // Simple loading message
  }

  if (isError) {
    return <p>Failed to load customer data. Please try again later.</p>; // Error message
  }

  return (
    <AnimatedPage>
      <Link to="/">hOME</Link>
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
                  <h2>Name: {customer.name}</h2>
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
            <p>Loyalty Points: {customer.loyaltyPoints}</p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default CustomerProfilePage;
