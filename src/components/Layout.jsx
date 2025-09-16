import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../css/MainLayout.css";

// The Layout component now accepts dragEnabled and setDragEnabled as props
const Layout = ({ dragEnabled, setDragEnabled }) => {
  // State to control the mobile sidebar visibility (overlay, and sidebar itself on mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // State to control the collapsed/expanded state of the sidebar (for desktop)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the mobile visibility state
  };

  const toggleCollapse = () => {
    setIsSidebarCollapsed((prevCollapsed) => !prevCollapsed);
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`layout-container ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Pass the drag state and setter to Header */}
      <Header 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen} 
        dragEnabled={dragEnabled} 
        setDragEnabled={setDragEnabled} 
      />
      <div className="content-wrapper">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <div className="main-content-container">
          {/* Use the Outlet component to render child routes and pass the drag state via context */}
          <Outlet context={{ dragEnabled }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;