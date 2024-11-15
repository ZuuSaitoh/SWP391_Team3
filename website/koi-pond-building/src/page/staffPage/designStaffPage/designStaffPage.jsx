import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Table,
  Upload,
  message,
  Select,
  Layout,
  Menu,
  theme,
  Breadcrumb,
} from "antd";
import api from "../../../config/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  LoadingOutlined,
  LogoutOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import uploadFile from "../../../utils/file";
import "./designStaffPage.css";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Designs", "1", <PieChartOutlined />),
  getItem("My Statuses", "sub1", <DesktopOutlined />, [
    getItem("Pending Tasks", "2-1"),
    getItem("Completed History", "2-2"),
  ]),
  getItem("Logout", "3", <LogoutOutlined />),
];

function DesignStaffPage() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingDesign, setEditingDesign] = useState(null);
  const [editForm] = Form.useForm();
  const [modalMode, setModalMode] = useState("create");
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [staffStatuses, setStaffStatuses] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [updatingDesign, setUpdatingDesign] = useState(null);
  const [updateDesignModalVisible, setUpdateDesignModalVisible] =
    useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedDesignId, setSelectedDesignId] = useState(null);

  const staffId = localStorage.getItem("staffId");

  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [activeTab, setActiveTab] = useState("incomplete");

  const fetchData = async () => {
    try {
      const response = await api.get("/designs/fetchAll");
      if (response.data.code === 9999) {
        setDatas(response.data.result);
      } else {
        console.warn(
          "Unexpected response when fetching designs:",
          response.data
        );
        toast.warning(
          "Unexpected response when fetching designs. Data may be incomplete.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } catch (err) {
      console.error("Error fetching designs:", err);
      toast.error(
        "Error fetching designs: " +
          (err.response?.data?.message || err.message),
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // console.log("Form values:", values);

      let imageUrl = editingDesign ? editingDesign.imageData : null;
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const file = fileList[0];
        // console.log("Uploading file:", file);
        imageUrl = await uploadFile(file.originFileObj);
        // console.log("Uploaded image URL:", imageUrl);
      }

      const designData = {
        uploadStaff: staffId,
        designName: values.designName,
        imageData: imageUrl,
        designVersion: values.designVersion,
      };

      // console.log("Design data to be sent:", designData);

      let response;
      if (editingDesign) {
        // Update existing design
        response = await api.put(
          `http://localhost:8080/designs/update/${editingDesign.designId}`,
          designData
        );
      } else {
        // Create new design
        response = await api.post(
          "http://localhost:8080/designs/create",
          designData
        );
      }

      // console.log("API response:", response);

      if (response.data) {
        const newOrUpdatedDesign = {
          ...response.data.result,
          designId: editingDesign
            ? editingDesign.designId
            : response.data.result.designId,
          staff: {
            staffId: staffId,
            username: localStorage.getItem("staffUser")
              ? JSON.parse(localStorage.getItem("staffUser")).username
              : "Unknown",
          },
          designDate: new Date().toISOString(),
          imageData: imageUrl,
        };

        setDatas((prevData) => {
          if (editingDesign) {
            return prevData.map((design) =>
              design.designId === newOrUpdatedDesign.designId
                ? newOrUpdatedDesign
                : design
            );
          } else {
            return [...prevData, newOrUpdatedDesign];
          }
        });

        toast.success(
          editingDesign
            ? "Successfully updated design"
            : "Successfully added new design",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setShowModal(false);
        setFileList([]);
        setEditingDesign(null);
        form.resetFields();
      } else {
        toast.error(
          `Failed to ${
            editingDesign ? "update" : "add"
          } design. Please try again.`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } catch (err) {
      console.error(
        `Error in handle${editingDesign ? "Update" : "Submit"}:`,
        err
      );
      toast.error(
        `Error ${
          editingDesign ? "updating" : "adding"
        } design. Please try again.`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setModalMode("create");
    setEditingDesign(null);
    form.resetFields();
    editForm.resetFields();
    setFileList([]);
  };

  const handleDelete = async (designId) => {
    try {
      // console.log("Attempting to delete design with ID:", designId);
      const response = await api.delete(`/designs/delete/${designId}`);
      // console.log("Delete response:", response);

      if (
        response.data &&
        (response.data.code === 9999 || response.data.code === 9876)
      ) {
        setDatas((prevDatas) =>
          prevDatas.filter((design) => design.designId !== designId)
        );
        toast.success(response.data.result || "Design deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error(
          "Unexpected response when deleting design:",
          response.data
        );
        toast.error(
          `Failed to delete design: ${
            response.data?.message || "Unknown error"
          }`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } catch (err) {
      console.error("Error deleting design:", err);
      toast.error(
        `Failed to delete design: ${
          err.response?.data?.message || err.message
        }`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const handleEdit = (design) => {
    setEditingDesign(design);
    form.setFieldsValue({
      designName: design.designName,
      designVersion: design.designVersion,
    });
    setFileList(design.imageData ? [{ url: design.imageData }] : []);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingDesign(null);
    form.resetFields();
    setFileList([]);
    setShowModal(true);
  };

  const fetchStatusesByStaffId = async () => {
    try {
      const staffId = localStorage.getItem("staffId");
      const response = await api.get(`/status/fetchAll/staff/${staffId}`);
      if (response.data.code === 9999) {
        const sortedStatuses = response.data.result.sort(
          (a, b) => new Date(b.statusDate) - new Date(a.statusDate)
        );
        setStaffStatuses(sortedStatuses);
        setStatusModalVisible(true);
      } else {
        console.warn(
          "Unexpected response when fetching statuses:",
          response.data
        );
        toast.warning("Unexpected response when fetching statuses.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error("Error fetching statuses:", err);
      toast.error(
        "Error fetching statuses: " +
          (err.response?.data?.message || err.message),
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const handleUpdateStatus = async (statusId) => {
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
        toast.success("Status updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to update status", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(
        "Error updating status: " +
          (err.response?.data?.message || err.message),
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const fetchAllDesigns = async () => {
    try {
      const response = await api.get("/designs/fetchAll");
      if (response.data.code === 9999) {
        setDesigns(response.data.result);
      } else {
        console.warn(
          "Unexpected response when fetching designs:",
          response.data
        );
        toast.warning("Unexpected response when fetching designs.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error("Error fetching designs:", err);
      toast.error(
        "Error fetching designs: " +
          (err.response?.data?.message || err.message),
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const handleUpdateDesign = async () => {
    if (!selectedOrderId || !selectedDesignId) {
      toast.error("Please select a design", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      const response = await api.put(
        `/orders/update-design/${selectedOrderId}`,
        { designId: selectedDesignId }
      );
      if (response.data.code === 9997) {
        setStaffStatuses((prevStatuses) =>
          prevStatuses.map((status) =>
            status.order.orderId === selectedOrderId
              ? {
                  ...status,
                  order: {
                    ...status.order,
                    design: response.data.result.design,
                  },
                }
              : status
          )
        );
        toast.success("Design updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUpdateDesignModalVisible(false);
      } else {
        toast.error("Failed to update design", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error("Error updating design:", err);
      toast.error(
        "Error updating design: " +
          (err.response?.data?.message || err.message),
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const openUpdateDesignModal = (orderId) => {
    setSelectedOrderId(orderId);
    setSelectedDesignId(null);
    setUpdateDesignModalVisible(true);
  };

  // Add this new function near your other handlers
  const handleUpdateComplete = async (statusId) => {
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
        toast.success("Status updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (response.data.code === 1025) {
        toast.error("Status does not exist", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to update status", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(
        "Error updating status: " +
          (err.response?.data?.message || err.message),
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

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
        <div>
          <Button
            onClick={() => handleUpdateComplete(record.statusId)}
            type={complete ? "primary" : "default"}
            disabled={complete}
          >
            {complete ? "Completed" : "Update Complete"}
          </Button>
        </div>
      ),
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
        <Button onClick={() => handleUpdateStatus(record.statusId)}>
          Update
        </Button>
      ),
    },
    {
      title: "Update Design",
      key: "updateDesign",
      render: (_, record) => (
        <Button onClick={() => openUpdateDesignModal(record.order.orderId)}>
          Update Design
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
    fetchAllDesigns();
  }, []);

  const columns = [
    {
      title: "Design ID",
      dataIndex: "designId",
      key: "designId",
    },
    {
      title: "Author Id",
      dataIndex: ["staff", "staffId"],
      key: "authorId",
    },
    {
      title: "Author Name",
      dataIndex: ["staff", "username"],
      key: "authorName",
    },
    {
      title: "Design Name",
      dataIndex: "designName",
      key: "designName",
    },
    {
      title: "Image",
      dataIndex: "imageData",
      key: "imageData",
      render: (imageData) => <Image src={imageData} alt="" width={150} />,
    },
    {
      title: "Date",
      dataIndex: "designDate",
      key: "designDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Version",
      dataIndex: "designVersion",
      key: "designVersion",
    },
    {
      title: "Action",
      dataIndex: "designId",
      key: "designId",
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleEdit(record)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Do you want to delete this design?"
            onConfirm={() => handleDelete(record.designId)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ file, fileList }) => {
    // Update fileList state
    setFileList(fileList);

    // Handle status changes
    if (file.status === "uploading") {
      setUploading(true);
    } else if (file.status === "done") {
      setUploading(false);
      message.success(`${file.name} file uploaded successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (file.status === "error") {
      setUploading(false);
      message.error(`${file.name} file upload failed.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const customUpload = async ({ onError, onSuccess, file }) => {
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onSuccess(null, { url });
      setUploading(false);
    } catch (err) {
      onError(err);
      setUploading(false);
      message.error(`${file.name} file upload failed.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleLogout = () => {
    // Clear all staff-related data from localStorage
    localStorage.removeItem("staffId");
    localStorage.removeItem("staffAuthToken"); // Add this line
    navigate("/login-staff");
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleMenuClick = (key) => {
    setSelectedMenuItem(key);
    switch (key) {
      case "1":
        // Designs page
        break;
      case "2-1":
        setActiveTab("incomplete");
        fetchStatusesByStaffId();
        break;
      case "2-2":
        setActiveTab("completed");
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
          <>
            <Button onClick={handleAddNew} style={{ marginBottom: "20px" }}>
              Add new design
            </Button>
            <Table
              dataSource={datas}
              columns={columns}
              rowKey="designId"
              key={datas.length}
            />
          </>
        );
      case "2-1":
        const incompleteStatuses = staffStatuses.filter(
          (status) => !status.complete
        );
        return (
          <div className="status-section">
            <h2>Pending Tasks ({incompleteStatuses.length})</h2>
            <Table
              dataSource={incompleteStatuses}
              columns={statusColumns}
              rowKey="statusId"
              scroll={{ x: true }}
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
              }}
            />
          </div>
        );
      case "2-2":
        const completedStatuses = staffStatuses.filter(
          (status) => status.complete
        );
        return (
          <div className="status-section">
            <h2>Completed History ({completedStatuses.length})</h2>
            <Table
              dataSource={completedStatuses}
              columns={statusColumns
                .map((col) => {
                  if (col.key === "updateDesign") {
                    return {
                      ...col,
                      render: () => (
                        <Button
                          disabled
                          style={{
                            backgroundColor: "#f5f5f5",
                            color: "#d9d9d9",
                          }}
                        >
                          Update Design
                        </Button>
                      ),
                    };
                  }
                  // Filter out 'complete' and 'actions' columns
                  return col.key !== "complete" && col.key !== "actions"
                    ? col
                    : null;
                })
                .filter(Boolean)}
              rowKey="statusId"
              scroll={{ x: true }}
            />
          </div>
        );
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  const UpdateDesignModal = ({ visible, onClose }) => {
    return (
      <Modal
        title="Update Design"
        open={visible}
        onCancel={onClose}
        onOk={handleUpdateDesign}
        okText="Update"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Select Design">
            <Select
              value={selectedDesignId}
              onChange={(value) => setSelectedDesignId(value)}
              placeholder="Select a design"
            >
              {datas.map((design) => (
                <Select.Option key={design.designId} value={design.designId}>
                  {design.designName} (Version: {design.designVersion})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <>
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
              <Breadcrumb.Item>Design Staff</Breadcrumb.Item>
              {selectedMenuItem.startsWith("2") ? (
                <>
                  <Breadcrumb.Item>My Statuses</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {selectedMenuItem === "2-1"
                      ? "Pending Tasks"
                      : "Completed History"}
                  </Breadcrumb.Item>
                </>
              ) : (
                <Breadcrumb.Item>
                  {items.find((item) => item.key === selectedMenuItem)?.label}
                </Breadcrumb.Item>
              )}
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
            Koi Pond Building ©{new Date().getFullYear()} Created by Your
            Company
          </Footer>
        </Layout>
      </Layout>

      <Modal
        title={editingDesign ? "Edit Design" : "Add New Design"}
        open={showModal}
        onOk={form.submit}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="designName"
            label="Design Name"
            rules={[{ required: true, message: "Please input design name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="designVersion"
            label="Version"
            rules={[{ required: true, message: "Please input version!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              customRequest={customUpload}
              maxCount={1}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
      <UpdateDesignModal
        visible={updateDesignModalVisible}
        onClose={() => setUpdateDesignModalVisible(false)}
      />
    </>
  );
}

export default DesignStaffPage;
