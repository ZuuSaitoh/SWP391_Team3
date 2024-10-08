import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function DesignStaffPage() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get("");
      setDatas(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleSubmit = async (values) => {
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

          <Form.Item
            name="image_data"
            label="Image"
            rules={[{ required: true, message: "Please input Design image" }]}
          >
            <Input />
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
    </div>
  );
}

export default DesignStaffPage;
