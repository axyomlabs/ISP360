import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../css/MainLayout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);   // mobile toggle
  const [isCollapsed, setIsCollapsed] = useState(false);       // desktop collapse

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`layout-container ${
        isSidebarOpen ? "sidebar-open" : ""
      } ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onCollapseChange={setIsCollapsed}   // ✅ listen to collapse changes
      />
      <div className="flex-grow-1 bg-light main-content-container">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="dashboard-content container-fluid p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
