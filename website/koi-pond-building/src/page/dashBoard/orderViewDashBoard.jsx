import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./dashBoard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faMoneyBillWave,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import uploadFile from "../../utils/file";
import "./timeline.css";

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
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionData, setTransactionData] = useState({
    deposit: "",
    depositDescription: "",
    depositMethod: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [showCreateTransactionModal, setShowCreateTransactionModal] =
    useState(false);
  const [activeTab, setActiveTab] = useState("status");
  const [formData, setFormData] = useState(null);
  const [showCreateContractModal, setShowCreateContractModal] = useState(false);
  const [newContract, setNewContract] = useState({
    imageData: "",
    description: "",
  });
  const [showViewContractsModal, setShowViewContractsModal] = useState(false);
  const [showCreateAcceptanceModal, setShowCreateAcceptanceModal] =
    useState(false);
  const [showViewAcceptanceModal, setShowViewAcceptanceModal] = useState(false);
  const [acceptances, setAcceptances] = useState([]);
  const [showUpdateAcceptanceModal, setShowUpdateAcceptanceModal] =
    useState(false);
  const [currentAcceptance, setCurrentAcceptance] = useState(null);
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showAssignDesignStaffModal, setShowAssignDesignStaffModal] =
    useState(false);
  const [selectedDesignStaff, setSelectedDesignStaff] = useState("");
  const [pendingStatusCreation, setPendingStatusCreation] = useState(null);
  const [
    showAssignConstructionStaffModal,
    setShowAssignConstructionStaffModal,
  ] = useState(false);
  const [selectedConstructionStaff, setSelectedConstructionStaff] =
    useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const [
          orderResponse,
          contractsResponse,
          statusesResponse,
          staffResponse,
          transactionsResponse,
        ] = await Promise.all([
          axios.get(`http://localhost:8080/orders/${orderId}`),
          axios.get(
            `http://localhost:8080/contracts/fetchAll/order/${orderId}`
          ),
          axios.get(`http://localhost:8080/status/fetchAll/order/${orderId}`),
          axios.get(`http://localhost:8080/staffs/fetchAll`),
          axios.get(
            `http://localhost:8080/transaction/fetchAll/order/${orderId}`
          ),
        ]);

        setOrder(orderResponse.data);
        setFormData(orderResponse.data.form);

        // Set current staff information from the order data
        if (orderResponse.data && orderResponse.data.staff) {
          setCurrentStaffId(orderResponse.data.staff.staffId);
          setCurrentStaffRole(orderResponse.data.staff.role);
          // console.log("Current Staff ID:", orderResponse.data.staff.staffId);
          // console.log("Current Staff Role:", orderResponse.data.staff.role);
        } else {
          console.warn("Staff information not found in order data");
        }

        if (contractsResponse.data.code === 9999) {
          setContracts(contractsResponse.data.result);
        } else {
          console.warn("Failed to fetch contracts");
        }

        if (statusesResponse.data.code === 9999) {
          const fetchedStatuses = statusesResponse.data.result;
          setStatuses(fetchedStatuses);

          if (fetchedStatuses.length === 0) {
            console.warn("No statuses found for this order");
          }

          // Set the timeline index to the latest status
          if (fetchedStatuses.length > 0) {
            setCurrentTimelineIndex(fetchedStatuses.length - 1);
          }
        } else {
          console.warn("Failed to fetch statuses");
        }

        if (staffResponse.data.code === 9999) {
          setStaffList(staffResponse.data.result);
        } else {
          console.warn("Failed to fetch staff list");
        }

        if (transactionsResponse.data.code === 9999) {
          setTransactions(transactionsResponse.data.result);
        } else {
          console.warn("Failed to fetch transactions");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError(
          "Failed to fetch order details: " +
            (err.response?.data?.message || err.message)
        );
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
    if (order.end_date) {
      toast.warning("Cannot create new status - order has ended");
      return;
    }
    if (statuses.length >= 9) {
      toast.warning("Maximum number of statuses (9) reached");
      return;
    }
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
    if (window.confirm("Are you sure you want to delete this status?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/status/delete/${statusId}`
        );
        if (response.data.code === 1012) {
          toast.success("Status deleted successfully");
          setStatuses(
            statuses.filter((status) => status.statusId !== statusId)
          );
        } else {
          toast.error("Failed to delete status");
        }
      } catch (err) {
        console.error("Error deleting status:", err);
        toast.error("An error occurred while deleting the status");
      }
    }
  };

  const handleUpdateStatus = async (statusId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/status/update-number-of-update/${statusId}`,
        {}
      );
      if (response.data.code === 999) {
        toast.success("Status updated successfully");

        // Find the updated status in the current statuses
        const updatedStatus = response.data.result;
        const updatedStatuses = statuses.map((status) =>
          status.statusId === statusId ? updatedStatus : status
        );
        setStatuses(updatedStatuses);

        // If the status is complete, create the next status automatically
        const currentIndex = updatedStatuses.findIndex(
          (s) => s.statusId === statusId
        );
        if (
          updatedStatus.complete &&
          currentIndex === updatedStatuses.length - 1
        ) {
          const nextStatusConfig = getNextStatusConfig(currentIndex);
          if (nextStatusConfig) {
            try {
              const createStatusResponse = await axios.post(
                "http://localhost:8080/status/create",
                {
                  orderId: orderId,
                  statusDescription: nextStatusConfig.description,
                  staffId:
                    nextStatusConfig.role === currentStaffRole
                      ? currentStaffId
                      : findStaffByRole(staffList, nextStatusConfig.role)
                          ?.staffId,
                }
              );

              if (createStatusResponse.data.code === 1000) {
                const newStatuses = [
                  ...updatedStatuses,
                  createStatusResponse.data.result,
                ];
                setStatuses(newStatuses);
                // Automatically move to the next status
                setCurrentTimelineIndex(currentIndex + 1);
                toast.success(
                  `${nextStatusConfig.description} created automatically`
                );
              } else {
                toast.error(`Failed to create ${nextStatusConfig.description}`);
              }
            } catch (error) {
              console.error("Error creating next status:", error);
              toast.error("An error occurred while creating next status");
            }
          }
        }
      } else if (response.data.code === 1026) {
        toast.error("You can't update more than 3 times!");
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred while updating the status");
      }
    }
  };

  // Helper function to find staff by role
  const findStaffByRole = (staffList, role) => {
    return staffList.find((staff) => staff.role === role);
  };

  // Configuration for next status based on current index
  const getNextStatusConfig = (currentIndex) => {
    const statusConfigs = [
      {
        description: "Koi Pond Construction Contract (Signed)",
        role: "Manager",
      },
      {
        description: "Design Fee Payment",
        role: "Manager",
      },
      {
        description: "Design Drawing",
        role: "Design Staff",
      },
      {
        description: "Material Cost Payment",
        role: "Manager",
      },
      {
        description: "Construction",
        role: "Construction Staff",
      },
      {
        description: "Acceptance Contract",
        role: "Manager",
      },
      {
        description: "Construction Fee Payment",
        role: "Manager",
      },
      {
        description: "Project Completion",
        role: "Manager",
      },
    ];

    // Return null if we're at or beyond status 8 (index 7)
    return currentIndex < statusConfigs.length && currentIndex !== 8
      ? statusConfigs[currentIndex]
      : null;
  };

  const handleCreateTransaction = async (localTransactionData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/transaction/create",
        {
          orderId: orderId,
          deposit: localTransactionData.deposit,
          depositDescription: localTransactionData.depositDescription,
          depositMethod: localTransactionData.depositMethod,
          depositPersonId: order.customer.id,
          transactionNumber: orderId.toString(), // Convert to string if needed
        }
      );

      if (response.data.code === 1000) {
        toast.success("Transaction created successfully");
        setShowCreateTransactionModal(false);
        // Update the transactions list
        setTransactions([...transactions, response.data.result]);
        // Reset the form
        setTransactionData({
          deposit: "",
          depositDescription: "",
          depositMethod: "",
        });
      } else {
        toast.error("Failed to create transaction");
      }
    } catch (err) {
      console.error("Error creating transaction:", err);
      toast.error("An error occurred while creating the transaction");
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/transaction/delete/${transactionId}`
        );
        if (response.data.code === 1012) {
          toast.success("Transaction deleted successfully");
          setTransactions(
            transactions.filter(
              (transaction) => transaction.transactionId !== transactionId
            )
          );
        } else {
          toast.error("Failed to delete transaction");
        }
      } catch (err) {
        console.error("Error deleting transaction:", err);
        toast.error("An error occurred while deleting the transaction");
      }
    }
  };

  const handlePayByCash = async (transactionId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/transaction/update/payment/cash/${transactionId}`
      );
      if (response.data.code === 7777) {
        toast.success("Payment by cash successful");
        // Update the transaction in the state
        setTransactions(
          transactions.map((transaction) =>
            transaction.transactionId === transactionId
              ? { ...response.data.result, isPaid: true }
              : transaction
          )
        );
      } else {
        toast.error("Failed to process cash payment");
      }
    } catch (err) {
      console.error("Error processing cash payment:", err);
      toast.error("An error occurred while processing the cash payment");
    }
  };

  const TransactionModal = ({ transactions, onClose, onDelete }) => {
    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Transaction Information</h2>
          {transactions.map((transaction, index) => (
            <div key={transaction.transactionId} className="status-item">
              <h3>Transaction {index + 1}</h3>
              <InfoRow
                label="Transaction ID"
                value={transaction.transactionId}
              />
              <InfoRow
                label="Deposit"
                value={`${new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(transaction.deposit)}`}
              />
              <InfoRow
                label="Description"
                value={transaction.depositDescription || "Not provided"}
              />
              <InfoRow
                label="Method"
                value={transaction.depositMethod || "Not specified"}
              />
              <InfoRow
                label="Date"
                value={
                  transaction.depositDate
                    ? new Date(transaction.depositDate).toLocaleString()
                    : "Not recorded"
                }
              />
              <InfoRow
                label="Deposit Person"
                value={
                  transaction.depositPerson
                    ? transaction.depositPerson.username
                    : "Unknown"
                }
              />
              <InfoRow
                label="Transaction Number"
                value={transaction.transactionNumber || "Not assigned"}
              />
              <div className="status-actions">
                {!transaction.depositMethod && (
                  <button
                    onClick={() => handlePayByCash(transaction.transactionId)}
                    className="pay-cash-btn"
                  >
                    <FontAwesomeIcon icon={faMoneyBillWave} /> Pay by Cash
                  </button>
                )}
                {!transaction.depositMethod && (
                  <button
                    onClick={() => onDelete(transaction.transactionId)}
                    className="delete-btn"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
          <button onClick={onClose} className="close-modal-btn">
            Close
          </button>
        </div>
      </div>
    );
  };

  const CreateTransactionModal = ({ onClose }) => {
    const [localTransactionData, setLocalTransactionData] = useState({
      deposit: "",
      depositDescription: "",
    });

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      if (id === "deposit") {
        // Allow only numbers
        const numericValue = value.replace(/\D/g, '');
        setLocalTransactionData(prevData => ({
          ...prevData,
          [id]: numericValue
        }));
      } else {
        setLocalTransactionData(prevData => ({
          ...prevData,
          [id]: value
        }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCreateTransaction({
        ...localTransactionData,
        deposit: parseInt(localTransactionData.deposit, 10) || 0,
      });
    };

    // Add this function to handle overlay clicks
    const handleOverlayClick = (e) => {
      // Only close if the actual overlay was clicked
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div className="status-modal-overlay" onClick={handleOverlayClick}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Create Transaction</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="deposit">Deposit Amount (VND):</label>
              <input
                type="text"
                id="deposit"
                value={localTransactionData.deposit}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </div>
            <div>
              <label htmlFor="depositDescription">Description:</label>
              <textarea
                id="depositDescription"
                value={localTransactionData.depositDescription}
                onChange={handleInputChange}
                required
                style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
              />
            </div>
            <button type="submit" className="create-status-btn">
              Create Transaction
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  };

  const StatusModal = ({ statuses, onClose }) => {
    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Status Information</h2>
          {statuses.map((status, index) => (
            <div key={status.statusId} className="status-item">
              <h3>Status {index + 1}</h3>
              <InfoRow label="Description" value={status.statusDescription} />
              <InfoRow
                label="Date"
                value={new Date(status.statusDate).toLocaleString()}
              />
              <InfoRow label="Staff" value={status.staff.username} />
              <InfoRow label="Staff ID" value={status.staff.staffId} />
              <InfoRow
                label="Complete"
                value={status.complete ? "Yes" : "No"}
              />
              <InfoRow
                label="Number of Updates"
                value={status.numberOfUpdate}
              />
              {status.checkDate && (
                <InfoRow
                  label="Check Date"
                  value={new Date(status.checkDate).toLocaleString()}
                />
              )}
              {!order.end_date && (
                <div className="status-actions">
                  <button
                    onClick={() => handleUpdateStatus(status.statusId)}
                    className="update-btn"
                  >
                    <FontAwesomeIcon icon={faEdit} /> Update
                  </button>
                  <button
                    onClick={() => handleDeleteStatus(status.statusId)}
                    className="delete-btn"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          <button onClick={onClose} className="close-modal-btn">
            Close
          </button>
        </div>
      </div>
    );
  };

  // First, add this function near the top of your component, after the useState declarations
  const getRequiredRoleForStatus = (statusCount) => {
    const statusRoleMap = {
      0: "Consulting Staff", // Tu van
      1: "Consulting Staff", // Tu van
      2: "Consulting Staff", // Tu van
      3: "Design Staff", // Design
      4: "Consulting Staff", // Tu van
      5: "Construction Staff", // Xay dung
      6: "Consulting Staff", // Tu van
      7: "Consulting Staff", // Tu van
      8: "Consulting Staff", // Tu van
    };
    return statusRoleMap[statusCount] || "Consulting Staff";
  };

  // Replace the existing CreateStatusModal component with this updated version
  const CreateStatusModal = ({ onClose }) => {
    const [description, setDescription] = useState("");
    const [selectedStaffId, setSelectedStaffId] = useState("");

    // Get the required role based on current status count
    const requiredRole = getRequiredRoleForStatus(statuses.length);

    // Filter staff list based on the required role
    const eligibleStaff = staffList.filter(
      (staff) => staff.role === requiredRole
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCreateStatus({
        statusDescription: description,
        staffId: selectedStaffId,
      });
    };

    // Get status step number (1-based index)
    const currentStep = statuses.length + 1;

    // Get default status description based on step
    const getDefaultDescription = () => {
      const descriptions = {
        1: "Consultation",
        2: "Koi Pond Construction Contract (Signed)",
        3: "Design Fee Payment",
        4: "Design Drawing",
        5: "Material Cost Payment",
        6: "Construction",
        7: "Acceptance Contract",
        8: "Construction Fee Payment",
        9: "Project Completion",
      };
      return descriptions[currentStep] || "";
    };

    // Set default description when component mounts
    useEffect(() => {
      setDescription(getDefaultDescription());
    }, []);

    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Create New Status (Step {currentStep})</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="statusDescription">Status Description:</label>
              <textarea
                id="statusDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="3"
                style={{ width: "100%", resize: "vertical" }}
              />
            </div>
            <div>
              <label htmlFor="staffId">Staff ({requiredRole} only):</label>
              <select
                id="staffId"
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                required
              >
                <option value="">Select a staff member</option>
                {eligibleStaff.map((staff) => (
                  <option key={staff.staffId} value={staff.staffId}>
                    {staff.username} - {staff.role}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="create-status-btn">
              Create Status
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  };

  const InfoRow = ({ label, value }) => (
    <div className="info-row">
      <span className="info-label">{label}:</span>
      {label === "IMAGE DATA" && value ? (
        <a href={value} download className="info-value">
          Download
        </a>
      ) : (
        <span className="info-value">{value}</span>
      )}
    </div>
  );

  const handleCreateContract = async (contractData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/contracts/create",
        {
          orderId: parseInt(orderId),
          uploadStaff: currentStaffId,
          imageData: contractData.imageData,
          description: contractData.description,
        }
      );

      if (response.data.code === 1000) {
        toast.success("Contract created successfully");
        setContracts([...contracts, response.data.result]);
        setShowCreateContractModal(false);
        setNewContract({ imageData: "", description: "" });
      } else {
        toast.error("Failed to create contract");
      }
    } catch (err) {
      console.error("Error creating contract:", err);
      toast.error("An error occurred while creating the contract");
    }
  };

  const ViewContractsModal = ({ contracts, onClose, onDelete }) => {
    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Contract Information</h2>
          {contracts.map((contract, index) => (
            <div key={contract.contractId} className="status-item">
              <h3>Contract {index + 1}</h3>
              <InfoRow label="Contract ID" value={contract.contractId} />
              <InfoRow
                label="Upload Date"
                value={new Date(contract.uploadDate).toLocaleString()}
              />
              <InfoRow label="Description" value={contract.description} />
              <div className="info-row">
                <span className="info-label">Image Data:</span>
                <a href={contract.imageData} download className="download-btn">
                  <FontAwesomeIcon icon={faDownload} /> Download
                </a>
              </div>
              <InfoRow label="Upload Staff" value={contract.staff.username} />
              <div className="status-actions">
                {!order.end_date && (
                  <button
                    onClick={() => onDelete(contract.contractId)}
                    className="delete-btn"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
          <button onClick={onClose} className="close-modal-btn">
            Close
          </button>
        </div>
      </div>
    );
  };

  const CreateContractModal = ({ onClose }) => {
    const [localContract, setLocalContract] = useState({
      imageData: null,
      description: "",
    });

    const handleInputChange = (e) => {
      const { id, value, files } = e.target;
      if (id === "imageData") {
        setLocalContract((prev) => ({
          ...prev,
          [id]: files[0],
        }));
      } else {
        setLocalContract((prev) => ({
          ...prev,
          [id]: value,
        }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const imageUrl = await uploadFile(localContract.imageData);

        const response = await axios.post(
          "http://localhost:8080/contracts/create",
          {
            orderId: parseInt(orderId),
            uploadStaff: currentStaffId,
            imageData: imageUrl, // Use the uploaded file URL
            description: localContract.description,
          }
        );

        if (response.data.code === 1000) {
          toast.success("Contract created successfully");
          setContracts([...contracts, response.data.result]);
          setShowCreateContractModal(false);
          setNewContract({ imageData: "", description: "" });
        } else {
          toast.error("Failed to create contract");
        }
      } catch (err) {
        console.error("Error creating contract:", err);
        toast.error("An error occurred while creating the contract");
      }
    };

    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Create New Contract</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="imageData">Upload File:</label>
              <input
                type="file"
                id="imageData"
                accept=".jpg,.jpeg,.png,.pdf,.docx"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={localContract.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modal-actions">
              <button type="submit" className="create-status-btn">
                Create Contract
              </button>
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleDeleteContract = async (contractId) => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/contracts/delete/${contractId}`
        );
        if (response.data.code === 9876) {
          toast.success("Contract deleted successfully");
          setContracts(
            contracts.filter((contract) => contract.contractId !== contractId)
          );
        } else {
          toast.error("Failed to delete contract");
        }
      } catch (err) {
        console.error("Error deleting contract:", err);
        toast.error("An error occurred while deleting the contract");
      }
    }
  };

  const CreateAcceptanceModal = ({ onClose }) => {
    // Find the design and construction staff from previous statuses
    const findStaffFromStatus = (description) => {
      const status = statuses.find((s) => s.statusDescription === description);
      return status?.staff?.staffId || "";
    };

    const [acceptanceData, setAcceptanceData] = useState({
      consultingStaff: order.staff.staffId,
      // Auto-assign design staff from "Design Drawing" status
      designStaff: findStaffFromStatus("Design Drawing"),
      // Auto-assign construction staff from "Construction" status
      constructionStaff: findStaffFromStatus("Construction"),
      imageData: null,
      description: "",
    });

    const handleInputChange = (e) => {
      const { id, value, files } = e.target;
      if (id === "imageData") {
        setAcceptanceData((prev) => ({
          ...prev,
          [id]: files[0],
        }));
      } else {
        setAcceptanceData((prev) => ({
          ...prev,
          [id]: value,
        }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const imageUrl = await uploadFile(acceptanceData.imageData);

        const response = await axios.post(
          "http://localhost:8080/acceptancetests/create",
          {
            orderId: parseInt(orderId),
            consultingStaff: order.staff.staffId,
            designStaff: acceptanceData.designStaff,
            constructionStaff: acceptanceData.constructionStaff,
            imageData: imageUrl,
            description: acceptanceData.description,
          }
        );

        if (response.data.code === 1000) {
          toast.success("Acceptance test created successfully");
          setShowCreateAcceptanceModal(false);
        } else {
          toast.error("Failed to create acceptance test");
        }
      } catch (err) {
        console.error("Error creating acceptance test:", err);
        toast.error("An error occurred while creating the acceptance test");
      }
    };

    // Find the staff usernames for display
    const getStaffUsername = (staffId) => {
      const staff = staffList.find((s) => s.staffId === parseInt(staffId));
      return staff?.username || "";
    };

    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Create Acceptance Test</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="consultingStaff">Consulting Staff:</label>
              <input
                type="text"
                id="consultingStaff"
                value={order.staff.username}
                disabled
                style={{ backgroundColor: "#f0f0f0" }}
              />
            </div>
            <div>
              <label htmlFor="designStaff">Design Staff:</label>
              <input
                type="text"
                id="designStaff"
                value={getStaffUsername(acceptanceData.designStaff)}
                disabled
                style={{ backgroundColor: "#f0f0f0" }}
              />
            </div>
            <div>
              <label htmlFor="constructionStaff">Construction Staff:</label>
              <input
                type="text"
                id="constructionStaff"
                value={getStaffUsername(acceptanceData.constructionStaff)}
                disabled
                style={{ backgroundColor: "#f0f0f0" }}
              />
            </div>
            <div>
              <label htmlFor="imageData">Upload File:</label>
              <input
                type="file"
                id="imageData"
                accept=".jpg,.jpeg,.png,.pdf,.docx"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={acceptanceData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modal-actions">
              <button type="submit" className="create-status-btn">
                Create Acceptance
              </button>
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const fetchAcceptances = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/acceptancetests/fetchAll/order/${orderId}`
      );
      if (response.data.code === 9999) {
        setAcceptances(response.data.result);
        setShowViewAcceptanceModal(true);
      } else {
        toast.error("Failed to fetch acceptance tests");
      }
    } catch (err) {
      console.error("Error fetching acceptance tests:", err);
      toast.error("An error occurred while fetching acceptance tests");
    }
  };

  const ViewAcceptanceModal = ({ acceptances, onClose }) => {
    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Acceptance Tests</h2>
          {acceptances.map((acceptance, index) => (
            <div key={acceptance.acceptanceTestId} className="status-item">
              <h3>Acceptance Test {index + 1}</h3>
              <InfoRow
                label="Acceptance Test ID"
                value={acceptance.acceptanceTestId}
              />
              <InfoRow
                label="Consulting Staff"
                value={acceptance.consultingStaff.username}
              />
              <InfoRow
                label="Design Staff"
                value={acceptance.designStaff.username}
              />
              <InfoRow
                label="Construction Staff"
                value={acceptance.constructionStaff.username}
              />
              <InfoRow
                label="Finish Date"
                value={new Date(acceptance.finishDate).toLocaleString()}
              />
              <InfoRow label="Description" value={acceptance.description} />
              <div className="status-actions">
                <a
                  href={acceptance.imageData}
                  download
                  className="download-btn"
                >
                  <FontAwesomeIcon icon={faDownload} /> Download
                </a>
                {!order.end_date && (
                  <button
                    onClick={() => {
                      setCurrentAcceptance(acceptance);
                      setShowUpdateAcceptanceModal(true);
                    }}
                    className="update-btn"
                  >
                    <FontAwesomeIcon icon={faEdit} /> Update
                  </button>
                )}
              </div>
            </div>
          ))}
          <button onClick={onClose} className="close-modal-btn">
            Close
          </button>
        </div>
      </div>
    );
  };

  const handleUpdateAcceptance = async (acceptanceId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/acceptancetests/update/${acceptanceId}`,
        updatedData
      );

      if (response.data.code === 1234) {
        toast.success("Acceptance test updated successfully");
        setAcceptances(
          acceptances.map((acceptance) =>
            acceptance.acceptanceTestId === acceptanceId
              ? { ...acceptance, ...response.data.result }
              : acceptance
          )
        );
        setShowUpdateAcceptanceModal(false);
      } else {
        toast.error("Failed to update acceptance test");
      }
    } catch (err) {
      console.error("Error updating acceptance test:", err);
      toast.error("An error occurred while updating the acceptance test");
    }
  };

  const UpdateAcceptanceModal = ({ acceptance, onClose }) => {
    const [updatedData, setUpdatedData] = useState({
      imageData: null,
      description: acceptance.description,
    });

    const handleInputChange = (e) => {
      const { id, value, files } = e.target;
      if (id === "imageData") {
        setUpdatedData((prev) => ({
          ...prev,
          [id]: files[0],
        }));
      } else {
        setUpdatedData((prev) => ({
          ...prev,
          [id]: value,
        }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const imageUrl = updatedData.imageData
          ? await uploadFile(updatedData.imageData)
          : acceptance.imageData;

        await handleUpdateAcceptance(acceptance.acceptanceTestId, {
          imageData: imageUrl,
          description: updatedData.description,
        });
      } catch (err) {
        console.error("Error updating acceptance test:", err);
        toast.error("An error occurred while updating the acceptance test");
      }
    };

    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Update Acceptance Test</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="imageData">Upload New File:</label>
              <input
                type="file"
                id="imageData"
                accept=".jpg,.jpeg,.png,.pdf,.docx"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={updatedData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modal-actions">
              <button type="submit" className="create-status-btn">
                Update Acceptance
              </button>
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Add this function to determine which buttons to show based on status index
  const getVisibleButtons = (statusIndex) => {
    switch (statusIndex) {
      case 1: // Status 2 - Contract related
        return {
          showContract: true,
          showTransaction: false,
          showAcceptance: false,
        };
      case 2: // Status 3 - Design Fee Payment
        return {
          showContract: false,
          showTransaction: true,
          showAcceptance: false,
        };
      case 4: // Status 5 - Material Cost Payment
        return {
          showContract: false,
          showTransaction: true,
          showAcceptance: false,
        };
      case 6: // Status 7 - Acceptance Contract
        return {
          showContract: false,
          showTransaction: false,
          showAcceptance: true,
        };
      case 7: // Status 8 - Construction Fee Payment
        return {
          showContract: false,
          showTransaction: true,
          showAcceptance: false,
        };
      default:
        return {
          showContract: false,
          showTransaction: false,
          showAcceptance: false,
        };
    }
  };

  // Add this new function to handle status completion
  const handleCompleteStatus = async (statusId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/status/update-complete/${statusId}`,
        {
          complete: true,
          rejectReason: "",
        }
      );
      if (response.data.code === 999) {
        toast.success("Status marked as complete");

        // Update the status in the local state
        const updatedStatuses = statuses.map((status) =>
          status.statusId === statusId ? { ...status, complete: true } : status
        );
        setStatuses(updatedStatuses);

        // Close the status modal if it's open
        setSelectedStatus(null);
      } else {
        toast.error("Failed to complete status");
      }
    } catch (err) {
      console.error("Error completing status:", err);
      toast.error("An error occurred while completing the status");
    }
  };

  // Update the Timeline component's modal section to include the complete button
  const Timeline = ({ statuses }) => {
    const handleNodeClick = (status) => {
      setSelectedStatus(status);
    };

    const handleNext = async () => {
      const currentStatus = statuses[currentTimelineIndex];

      if (
        currentStatus?.complete &&
        currentTimelineIndex === statuses.length - 1
      ) {
        const nextStatusConfig = getNextStatusConfig(currentTimelineIndex);

        // Check if next status is Design Drawing (status 4)
        if (
          nextStatusConfig &&
          nextStatusConfig.description === "Design Drawing"
        ) {
          setShowAssignDesignStaffModal(true);
          setPendingStatusCreation(nextStatusConfig);
          return;
        }

        // Check if next status is Construction (status 6)
        if (
          nextStatusConfig &&
          nextStatusConfig.description === "Construction"
        ) {
          setShowAssignConstructionStaffModal(true);
          setPendingStatusCreation(nextStatusConfig);
          return;
        }

        // Normal status creation logic...
        if (nextStatusConfig) {
          createNextStatus(nextStatusConfig);
        }
      } else {
        setCurrentTimelineIndex((prev) =>
          prev < statuses.length - 1 ? prev + 1 : prev
        );
      }
    };

    const handlePrev = () => {
      setCurrentTimelineIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const visibleButtons = getVisibleButtons(currentTimelineIndex);

    // Updated isNextEnabled function
    const isNextEnabled = () => {
      const currentStatus = statuses[currentTimelineIndex];
      // Disable next button if we're at status 9 (index 8)
      if (currentTimelineIndex === 8) {
        return false;
      }
      // Enable next button if current status is complete
      return currentStatus?.complete;
    };

    // Add this function to check if current status is complete
    const isCurrentStatusComplete = () => {
      const currentStatus = statuses[currentTimelineIndex];
      return currentStatus?.complete;
    };

    return (
      <div className="timeline-container">
        <div className="timeline">
          {statuses.map((status, index) => (
            <div
              key={status.statusId}
              className={`timeline-node ${
                index === currentTimelineIndex
                  ? "active"
                  : index < currentTimelineIndex
                  ? "completed"
                  : ""
              } ${status.complete ? "complete" : ""}`}
              onClick={() => handleNodeClick(status)}
            >
              <span className="timeline-label">{`Status ${index + 1}`}</span>
            </div>
          ))}
        </div>
        <div className="timeline-navigation">
          <button
            className="timeline-btn"
            onClick={handlePrev}
            disabled={currentTimelineIndex === 0}
          >
            Previous
          </button>

          <div className="timeline-center-buttons">
            {visibleButtons.showContract && (
              <>
                <button
                  className="timeline-btn"
                  onClick={() => setShowCreateContractModal(true)}
                  disabled={isCurrentStatusComplete()}
                  style={{
                    opacity: isCurrentStatusComplete() ? 0.5 : 1,
                    cursor: isCurrentStatusComplete()
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  Create Contract
                </button>
                <button
                  className="timeline-btn"
                  onClick={() => setShowViewContractsModal(true)}
                >
                  View Contracts
                </button>
              </>
            )}
            {visibleButtons.showTransaction && (
              <>
                <button
                  className="timeline-btn"
                  onClick={() => setShowCreateTransactionModal(true)}
                  disabled={isCurrentStatusComplete()}
                  style={
                    order.end_date
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}
                  }
                >
                  Create Transaction
                </button>
                <button
                  className="timeline-btn"
                  onClick={() => setShowTransactionModal(true)}
                >
                  View Transactions
                </button>
              </>
            )}
            {visibleButtons.showAcceptance && (
              <>
                <button
                  className="timeline-btn"
                  onClick={() => setShowCreateAcceptanceModal(true)}
                  disabled={isCurrentStatusComplete()}
                  style={{
                    opacity: isCurrentStatusComplete() ? 0.5 : 1,
                    cursor: isCurrentStatusComplete()
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  Create Acceptance
                </button>
                <button className="timeline-btn" onClick={fetchAcceptances}>
                  View Acceptance
                </button>
              </>
            )}
          </div>

          <button
            className={`timeline-btn ${
              isNextEnabled() ? "active" : "disabled"
            }`}
            onClick={handleNext}
            disabled={!isNextEnabled()}
            style={{
              opacity: isNextEnabled() ? 1 : 0.5,
              cursor: isNextEnabled() ? "pointer" : "not-allowed",
            }}
          >
            Next
          </button>
        </div>
        {selectedStatus && (
          <div
            className="timeline-modal-overlay"
            onClick={() => setSelectedStatus(null)}
          >
            <div
              className="timeline-status-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Status Details</h3>
              <p>
                <strong>Description:</strong> {selectedStatus.statusDescription}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedStatus.statusDate).toLocaleString()}
              </p>
              <p>
                <strong>Staff:</strong> {selectedStatus.staff.username}
              </p>
              <p>
                <strong>Complete:</strong>{" "}
                {selectedStatus.complete ? "Yes" : "No"}
              </p>
              <p>
                <strong>Updates:</strong> {selectedStatus.numberOfUpdate}
              </p>
              <div className="timeline-modal-actions">
                {!selectedStatus.complete && (
                  <button
                    className="complete-status-btn"
                    onClick={() =>
                      handleCompleteStatus(selectedStatus.statusId)
                    }
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      padding: "8px 16px",
                      marginRight: "8px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Mark as Complete
                  </button>
                )}
                <button
                  className="timeline-btn"
                  onClick={() => setSelectedStatus(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Add new function to handle design staff assignment and status creation
  const handleDesignStaffAssign = async (designStaffId) => {
    try {
      if (pendingStatusCreation) {
        const createStatusResponse = await axios.post(
          "http://localhost:8080/status/create",
          {
            orderId: orderId,
            statusDescription: pendingStatusCreation.description,
            staffId: designStaffId, // Use the selected design staff ID directly
          }
        );

        if (createStatusResponse.data.code === 1000) {
          const newStatuses = [...statuses, createStatusResponse.data.result];
          setStatuses(newStatuses);
          setCurrentTimelineIndex(currentTimelineIndex + 1);
          setShowAssignDesignStaffModal(false);
          setPendingStatusCreation(null);
          setSelectedDesignStaff("");
          toast.success("Design Drawing status created with assigned staff");
        } else {
          toast.error("Failed to create Design Drawing status");
        }
      }
    } catch (error) {
      console.error("Error creating Design Drawing status:", error);
      toast.error("An error occurred while creating Design Drawing status");
    }
  };

  // Add helper function for creating next status
  const createNextStatus = async (statusConfig) => {
    try {
      // Skip creation of initial status since it's already created
      if (statuses.length === 0) {
        // console.log("Initial status should already exist");
        return;
      }

      const createStatusResponse = await axios.post(
        "http://localhost:8080/status/create",
        {
          orderId: orderId,
          statusDescription: statusConfig.description,
          staffId:
            statusConfig.staffId ||
            (statusConfig.role === currentStaffRole
              ? currentStaffId
              : findStaffByRole(staffList, statusConfig.role)?.staffId),
        }
      );

      if (createStatusResponse.data.code === 1000) {
        const newStatuses = [...statuses, createStatusResponse.data.result];
        setStatuses(newStatuses);
        setCurrentTimelineIndex(currentTimelineIndex + 1);
        toast.success(`${statusConfig.description} created automatically`);
      } else {
        toast.error(`Failed to create ${statusConfig.description}`);
      }
    } catch (error) {
      console.error("Error creating next status:", error);
      toast.error("An error occurred while creating next status");
    }
  };

  // Add new component for assigning design staff
  const AssignDesignStaffModal = ({ onClose, onAssign }) => {
    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Assign Design Staff</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAssign(selectedDesignStaff);
            }}
          >
            <div>
              <label htmlFor="designStaff">Select Design Staff:</label>
              <select
                id="designStaff"
                value={selectedDesignStaff}
                onChange={(e) => setSelectedDesignStaff(e.target.value)}
                required
              >
                <option value="">Select a staff member</option>
                {staffList
                  .filter((staff) => staff.role === "Design Staff")
                  .map((staff) => (
                    <option key={staff.staffId} value={staff.staffId}>
                      {staff.username}
                    </option>
                  ))}
              </select>
            </div>
            <div className="modal-actions">
              <button type="submit" className="create-status-btn">
                Assign Staff
              </button>
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Add new component for assigning construction staff
  const AssignConstructionStaffModal = ({ onClose, onAssign }) => {
    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Assign Construction Staff</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAssign(selectedConstructionStaff);
            }}
          >
            <div>
              <label htmlFor="constructionStaff">
                Select Construction Staff:
              </label>
              <select
                id="constructionStaff"
                value={selectedConstructionStaff}
                onChange={(e) => setSelectedConstructionStaff(e.target.value)}
                required
              >
                <option value="">Select a staff member</option>
                {staffList
                  .filter((staff) => staff.role === "Construction Staff")
                  .map((staff) => (
                    <option key={staff.staffId} value={staff.staffId}>
                      {staff.username}
                    </option>
                  ))}
              </select>
            </div>
            <div className="modal-actions">
              <button type="submit" className="create-status-btn">
                Assign Staff
              </button>
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Add handler for construction staff assignment
  const handleConstructionStaffAssign = async (constructionStaffId) => {
    try {
      if (pendingStatusCreation) {
        const createStatusResponse = await axios.post(
          "http://localhost:8080/status/create",
          {
            orderId: orderId,
            statusDescription: pendingStatusCreation.description,
            staffId: constructionStaffId,
          }
        );

        if (createStatusResponse.data.code === 1000) {
          const newStatuses = [...statuses, createStatusResponse.data.result];
          setStatuses(newStatuses);
          setCurrentTimelineIndex(currentTimelineIndex + 1);
          setShowAssignConstructionStaffModal(false);
          setPendingStatusCreation(null);
          setSelectedConstructionStaff("");
          toast.success("Construction status created with assigned staff");
        } else {
          toast.error("Failed to create Construction status");
        }
      }
    } catch (error) {
      console.error("Error creating Construction status:", error);
      toast.error("An error occurred while creating Construction status");
    }
  };

  if (loading)
    return <div className="dashboard-loading">Loading order details...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!order) return <div className="dashboard-error">Order not found</div>;

  return (
    <div className="order-view-dashboard">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>Order Details</h1>
      <Timeline statuses={statuses} />
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
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === "status" ? "active" : ""}`}
              onClick={() => setActiveTab("status")}
            >
              Status
            </button>
            <button
              className={`tab-button ${
                activeTab === "transaction" ? "active" : ""
              }`}
              onClick={() => setActiveTab("transaction")}
            >
              Transaction
            </button>
            <button
              className={`tab-button ${
                activeTab === "contract" ? "active" : ""
              }`}
              onClick={() => setActiveTab("contract")}
            >
              Contract
            </button>
            <button
              className={`tab-button ${
                activeTab === "acceptance" ? "active" : ""
              }`}
              onClick={() => setActiveTab("acceptance")}
            >
              Acceptance
            </button>
          </div>
          {activeTab === "status" && (
            <>
              <h2>Status Information</h2>
              <div className="status-button-container">
                <button onClick={toggleStatusModal} className="view-status-btn">
                  View Status
                </button>
                <button
                  onClick={toggleCreateStatusModal}
                  className="create-status-btn"
                  disabled={order.end_date}
                  style={
                    order.end_date
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}
                  }
                >
                  Create Status
                </button>
              </div>
              {statuses.length >= 9 && (
                <p
                  className="status-limit-warning"
                  style={{
                    color: "#ff4444",
                    marginTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  Maximum number of statuses (9) reached
                </p>
              )}
            </>
          )}
          {activeTab === "transaction" && (
            <>
              <h2>Transaction Information</h2>
              <div className="status-button-container">
                <button
                  onClick={() => setShowTransactionModal(true)}
                  className="view-status-btn"
                >
                  View Transactions
                </button>
                <button
                  onClick={() => setShowCreateTransactionModal(true)}
                  className="create-status-btn"
                  disabled={order.end_date}
                  style={
                    order.end_date
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}
                  }
                >
                  Create Transaction
                </button>
              </div>
            </>
          )}
          {activeTab === "contract" && (
            <>
              <h2>Contract Information</h2>
              <div className="status-button-container">
                <button
                  onClick={() => setShowViewContractsModal(true)}
                  className="view-status-btn"
                >
                  View Contracts
                </button>
              </div>
            </>
          )}
          {activeTab === "acceptance" && (
            <>
              <h2>Acceptance Information</h2>
              <div className="status-button-container">
                <button onClick={fetchAcceptances} className="view-status-btn">
                  View Acceptance
                </button>
              </div>
            </>
          )}
        </div>

        {/* Add this new section for form data */}
        {formData && (
          <div className="info-section">
            <h2>Form Information</h2>
            <InfoRow label="FORM ID" value={formData.formId} />
            <InfoRow label="AREA" value={formData.area} />
            <InfoRow label="STYLE" value={formData.style} />
            <InfoRow label="STAGE" value={formData.stage} />
            <InfoRow label="CONTACT METHOD" value={formData.contactMethod} />
          </div>
        )}
      </div>
      <div className="profile-actions">
        <button
          onClick={handleBackToDashboard}
          className="back-to-dashboard-btn"
        >
          BACK TO DASHBOARD
        </button>
        {!order.end_date && (
          <button onClick={handleUpdateEndDate} className="update-end-date-btn">
            UPDATE END DATE
          </button>
        )}
      </div>
      {showStatusModal && (
        <StatusModal statuses={statuses} onClose={toggleStatusModal} />
      )}
      {showCreateStatusModal && (
        <CreateStatusModal onClose={toggleCreateStatusModal} />
      )}
      {showTransactionModal && (
        <TransactionModal
          transactions={transactions}
          onClose={() => setShowTransactionModal(false)}
          onDelete={handleDeleteTransaction}
        />
      )}
      {showCreateTransactionModal && (
        <CreateTransactionModal
          onClose={() => setShowCreateTransactionModal(false)}
        />
      )}
      {showCreateContractModal && (
        <CreateContractModal
          onClose={() => setShowCreateContractModal(false)}
        />
      )}
      {showViewContractsModal && (
        <ViewContractsModal
          contracts={contracts}
          onClose={() => setShowViewContractsModal(false)}
          onDelete={handleDeleteContract}
        />
      )}
      {showCreateAcceptanceModal && (
        <CreateAcceptanceModal
          onClose={() => setShowCreateAcceptanceModal(false)}
        />
      )}
      {showViewAcceptanceModal && (
        <ViewAcceptanceModal
          acceptances={acceptances}
          onClose={() => setShowViewAcceptanceModal(false)}
        />
      )}
      {showUpdateAcceptanceModal && currentAcceptance && (
        <UpdateAcceptanceModal
          acceptance={currentAcceptance}
          onClose={() => setShowUpdateAcceptanceModal(false)}
        />
      )}
      {showAssignDesignStaffModal && (
        <AssignDesignStaffModal
          onClose={() => {
            setShowAssignDesignStaffModal(false);
            setPendingStatusCreation(null);
            setSelectedDesignStaff("");
          }}
          onAssign={handleDesignStaffAssign}
        />
      )}
      {showAssignConstructionStaffModal && (
        <AssignConstructionStaffModal
          onClose={() => {
            setShowAssignConstructionStaffModal(false);
            setPendingStatusCreation(null);
            setSelectedConstructionStaff("");
          }}
          onAssign={handleConstructionStaffAssign}
        />
      )}
    </div>
  );
};

export default OrderViewDashboard;
