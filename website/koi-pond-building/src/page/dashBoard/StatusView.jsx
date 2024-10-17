import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner, faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

const StatusViewComponent = ({ staffId }) => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatuses = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/status/fetchAll/staff/${staffId}`);
      if (response.data.code === 9999) {
        setStatuses(response.data.result);
      } else {
        setError('Failed to fetch statuses');
      }
    } catch (err) {
      console.error('Error fetching statuses:', err);
      setError('An error occurred while fetching statuses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (staffId) {
      fetchStatuses();
    }
  }, [staffId]);

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

  if (loading) return <div className="loading"><FontAwesomeIcon icon={faSpinner} spin /> Loading statuses...</div>;
  if (error) return <div className="error"><FontAwesomeIcon icon={faExclamationTriangle} /> {error}</div>;

  const getStatusColor = (complete) => {
    return complete ? '#2980b9' : '#3498db';
  };

  return (
    <div className="status-view">
      <div className="status-container">
        {statuses.map((status) => (
          <div key={status.statusId} className="status-item" style={{ borderColor: getStatusColor(status.complete) }}>
            <div className="status-header" style={{ backgroundColor: getStatusColor(status.complete) }}>
              <h3>Status ID: {status.statusId}</h3>
              {status.complete ? 
                <FontAwesomeIcon icon={faCheckCircle} className="status-icon complete" /> : 
                <FontAwesomeIcon icon={faTimesCircle} className="status-icon incomplete" />
              }
            </div>
            <div className="status-body">
              <div className="info-row">
                <span className="info-label">Order ID:</span>
                <span className="info-value">{status.order.orderId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Customer:</span>
                <span className="info-value">{status.order.customer.username}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Description:</span>
                <span className="info-value">{status.statusDescription}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Date:</span>
                <span className="info-value">{new Date(status.statusDate).toLocaleString()}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Complete:</span>
                <span className="info-value">{status.complete ? 'Yes' : 'No'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Updates:</span>
                <span className="info-value">{status.numberOfUpdate}</span>
              </div>
            </div>
            <div className="status-footer">
              <button onClick={() => handleDeleteStatus(status.statusId)} className="delete-btn">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusViewComponent;
