import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./dashBoard.css";

const StaffProfileDashboard = () => {
  const { Id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStaff, setEditedStaff] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/staffs/${Id}`);
        setStaff(response.data);
        setEditedStaff(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching staff data:", err);
        setError("An error occurred while fetching staff data");
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [Id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedStaffData = {
        password: editedStaff.password,
        mail: editedStaff.mail,
        fullName: editedStaff.fullName,
        address: editedStaff.address,
        phone: editedStaff.phone,
      };

      const response = await axios.put(
        `http://localhost:8080/staffs/update/${Id}`,
        updatedStaffData
      );
      console.log("Update response:", response.data);

      if (response.data && response.data.staffId) {
        setStaff(response.data);
        setIsEditing(false);
        alert("Staff updated successfully");
      } else {
        alert(
          `Failed to update staff: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (err) {
      console.error("Error updating staff:", err);
      alert("An error occurred while updating the staff");
    }
  };

  const handleCancel = () => {
    setEditedStaff(staff);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await axios.delete(`http://localhost:8080/staffs/delete/${Id}`);
        alert("Staff member deleted successfully");
        navigate("/dashboard");
      } catch (err) {
        console.error("Error deleting staff member:", err);
        alert("Failed to delete staff member");
      }
    }
  };

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!staff) return <div className="dashboard-error">No staff data found</div>;

  return (
    <div className="staff-profile">
      <h2>Staff Profile</h2>
      <div className="profile-info">
        <p>
          <strong>Staff ID:</strong> {staff.staffId}
        </p>
        <p>
          <strong>Username:</strong> {staff.username}
        </p>
      </div>
      {isEditing ? (
        <div className="edit-form">
          <input
            name="mail"
            value={editedStaff.mail || ""}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            name="fullName"
            value={editedStaff.fullName || ""}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            name="address"
            value={editedStaff.address || ""}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            name="phone"
            value={editedStaff.phone || ""}
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
            <strong>Email:</strong> {staff.mail}
          </p>
          <p>
            <strong>Full Name:</strong> {staff.fullName || "Not provided"}
          </p>
          <p>
            <strong>Address:</strong> {staff.address || "Not provided"}
          </p>
          <p>
            <strong>Phone:</strong> {staff.phone || "Not provided"}
          </p>
          <p>
            <strong>Role:</strong> {staff.role || "Not assigned"}
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
            <button onClick={handleEdit} className="edit-staff-btn">
              Edit Staff
            </button>
            <button onClick={handleDelete} className="delete-staff-btn">
              Delete Staff
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffProfileDashboard;
