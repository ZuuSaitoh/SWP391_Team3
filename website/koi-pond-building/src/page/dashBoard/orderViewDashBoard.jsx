import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./dashBoard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const OrderViewDashboard = () => {
  const [order, setOrder] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCreateStatusModal, setShowCreateStatusModal] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [newStatus, setNewStatus] = useState({
    statusDescription: "",
    staffId: "",
  });
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [currentStaffId, setCurrentStaffId] = useState(null);
  const [currentStaffRole, setCurrentStaffRole] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const [orderResponse, contractsResponse, statusesResponse, staffResponse] = await Promise.all([
          axios.get(`http://localhost:8080/orders/${orderId}`),
          axios.get(`http://localhost:8080/contracts/fetchAll/order/${orderId}`),
          axios.get(`http://localhost:8080/status/fetchAll/order/${orderId}`),
          axios.get(`http://localhost:8080/staffs/fetchAll`)
        ]);

        setOrder(orderResponse.data);
        
        // Set current staff information from the order data
        if (orderResponse.data && orderResponse.data.staff) {
          setCurrentStaffId(orderResponse.data.staff.staffId);
          setCurrentStaffRole(orderResponse.data.staff.role);
          console.log("Current Staff ID:", orderResponse.data.staff.staffId);
          console.log("Current Staff Role:", orderResponse.data.staff.role);
        } else {
          console.warn("Staff information not found in order data");
        }

        if (contractsResponse.data.code === 9999) {
          setContracts(contractsResponse.data.result);
        } else {
          console.warn("Failed to fetch contracts");
        }

        if (statusesResponse.data.code === 9999) {
          setStatuses(statusesResponse.data.result);
        } else {
          console.warn("Failed to fetch statuses");
        }

        if (staffResponse.data.code === 9999) {
          setStaffList(staffResponse.data.result);
        } else {
          console.warn("Failed to fetch staff list");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to fetch order details: " + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleUpdateEndDate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/orders/update-end-date/${orderId}`
      );
      if (response.data.code === 9998) {
        setOrder(response.data.result);
        toast.success("End date updated successfully");
      } else {
        toast.error("Failed to update end date");
      }
    } catch (err) {
      console.error("Error updating end date:", err);
      toast.error("An error occurred while updating the end date");
    }
  };

  const toggleStatusModal = () => {
    setShowStatusModal(!showStatusModal);
  };

  const toggleCreateStatusModal = () => {
    setShowCreateStatusModal(!showCreateStatusModal);
  };

  const handleCreateStatus = async (newStatusData) => {
    try {
      const response = await axios.post("http://localhost:8080/status/create", {
        orderId: orderId,
        statusDescription: newStatusData.statusDescription,
        staffId: parseInt(newStatusData.staffId),
      });

      if (response.data.code === 1000) {
        toast.success("Status created successfully");
        setStatuses([...statuses, response.data.result]);
        toggleCreateStatusModal();
      } else {
        toast.error("Failed to create status");
      }
    } catch (err) {
      console.error("Error creating status:", err);
      toast.error("An error occurred while creating the status");
    }
  };

  const handleDeleteStatus = async (statusId) => {
    if (window.confirm('Are you sure you want to delete this status?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/status/delete/${statusId}`);
        if (response.data.code === 1012) {
          toast.success('Status deleted successfully');
          // Update the statuses state by removing the deleted status
          setStatuses(statuses.filter(status => status.statusId !== statusId));
        } else {
          toast.error('Failed to delete status');
        }
      } catch (err) {
        console.error('Error deleting status:', err);
        toast.error('An error occurred while deleting the status');
      }
    }
  };

  const StatusModal = ({ statuses, onClose }) => {
    const currentStaffUsername = order.staff.username; // Get the current staff username

    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div className="status-modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Status Information</h2>
          <p>Current Staff: {currentStaffUsername || 'Not available'}</p>
          <p>Current Staff Role: {currentStaffRole || 'Not available'}</p>
          {statuses.map((status, index) => (
            <div key={status.statusId} className="status-item">
              <h3>Status {index + 1}</h3>
              <InfoRow label="Description" value={status.statusDescription} />
              <InfoRow label="Date" value={new Date(status.statusDate).toLocaleString()} />
              <InfoRow label="Staff" value={status.staff.username} />
              <InfoRow label="Staff ID" value={status.staff.staffId} />
              <InfoRow label="Complete" value={status.complete ? "Yes" : "No"} />
              <InfoRow label="Number of Updates" value={status.numberOfUpdate} />
              {status.checkDate && (
                <InfoRow label="Check Date" value={new Date(status.checkDate).toLocaleString()} />
              )}
              {currentStaffUsername === status.staff.username && (
                <button onClick={() => handleDeleteStatus(status.statusId)} className="delete-status-btn">
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              )}
            </div>
          ))}
          <button onClick={onClose} className="close-modal-btn">Close</button>
        </div>
      </div>
    );
  };

  const CreateStatusModal = ({ onClose }) => {
    const [description, setDescription] = useState("");
    const [selectedStaffId, setSelectedStaffId] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCreateStatus({
        statusDescription: description,
        staffId: selectedStaffId
      });
    };

    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div className="status-modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Create New Status</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="statusDescription">Status Description:</label>
              <textarea
                id="statusDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="3"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>
            <div>
              <label htmlFor="staffId">Staff:</label>
              <select
                id="staffId"
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                required
              >
                <option value="">Select a staff member</option>
                {staffList.map((staff) => (
                  <option key={staff.staffId} value={staff.staffId}>
                    {staff.username} - {staff.role}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="create-status-btn">Create Status</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </form>
        </div>
      </div>
    );
  };

  const InfoRow = ({ label, value }) => (
    <div className="info-row">
      <span className="info-label">{label}:</span>
      <span className="info-value">{value}</span>
    </div>
  );

  if (loading) return <div className="dashboard-loading">Loading order details...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!order) return <div className="dashboard-error">Order not found</div>;

  return (
    <div className="order-view-dashboard">
      <h1>Order Details</h1>
      <div className="order-details-grid">
        <div className="info-section">
          <h2>Order Information</h2>
          <InfoRow label="ORDER ID" value={order.orderId} />
          <InfoRow
            label="ORDER DATE"
            value={new Date(order.order_date).toLocaleString()}
          />
          <InfoRow
            label="END DATE"
            value={
              order.end_date ? new Date(order.end_date).toLocaleString() : "N/A"
            }
          />
          <InfoRow label="RATING" value={order.rating || "N/A"} />
          <InfoRow label="FEEDBACK" value={order.feedback || "N/A"} />
          <InfoRow
            label="FEEDBACK DATE"
            value={
              order.feedback_date
                ? new Date(order.feedback_date).toLocaleString()
                : "N/A"
            }
          />
        </div>

        <div className="info-section">
          <h2>Customer Information</h2>
          <InfoRow label="CUSTOMER ID" value={order.customer.id} />
          <InfoRow label="USERNAME" value={order.customer.username} />
          <InfoRow label="FULL NAME" value={order.customer.fullName} />
          <InfoRow label="EMAIL" value={order.customer.mail} />
          <InfoRow label="ADDRESS" value={order.customer.address} />
          <InfoRow label="PHONE" value={order.customer.phone} />
        </div>

        <div className="info-section">
          <h2>Staff Information</h2>
          <InfoRow label="STAFF ID" value={order.staff.staffId} />
          <InfoRow label="USERNAME" value={order.staff.username} />
          <InfoRow label="EMAIL" value={order.staff.mail} />
          <InfoRow label="ROLE" value={order.staff.role} />
        </div>

        <div className="info-section">
          <h2>Design Information</h2>
          {order.design ? (
            <>
              <InfoRow label="DESIGN ID" value={order.design.designId} />
              <InfoRow label="DESIGN NAME" value={order.design.designName} />
              <InfoRow
                label="DESIGN DATE"
                value={new Date(order.design.designDate).toLocaleString()}
              />
              <InfoRow
                label="DESIGN VERSION"
                value={order.design.designVersion}
              />
              <InfoRow label="IMAGE DATA" value={order.design.imageData} />
            </>
          ) : (
            <p>No design information available</p>
          )}
        </div>

        <div className="info-section status-section">
          <h2>Status Information</h2>
          <div className="status-button-container">
            <button onClick={toggleStatusModal} className="view-status-btn">
              View Status
            </button>
            <button onClick={toggleCreateStatusModal} className="create-status-btn">
              Create Status
            </button>
          </div>
        </div>

        {contracts.map((contract) => (
          <div className="info-section" key={contract.contractId}>
            <h2>Contract Information (ID: {contract.contractId})</h2>
            <InfoRow
              label="UPLOAD DATE"
              value={new Date(contract.uploadDate).toLocaleString()}
            />
            <InfoRow label="DESCRIPTION" value={contract.description} />
            <InfoRow label="IMAGE DATA" value={contract.imageData} />
          </div>
        ))}
      </div>
      <div className="profile-actions">
        <button
          onClick={handleBackToDashboard}
          className="back-to-dashboard-btn"
        >
          BACK TO DASHBOARD
        </button>
        <button onClick={handleUpdateEndDate} className="update-end-date-btn">
          UPDATE END DATE
        </button>
      </div>
      {showStatusModal && (
        <StatusModal statuses={statuses} onClose={toggleStatusModal} />
      )}
      {showCreateStatusModal && (
        <CreateStatusModal onClose={toggleCreateStatusModal} />
      )}
    </div>
  );
};

export default OrderViewDashboard;
