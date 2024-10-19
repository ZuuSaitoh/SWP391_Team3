import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, Image, Tabs, message } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";

function ConstructionStaffPage() {
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [staffStatuses, setStaffStatuses] = useState([]);
  const [updateStatusModalVisible, setUpdateStatusModalVisible] =
    useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const staffId = localStorage.getItem("staffId");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await api.get(
        `http://localhost:8080/orders/staff/fetchAll/${staffId}`
      );
      setOrders(response.data.result);
    } catch (err) {
      console.error(err);
      toast.error(err.response ? err.response.data : "An error occurred");
    }
  };

  const handleViewOrderDetail = async (orderId) => {
    try {
      const response = await api.get(`http://localhost:8080/orders/${orderId}`);
      setSelectedOrder(response.data);
      setIsModalVisible(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch order details");
    }
  };

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
        setBookings(response.data.result);
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
          status: true, // or whatever data the server expects
        }
      );
      if (response.data.code === 1000) {
        message.success("Booking status updated successfully");
        fetchBookings(); // Refresh the bookings list
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

  useEffect(() => {
    if (staffId) {
      fetchOrders();
      fetchBookings();
    } else {
      toast.error("Staff ID not found. Please log in again.");
    }
  }, [staffId]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: ["customer", "username"],
      key: "customer",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) =>
        date ? new Date(date).toLocaleString() : "Not completed",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => rating || "Not rated",
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
        <Button onClick={() => handleViewOrderDetail(record.orderId)}>
          View Order Detail
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
      render: (price) => `$${price.toFixed(2)}`,
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

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <div>
        <h2>Order Details</h2>
        <p>
          <strong>Order ID:</strong> {selectedOrder.orderId}
        </p>
        <p>
          <strong>Customer:</strong> {selectedOrder.customer.username}
        </p>
        <p>
          <strong>Staff:</strong> {selectedOrder.staff.username}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(selectedOrder.order_date).toLocaleString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {selectedOrder.end_date
            ? new Date(selectedOrder.end_date).toLocaleString()
            : "Not completed"}
        </p>
        <p>
          <strong>Rating:</strong> {selectedOrder.rating || "Not rated"}
        </p>
        <p>
          <strong>Feedback:</strong> {selectedOrder.feedback || "No feedback"}
        </p>
        <p>
          <strong>Feedback Date:</strong>{" "}
          {selectedOrder.feedback_date
            ? new Date(selectedOrder.feedback_date).toLocaleString()
            : "N/A"}
        </p>

        <h3>Customer Details</h3>
        <p>
          <strong>Name:</strong> {selectedOrder.customer.fullName}
        </p>
        <p>
          <strong>Email:</strong> {selectedOrder.customer.mail}
        </p>
        <p>
          <strong>Address:</strong> {selectedOrder.customer.address}
        </p>
        <p>
          <strong>Phone:</strong> {selectedOrder.customer.phone}
        </p>

        <h3>Staff Details</h3>
        <p>
          <strong>Name:</strong> {selectedOrder.staff.fullName}
        </p>
        <p>
          <strong>Email:</strong> {selectedOrder.staff.mail}
        </p>
        <p>
          <strong>Role:</strong> {selectedOrder.staff.role}
        </p>
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: "Orders",
      children: (
        <Table dataSource={orders} columns={columns} rowKey="orderId" />
      ),
    },
    {
      key: "2",
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
        <Button onClick={fetchStatusesByStaffId}>View My Statuses</Button>
      </div>

      <Tabs defaultActiveKey="1" items={items} />

      <Modal
        title="Order Details"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        {renderOrderDetails()}
      </Modal>

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
