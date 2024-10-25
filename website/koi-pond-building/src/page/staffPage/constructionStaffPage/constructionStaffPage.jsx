import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Tabs, message } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";

function ConstructionStaffPage() {
  const [bookings, setBookings] = useState([]);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [staffStatuses, setStaffStatuses] = useState([]);
  const [updateStatusModalVisible, setUpdateStatusModalVisible] =
    useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const staffId = localStorage.getItem("staffId");
  const navigate = useNavigate();

  const fetchStatusesByStaffId = async () => {
    try {
      const response = await api.get(`/status/fetchAll/staff/${staffId}`);
      if (response.data.code === 9999) {
        setStaffStatuses(response.data.result);
        setStatusModalVisible(true);
      } else {
        console.warn(
          "Unexpected response when fetching statuses:",
          response.data
        );
        toast.warning("Unexpected response when fetching statuses.");
      }
    } catch (err) {
      console.error("Error fetching statuses:", err);
      toast.error(
        "Error fetching statuses: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await api.get(
        `http://localhost:8080/bookingservices/fetchAll/staff/${staffId}`
      );
      if (response.data.code === 9999) {
        const sortedBookings = response.data.result.sort(
          (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
        );
        setBookings(sortedBookings);
      } else {
        console.warn(
          "Unexpected response when fetching bookings:",
          response.data
        );
        toast.warning("Unexpected response when fetching bookings.");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      toast.error(
        "Error fetching bookings: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const handleUpdateStatus = async (bookingId) => {
    try {
      const response = await api.put(
        `http://localhost:8080/bookingservices/updateStatus/${bookingId}`,
        {
          status: true,
        }
      );
      if (response.data.code === 1000) {
        message.success("Booking status updated successfully");
        fetchBookings();
      } else {
        message.error("Failed to update booking status");
      }
    } catch (err) {
      console.error("Error updating booking status:", err);
      message.error(
        "Error updating booking status: " +
          (err.response?.data?.message || err.message)
      );
    }
    setUpdateStatusModalVisible(false);
  };

  const handleUpdateStatusInView = async (statusId) => {
    try {
      const response = await api.patch(
        `http://localhost:8080/status/update-number-of-update/${statusId}`
      );
      if (response.data.code === 999) {
        setStaffStatuses((prevStatuses) =>
          prevStatuses.map((status) =>
            status.statusId === statusId ? response.data.result : status
          )
        );
        toast.success("Status updated successfully");
      } else if (response.data.code === 1027) {
        toast.error(
          "You can't change the status because this status has been set to done!"
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(
        "Error updating status: " + (err.response?.data?.message || err.message)
      );
    }
  };

  useEffect(() => {
    if (staffId) {
      fetchBookings();
    } else {
      toast.error("Staff ID not found. Please log in again.");
    }
  }, [staffId]);

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingServiceId",
      key: "bookingServiceId",
    },
    {
      title: "Customer",
      dataIndex: ["customer", "fullName"],
      key: "customerName",
    },
    {
      title: "Service",
      dataIndex: ["service", "serviceName"],
      key: "serviceName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toFixed(2)}VND`,
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Finish Date",
      dataIndex: "finishDate",
      key: "finishDate",
      render: (date) =>
        date ? new Date(date).toLocaleString() : "Not completed",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Completed" : "Pending"),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (feedback) => feedback || "No feedback",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          onClick={() => {
            setSelectedBooking(record);
            setUpdateStatusModalVisible(true);
          }}
          disabled={record.status}
        >
          Update Status
        </Button>
      ),
    },
  ];

  const statusColumns = [
    {
      title: "Order ID",
      dataIndex: ["order", "orderId"],
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: ["order", "customer", "fullName"],
      key: "customerName",
    },
    {
      title: "Customer Email",
      dataIndex: ["order", "customer", "mail"],
      key: "customerEmail",
    },
    {
      title: "Customer Phone",
      dataIndex: ["order", "customer", "phone"],
      key: "customerPhone",
    },
    {
      title: "Customer Address",
      dataIndex: ["order", "customer", "address"],
      key: "customerAddress",
    },
    {
      title: "Status Description",
      dataIndex: "statusDescription",
      key: "statusDescription",
    },
    {
      title: "Status Date",
      dataIndex: "statusDate",
      key: "statusDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Complete",
      dataIndex: "complete",
      key: "complete",
      render: (complete) => (complete ? "Yes" : "No"),
    },
    {
      title: "Number of Updates",
      dataIndex: "numberOfUpdate",
      key: "numberOfUpdate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleUpdateStatusInView(record.statusId)}>
          Update Status
        </Button>
      ),
    },
  ];

  const bookingColumns = [
    {
      title: "Booking ID",
      dataIndex: "bookingServiceId",
      key: "bookingServiceId",
    },
    {
      title: "Customer",
      dataIndex: ["customer", "fullName"],
      key: "customerName",
    },
    {
      title: "Service",
      dataIndex: ["service", "serviceName"],
      key: "serviceName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toFixed(2)}VND`,
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Finish Date",
      dataIndex: "finishDate",
      key: "finishDate",
      render: (date) =>
        date ? new Date(date).toLocaleString() : "Not completed",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Completed" : "Pending"),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (feedback) => feedback || "No feedback",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          onClick={() => {
            setSelectedBooking(record);
            setUpdateStatusModalVisible(true);
          }}
          disabled={record.status}
        >
          Update Status
        </Button>
      ),
    },
  ];

  const backToHomepage = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // Clear the staffId from localStorage
    localStorage.removeItem("staffId");
    navigate("/login-staff"); // Adjust this path as needed
    toast.success("Logged out successfully");
  };

  const items = [
    {
      key: "1",
      label: "Bookings",
      children: (
        <Table
          dataSource={bookings}
          columns={bookingColumns}
          rowKey="bookingServiceId"
        />
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "20px",
        }}
      >
        <Button onClick={backToHomepage} style={{ marginRight: "10px" }}>
          Return to Homepage
        </Button>
        <Button
          onClick={fetchStatusesByStaffId}
          style={{ marginRight: "10px" }}
        >
          View My Statuses
        </Button>
        <Button onClick={handleLogout} type="primary" danger>
          Logout
        </Button>
      </div>

      <Tabs defaultActiveKey="1" items={items} />

      <Modal
        title="My Statuses"
        visible={statusModalVisible}
        onCancel={() => setStatusModalVisible(false)}
        footer={null}
        width={1200}
      >
        <Table
          dataSource={staffStatuses}
          columns={statusColumns}
          rowKey="statusId"
          scroll={{ x: true }}
        />
      </Modal>

      <Modal
        title="Update Booking Status"
        visible={updateStatusModalVisible}
        onOk={() => handleUpdateStatus(selectedBooking?.bookingServiceId)}
        onCancel={() => setUpdateStatusModalVisible(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to update the status of this booking?</p>
        <p>Booking ID: {selectedBooking?.bookingServiceId}</p>
        <p>Customer: {selectedBooking?.customer?.fullName}</p>
        <p>Service: {selectedBooking?.service?.serviceName}</p>
      </Modal>
    </div>
  );
}

export default ConstructionStaffPage;
