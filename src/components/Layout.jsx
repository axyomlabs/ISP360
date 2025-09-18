import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../css/MainLayout.css";

const defaultOrder = {
  column1: ["userStats", "paymentStats", "onlinePaymentStats", "registrationStats"],
  column2: ["onlineAdminUsers", "complaintStats", "leadsStats", "nasWise"],
  column3: ["today", "complaints", "yesterday", "upcomingExpiry"],
};

const Layout = ({ dragEnabled, setDragEnabled }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [cardOrder, setCardOrder] = useState(() => {
    const saved = localStorage.getItem("dashboardCardOrder");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          parsed.column1 &&
          parsed.column2 &&
          parsed.column3 &&
          Array.isArray(parsed.column1) &&
          Array.isArray(parsed.column2) &&
          Array.isArray(parsed.column3)
        ) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse dashboard card order from localStorage", e);
      }
    }
    return defaultOrder;
  });

  useEffect(() => {
    localStorage.setItem("dashboardCardOrder", JSON.stringify(cardOrder));
  }, [cardOrder]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsSidebarCollapsed((prevCollapsed) => !prevCollapsed);
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handleResetLayout = () => {
    setCardOrder(defaultOrder);
    localStorage.removeItem("dashboardCardOrder");
  };

  return (
    <div className={`layout-container ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Header
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        dragEnabled={dragEnabled}
        setDragEnabled={setDragEnabled}
        onResetLayout={handleResetLayout}
      />
      <div className="content-wrapper">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <div className="main-content-container">
          <Outlet context={{ dragEnabled, cardOrder, setCardOrder }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;