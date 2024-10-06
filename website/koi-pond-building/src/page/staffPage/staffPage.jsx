import React, { useState } from "react";
import axios from "../../config/axios"; // Make sure to import your configured axios instance
import "./staffPage.css";

const StaffPage = () => {
  const [role, setRole] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [allRequests, setAllRequests] = useState([
    // Add some sample pending requests with timestamps
    {
      id: 1,
      from: "Consulting Team",
      to: "Design",
      message: "Sample design request",
      status: "pending",
      timestamp: new Date("2023-05-01T10:00:00").toISOString(),
    },
    {
      id: 2,
      from: "Consulting Team",
      to: "Building",
      message: "Sample building request",
      status: "pending",
      timestamp: new Date("2023-05-02T14:30:00").toISOString(),
    },
  ]);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setLoggedIn(true);
  };

  const renderLoginButtons = () => (
    <div className="login-buttons">
      <button onClick={() => handleLogin("Design")}>Design</button>
      <button onClick={() => handleLogin("Consulting")}>Consulting</button>
      <button onClick={() => handleLogin("Building")}>Building</button>
    </div>
  );

  const ConsultingDashboard = () => {
    return (
      <div>
        <h2>Welcome to the Consulting Dashboard</h2>
        <ConsultingNotifications />
        <ConsultingRequestBox setAllRequests={setAllRequests} />
        <ConsultingPendingRequests allRequests={allRequests} />
        <CreateOrderForm />
      </div>
    );
  };

  const CreateOrderForm = () => {
    const [serviceDetails, setServiceDetails] = useState({
      service_name: "",
      price: "",
      description: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setServiceDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log("Sending service data:", serviceDetails);
        const response = await axios.post(
          "http://localhost:8080/services/create",
          {
            ...serviceDetails,
            price: parseFloat(serviceDetails.price),
          }
        );

        console.log("New service created:", response.data.result);
        setServiceDetails({ service_name: "", price: "", description: "" });
        alert("Service created successfully!");
      } catch (error) {
        console.error("Error creating service:", error);
        if (error.response) {
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
          alert(
            `Failed to create service: ${
              error.response.data.message || error.response.statusText
            }`
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("No response received from server. Please try again later.");
        } else {
          console.error("Error message:", error.message);
          alert(`Error: ${error.message}`);
        }
      }
    };

    return (
      <div className="create-order-form">
        <h3>Create New Service</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="service_name"
            value={serviceDetails.service_name}
            onChange={handleInputChange}
            placeholder="Service Name"
            required
          />
          <input
            type="number"
            name="price"
            value={serviceDetails.price}
            onChange={handleInputChange}
            placeholder="Price"
            step="0.01"
            required
          />
          <textarea
            name="description"
            value={serviceDetails.description}
            onChange={handleInputChange}
            placeholder="Service Description"
            required
          />
          <button type="submit">Create Service</button>
        </form>
      </div>
    );
  };

  const renderRoleContent = () => {
    switch (role) {
      case "Design":
        return (
          <div>
            <h2>Welcome to the Design Dashboard</h2>
            <DesignRequestBox
              allRequests={allRequests}
              setAllRequests={setAllRequests}
            />
          </div>
        );
      case "Consulting":
        return <ConsultingDashboard />;
      case "Building":
        return (
          <div>
            <h2>Welcome to the Building Dashboard</h2>
            <BuildingRequestBox
              allRequests={allRequests}
              setAllRequests={setAllRequests}
            />
          </div>
        );
      default:
        return null;
    }
  };

  // Updated component for Consulting notifications
  const ConsultingNotifications = () => {
    const [requests, setRequests] = useState([
      {
        id: 1,
        customer: "John Doe",
        message: "Need advice on kitchen renovation",
        timestamp: new Date("2023-05-03T09:15:00").toISOString(),
      },
      {
        id: 2,
        customer: "Jane Smith",
        message: "Requesting consultation for bathroom remodel",
        timestamp: new Date("2023-05-03T11:30:00").toISOString(),
      },
    ]);

    return (
      <div className="consulting-notifications">
        <h3>Customer Requests</h3>
        <div className="request-list">
          {requests.map((request) => (
            <div key={request.id} className="request-item">
              <p>
                <strong>{request.customer}:</strong> {request.message}
              </p>
              <p className="timestamp">
                {new Date(request.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // New component for Consulting request box
  const ConsultingRequestBox = ({ setAllRequests }) => {
    const [requestType, setRequestType] = useState("Design");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      const newRequest = {
        id: Date.now(),
        from: "Consulting Team",
        to: requestType,
        message: message,
        status: "pending",
        timestamp: new Date().toISOString(), // Add timestamp
      };
      setAllRequests((prevRequests) => [...prevRequests, newRequest]);
      setMessage("");
      console.log("New request added:", newRequest);
    };

    return (
      <div className="consulting-request-box">
        <h3>Send Request to Staff</h3>
        <form onSubmit={handleSubmit}>
          <select
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
          >
            <option value="Design">Design</option>
            <option value="Building">Building</option>
          </select>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your request here..."
            required
          />
          <button type="submit">Send Request</button>
        </form>
      </div>
    );
  };

  // Updated component for Design request box
  const DesignRequestBox = ({ allRequests, setAllRequests }) => {
    const designRequests = allRequests.filter(
      (request) => request.to === "Design"
    );

    const handleAccept = (id) => {
      setAllRequests(
        allRequests.map((request) =>
          request.id === id ? { ...request, status: "accepted" } : request
        )
      );
    };

    const handleReject = (id) => {
      setAllRequests(
        allRequests.map((request) =>
          request.id === id ? { ...request, status: "rejected" } : request
        )
      );
    };

    return (
      <div className="design-request-box">
        <h3>Incoming Design Requests</h3>
        <div className="request-list">
          {designRequests.map((request) => (
            <div key={request.id} className="request-item">
              <p>
                <strong>From: {request.from}</strong>
              </p>
              <p>{request.message}</p>
              <p>Status: {request.status}</p>
              <p className="timestamp">
                {new Date(request.timestamp).toLocaleString()}
              </p>
              {request.status === "pending" && (
                <div className="request-actions">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="accept-btn"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // New component for Building request box
  const BuildingRequestBox = ({ allRequests, setAllRequests }) => {
    const buildingRequests = allRequests.filter(
      (request) => request.to === "Building"
    );

    const handleAccept = (id) => {
      setAllRequests(
        allRequests.map((request) =>
          request.id === id ? { ...request, status: "accepted" } : request
        )
      );
    };

    const handleReject = (id) => {
      setAllRequests(
        allRequests.map((request) =>
          request.id === id ? { ...request, status: "rejected" } : request
        )
      );
    };

    return (
      <div className="building-request-box">
        <h3>Incoming Building Requests</h3>
        <div className="request-list">
          {buildingRequests.map((request) => (
            <div key={request.id} className="request-item">
              <p>
                <strong>From: {request.from}</strong>
              </p>
              <p>{request.message}</p>
              <p>Status: {request.status}</p>
              <p className="timestamp">
                {new Date(request.timestamp).toLocaleString()}
              </p>
              {request.status === "pending" && (
                <div className="request-actions">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="accept-btn"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ConsultingPendingRequests = ({ allRequests }) => {
    const pendingRequests = allRequests.filter(
      (request) =>
        request.from === "Consulting Team" && request.status === "pending"
    );

    console.log("Pending requests:", pendingRequests);

    return (
      <div className="consulting-pending-requests">
        <h3>Pending Requests</h3>
        {pendingRequests.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          <div className="request-list">
            {pendingRequests.map((request) => (
              <div key={request.id} className="request-item">
                <p>
                  <strong>To: {request.to} Team</strong>
                </p>
                <p>{request.message}</p>
                <p>Status: {request.status}</p>
                <p className="timestamp">
                  {new Date(request.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="staff-page">
      <h1>Renovation Co. Staff Portal</h1>
      {!loggedIn ? (
        <div className="login-section">
          <h2>Welcome to the Staff Portal</h2>
          <p>Please select your role to log in:</p>
          {renderLoginButtons()}
        </div>
      ) : (
        <div className="dashboard">
          <h2>Welcome, {role} Team</h2>
          {renderRoleContent()}
        </div>
      )}
    </div>
  );
};

export default StaffPage;
