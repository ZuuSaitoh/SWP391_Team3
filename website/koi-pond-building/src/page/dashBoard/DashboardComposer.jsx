import React, { useState } from "react";
import Overview from "./Overview";
import CustomerProfileDashBoard from "./customerProfileDashBoard";
import StaffProfileDashBoard from "./staffProfileDashBoard";
import OrderViewDashBoard from "./orderViewDashBoard";
import ServiceViewDashboard from "./ServiceViewDashboard";
import ContractViewDashBoard from "./contractViewDashBoard";
import SheetDataView from "./SheetDataView";


const DashboardComposer = () => {
  const [activeView, setActiveView] = useState("overview");

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return <Overview />;
      case "customers":
        return <CustomerProfileDashBoard />;
      case "staffs":
        return <StaffProfileDashBoard />;
      case "orders":
        return <OrderViewDashBoard />;
      case "services":
        return <ServiceViewDashboard />;
      case "contracts":
        return <ContractViewDashBoard />;
      case "sheetData":
        return <SheetDataView />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard-composer">
      <nav className="dashboard-nav">
        <button onClick={() => setActiveView("overview")}>Overview</button>
        <button onClick={() => setActiveView("customers")}>Customers</button>
        <button onClick={() => setActiveView("staffs")}>Staffs</button>
        <button onClick={() => setActiveView("orders")}>Orders</button>
        <button onClick={() => setActiveView("services")}>Services</button>
        <button onClick={() => setActiveView("contracts")}>Contracts</button>
        <button onClick={() => setActiveView("sheetData")}>Sheet Data</button>
      </nav>
      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
};

export default DashboardComposer;
