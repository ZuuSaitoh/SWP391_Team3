import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./dashBoard.css"; // Using the existing dashboard.css file

//view contract details
const ContractViewDashBoard = () => {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContract, setEditedContract] = useState(null);
  const { contractId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContractDetails();
  }, [contractId]);

  //fetch contract details
  const fetchContractDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/contracts/${contractId}`
      );
      if (response.data) {
        setContract(response.data);
        setEditedContract(response.data);
      } else {
        setError("Failed to fetch contract details");
      }
    } catch (err) {
      console.error("Error fetching contract details:", err);
      setError("An error occurred while fetching contract details");
    } finally {
      setLoading(false);
    }
  };

  //delete contract
  const handleDeleteContract = async () => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/contracts/delete/${contractId}`
        );
        if (response.data.code === 9876) {
          toast("Contract deleted successfully");
          navigate("/dashboard");
        } else {
          toast.error("Failed to delete contract");
        }
      } catch (err) {
        console.error("Error deleting contract:", err);
        toast.error("An error occurred while deleting the contract");
      }
    }
  };

  //edit contract
  const handleEditContract = () => {
    setIsEditing(true);
  };

  //cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContract(contract);
  };

  //save edit
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/contracts/update/${contractId}`,
        {
          imageData: editedContract.imageData,
          description: editedContract.description,
        }
      );
      if (response.data.code === 1234) {
        toast.success("Contract updated successfully");
        setContract(response.data.result);
        setIsEditing(false);
      } else {
        toast.error("Failed to update contract");
      }
    } catch (err) {
      console.error("Error updating contract:", err);
      toast.error("An error occurred while updating the contract");
    }
  };

  //handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContract((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageDownload = (imageUrl, fileName) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //render loading
  if (loading) return <div className="dashboard-loading">Loading...</div>;
  //render error
  if (error) return <div className="dashboard-error">{error}</div>;
  //render contract not found
  if (!contract)
    return <div className="dashboard-error">Contract not found</div>;

  return (
    <div className="contract-view-dashboard">
      <h1 className="main-header">Contract Details</h1>
      {isEditing ? (
        <div className="edit-contract-form">
          <h2>Edit Contract</h2>
          <div>
            <label>Image Data:</label>
            <input
              type="text"
              name="imageData"
              value={editedContract.imageData}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={editedContract.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-container">
            <button onClick={handleSaveEdit} className="save-btn">
              Save Changes
            </button>
            <button onClick={handleCancelEdit} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="contract-details-grid">
            <div className="detail-section">
              <h2>Contract Information</h2>
              <div className="detail-row">
                <span className="detail-label">CONTRACT ID:</span>
                <span className="detail-value">{contract.contractId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">UPLOAD DATE:</span>
                <span className="detail-value">
                  {new Date(contract.uploadDate).toLocaleString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">DESCRIPTION:</span>
                <span className="detail-value">{contract.description}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">CONTRACT FILE:</span>
                <span className="detail-value">
                  <a
                    href={contract.imageData}
                    download={`contract_${contract.contractId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleImageDownload(
                        contract.imageData,
                        `contract_${contract.contractId}`
                      );
                    }}
                  >
                    View File
                  </a>
                </span>
              </div>
            </div>

            <div className="detail-section">
              <h2>Order Information</h2>
              <div className="detail-row">
                <span className="detail-label">ORDER ID:</span>
                <span className="detail-value">{contract.order.orderId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">ORDER DATE:</span>
                <span className="detail-value">
                  {new Date(contract.order.order_date).toLocaleString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">END DATE:</span>
                <span className="detail-value">
                  {new Date(contract.order.end_date).toLocaleString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">RATING:</span>
                <span className="detail-value">{contract.order.rating}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">FEEDBACK:</span>
                <span className="detail-value">{contract.order.feedback}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">FEEDBACK DATE:</span>
                <span className="detail-value">
                  {new Date(contract.order.feedback_date).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="detail-section">
              <h2>Customer Information</h2>
              <div className="detail-row">
                <span className="detail-label">CUSTOMER ID:</span>
                <span className="detail-value">
                  {contract.order.customer.id}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">USERNAME:</span>
                <span className="detail-value">
                  {contract.order.customer.username}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">FULL NAME:</span>
                <span className="detail-value">
                  {contract.order.customer.fullName}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">EMAIL:</span>
                <span className="detail-value">
                  {contract.order.customer.mail}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">ADDRESS:</span>
                <span className="detail-value">
                  {contract.order.customer.address}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">PHONE:</span>
                <span className="detail-value">
                  {contract.order.customer.phone}
                </span>
              </div>
            </div>

            <div className="detail-section">
              <h2>Staff Information</h2>
              <div className="detail-row">
                <span className="detail-label">STAFF ID:</span>
                <span className="detail-value">{contract.staff.staffId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">USERNAME:</span>
                <span className="detail-value">{contract.staff.username}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">EMAIL:</span>
                <span className="detail-value">{contract.staff.mail}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">ROLE:</span>
                <span className="detail-value">{contract.staff.role}</span>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button
              onClick={() => navigate("/dashboard")}
              className="back-to-dashboard-btn"
            >
              BACK TO DASHBOARD
            </button>
            <button onClick={handleEditContract} className="edit-customer-btn">
              Edit Contract
            </button>
            <button
              onClick={handleDeleteContract}
              className="delete-customer-btn"
            >
              Delete Contract
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContractViewDashBoard;
