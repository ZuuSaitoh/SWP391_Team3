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
} from "@fortawesome/free-solid-svg-icons";

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
        setStatuses(
          statuses.map((status) =>
            status.statusId === statusId ? response.data.result : status
          )
        );
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
                {transaction.depositMethod !== "Cash" &&
                  transaction.depositMethod !== "VNPay" && (
                    <button
                      onClick={() => handlePayByCash(transaction.transactionId)}
                      className="pay-cash-btn"
                    >
                      <FontAwesomeIcon icon={faMoneyBillWave} /> Pay by Cash
                    </button>
                  )}
                <button
                  onClick={() => onDelete(transaction.transactionId)}
                  className="delete-btn"
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
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
      depositMethod: "",
    });

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      if (id === "deposit") {
        // Remove non-digit characters and convert to number
        const numericValue = value.replace(/[^0-9]/g, "");
        // Format as VND
        const formattedValue = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(numericValue);
        setLocalTransactionData((prevData) => ({
          ...prevData,
          [id]: formattedValue,
        }));
      } else {
        setLocalTransactionData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Convert the formatted VND string back to a number for submission
      const depositValue = parseFloat(
        localTransactionData.deposit.replace(/[^0-9]/g, "")
      );
      handleCreateTransaction({
        ...localTransactionData,
        deposit: depositValue,
      });
    };

    return (
      <div className="status-modal-overlay" onClick={onClose}>
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
                placeholder="0 ₫"
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
              />
            </div>
            <div>
              <label htmlFor="depositMethod">Deposit Method:</label>
              <select
                id="depositMethod"
                value={localTransactionData.depositMethod}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a method</option>
                <option value="VNPay">VNPay</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <div>
              <label htmlFor="depositPersonId">
                Deposit Person ID (Customer ID):
              </label>
              <input
                type="number"
                id="depositPersonId"
                value={order.customer.id}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="transactionNumber">
                Transaction Number (Order ID):
              </label>
              <input
                type="text"
                id="transactionNumber"
                value={orderId}
                readOnly
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
            </div>
          ))}
          <button onClick={onClose} className="close-modal-btn">
            Close
          </button>
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
        staffId: selectedStaffId,
      });
    };

    return (
      <div className="status-modal-overlay" onClick={onClose}>
        <div
          className="status-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
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
                style={{ width: "100%", resize: "vertical" }}
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
      <span className="info-value">{value}</span>
    </div>
  );

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
                >
                  Create Status
                </button>
              </div>
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
                >
                  Create Transaction
                </button>
              </div>
            </>
          )}
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
    </div>
  );
};

export default OrderViewDashboard;
