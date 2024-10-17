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
} from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/file";

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
  const [modalMode, setModalMode] = useState('create'); // New state to track modal mode
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [staffStatuses, setStaffStatuses] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const staffId = localStorage.getItem("staffId");

  const fetchData = async () => {
    try {
      const response = await api.get("/designs/fetchAll");
      if (response.data.code === 9999) {
        setDatas(response.data.result);
      } else {
        console.warn("Unexpected response when fetching designs:", response.data);
        toast.warning("Unexpected response when fetching designs. Data may be incomplete.");
      }
    } catch (err) {
      console.error("Error fetching designs:", err);
      toast.error(
        "Error fetching designs: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const navigate = useNavigate();

  const backToHomepage = () => {
    navigate("/");
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      console.log("Form values:", values);

      let imageUrl = editingDesign ? editingDesign.imageData : null;
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const file = fileList[0];
        console.log("Uploading file:", file);
        imageUrl = await uploadFile(file.originFileObj);
        console.log("Uploaded image URL:", imageUrl);
      }

      const designData = {
        uploadStaff: staffId,
        designName: values.designName,
        imageData: imageUrl,
        designVersion: values.designVersion,
      };

      console.log("Design data to be sent:", designData);

      let response;
      if (editingDesign) {
        // Update existing design
        response = await api.put(`http://localhost:8080/designs/update/${editingDesign.designId}`, designData);
      } else {
        // Create new design
        response = await api.post("http://localhost:8080/designs/create", designData);
      }

      console.log("API response:", response);

      if (response.data) {
        const newOrUpdatedDesign = {
          ...response.data.result, // Use result from the response
          designId: editingDesign ? editingDesign.designId : response.data.result.designId,
          staff: { 
            staffId: staffId, 
            username: localStorage.getItem("staffUser") 
              ? JSON.parse(localStorage.getItem("staffUser")).username 
              : "Unknown" 
          },
          designDate: new Date().toISOString(),
          imageData: imageUrl, // Ensure the new image URL is used
        };

        setDatas(prevData => {
          if (editingDesign) {
            return prevData.map(design => 
              design.designId === newOrUpdatedDesign.designId ? newOrUpdatedDesign : design
            );
          } else {
            return [...prevData, newOrUpdatedDesign];
          }
        });

        toast.success(editingDesign ? "Successfully updated design" : "Successfully added new design");
        setShowModal(false);
        setFileList([]);
        setEditingDesign(null);
        form.resetFields();
      } else {
        toast.error(`Failed to ${editingDesign ? 'update' : 'add'} design. Please try again.`);
      }
    } catch (err) {
      console.error(`Error in handle${editingDesign ? 'Update' : 'Submit'}:`, err);
      toast.error(`Error ${editingDesign ? 'updating' : 'adding'} design. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setModalMode('create');
    setEditingDesign(null);
    form.resetFields();
    editForm.resetFields();
    setFileList([]);
  };

  const handleDelete = async (designId) => {
    try {
      console.log("Attempting to delete design with ID:", designId);
      const response = await api.delete(`/designs/delete/${designId}`);
      console.log("Delete response:", response);

      if (response.data && (response.data.code === 9999 || response.data.code === 9876)) {
        setDatas(prevDatas => prevDatas.filter(design => design.designId !== designId));
        toast.success(response.data.result || "Design deleted successfully");
      } else {
        console.error("Unexpected response when deleting design:", response.data);
        toast.error(`Failed to delete design: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("Error deleting design:", err);
      toast.error(`Failed to delete design: ${err.response?.data?.message || err.message}`);
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
        setStaffStatuses(response.data.result);
        setStatusModalVisible(true);
      } else {
        console.warn("Unexpected response when fetching statuses:", response.data);
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

  const handleUpdateStatus = async (statusId) => {
    try {
      const response = await api.patch(`http://localhost:8080/status/update-number-of-update/${statusId}`);
      if (response.data.code === 999) {
        // Update the local state with the new data
        setStaffStatuses(prevStatuses =>
          prevStatuses.map(status =>
            status.statusId === statusId ? response.data.result : status
          )
        );
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Error updating status: " + (err.response?.data?.message || err.message));
    }
  };

  const statusColumns = [
    {
      title: 'Order ID',
      dataIndex: ['order', 'orderId'],
      key: 'orderId',
    },
    {
      title: 'Customer Name',
      dataIndex: ['order', 'customer', 'fullName'],
      key: 'customerName',
    },
    {
      title: 'Customer Email',
      dataIndex: ['order', 'customer', 'mail'],
      key: 'customerEmail',
    },
    {
      title: 'Customer Phone',
      dataIndex: ['order', 'customer', 'phone'],
      key: 'customerPhone',
    },
    {
      title: 'Status Description',
      dataIndex: 'statusDescription',
      key: 'statusDescription',
    },
    {
      title: 'Status Date',
      dataIndex: 'statusDate',
      key: 'statusDate',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Complete',
      dataIndex: 'complete',
      key: 'complete',
      render: (complete) => complete ? 'Yes' : 'No',
    },
    {
      title: 'Number of Updates',
      dataIndex: 'numberOfUpdate',
      key: 'numberOfUpdate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => handleUpdateStatus(record.statusId)}>
          Update
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
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
          <Button onClick={() => handleEdit(record)} style={{ marginRight: '10px' }}>
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
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === "error") {
      setUploading(false);
      message.error(`${file.name} file upload failed.`);
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
      message.error(`${file.name} file upload failed.`);
    }
  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <Button onClick={handleAddNew}>Add new design</Button>
        <Button onClick={backToHomepage} style={{ marginLeft: "10px" }}>
          Return to Homepage
        </Button>
        <Button onClick={fetchStatusesByStaffId} style={{ marginLeft: "10px" }}>
          View My Statuses
        </Button>
      </div>
      
      <Table 
        dataSource={datas} 
        columns={columns} 
        rowKey="designId"
        key={datas.length}
      />

      <Modal
        open={showModal}
        onCancel={handleCancel}
        title={editingDesign ? "Edit Design" : "Add New Design"}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            {editingDesign ? "Update" : "Submit"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleSubmit}
          initialValues={{
            designName: editingDesign?.designName,
            designVersion: editingDesign?.designVersion,
          }}
        >
          <Form.Item
            name="designName"
            label="Design Name"
            rules={[{ required: true, message: "Please input Design Name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="imageData" label="Image">
            <Upload
              customRequest={customUpload}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item
            name="designVersion"
            label="Version"
            rules={[{ required: true, message: "Please input Design version" }]}
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

      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default DesignStaffPage;
