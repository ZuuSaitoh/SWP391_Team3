import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./dashBoard.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerProfileDashboard = () => {
  const { Id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const navigate = useNavigate();

  //fetch customer data
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/customers/${Id}`
        );
        setCustomer(response.data);
        setEditedCustomer(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching customer data:", err);
        setError("An error occurred while fetching customer data");
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [Id]);

  //delete customer
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:8080/customers/delete/${Id}`);
        toast.success("Customer deleted successfully");
        navigate("/dashboard");
      } catch (err) {
        console.error("Error deleting customer:", err);
        toast.error("Failed to delete customer");
      }
    }
  };

  //edit customer
  const handleEdit = () => {
    setIsEditing(true);
  };

  //save edit
  const handleSave = async () => {
    try {
      const updatedCustomerData = {
        fullName: editedCustomer.fullName,
        address: editedCustomer.address,
        phone: editedCustomer.phone,
      };

      const response = await axios.put(
        `http://localhost:8080/customers/update/${Id}`,
        updatedCustomerData
      );
      // console.log("Update response:", response.data); // Log the response for debugging

      // Check if the response contains updated customer data
      if (response.data && response.data.id) {
        setCustomer(response.data);
        setIsEditing(false);
        toast.success("Customer updated successfully");
      } else if (response.data && response.data.code === 1000) {
        // If the API returns a success code but no data, fetch the updated customer data
        const updatedCustomerResponse = await axios.get(
          `http://localhost:8080/customers/${Id}`
        );
        setCustomer(updatedCustomerResponse.data);
        setIsEditing(false);
        toast.success("Customer updated successfully");
      } else {
        toast.error(
          `Failed to update customer: ${
            response.data.message || "Unknown error"
          }`
        );
      }
    } catch (err) {
      console.error("Error updating customer:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        toast.error(
          `Failed to update customer: ${
            err.response.data.message || err.response.statusText
          }`
        );
      } else if (err.request) {
        console.error("Error request:", err.request);
        toast.error(
          "Failed to update customer: No response received from server"
        );
      } else {
        console.error("Error message:", err.message);
        toast.error(`Failed to update customer: ${err.message}`);
      }
    }
  };

  //cancel edit
  const handleCancel = () => {
    setEditedCustomer(customer);
    setIsEditing(false);
  };

  //handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  //render loading
  if (loading) return <div className="dashboard-loading">Loading...</div>;
  //render error
  if (error) return <div className="dashboard-error">{error}</div>;
  //render no customer data found
  if (!customer)
    return <div className="dashboard-error">No customer data found</div>;

  return (
    <div className="customer-profile">
      <h2>Customer Profile</h2>
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="profile-info">
        <p>
          <strong>ID:</strong> {customer.id}
        </p>
        <p>
          <strong>Username:</strong> {customer.username}
        </p>
        <p>
          <strong>Email:</strong> {customer.mail}
        </p>
      </div>
      {isEditing ? (
        <div className="edit-form">
          <input
            name="fullName"
            value={editedCustomer.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            name="address"
            value={editedCustomer.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            name="phone"
            value={editedCustomer.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-info">
          <p>
            <strong>Full Name:</strong> {customer.fullName}
          </p>
          <p>
            <strong>Address:</strong> {customer.address}
          </p>
          <p>
            <strong>Phone:</strong> {customer.phone}
          </p>
          <p>
            <strong>Points:</strong> {customer.point}
          </p>
        </div>
      )}
      <div className="profile-actions">
        <button
          onClick={() => navigate("/dashboard")}
          className="back-to-dashboard-btn"
        >
          Back to Dashboard
        </button>
        {!isEditing && (
          <>
            <button onClick={handleEdit} className="edit-customer-btn">
              Edit Customer
            </button>
            <button onClick={handleDelete} className="delete-customer-btn">
              Delete Customer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerProfileDashboard;
