import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dashBoard.css";
import CustomerProfileDashboard from "./customerProfileDashBoard";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState("customers");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const navigate = useNavigate();
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    username: "",
    password: "",
    confirm_password: "",
    mail: "",
  });

  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    username: "",
    password: "",
    confirm_password: "",
    mail: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersResponse, staffsResponse] = await Promise.all([
          axios.get("http://localhost:8080/customers/fetchAll"),
          axios.get("http://localhost:8080/staffs/fetchAll"),
        ]);

        console.log("Customers response:", customersResponse.data);
        console.log("Staffs response:", staffsResponse.data);

        if (customersResponse.data.code === 9999) {
          setCustomers(customersResponse.data.result);
          console.log("Customers set:", customersResponse.data.result);
        } else {
          setError("Failed to fetch customers");
        }

        if (staffsResponse.data.code === 9999) {
          setStaffs(staffsResponse.data.result);
          console.log("Staffs set:", staffsResponse.data.result);
        } else {
          setError("Failed to fetch staffs");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Rendering dashboard. Customers:", customers);
  console.log("Rendering dashboard. Staffs:", staffs);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  const handleViewProfile = (customerId) => {
    navigate(`/customer/${customerId}`);
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (newCustomer.password !== newCustomer.confirm_password) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/customers/create",
        newCustomer
      );
      if (response.data.code === 1000) {
        alert("Customer created successfully");
        setCustomers([...customers, response.data.result]);
        setShowAddCustomerForm(false);
        setNewCustomer({
          username: "",
          password: "",
          confirm_password: "",
          mail: "",
        });
      } else {
        alert("Failed to create customer");
      }
    } catch (err) {
      console.error("Error creating customer:", err);
      alert("An error occurred while creating the customer");
    }
  };

  const handleViewStaffProfile = (staffId) => {
    navigate(`/staff/${staffId}`);
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (newStaff.password !== newStaff.confirm_password) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/staffs/create",
        newStaff
      );
      if (response.data.code === 1000) {
        alert("Staff created successfully");
        setStaffs([...staffs, response.data.result]);
        setShowAddStaffForm(false);
        setNewStaff({
          username: "",
          password: "",
          confirm_password: "",
          mail: "",
          role: "",
        });
      } else {
        alert("Failed to create staff");
      }
    } catch (err) {
      console.error("Error creating staff:", err);
      alert("An error occurred while creating the staff");
    }
  };

  const renderAddCustomerForm = () => (
    <div className="add-customer-form">
      <h2>Add New Customer</h2>
      <form onSubmit={handleAddCustomer}>
        <input
          type="text"
          placeholder="Username"
          value={newCustomer.username}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, username: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newCustomer.password}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, password: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={newCustomer.confirm_password}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, confirm_password: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.mail}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, mail: e.target.value })
          }
          required
        />
        <button type="submit">Create Customer</button>
        <button type="button" onClick={() => setShowAddCustomerForm(false)}>
          Cancel
        </button>
      </form>
    </div>
  );

  const renderAddStaffForm = () => (
    <div className="add-staff-form">
      <h2>Add New Staff</h2>
      <form onSubmit={handleAddStaff}>
        <input
          type="text"
          placeholder="Username"
          value={newStaff.username}
          onChange={(e) =>
            setNewStaff({ ...newStaff, username: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newStaff.password}
          onChange={(e) =>
            setNewStaff({ ...newStaff, password: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={newStaff.confirm_password}
          onChange={(e) =>
            setNewStaff({ ...newStaff, confirm_password: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newStaff.mail}
          onChange={(e) => setNewStaff({ ...newStaff, mail: e.target.value })}
          required
        />
        <select
          value={newStaff.role}
          onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Design Staff">Design Staff</option>
          <option value="Construction Staff">Construction Staff</option>
          <option value="Consulting Staff">Consulting Staff</option>
        </select>
        <button type="submit">Create Staff</button>
        <button type="button" onClick={() => setShowAddStaffForm(false)}>
          Cancel
        </button>
      </form>
    </div>
  );

  const renderCustomers = () => (
    <div className="table-container">
      <button
        onClick={() => setShowAddCustomerForm(true)}
        className="add-customer-btn"
      >
        Add New Customer
      </button>
      {showAddCustomerForm && renderAddCustomerForm()}
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .sort((a, b) => a.id - b.id)
            .map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.username}</td>
                <td>{customer.fullName}</td>
                <td>{customer.mail}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                <td>{customer.point}</td>
                <td>
                  <button
                    onClick={() => handleViewProfile(customer.id)}
                    className="view-profile-btn"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderStaffs = () => (
    <div className="table-container">
      <button
        onClick={() => setShowAddStaffForm(true)}
        className="add-staff-btn"
      >
        Add New Staff
      </button>
      {showAddStaffForm && renderAddStaffForm()}
      <table className="data-table">
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff) => (
            <tr key={staff.staffId}>
              <td>{staff.staffId}</td>
              <td>{staff.username}</td>
              <td>{staff.fullName}</td>
              <td>{staff.mail}</td>
              <td>{staff.address}</td>
              <td>{staff.phone}</td>
              <td>{staff.role || "N/A"}</td>
              <td>
                <button
                  onClick={() => handleViewStaffProfile(staff.staffId)}
                  className="view-profile-btn"
                >
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="sidebar">
        <button
          className={`sidebar-button ${
            activeView === "customers" ? "active" : ""
          }`}
          onClick={() => setActiveView("customers")}
        >
          Customers
        </button>
        <button
          className={`sidebar-button ${
            activeView === "staffs" ? "active" : ""
          }`}
          onClick={() => setActiveView("staffs")}
        >
          Staffs
        </button>
      </div>
      <div className="main-content">
        <h1>
          {activeView === "customers"
            ? "Customer Dashboard"
            : "Staff Dashboard"}
        </h1>
        <div className="table-container">
          {activeView === "customers" ? renderCustomers() : renderStaffs()}
        </div>
        {selectedCustomerId && (
          <CustomerProfileDashboard customerId={selectedCustomerId} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
