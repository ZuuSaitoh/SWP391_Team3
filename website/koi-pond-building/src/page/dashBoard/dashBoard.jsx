import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import { jwtDecode } from "jwt-decode";
import "./dashBoard.css";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faClipboardList,
  faConciergeBell,
  faFileContract,
  faSignOutAlt,
  faTable,
  faListAlt, // Add this import for the status icon
} from "@fortawesome/free-solid-svg-icons";
import SheetDataViewComponent from "./SheetDataView";
import StatusViewComponent from "./StatusView"; // Add this import
import uploadFile from "../../utils/file"; // Add this import at the top of the file

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState("overview"); // Default to overview
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const navigate = useNavigate();
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    username: "",
    password: "",
    confirm_password: "",
    mail: "",
  });

  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    username: "",
    password: "",
    confirm_password: "",
    mail: "",
    role: "",
  });

  const [search, setSearch] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffRole, setStaffRole] = useState("");

  const [showAddOrderForm, setShowAddOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer_id: "",
    staff_id: "",
  });

  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: "",
    price: "",
    description: "",
    serviceType: "",
  });

  const [showAddContractForm, setShowAddContractForm] = useState(false);
  const [newContract, setNewContract] = useState({
    orderId: "",
    uploadStaff: "",
    imageData: "",
    description: "",
    file: null, // Add this line
  });

  const chartRefs = {
    doughnut: useRef(null),
    line: useRef(null),
    bar: useRef(null),
  };

  useEffect(() => {
    const token = localStorage.getItem("staffAuthToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setStaffName(decodedToken.sub);
      setStaffRole(decodedToken.role);
    } else {
      navigate("/login-staff");
    }

    const fetchData = async () => {
      try {
        const [
          customersResponse,
          staffsResponse,
          ordersResponse,
          servicesResponse,
          contractsResponse,
        ] = await Promise.all([
          axios.get("http://localhost:8080/customers/fetchAll"),
          axios.get("http://localhost:8080/staffs/fetchAll"),
          axios.get("http://localhost:8080/orders/fetchAll"),
          axios.get("http://localhost:8080/services/fetchAll"),
          axios.get("http://localhost:8080/contracts/fetchAll"),
        ]);

        if (customersResponse.data.code === 9999) {
          setCustomers(customersResponse.data.result);
        } else {
          setError("Failed to fetch customers");
        }

        if (staffsResponse.data.code === 9999) {
          setStaffs(staffsResponse.data.result);
        } else {
          setError("Failed to fetch staffs");
        }

        if (ordersResponse.data.code === 9999) {
          setOrders(ordersResponse.data.result);
        } else {
          setError("Failed to fetch orders");
        }

        if (servicesResponse.data.code === 9999) {
          setServices(servicesResponse.data.result);
        } else {
          setError("Failed to fetch services");
        }

        if (contractsResponse.data.code === 9999) {
          setContracts(contractsResponse.data.result);
        } else {
          setError("Failed to fetch contracts");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  console.log("Rendering dashboard. Customers:", customers);
  console.log("Rendering dashboard. Staffs:", staffs);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  //view profile
  const handleViewProfile = (customerId) => {
    navigate(`/customer/${customerId}`);
  };

  //add customer
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (newCustomer.password !== newCustomer.confirm_password) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/customers/create",
        newCustomer
      );
      if (response.data.code === 1000) {
        toast.success("Customer created successfully");
        setCustomers([...customers, response.data.result]);
        setShowAddCustomerForm(false);
        setNewCustomer({
          username: "",
          password: "",
          confirm_password: "",
          mail: "",
        });
      } else {
        toast.error("Failed to create customer");
      }
    } catch (err) {
      console.error("Error creating customer:", err);
      toast.error("An error occurred while creating the customer");
    }
  };

  //view staff profile
  const handleViewStaffProfile = (staffId) => {
    navigate(`/staff/${staffId}`);
  };

  //add staff
  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (newStaff.password !== newStaff.confirm_password) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/staffs/create",
        newStaff
      );
      if (response.data.code === 1000) {
        toast.success("Staff created successfully");
        setStaffs([...staffs, response.data.result]);
        setShowAddStaffForm(false);
        setNewStaff({
          username: "",
          password: "",
          confirm_password: "",
          mail: "",
          role: "",
        });
      } else {
        toast.error("Failed to create staff");
      }
    } catch (err) {
      console.error("Error creating staff:", err);
      toast.error("An error occurred while creating the staff");
    }
  };

  //add order
  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/orders/create", {
        customer_id: parseInt(newOrder.customer_id),
        staff_id: parseInt(newOrder.staff_id),
      });
      if (response.data.code === 1000) {
        toast.success("Order created successfully");
        setOrders([...orders, response.data.result]);
        setShowAddOrderForm(false);
        setNewOrder({
          customer_id: "",
          staff_id: "",
        });
      } else {
        toast.error("Failed to create order");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      toast.error(`An error occurred while creating the order: ${err.message}`);
    }
  };

  //add service
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/services/create",
        {
          service_name: newService.serviceName,
          price: parseFloat(newService.price),
          description: newService.description,
          service_type: newService.serviceType,
        }
      );
      if (response.data.code === 1000) {
        toast.success("Service created successfully");
        setServices([...services, response.data.result]);
        setShowAddServiceForm(false);
        setNewService({
          serviceName: "",
          price: "",
          description: "",
          serviceType: "",
        });
      } else {
        toast.error("Failed to create service");
      }
    } catch (err) {
      console.error("Error creating service:", err);
      toast.error("An error occurred while creating the service");
    }
  };

  //add contract
  const handleAddContract = async (e) => {
    e.preventDefault();
    try {
      let imageData = "";
      if (newContract.file) {
        imageData = await uploadFile(newContract.file);
      }

      const response = await axios.post(
        "http://localhost:8080/contracts/create",
        {
          orderId: newContract.orderId,
          uploadStaff: newContract.uploadStaff,
          imageData: imageData, // This will be the uploaded file URL
          description: newContract.description,
        }
      );

      if (response.data.code === 1000) {
        toast.success("Contract created successfully");
        setContracts([...contracts, response.data.result]);
        setShowAddContractForm(false);
        setNewContract({
          orderId: "",
          uploadStaff: "",
          imageData: "",
          description: "",
          file: null,
        });
      } else {
        toast.error("Failed to create contract");
      }
    } catch (err) {
      console.error("Error creating contract:", err);
      toast.error("An error occurred while creating the contract");
    }
  };

  //render add customer form
  const renderAddCustomerForm = () => (
    <div className="add-new-customer">
      <h2>Add New Customer</h2>
      <form onSubmit={handleAddCustomer}>
        <input
          type="text"
          placeholder="Username"
          value={newCustomer.username}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, username: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newCustomer.password}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, password: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={newCustomer.confirm_password}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, confirm_password: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.mail}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, mail: e.target.value })
          }
          required
        />
        <button type="submit" className="create-customer-btn">
          Create Customer
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setShowAddCustomerForm(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );

  //render add staff form
  const renderAddStaffForm = () => (
    <div className="add-new-staff">
      <h2>Add New Staff</h2>
      <form onSubmit={handleAddStaff}>
        <input
          type="text"
          placeholder="Username"
          value={newStaff.username}
          onChange={(e) =>
            setNewStaff({ ...newStaff, username: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newStaff.password}
          onChange={(e) =>
            setNewStaff({ ...newStaff, password: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={newStaff.confirm_password}
          onChange={(e) =>
            setNewStaff({ ...newStaff, confirm_password: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newStaff.mail}
          onChange={(e) => setNewStaff({ ...newStaff, mail: e.target.value })}
          required
        />
        <select
          value={newStaff.role}
          onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Design Staff">Design Staff</option>
          <option value="Construction Staff">Construction Staff</option>
          <option value="Consulting Staff">Consulting Staff</option>
        </select>
        <button type="submit" className="create-staff-btn">
          Create Staff
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setShowAddStaffForm(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );

  //render add order form
  const renderAddOrderForm = () => (
    <div className="add-order-form">
      <h2>Create New Order</h2>
      <form onSubmit={handleAddOrder}>
        <div className="input-group">
          <label htmlFor="customer-select">Select Customer</label>
          <select
            id="customer-select"
            value={newOrder.customer_id}
            onChange={(e) =>
              setNewOrder({ ...newOrder, customer_id: e.target.value })
            }
            required
          >
            <option value="">Choose a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.username} ({customer.mail})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="staff-select">Select Staff</label>
          <select
            id="staff-select"
            value={newOrder.staff_id}
            onChange={(e) =>
              setNewOrder({ ...newOrder, staff_id: e.target.value })
            }
            required
          >
            <option value="">Choose a staff member</option>
            {staffs.map((staff) => (
              <option key={staff.staffId} value={staff.staffId}>
                {staff.username} ({staff.role})
              </option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="create-order-btn">
            Create Order
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowAddOrderForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  //render add service form
  const renderAddServiceForm = () => (
    <div className="add-new-service">
      <h2>Add New Service</h2>
      <form onSubmit={handleAddService}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Service Name"
            value={newService.serviceName}
            onChange={(e) =>
              setNewService({ ...newService, serviceName: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newService.price}
            onChange={(e) =>
              setNewService({ ...newService, price: e.target.value })
            }
            required
          />
        </div>
        <textarea
          placeholder="Description"
          value={newService.description}
          onChange={(e) =>
            setNewService({ ...newService, description: e.target.value })
          }
          required
        />
        <select
          value={newService.serviceType}
          onChange={(e) =>
            setNewService({ ...newService, serviceType: e.target.value })
          }
          required
        >
          <option value="">Select Service Type</option>
          <option value="Cleaning Pond Service">Cleaning Pond Service</option>
          <option value="Maintenance">Maintenance</option>
        </select>
        <button type="submit" className="create-service-btn">
          Create Service
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setShowAddServiceForm(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );

  //render add contract form
  const renderAddContractForm = () => (
    <div className="add-new-contract">
      <h2>Add New Contract</h2>
      <form onSubmit={handleAddContract}>
        <div className="input-group">
          <select
            value={newContract.orderId}
            onChange={(e) =>
              setNewContract({ ...newContract, orderId: e.target.value })
            }
            required
          >
            <option value="">Select Order ID</option>
            {orders.map((order) => (
              <option key={order.orderId} value={order.orderId}>
                Order #{order.orderId} - {order.customer.username}
              </option>
            ))}
          </select>
          <select
            value={newContract.uploadStaff}
            onChange={(e) =>
              setNewContract({ ...newContract, uploadStaff: e.target.value })
            }
            required
          >
            <option value="">Select Staff ID</option>
            {staffs.map((staff) => (
              <option key={staff.staffId} value={staff.staffId}>
                {staff.username} ({staff.role})
              </option>
            ))}
          </select>
          <input
            type="file"
            accept=".doc,.docx,.pdf"
            onChange={(e) =>
              setNewContract({ ...newContract, file: e.target.files[0] })
            }
            required
          />
          <textarea
            placeholder="Description"
            value={newContract.description}
            onChange={(e) =>
              setNewContract({ ...newContract, description: e.target.value })
            }
            required
          />
          <button type="submit" className="create-contract-btn">
            Create Contract
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowAddContractForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  //render search bar
  const renderSearchBar = () => (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder={`Search ${activeView}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
    </div>
  );

  //render customers
  const renderCustomers = () => (
    <div className="table-container">
      {renderSearchBar()}
      <button
        onClick={() => setShowAddCustomerForm(true)}
        className="add-customer-btn"
      >
        Add New Customer
      </button>
      {showAddCustomerForm && renderAddCustomerForm()}
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter((customer) => {
              if (!customer) return false;
              const searchLower = search.toLowerCase().trim();
              return (
                searchLower === "" ||
                (customer.username &&
                  customer.username.toLowerCase().includes(searchLower)) ||
                (customer.fullName &&
                  customer.fullName.toLowerCase().includes(searchLower)) ||
                (customer.mail &&
                  customer.mail.toLowerCase().includes(searchLower))
              );
            })
            .sort((a, b) => a.id - b.id)
            .map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.username}</td>
                <td>{customer.fullName}</td>
                <td>{customer.mail}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                <td>{customer.point}</td>
                <td>
                  <button
                    onClick={() => handleViewProfile(customer.id)}
                    className="view-profile-btn"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  //render staffs
  const renderStaffs = () => (
    <div className="table-container">
      {renderSearchBar()}
      <button
        onClick={() => setShowAddStaffForm(true)}
        className="add-staff-btn"
      >
        Add New Staff
      </button>
      {showAddStaffForm && renderAddStaffForm()}
      <table className="data-table">
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffs
            .filter((staff) => {
              if (!staff) return false;
              const searchLower = search.toLowerCase().trim();
              return (
                searchLower === "" ||
                (staff.username &&
                  staff.username.toLowerCase().includes(searchLower)) ||
                (staff.fullName &&
                  staff.fullName.toLowerCase().includes(searchLower)) ||
                (staff.mail && staff.mail.toLowerCase().includes(searchLower))
              );
            })
            .map((staff) => (
              <tr key={staff.staffId}>
                <td>{staff.staffId}</td>
                <td>{staff.username}</td>
                <td>{staff.fullName}</td>
                <td>{staff.mail}</td>
                <td>{staff.address}</td>
                <td>{staff.phone}</td>
                <td>{staff.role || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleViewStaffProfile(staff.staffId)}
                    className="view-profile-btn"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  //render orders
  const renderOrders = () => (
    <div className="table-container">
      {renderSearchBar()}
      <button
        onClick={() => setShowAddOrderForm(true)}
        className="add-order-btn"
      >
        Add New Order
      </button>
      {showAddOrderForm && renderAddOrderForm()}
      <table className="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Staff Name</th>
            <th>Staff Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((order) => {
              if (!order) return false;
              const searchLower = search.toLowerCase().trim();
              return (
                searchLower === "" ||
                order.orderId.toString().includes(searchLower) ||
                order.customer.username.toLowerCase().includes(searchLower) ||
                order.customer.mail.toLowerCase().includes(searchLower) ||
                order.staff.username.toLowerCase().includes(searchLower) ||
                order.staff.role.toLowerCase().includes(searchLower)
              );
            })
            .map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customer.username}</td>
                <td>{order.customer.mail}</td>
                <td>{order.staff.username}</td>
                <td>{order.staff.role}</td>
                <td>
                  <button
                    onClick={() => handleViewOrderDetails(order.orderId)}
                    className="view-profile-btn"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  //render services
  const renderServices = () => (
    <div className="table-container">
      {renderSearchBar()}
      <button
        onClick={() => setShowAddServiceForm(true)}
        className="add-service-btn"
      >
        Add New Service
      </button>
      {showAddServiceForm && renderAddServiceForm()}
      <table className="data-table">
        <thead>
          <tr>
            <th>Service ID</th>
            <th>Service Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Service Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services
            .filter((service) => {
              if (!service) return false;
              const searchLower = search.toLowerCase().trim();
              return (
                searchLower === "" ||
                (service.serviceName &&
                  service.serviceName.toLowerCase().includes(searchLower)) ||
                (service.serviceType &&
                  service.serviceType.toLowerCase().includes(searchLower))
              );
            })
            .map((service) => (
              <tr key={service.serviceId}>
                <td>{service.serviceId}</td>
                <td>{service.serviceName}</td>
                <td>${service.price.toFixed(2)}</td>
                <td>{service.description}</td>
                <td>{service.serviceType || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleViewServiceDetails(service.serviceId)}
                    className="view-profile-btn"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  //render contracts
  const renderContracts = () => (
    <div className="table-container">
      {renderSearchBar()}
      <button
        onClick={() => setShowAddContractForm(true)}
        className="add-contract-btn"
      >
        Add New Contract
      </button>
      {showAddContractForm && renderAddContractForm()}
      <table className="data-table">
        <thead>
          <tr>
            <th>Contract ID</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Staff</th>
            <th>Upload Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contracts
            .filter((contract) => {
              if (!contract) return false;
              const searchLower = search.toLowerCase().trim();
              return (
                searchLower === "" ||
                contract.contractId.toString().includes(searchLower) ||
                contract.order.orderId.toString().includes(searchLower) ||
                contract.order.customer.username
                  .toLowerCase()
                  .includes(searchLower) ||
                contract.staff.username.toLowerCase().includes(searchLower) ||
                (contract.description &&
                  contract.description.toLowerCase().includes(searchLower))
              );
            })
            .map((contract) => (
              <tr key={contract.contractId}>
                <td>{contract.contractId}</td>
                <td>{contract.order.orderId}</td>
                <td>{contract.order.customer.username}</td>
                <td>{contract.staff.username}</td>
                <td>{new Date(contract.uploadDate).toLocaleString()}</td>
                <td>{contract.description}</td>
                <td>
                  <button
                    onClick={() =>
                      handleViewContractDetails(contract.contractId)
                    }
                    className="view-profile-btn"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderOverview = () => {
    console.log("Rendering overview");
    console.log("Customers:", customers);
    console.log("Orders:", orders);
    console.log("Staffs:", staffs);
    console.log("Services:", services);

    const doughnutData = {
      labels: ["Customers", "Orders", "Staff"],
      datasets: [
        {
          data: [customers.length, orders.length, staffs.length],
          backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
          borderColor: ["#2980b9", "#27ae60", "#c0392b"],
          borderWidth: 1,
        },
      ],
    };

    const lineData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Orders",
          data: [12, 19, 3, 5, 2, 3],
          borderColor: "#3498db",
          backgroundColor: "rgba(52, 152, 219, 0.2)",
          tension: 0.4,
        },
      ],
    };

    const barData = {
      labels: ["Cleaning", "Maintenance", "Design", "Construction"],
      datasets: [
        {
          label: "Services",
          data: [65, 59, 80, 81],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { size: 14 },
          },
        },
        title: {
          display: true,
          text: "Data Overview",
          font: { size: 20, weight: "bold" },
        },
      },
    };

    return (
      <div className="overview">
        <div className="overview-cards">
          <div className="overview-card customers">
            <h3>Total Customers</h3>
            <p>{customers.length}</p>
          </div>
          <div className="overview-card staff">
            <h3>Total Staff</h3>
            <p>{staffs.length}</p>
          </div>
          <div className="overview-card orders">
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>
          <div className="overview-card services">
            <h3>Total Services</h3>
            <p>{services.length}</p>
          </div>
        </div>
        <div className="charts-container">
          <div className="chart-row">
            <div className="chart-wrapper doughnut-chart">
              <h3>Data Distribution</h3>
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
            <div className="chart-wrapper line-chart">
              <h3>Order Trends</h3>
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
          <div className="chart-row">
            <div className="chart-wrapper bar-chart">
              <h3>Service Distribution</h3>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  //view order details
  const handleViewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  //back to home
  const handleBackToHome = () => {
    navigate("/"); // Assuming '/' is your home page route
  };

  //logout
  const handleLogout = () => {
    localStorage.removeItem("staffAuthToken");
    localStorage.removeItem("staffUser");
    toast.success("Logged out successfully");
    navigate("/login-staff");
  };

  //view service details
  const handleViewServiceDetails = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  //view contract details
  const handleViewContractDetails = (contractId) => {
    navigate(`/contract/${contractId}`);
  };

  // Add this function to render the Status view
  const renderStatus = () => (
    <div className="status-container">
      <StatusViewComponent
        staffId={staffs.find((staff) => staff.username === staffName)?.staffId}
      />
    </div>
  );

  return (
    <div className="dashboard">
      <ToastContainer />
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <div className="staff-info">
            <p className="welcome-message">
              Welcome, <span className="staff-name">{staffName}</span>!
            </p>
            <p className="staff-role">
              Role: <span className="role-value">{staffRole}</span>
            </p>
          </div>
        </div>
        <div className="sidebar-content">
          <button
            className={`sidebar-button ${
              activeView === "overview" ? "active" : ""
            }`}
            onClick={() => setActiveView("overview")}
          >
            <FontAwesomeIcon icon={faHome} /> Overview
          </button>
          <button
            className={`sidebar-button ${
              activeView === "customers" ? "active" : ""
            }`}
            onClick={() => setActiveView("customers")}
          >
            <FontAwesomeIcon icon={faUsers} /> Customers
          </button>
          <button
            className={`sidebar-button ${
              activeView === "staffs" ? "active" : ""
            }`}
            onClick={() => setActiveView("staffs")}
          >
            <FontAwesomeIcon icon={faUsers} /> Staffs
          </button>
          <button
            className={`sidebar-button ${
              activeView === "orders" ? "active" : ""
            }`}
            onClick={() => setActiveView("orders")}
          >
            <FontAwesomeIcon icon={faClipboardList} /> Orders
          </button>
          <button
            className={`sidebar-button ${
              activeView === "services" ? "active" : ""
            }`}
            onClick={() => setActiveView("services")}
          >
            <FontAwesomeIcon icon={faConciergeBell} /> Services
          </button>
          <button
            className={`sidebar-button ${
              activeView === "contracts" ? "active" : ""
            }`}
            onClick={() => setActiveView("contracts")}
          >
            <FontAwesomeIcon icon={faFileContract} /> Contracts
          </button>
          <button
            className={`sidebar-button ${
              activeView === "sheetData" ? "active" : ""
            }`}
            onClick={() => setActiveView("sheetData")}
          >
            <FontAwesomeIcon icon={faTable} /> Sheet Data
          </button>
          <button
            className={`sidebar-button ${
              activeView === "status" ? "active" : ""
            }`}
            onClick={() => setActiveView("status")}
          >
            <FontAwesomeIcon icon={faListAlt} /> Status
          </button>
        </div>
        <div className="sidebar-footer">
          <button onClick={handleBackToHome} className="back-home-btn">
            &#8592; Back to Home
          </button>
          <button onClick={handleLogout} className="staff-logout-btn">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="main-header">
          <h1>
            {activeView === "overview"
              ? "Overview"
              : activeView === "customers"
              ? "Customer Dashboard"
              : activeView === "staffs"
              ? "Staff Dashboard"
              : activeView === "orders"
              ? "Order Dashboard"
              : activeView === "services"
              ? "Service Dashboard"
              : activeView === "contracts"
              ? "Contract Dashboard"
              : activeView === "sheetData"
              ? "Sheet Data"
              : activeView === "status"
              ? "Status Dashboard"
              : "Dashboard"}
          </h1>
        </div>
        <div className="table-container">
          {activeView === "overview" ? (
            renderOverview()
          ) : activeView === "customers" ? (
            renderCustomers()
          ) : activeView === "staffs" ? (
            renderStaffs()
          ) : activeView === "orders" ? (
            renderOrders()
          ) : activeView === "services" ? (
            renderServices()
          ) : activeView === "contracts" ? (
            renderContracts()
          ) : activeView === "sheetData" ? (
            <SheetDataViewComponent />
          ) : activeView === "status" ? (
            renderStatus()
          ) : null}
        </div>
        {selectedCustomerId && (
          <CustomerProfileDashboard customerId={selectedCustomerId} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
