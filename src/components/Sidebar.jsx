import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaNetworkWired,
  FaHeartbeat,
  FaHeadset,
  FaFileInvoice,
  FaBoxes,
  FaUserTie,
  FaBuilding,
  FaComments,
  FaChartBar,
  FaCog,
  FaUser,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import isplogo from "../assets/isp360.png";
import secondLogo from "../assets/logo.png";
import "../css/Sidebar.css";

const menuItems = [
  { title: "Dashboard", icon: <FaHome />, link: "/app/dashboard" }, // Corrected link
  {
    title: "Subscribers",
    icon: <FaUsers />,
    id: "subscribersMenu",
    children: [
      { title: "All Subscribers", link: "/app/subscribers" }, // Corrected link
      { title: "Add Subscriber", link: "/app/subscribers/add" }, // Corrected link
      { title: "Plans & Packages", link: "/app/subscribers/plans" }, // Corrected link
      { title: "Usage & Session Logs", link: "/app/subscribers/logs" }, // Corrected link
      { title: "IPDR Logs", link: "/app/subscribers/ipdr" }, // Corrected link
      { title: "NAT Logs", link: "/app/subscribers/nat" }, // Corrected link
    ],
  },
  {
    title: "Network Management",
    icon: <FaNetworkWired />,
    id: "networkMenu",
    children: [
      { title: "NAS / BNG Status", link: "/app/network/nas" }, // Corrected link
      { title: "OLT & ONU Mgmt", link: "/app/network/olt" }, // Corrected link
      { title: "TR-069 / TR-369 CPE", link: "/app/network/cpe" }, // Corrected link
      { title: "Config Backup", link: "/app/network/backup" }, // Corrected link
      { title: "Network Map (GIS)", link: "/app/network/gis" }, // Corrected link
    ],
  },
  {
    title: "Monitoring",
    icon: <FaHeartbeat />,
    id: "monitorMenu",
    children: [
      { title: "Network Monitoring", link: "/app/monitoring/network" }, // Corrected link
      { title: "Capacity Dashboard", link: "/app/monitoring/capacity" }, // Corrected link
      { title: "QoE Monitoring", link: "/app/monitoring/qoe" }, // Corrected link
      { title: "Alerts & Notifications", link: "/app/monitoring/alerts" }, // Corrected link
    ],
  },
  {
    title: "CRM & Support",
    icon: <FaHeadset />,
    id: "crmMenu",
    children: [
      { title: "Customer Profiles", link: "/app/crm/customers" }, // Corrected link
      { title: "Complaint Tickets", link: "/app/crm/tickets" }, // Corrected link
      { title: "SLA Dashboard", link: "/app/crm/sla" }, // Corrected link
      { title: "Knowledge Base", link: "/app/crm/kb" }, // Corrected link
    ],
  },
  {
    title: "Billing & Accounting",
    icon: <FaFileInvoice />,
    id: "billingMenu",
    children: [
      { title: "Invoices & Payments", link: "/app/billing/invoices" }, // Corrected link
      { title: "Wallet / Recharge", link: "/app/billing/wallet" }, // Corrected link
      { title: "Refunds & Credits", link: "/app/billing/refunds" }, // Corrected link
      { title: "Tax / GST Reports", link: "/app/billing/tax" }, // Corrected link
      { title: "Franchise Commission", link: "/app/billing/commission" }, // Corrected link
    ],
  },
  {
    title: "Inventory",
    icon: <FaBoxes />,
    id: "inventoryMenu",
    children: [
      { title: "Devices", link: "/app/inventory/devices" }, // Corrected link
      { title: "Assign to Customer", link: "/app/inventory/assign" }, // Corrected link
      { title: "Returns & Faulty Items", link: "/app/inventory/returns" }, // Corrected link
      { title: "Stock Tracking", link: "/app/inventory/stock" }, // Corrected link
      { title: "POP Infra", link: "/app/inventory/pop" }, // Corrected link
      { title: "AMC & Warranty", link: "/app/inventory/amc" }, // Corrected link
    ],
  },
  {
    title: "HR & Workforce",
    icon: <FaUserTie />,
    id: "hrMenu",
    children: [
      { title: "Employee Profiles", link: "/app/hr/employees" }, // Corrected link
      { title: "Attendance Tracking", link: "/app/hr/attendance" }, // Corrected link
      { title: "Salary & Payroll", link: "/app/hr/payroll" }, // Corrected link
      { title: "Expense Claims", link: "/app/hr/expenses" }, // Corrected link
      { title: "Field Workforce App", link: "/app/hr/workforce" }, // Corrected link
    ],
  },
  {
    title: "Franchise Mgmt",
    icon: <FaBuilding />,
    id: "franchiseMenu",
    children: [
      { title: "All Franchises", link: "/app/franchise/all" }, // Corrected link
      { title: "Add Franchise", link: "/app/franchise/add" }, // Corrected link
      { title: "Self-Franchise", link: "/app/franchise/self" }, // Corrected link
      { title: "Revenue Sharing", link: "/app/franchise/revenue" }, // Corrected link
      { title: "Hybrid Model", link: "/app/franchise/hybrid" }, // Corrected link
      { title: "Distributor / Reseller", link: "/app/franchise/distributor" }, // Corrected link
    ],
  },
  {
    title: "Communications",
    icon: <FaComments />,
    id: "commMenu",
    children: [
      { title: "WhatsApp API", link: "/app/comm/whatsapp" }, // Corrected link
      { title: "SMS API", link: "/app/comm/sms" }, // Corrected link
      { title: "Email Gateway", link: "/app/comm/email" }, // Corrected link
      { title: "IVR Setup", link: "/app/comm/ivr" }, // Corrected link
      { title: "Push Notifications", link: "/app/comm/notifications" }, // Corrected link
    ],
  },
  {
    title: "Analytics & Reports",
    icon: <FaChartBar />,
    id: "analyticsMenu",
    children: [
      { title: "Revenue Reports", link: "/app/analytics/revenue" }, // Corrected link
      { title: "Churn Analysis", link: "/app/analytics/churn" }, // Corrected link
      { title: "Subscriber Reports", link: "/app/analytics/subscribers" }, // Corrected link
      { title: "Capacity Planning", link: "/app/analytics/capacity" }, // Corrected link
      { title: "Marketing Campaigns", link: "/app/analytics/marketing" }, // Corrected link
    ],
  },
  {
    title: "Admin & Settings",
    icon: <FaCog />,
    id: "adminMenu",
    children: [
      { title: "User Roles", link: "/app/admin/users" }, // Corrected link
      { title: "API Gateway", link: "/app/admin/api" }, // Corrected link
      { title: "Branding", link: "/app/admin/branding" }, // Corrected link
      { title: "Compliance Reports", link: "/app/admin/compliance" }, // Corrected link
      { title: "Lawful Intercept", link: "/app/admin/intercept" }, // Corrected link
      { title: "System Backup", link: "/app/admin/backup" }, // Corrected link
    ],
  },
];

const SidebarItem = ({ item, toggleSidebar }) => {
  const location = useLocation();

  if (!item.children) {
    return (
      <NavLink
        to={item.link}
        className={({ isActive }) =>
          `text-white text-decoration-none d-flex align-items-center mb-3 ${
            isActive ? "active-link" : ""
          }`
        }
        onClick={toggleSidebar}
      >
        {item.icon}
        <span className="ms-2">{item.title}</span>
      </NavLink>
    );
  }

  const isParentActive = item.children.some(
    (child) => location.pathname === child.link
  );

  return (
    <div className="mb-3">
      <a
        className="d-flex justify-content-between align-items-center text-white text-decoration-none"
        data-bs-toggle="collapse"
        href={`#${item.id}`}
        aria-expanded={isParentActive}
      >
        <span>
          {item.icon}
          <span className="ms-2">{item.title}</span>
        </span>
        <FaChevronDown className="transition-arrow" />
      </a>
      <div
        className={`collapse ps-4 mt-2 ${isParentActive ? "show" : ""}`}
        id={item.id}
        data-bs-parent="#sidebarMenu"
      >
        {item.children.map((child, i) => (
          <NavLink
            key={i}
            to={child.link}
            className={({ isActive }) =>
              `d-block text-white text-decoration-none py-1 ${
                isActive ? "active-link" : ""
              }`
            }
            onClick={toggleSidebar}
          >
            {child.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="sidebar-overlay d-md-none"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`sidebar bg-dark text-white ${isSidebarOpen ? "sidebar-open" : ""}`}
      >
        {/* Header */}
        <div className="sidebar-header p-1">
          <img src={isplogo} alt="ISP Logo" />

          <img src={secondLogo} alt="Second Logo" />
        </div>

        {/* Scrollable menu */}
        <div className="sidebar-menu" id="sidebarMenu">
          {menuItems.map((item, i) => (
            <SidebarItem key={i} item={item} toggleSidebar={toggleSidebar} />
          ))}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <Link
            to="/app/profile" // Corrected link
            className="d-block text-white text-decoration-none mb-3"
            onClick={toggleSidebar}
          >
            <FaUser className="me-2" /> My Profile
          </Link>
        </div>
      </div>
    </>
  );
};


export default Sidebar;