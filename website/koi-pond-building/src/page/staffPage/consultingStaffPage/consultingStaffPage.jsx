import { Button, Table, Modal, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";

function ConsultingStaffPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get the staff ID from local storage
  const staffId = localStorage.getItem('staffId');

  const fetchOrders = async () => {
    try {
      const response = await api.get(
        `http://localhost:8080/orders/staff/fetchAll/${staffId}`
      );
      console.log(response);
      setOrders(response.data.result);
    } catch (err) {
      console.error(err);
      toast.error(err.response ? err.response.data : "An error occurred");
    }
  };

  const handleSubmit = async (newOrder) => {
    try {
      setLoading(true);
      // Add the staff ID to the new order
      newOrder.staff_id = staffId;
      const response = await api.post(
        "http://localhost:8080/orders/create",
        newOrder
      );
      toast.success("Order created successfully");
      fetchOrders();
      form.resetFields();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response.data);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    if (staffId) {
      fetchOrders();
    } else {
      toast.error("Staff ID not found. Please log in again.");
      // Redirect to login page or handle this case appropriately
    }
  }, [staffId]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
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
        <Button onClick={() => handleViewOrderDetail(record.order_id)}>
          View Order Detail
        </Button>
      ),
    },
  ];

  const navigate = useNavigate();

  const backToHomepage = () => {
    navigate("/");
  };

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <div>
        <p>
          <strong>Order ID:</strong> {selectedOrder.order_id}
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

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add new order</Button>
      <Button onClick={backToHomepage} style={{ marginLeft: "10px" }}>
        Return to Homepage
      </Button>
      <Table dataSource={orders} columns={columns} rowKey="order_id" />
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
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Create New Order"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Customer ID"
            name="customer_id"
            rules={[{ required: true, message: "Customer ID is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ConsultingStaffPage;
