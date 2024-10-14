import React, { useEffect, useState } from "react";
import { Button, Form, Image, Input, Modal, Table, Upload, message } from "antd";
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

  const fetchData = async () => {
    try {
      const response = await api.get("/designs/fetchAll");
      if (response.data.code === 9999) {
        setDatas(response.data.result);
      } else {
        toast.error("Failed to fetch designs: " + response.data.message);
      }
    } catch (err) {
      toast.error("Error fetching designs: " + (err.response?.data?.message || err.message));
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

      // Upload image if present
      let imageUrl = null;
      if (fileList.length > 0) {
        const file = fileList[0];
        console.log("Uploading file:", file);
        imageUrl = await uploadFile(file.originFileObj);
        console.log("Uploaded image URL:", imageUrl);
      }

      // Prepare the design object
      const designData = {
        uploadStaff: parseInt(values.uploadStaff), // Convert to integer
        designName: values.designName,
        imageData: imageUrl,
        designVersion: values.designVersion
      };

      console.log("Design data to be sent:", designData);

      // Send POST request to create new design
      const response = await api.post("http://localhost:8080/designs/create", designData);
      console.log("API response:", response);

      if (response.data && response.data.code === 9999) {
        toast.success("Successfully added new design");
        fetchData(); // Refresh the table data
      } else {
        throw new Error(response.data?.message || "Unknown error occurred");
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      toast.error("Error adding design: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
      handleCancel(); // Always close the modal and reset the form, even if there's an error
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
    setFileList([]);
  };

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
      render: (imageData) => (
        <Image src={imageData} alt="" width={150} />
      ),
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
    if (file.status === 'uploading') {
      setUploading(true);
    } else if (file.status === 'done') {
      setUploading(false);
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === 'error') {
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
      <Button onClick={() => setShowModal(true)}>Add new design</Button>
      <Button onClick={backToHomepage} style={{ marginLeft: "10px" }}>
        Return to Homepage
      </Button>
      <Table dataSource={datas} columns={columns} />

      <Modal
        open={showModal}
        onCancel={handleCancel}
        title="Design"
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
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="uploadStaff"
            label="StaffID"
            rules={[{ required: true, message: "Please input Staff ID" }]}
          >
            <Input />
          </Form.Item>


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
