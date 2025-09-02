import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../css/MainLayout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`d-flex ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* Sidebar and Overlay */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className="flex-grow-1 bg-light main-content-container">
        {/* Header receives the toggle function and the state */}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Page content from the current route */}
        <main className="dashboard-content container-fluid p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;