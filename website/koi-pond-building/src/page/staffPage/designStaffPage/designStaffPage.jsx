import React, { useEffect, useState } from "react";
import { Button, Form, Image, Input, Modal, Table, Upload } from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/file";

function DesignStaffPage() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("");
      setDatas(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleSubmit = async (values) => {
    //upload anh len truoc
    if (fileList.length > 0) {
      const file = fileList[0];
      console.log(file);
      const url = await uploadFile(file.originFileObj);
      values.image_data = url;
    }

    try {
      setLoading(true);
      const response = await api.post("", values);
      toast.success("Succesfully add new design");
      fetchData();
      form.resetFields();
      setShowModal(false);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Design ID",
      dataIndex: "design_id",
      key: "design_id",
    },
    {
      title: "Author Id",
      dataIndex: "author_id",
      key: "author_id",
    },
    {
      title: "Design Name",
      dataIndex: "design_name",
      key: "design_name",
    },
    {
      title: "Image",
      dataIndex: "image_data",
      key: "image_data",
      render: (image_data) => {
        return <Image src={image_data} alt="" width={150} />;
      },
    },
    {
      title: "Date",
      dataIndex: "design_date",
      key: "design_date",
    },
    {
      title: "Version",
      dataIndex: "design_version",
      key: "design_version",
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
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add new design</Button>
      <Button onClick={() => Navigate("/")} style={{ marginLeft: "10px" }}>
        Return to Homepage
      </Button>
      <Table dataSource={datas} columns={columns} />

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Design"
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
            name="design_id"
            label="DesignID"
            rules={[{ required: true, message: "Please input Design ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="author_id"
            label="Author ID"
            rules={[{ required: true, message: "Please input Author ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="design_name"
            label="Name"
            rules={[{ required: true, message: "Please input Design Name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="image_data" label="Image">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item
            name="design_date"
            label="Date"
            rules={[{ required: true, message: "Please input Design date" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="design_version"
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
