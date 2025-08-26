import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar (Fixed on the left) */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className="flex-grow-1 bg-light"
        style={{
          marginLeft: "250px", // Offset for fixed sidebar
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Header (will be fixed at the top of the content area) */}
        <Header />
        
        {/* Page Content from the current route */}
        <main className="dashboard-content container-fluid p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;