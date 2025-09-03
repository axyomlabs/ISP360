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
  { title: "Dashboard", icon: <FaHome />, link: "/dashboard" },
  {
    title: "Subscribers",
    icon: <FaUsers />,
    id: "subscribersMenu",
    children: [
      { title: "All Subscribers", link: "/subscribers" },
      { title: "Add Subscriber", link: "/subscribers/add" },
      { title: "Plans & Packages", link: "/subscribers/plans" },
      { title: "Usage & Session Logs", link: "/subscribers/logs" },
      { title: "IPDR Logs", link: "/subscribers/ipdr" },
      { title: "NAT Logs", link: "/subscribers/nat" },
    ],
  },
  {
    title: "Network Management",
    icon: <FaNetworkWired />,
    id: "networkMenu",
    children: [
      { title: "NAS / BNG Status", link: "/network/nas" },
      { title: "OLT & ONU Mgmt", link: "/network/olt" },
      { title: "TR-069 / TR-369 CPE", link: "/network/cpe" },
      { title: "Config Backup", link: "/network/backup" },
      { title: "Network Map (GIS)", link: "/network/gis" },
    ],
  },
  {
    title: "Monitoring",
    icon: <FaHeartbeat />,
    id: "monitorMenu",
    children: [
      { title: "Network Monitoring", link: "/monitoring/network" },
      { title: "Capacity Dashboard", link: "/monitoring/capacity" },
      { title: "QoE Monitoring", link: "/monitoring/qoe" },
      { title: "Alerts & Notifications", link: "/monitoring/alerts" },
    ],
  },
  {
    title: "CRM & Support",
    icon: <FaHeadset />,
    id: "crmMenu",
    children: [
      { title: "Customer Profiles", link: "/crm/customers" },
      { title: "Complaint Tickets", link: "/crm/tickets" },
      { title: "SLA Dashboard", link: "/crm/sla" },
      { title: "Knowledge Base", link: "/crm/kb" },
    ],
  },
  {
    title: "Billing & Accounting",
    icon: <FaFileInvoice />,
    id: "billingMenu",
    children: [
      { title: "Invoices & Payments", link: "/billing/invoices" },
      { title: "Wallet / Recharge", link: "/billing/wallet" },
      { title: "Refunds & Credits", link: "/billing/refunds" },
      { title: "Tax / GST Reports", link: "/billing/tax" },
      { title: "Franchise Commission", link: "/billing/commission" },
    ],
  },
  {
    title: "Inventory",
    icon: <FaBoxes />,
    id: "inventoryMenu",
    children: [
      { title: "Devices", link: "/inventory/devices" },
      { title: "Assign to Customer", link: "/inventory/assign" },
      { title: "Returns & Faulty Items", link: "/inventory/returns" },
      { title: "Stock Tracking", link: "/inventory/stock" },
      { title: "POP Infra", link: "/inventory/pop" },
      { title: "AMC & Warranty", link: "/inventory/amc" },
    ],
  },
  {
    title: "HR & Workforce",
    icon: <FaUserTie />,
    id: "hrMenu",
    children: [
      { title: "Employee Profiles", link: "/hr/employees" },
      { title: "Attendance Tracking", link: "/hr/attendance" },
      { title: "Salary & Payroll", link: "/hr/payroll" },
      { title: "Expense Claims", link: "/hr/expenses" },
      { title: "Field Workforce App", link: "/hr/workforce" },
    ],
  },
  {
    title: "Franchise Mgmt",
    icon: <FaBuilding />,
    id: "franchiseMenu",
    children: [
      { title: "All Franchises", link: "/franchise/all" },
      { title: "Add Franchise", link: "/franchise/add" },
      { title: "Self-Franchise", link: "/franchise/self" },
      { title: "Revenue Sharing", link: "/franchise/revenue" },
      { title: "Hybrid Model", link: "/franchise/hybrid" },
      { title: "Distributor / Reseller", link: "/franchise/distributor" },
    ],
  },
  {
    title: "Communications",
    icon: <FaComments />,
    id: "commMenu",
    children: [
      { title: "WhatsApp API", link: "/comm/whatsapp" },
      { title: "SMS API", link: "/comm/sms" },
      { title: "Email Gateway", link: "/comm/email" },
      { title: "IVR Setup", link: "/comm/ivr" },
      { title: "Push Notifications", link: "/comm/notifications" },
    ],
  },
  {
    title: "Analytics & Reports",
    icon: <FaChartBar />,
    id: "analyticsMenu",
    children: [
      { title: "Revenue Reports", link: "/analytics/revenue" },
      { title: "Churn Analysis", link: "/analytics/churn" },
      { title: "Subscriber Reports", link: "/analytics/subscribers" },
      { title: "Capacity Planning", link: "/analytics/capacity" },
      { title: "Marketing Campaigns", link: "/analytics/marketing" },
    ],
  },
  {
    title: "Admin & Settings",
    icon: <FaCog />,
    id: "adminMenu",
    children: [
      { title: "User Roles", link: "/admin/users" },
      { title: "API Gateway", link: "/admin/api" },
      { title: "Branding", link: "/admin/branding" },
      { title: "Compliance Reports", link: "/admin/compliance" },
      { title: "Lawful Intercept", link: "/admin/intercept" },
      { title: "System Backup", link: "/admin/backup" },
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
        <div className="sidebar-header">
          <button
            className="btn btn-dark d-block d-md-none close-sidebar-btn"
            onClick={toggleSidebar}
          >
            <FaTimes size={24} />
          </button>
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
            to="/profile"
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
