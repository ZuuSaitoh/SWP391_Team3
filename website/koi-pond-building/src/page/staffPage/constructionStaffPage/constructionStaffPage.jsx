import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Tabs,
  message,
  Layout,
  Menu,
  theme,
  Breadcrumb,
} from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

function ConstructionStaffPage() {
  const [bookings, setBookings] = useState([]);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [staffStatuses, setStaffStatuses] = useState([]);
  const [updateStatusModalVisible, setUpdateStatusModalVisible] =
    useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  const staffId = localStorage.getItem("staffId");
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      const response = await api.put(`/status/update-complete/${statusId}`, {
        complete: true,
        rejectReason: "",
      });

      if (response.data.code === 999) {
        setStaffStatuses((prevStatuses) =>
          prevStatuses.map((status) =>
            status.statusId === statusId
              ? { ...status, complete: true }
              : status
          )
        );
        toast.success("Status updated successfully");
      } else if (response.data.code === 1025) {
        toast.error("Status does not exist");
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
      render: (complete, record) => (
        <Button
          onClick={() => handleUpdateStatusInView(record.statusId)}
          type={complete ? "primary" : "default"}
          disabled={complete}
        >
          {complete ? "Completed" : "Update Complete"}
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
      title: "Customer Name",
      dataIndex: ["customer", "fullName"],
      key: "customerName",
    },
    {
      title: "Customer Phone",
      dataIndex: ["customer", "phone"],
      key: "customerPhone",
    },
    {
      title: "Customer Address",
      dataIndex: ["customer", "address"],
      key: "customerAddress",
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

  const handleLogout = () => {
    localStorage.removeItem("staffId");
    localStorage.removeItem("staffAuthToken");
    navigate("/login-staff");
    toast.success("Logged out successfully");
  };

  const items = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "Bookings",
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "My Statuses",
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const handleMenuClick = (key) => {
    setSelectedMenuItem(key);
    switch (key) {
      case "1":
        // Already on Bookings page
        break;
      case "2":
        fetchStatusesByStaffId();
        break;
      case "3":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return (
          <Table
            dataSource={bookings}
            columns={bookingColumns}
            rowKey="bookingServiceId"
            scroll={{ x: true }} // Add this line to enable horizontal scrolling
          />
        );
      case "2":
        return (
          <Table
            dataSource={staffStatuses}
            columns={statusColumns}
            rowKey="statusId"
            scroll={{ x: true }}
          />
        );
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Construction Staff</Breadcrumb.Item>
            <Breadcrumb.Item>
              {items.find((item) => item.key === selectedMenuItem)?.label}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Koi Pond Building ©{new Date().getFullYear()} Created by Your Company
        </Footer>
      </Layout>

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
    </Layout>
  );
}

export default ConstructionStaffPage;
