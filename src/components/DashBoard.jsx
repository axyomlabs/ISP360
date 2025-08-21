import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaClipboardList,
  FaNetworkWired,
  FaFileAlt,
  FaBook,
  FaTags,
  FaBoxes,
  FaChartBar,
  FaTools,
  FaHeadset,
  FaCog,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import { Accordion, Container } from "react-bootstrap";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Container fluid className="dashboard p-0">
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className={`sidebar bg-dark text-white p-3 ${
            sidebarOpen ? "d-block" : "d-none d-md-block"
          }`}
        >
          <h4 className="mb-4 text-primary fw-bold">ISP360</h4>

          <ul className="list-unstyled">
            <li className="sidebar-item">
              <FaTachometerAlt /> Dashboard
            </li>

            {/* Accordion Menu */}
            <Accordion flush alwaysOpen={false}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <FaCog /> Administration
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled sidebar-submenu">
                    <li>User Roles</li>
                    <li>Permissions</li>
                    <li>Settings</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <FaCog /> Franchise mgmt.
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled sidebar-submenu">
                    <li>Branch List</li>
                    <li>Partners</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <FaCog /> Radius panel
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled sidebar-submenu">
                    <li>Servers</li>
                    <li>Config</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <li className="sidebar-item">
                <FaUser /> User
              </li>
              <li className="sidebar-item">
                <FaClipboardList /> Complaints
              </li>
              <li className="sidebar-item">
                <FaClipboardList /> Leads
              </li>

              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <FaNetworkWired /> Network mgmt.
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled sidebar-submenu">
                    <li>Devices</li>
                    <li>Connections</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  <FaFileAlt /> Reports
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled sidebar-submenu">
                    <li>Daily Report</li>
                    <li>Monthly Report</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <li className="sidebar-item">
                <FaBook /> Logs
              </li>
              <li className="sidebar-item">
                <FaTags /> Promotions
              </li>

              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  <FaBoxes /> Inventory mgmt.
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled sidebar-submenu">
                    <li>Products</li>
                    <li>Stock</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  <FaChartBar /> Business analytic
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled sidebar-submenu">
                    <li>Revenue</li>
                    <li>Customer Data</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <li className="sidebar-item">
                <FaTools /> Tools
              </li>
              <li className="sidebar-item">
                <FaHeadset /> App support
              </li>
            </Accordion>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1">
          {/* Top Navbar */}
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            {/* Sidebar toggle for mobile */}
            <button
              className="btn btn-outline-secondary d-md-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>

            {/* Search Bar */}
            <div className="search-bar d-flex align-items-center flex-grow-1 mx-3">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Search here ..."
              />
              <FaSearch className="ms-2" />
            </div>

            {/* Right icons */}
            <div className="d-flex align-items-center gap-3">
              <FaBell size={20} />
              <FaUserCircle size={24} />
            </div>
          </div>
          <div className="d-flex ">
              <div className="first">
                  
              </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
