import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../css/MainLayout.css";

const Layout = () => {
  // State to control the mobile sidebar visibility (overlay, and sidebar itself on mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // State to control the collapsed/expanded state of the sidebar (for desktop)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the mobile visibility state
  };

  // When collapsing/expanding for desktop, we want to ensure the mobile view is closed.
  const toggleCollapse = () => {
    setIsSidebarCollapsed((prevCollapsed) => !prevCollapsed);
    // If collapsing or expanding on desktop, ensure the mobile sidebar is closed.
    // This prevents having both a collapsed sidebar and an open mobile sidebar.
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`layout-container ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Pass toggleSidebar and isSidebarOpen to Header */}
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="content-wrapper">
        <Sidebar
          isSidebarOpen={isSidebarOpen} // Pass the state to Sidebar for its overlay logic
          toggleSidebar={toggleSidebar} // Pass the toggle function to close sidebar via overlay/esc key
          isCollapsed={isSidebarCollapsed} // Pass collapsed state for styling
          setIsCollapsed={setIsSidebarCollapsed} // Pass the setter for the collapse button
        />
        <div className="main-content-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;