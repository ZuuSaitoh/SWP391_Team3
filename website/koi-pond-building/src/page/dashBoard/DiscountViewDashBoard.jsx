import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Table, Button, Modal, Form, Input, InputNumber } from "antd";

const DiscountViewDashBoard = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/discounts/fetchAll");
      if (response.data.code === 9999) {
        setDiscounts(response.data.result);
      } else {
        toast.error("Failed to fetch discounts");
      }
    } catch (err) {
      console.error("Error fetching discounts:", err);
      toast.error("An error occurred while fetching discounts");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDiscount = async (values) => {
    try {
      // Get staff user from localStorage
      const staffUser = JSON.parse(localStorage.getItem("staffUser"));
      console.log("Staff user from localStorage:", staffUser);

      if (!staffUser || !staffUser.id) {
        toast.error("Staff ID not found. Please log in again.");
        return;
      }

      const response = await axios.post("http://localhost:8080/discounts/create", {
        discountAuthorId: staffUser.id, // Use staffUser.id directly
        discountName: values.discountName,
        discountPercent: values.discountPercentage,
        status: true
      });

      if (response.data.code === 1000) {
        toast.success("Discount created successfully");
        fetchDiscounts();
        setIsModalVisible(false);
        form.resetFields();
      } else {
        toast.error(`Failed to create discount: ${response.data.message}`);
      }
    } catch (err) {
      console.error("Error creating discount:", err);
      console.error("Error response:", err.response?.data);
      const errorMessage = err.response?.data?.message || "An error occurred while creating the discount";
      toast.error(errorMessage);
    }
  };

  const handleEditDiscount = (record) => {
    console.log("Editing discount:", record); // For debugging
    setEditingDiscount(record);
    editForm.setFieldsValue({
      discountName: record.discountName,
      discountPercentage: record.discountPercent,
      status: record.status === true // Ensure boolean value
    });
    setIsEditModalVisible(true);
  };

  const handleUpdateDiscount = async (values) => {
    try {
      const staffUser = JSON.parse(localStorage.getItem("staffUser"));
      
      if (!staffUser || !staffUser.id) {
        toast.error("Staff ID not found. Please log in again.");
        return;
      }

      // Convert checkbox value to boolean
      const status = values.status || false;

      const response = await axios.put(
        `http://localhost:8080/discounts/update/${editingDiscount.discountId}`,
        {
          discountAuthorId: staffUser.id,
          discountName: values.discountName,
          discountPercent: values.discountPercentage,
          status: status
        }
      );

      console.log("Update response:", response.data);

      // Changed from 9876 to 1234 based on your API response
      if (response.data.code === 1234) {
        // First update the local state
        setDiscounts(prevDiscounts => 
          prevDiscounts.map(discount => 
            discount.discountId === editingDiscount.discountId
              ? {
                  ...discount,
                  discountName: values.discountName,
                  discountPercent: values.discountPercentage,
                  status: status
                }
              : discount
          )
        );

        // Then close the modal and reset form
        setIsEditModalVisible(false);
        setEditingDiscount(null);
        editForm.resetFields();

        // Show success message
        toast.success("Discount updated successfully");

        // Finally fetch fresh data
        fetchDiscounts();
      } else {
        const errorMessage = response.data.message || "Failed to update discount";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error updating discount:", err);
      console.error("Error response:", err.response?.data);
      const errorMessage = err.response?.data?.message || "An error occurred while updating the discount";
      toast.error(errorMessage);
    }
  };

  const handleDeleteDiscount = async (discountId) => {
    if (window.confirm("Are you sure you want to delete this discount?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/discounts/delete/${discountId}`
        );
        if (response.data.code === 9876) { // Changed from 3333 to 9876
          toast.success("Discount deleted successfully");
          fetchDiscounts();
        } else {
          toast.error(`Failed to delete discount: ${response.data.message}`);
        }
      } catch (err) {
        console.error("Error deleting discount:", err);
        const errorMessage = err.response?.data?.message || "An error occurred while deleting the discount";
        toast.error(errorMessage);
      }
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "discountId",
      key: "discountId",
      className: "column-header",
    },
    {
      title: "Name",
      dataIndex: "discountName",
      key: "discountName",
      className: "column-header",
    },
    {
      title: "Percentage",
      dataIndex: "discountPercent",
      key: "discountPercent",
      className: "column-header",
      render: (percentage) => `${percentage}%`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "column-header",
      render: (status) => (
        <span className={`status-badge ${status ? 'status-active' : 'status-inactive'}`}>
          {status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Author",
      dataIndex: "discountAuthor",
      key: "discountAuthor",
      className: "column-header",
      render: (author) => author?.username || "N/A",
    },
    {
      title: "Action",
      key: "action",
      className: "column-header",
      render: (_, record) => (
        <>
          <Button 
            type="primary"
            onClick={() => handleEditDiscount(record)}
            style={{ marginRight: 8, backgroundColor: '#3498db' }}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            onClick={() => handleDeleteDiscount(record.discountId)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="dashboard-section discount-dashboard">
      <div className="section-header">
        <h2 className="section-title">Discounts Management</h2>
        <Button 
          type="primary" 
          onClick={() => setIsModalVisible(true)}
          className="add-button"
          style={{ backgroundColor: '#3498db' }}
        >
          + Create New Discount
        </Button>
      </div>

      <div className="table-wrapper">
        <Table
          className="dashboard-table"
          columns={columns}
          dataSource={discounts}
          loading={loading}
          rowKey="discountId"
          pagination={{
            pageSize: 10,
            position: ['bottomCenter']
          }}
        />
      </div>

      <Modal
        title="Create New Discount"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleCreateDiscount}
          layout="vertical"
        >
          <Form.Item
            name="discountName"
            label="Discount Name"
            rules={[{ required: true, message: "Please enter discount name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="discountPercentage"
            label="Discount Percentage"
            rules={[
              { required: true, message: "Please enter discount percentage" },
              { type: "number", min: 0, max: 100, message: "Percentage must be between 0 and 100" }
            ]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Discount
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Discount"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setEditingDiscount(null);
          editForm.resetFields();
        }}
        footer={null}
      >
        <Form
          form={editForm}
          onFinish={handleUpdateDiscount}
          layout="vertical"
        >
          <Form.Item
            name="discountName"
            label="Discount Name"
            rules={[{ required: true, message: "Please enter discount name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="discountPercentage"
            label="Discount Percentage"
            rules={[
              { required: true, message: "Please enter discount percentage" },
              { type: "number", min: 0, max: 100, message: "Percentage must be between 0 and 100" }
            ]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            valuePropName="checked"
          >
            <Input type="checkbox" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Discount
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DiscountViewDashBoard;
