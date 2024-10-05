import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashBoard.css';
import { FaShoppingBag, FaMoneyBillWave, FaUsers, FaChartLine, FaTachometerAlt, FaList, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';
import axios from '../../config/axios';

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    totalVisits: 0,
    totalBalance: 0,
  });
  const [customers, setCustomers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const customersResponse = await axios.get('/customers/fetchAll');
        if (Array.isArray(customersResponse.data)) {
          setCustomers(customersResponse.data);
          
          // Update stats based on customer data
          setStats({
            totalOrders: customersResponse.data.length, // Placeholder: using customer count as order count
            totalSales: customersResponse.data.reduce((sum, customer) => sum + (customer.point || 0), 0), // Using points as sales
            totalVisits: customersResponse.data.length * 2, // Placeholder: assuming each customer visited twice
            totalBalance: customersResponse.data.reduce((sum, customer) => sum + (customer.point || 0) * 10, 0), // Placeholder: using points * 10 as balance
          });
        } else {
          throw new Error('Received invalid data format for customers');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button onClick={toggleSidebar} className="toggle-sidebar">
            <FaBars />
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-link active"><FaTachometerAlt /> <span>Dashboard</span></Link>
          <Link to="/dashboard" className="sidebar-link"><FaUsers /> <span>Customers</span></Link>
          <Link to="/dashboard" className="sidebar-link"><FaList /> <span>Orders</span></Link>
          <Link to="/dashboard" className="sidebar-link"><FaCog /> <span>Services</span></Link>
          <Link to="/logout" className="sidebar-link"><FaSignOutAlt /> <span>Logout</span></Link>
        </nav>
      </div>
      <div className="main-content">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon"><FaShoppingBag /></div>
            <div className="stat-content">
              <h2>Total Orders</h2>
              <p>{stats.totalOrders.toLocaleString()}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaMoneyBillWave /></div>
            <div className="stat-content">
              <h2>Total Sales</h2>
              <p>${stats.totalSales.toLocaleString()}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaUsers /></div>
            <div className="stat-content">
              <h2>Total Visits</h2>
              <p>{stats.totalVisits.toLocaleString()}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaChartLine /></div>
            <div className="stat-content">
              <h2>Total Balance</h2>
              <p>${stats.totalBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="dashboard-sections">
          <div className="dashboard-section full-width">
            <h2>All Customers</h2>
            {customers.length > 0 ? (
              <table className="customers-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.fullName}</td>
                      <td>{customer.mail}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.point}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No customers found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;