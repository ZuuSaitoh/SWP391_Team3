import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

axios.defaults.withCredentials = true;

const StatusViewComponent = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatuses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/status/fetchAll");
      if (response.data.code === 9999) {
        setStatuses(response.data.result);
      } else {
        setError("Failed to fetch statuses");
      }
    } catch (err) {
      console.error("Error fetching statuses:", err);
      setError("An error occurred while fetching statuses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <FontAwesomeIcon icon={faSpinner} spin /> Loading statuses...
      </div>
    );
  if (error)
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
      </div>
    );

  const getStatusColor = (complete) => {
    return complete ? "#2980b9" : "#3498db";
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // Four boxes per row
    gap: '20px',
  };

  const itemStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const headerStyle = (complete) => ({
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    backgroundColor: getStatusColor(complete),
  });

  const bodyStyle = {
    padding: '15px',
  };

  const infoRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        {statuses.map((status, index) => (
          <div key={status.statusId} style={itemStyle}>
            <div style={headerStyle(status.complete)}>
              <h3 style={{ margin: 0 }}>Status {index + 1}</h3>
              {status.complete ? (
                <FontAwesomeIcon icon={faCheckCircle} />
              ) : (
                <FontAwesomeIcon icon={faTimesCircle} />
              )}
            </div>
            <div style={bodyStyle}>
              <div style={infoRowStyle}>
                <span style={{ fontWeight: 'bold' }}>Status ID:</span>
                <span>{status.statusId}</span>
              </div>
              <div style={infoRowStyle}>
                <span style={{ fontWeight: 'bold' }}>Order ID:</span>
                <span>{status.order.orderId}</span>
              </div>
              <div style={infoRowStyle}>
                <span style={{ fontWeight: 'bold' }}>Customer:</span>
                <span>{status.order.customer.username}</span>
              </div>
              <div style={infoRowStyle}>
                <span style={{ fontWeight: 'bold' }}>Description:</span>
                <span>{status.statusDescription}</span>
              </div>
              <div style={infoRowStyle}>
                <span style={{ fontWeight: 'bold' }}>Date:</span>
                <span>{new Date(status.statusDate).toLocaleString()}</span>
              </div>
              <div style={infoRowStyle}>
                <span style={{ fontWeight: 'bold' }}>Complete:</span>
                <span>{status.complete ? "Yes" : "No"}</span>
              </div>
              <div style={infoRowStyle}>
                <span style={{ fontWeight: 'bold' }}>Updates:</span>
                <span>{status.numberOfUpdate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusViewComponent;