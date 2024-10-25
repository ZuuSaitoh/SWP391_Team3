import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Layout,
  Menu,
  theme,
  Breadcrumb,
  Upload,
  Select,
} from "antd";
import {
  FileOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  HomeOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../../utils/file";

const { Header, Content, Sider } = Layout;

function ConsultingStaffPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [staffStatuses, setStaffStatuses] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [acceptanceTests, setAcceptanceTests] = useState([]);
  const [showAcceptanceModal, setShowAcceptanceModal] = useState(false);
  const [acceptanceForm] = Form.useForm();
  const [editingAcceptance, setEditingAcceptance] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [availableStaff, setAvailableStaff] = useState([]);
  const [showContractModal, setShowContractModal] = useState(false);
  const [contractForm] = Form.useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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

  const handleSubmit = async (newOrder) => {
    try {
      setLoading(true);
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

  const fetchAcceptanceTests = async () => {
    try {
      const response = await api.get(`/acceptancetests/fetchAll`);
      console.log("Fetched acceptance tests:", response.data);

      setAcceptanceTests(response.data.result);
    } catch (err) {
      console.error("Error fetching acceptance tests:", err);
      toast.error(
        "Error fetching acceptance tests: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const fetchAvailableStaff = async () => {
    try {
      const response = await api.get("/staffs/fetchAll");
      setAvailableStaff(response.data.result);
    } catch (err) {
      console.error("Error fetching staff:", err);
      toast.error(
        "Error fetching staff: " + (err.response?.data?.message || err.message)
      );
    }
  };
  useEffect(() => {
    if (!staffId) {
      toast.error("Staff ID not found. Please log in again.");
      navigate("/login");
    } else {
      fetchOrders();
      fetchAcceptanceTests();
      fetchAvailableStaff();
    }
  }, [staffId, navigate]);

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
        <Button
          onClick={() => handleViewOrderDetail(record.orderId)}
          type="primary"
        >
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

  const acceptanceColumns = [
    {
      title: "Acceptance Test ID",
      dataIndex: "acceptanceTestId",
      key: "acceptanceTestId",
    },
    {
      title: "Order ID",
      dataIndex: ["order", "orderId"],
      key: "orderId",
    },
    {
      title: "Consulting Staff",
      dataIndex: ["consultingStaff", "fullName"],
      key: "consultingStaff",
      render: (text, record) =>
        record.consultingStaff?.fullName || "Not assigned",
    },
    {
      title: "Design Staff",
      dataIndex: ["designStaff", "fullName"],
      key: "designStaff",
      render: (text, record) => record.designStaff?.fullName || "Not assigned",
    },
    {
      title: "Construction Staff",
      dataIndex: ["constructionStaff", "fullName"],
      key: "constructionStaff",
      render: (text, record) =>
        record.constructionStaff?.fullName || "Not assigned",
    },
    {
      title: "Finish Date",
      dataIndex: "finishDate",
      key: "finishDate",
      render: (date) => (date ? new Date(date).toLocaleString() : "Not set"),
    },
    {
      title: "File",
      dataIndex: "imageData",
      key: "file",
      render: (imageData, record) => {
        if (imageData) {
          // Extract file name from the URL
          const fileName =
            imageData.split("/").pop() || `file_${record.acceptanceTestId}`;
          return (
            <a
              href={imageData}
              download={fileName}
              onClick={(e) => {
                e.preventDefault();
                window.open(imageData, "_blank");
              }}
            >
              Download File
            </a>
          );
        }
        return "No file";
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleEditAcceptance(record)} type="primary">
          Edit
        </Button>
      ),
    },
  ];

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

  const menuItems = [
    {
      key: "orders",
      icon: <FileOutlined />,
      label: "Orders",
    },
    {
      key: "acceptance",
      icon: <CheckCircleOutlined />,
      label: "Acceptance",
    },
  ];

  const handleSubmitAcceptance = async (values) => {
    try {
      setLoading(true);
      let imageUrl = "";

      if (
        values.imageData &&
        values.imageData.length > 0 &&
        values.imageData[0].originFileObj
      ) {
        try {
          imageUrl = await uploadFile(values.imageData[0].originFileObj);
          console.log("File uploaded successfully, URL:", imageUrl);
        } catch (uploadError) {
          console.error("Error uploading file:", uploadError);
          toast.error("Failed to upload file. Please try again.");
          setLoading(false);
          return;
        }
      }

      const acceptanceData = {
        orderId: parseInt(values.orderId),
        consultingStaff: parseInt(staffId),
        designStaff: parseInt(values.designStaff),
        constructionStaff: parseInt(values.constructionStaff),
        imageData: imageUrl,
        description: values.description,
      };

      console.log("Sending acceptance data:", acceptanceData);

      const response = await api.post(
        "/acceptancetests/create",
        acceptanceData
      );

      console.log("Full API response:", response);

      if (response.status === 200) {
        toast.success("Acceptance test created successfully");
        fetchAcceptanceTests();
        setShowAcceptanceModal(false);
        acceptanceForm.resetFields();
      } else {
        console.error("Unexpected status code:", response.status);
        toast.error(
          `Failed to create acceptance test: Unexpected status code ${response.status}`
        );
      }
    } catch (err) {
      console.error("Error creating acceptance test:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        toast.error(
          "Error creating acceptance test: " +
            (err.response.data.message || JSON.stringify(err.response.data))
        );
      } else if (err.request) {
        console.error("No response received:", err.request);
        toast.error(
          "No response from server. Please check your connection and try again."
        );
      } else {
        console.error("Error details:", err.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditAcceptance = (record) => {
    setEditingAcceptance(record);
    editForm.setFieldsValue({
      description: record.description,
    });
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    try {
      setLoading(true);
      let imageUrl = editingAcceptance.imageData;

      if (
        values.imageData &&
        values.imageData.length > 0 &&
        values.imageData[0].originFileObj
      ) {
        try {
          imageUrl = await uploadFile(values.imageData[0].originFileObj);
        } catch (uploadError) {
          console.error("Error uploading file:", uploadError);
          toast.error("Failed to upload file. Please try again.");
          setLoading(false);
          return;
        }
      }

      const updatedData = {
        imageData: imageUrl,
        description: values.description,
      };

      const response = await api.put(
        `/acceptancetests/update/${editingAcceptance.acceptanceTestId}`,
        updatedData
      );

      if (response.status === 200) {
        toast.success("Acceptance test updated successfully");
        fetchAcceptanceTests();
        setIsEditModalVisible(false);
        editForm.resetFields();
      } else {
        toast.error("Failed to update acceptance test");
      }
    } catch (err) {
      console.error("Error updating acceptance test:", err);
      toast.error("An error occurred while updating the acceptance test");
    } finally {
      setLoading(false);
    }
  };

  const handleAddContract = () => {
    setShowContractModal(true);
  };

  const handleSubmitContract = async (values) => {
    try {
      setLoading(true);
      let imageUrl = "";

      if (
        values.imageData &&
        values.imageData.length > 0 &&
        values.imageData[0].originFileObj
      ) {
        imageUrl = await uploadFile(values.imageData[0].originFileObj);
      }

      const contractData = {
        orderId: values.orderId,
        uploadStaff: staffId,
        imageData: imageUrl,
        description: values.description,
      };

      const response = await api.post("/contracts/create", contractData);
      toast.success("Contract created successfully");
      setShowContractModal(false);
      contractForm.resetFields();
      // Optionally, you can fetch updated data here if needed
    } catch (err) {
      console.error("Error creating contract:", err);
      toast.error("An error occurred while creating the contract");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <>
            <div style={{ marginBottom: 16 }}>
              <Button
                onClick={() => setShowModal(true)}
                style={{ marginRight: 8 }}
                type="primary"
              >
                Add new order
              </Button>
              <Button
                onClick={fetchStatusesByStaffId}
                type="primary"
                style={{ marginRight: 8 }}
              >
                View My Statuses
              </Button>
              <Button
                onClick={handleAddContract}
                type="primary"
                icon={<FileAddOutlined />}
              >
                Add New Contract
              </Button>
            </div>
            <Table dataSource={orders} columns={columns} rowKey="orderId" />
          </>
        );
      case "acceptance":
        return (
          <>
            <div style={{ marginBottom: 16 }}>
              <Button
                onClick={() => setShowAcceptanceModal(true)}
                type="primary"
              >
                Add New Acceptance
              </Button>
            </div>
            <Table
              dataSource={acceptanceTests}
              columns={acceptanceColumns}
              rowKey="acceptanceTestId"
              scroll={{ x: true }}
            />
          </>
        );
      default:
        return null;
    }
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("staffId");
    // Add any other items you want to remove from localStorage
    navigate("/login-staff");
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={[{ key: "1", label: "Consulting Staff Dashboard" }]}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </div>
        <div>
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={handleReturnHome}
            style={{ marginRight: "16px" }}
          >
            Return to Homepage
          </Button>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={menuItems}
            onSelect={({ key }) => setActiveTab(key)}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 64px)", // Subtract header height
          }}
        >
          <Breadcrumb
            items={[
              { title: "Home" },
              { title: "Consulting Staff" },
              { title: activeTab === "orders" ? "Orders" : "Acceptance" },
            ]}
            style={{
              margin: "16px 0",
            }}
          />
          <Content
            style={{
              padding: 24,
              flex: 1,
              overflow: "auto",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>

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
        title="Create New Acceptance Test"
        open={showAcceptanceModal}
        onCancel={() => setShowAcceptanceModal(false)}
        footer={null}
      >
        <Form
          form={acceptanceForm}
          onFinish={handleSubmitAcceptance}
          // layout="horizontal"
          labelCol={{
            span: 24,
          }}
        >
          <Form.Item
            name="orderId"
            label="Order ID"
            rules={[{ required: true, message: "Please select an order" }]}
          >
            <Select
              placeholder="Select an order"
              options={orders.map((order) => ({
                value: order.orderId,
                label: `Order ${order.orderId}`,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="designStaff"
            label="Design Staff"
            rules={[
              { required: true, message: "Please select a design staff" },
            ]}
          >
            <Select
              placeholder="Select design staff"
              options={availableStaff
                .filter((staff) => staff.role === "Design Staff")
                .map((staff) => ({
                  value: staff.staffId,
                  label: `${staff.fullName} (ID: ${staff.staffId})`,
                }))}
            />
          </Form.Item>
          <Form.Item
            name="constructionStaff"
            label="Construction Staff"
            rules={[
              { required: true, message: "Please select a construction staff" },
            ]}
          >
            <Select
              placeholder="Select construction staff"
              options={availableStaff
                .filter((staff) => staff.role === "Construction Staff")
                .map((staff) => ({
                  value: staff.staffId,
                  label: `${staff.fullName} (ID: ${staff.staffId})`,
                }))}
            />
          </Form.Item>
          <Form.Item
            name="imageData"
            label="Upload File"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to upload file</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Acceptance
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Acceptance Test"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} onFinish={handleEditSubmit} layout="vertical">
          <Form.Item
            name="imageData"
            label="Upload New File"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>
                Click to upload new file
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Acceptance
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add New Contract Modal */}
      <Modal
        title="Create New Contract"
        open={showContractModal}
        onCancel={() => setShowContractModal(false)}
        footer={null}
      >
        <Form
          form={contractForm}
          onFinish={handleSubmitContract}
          layout="vertical"
        >
          <Form.Item
            name="orderId"
            label="Order ID"
            rules={[{ required: true, message: "Please select an order" }]}
          >
            <Select
              placeholder="Select an order"
              options={orders.map((order) => ({
                value: order.orderId,
                label: `Order ${order.orderId}`,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="imageData"
            label="Upload File"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to upload file</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Contract
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ToastContainer />
    </Layout>
  );
}

export default ConsultingStaffPage;
