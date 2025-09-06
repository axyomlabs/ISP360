import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  FaRegBuilding,
  FaRegComments,
  FaChartBar,
  FaRegUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import {
  PiUsersThreeLight,
  PiHeartbeat,
  PiHeadset,
  PiNetworkLight,
} from "react-icons/pi";
import { HiOutlineCog } from "react-icons/hi";
import { LiaUserTieSolid } from "react-icons/lia";
import { TbFileInvoice } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";

import isplogo from "../assets/isp360dark.png";
import "../css/Sidebar.css";

//
// ------------------- MENU ITEMS -------------------
// Each menu item can be either:
// - a simple link (Dashboard)
// - a parent item with children (e.g., Clients, Network Management, etc.)
//
const menuItems = [
  { title: "Dashboard", icon: <AiOutlineHome />, link: "/app/dashboard" },
  {
    title: "Clients",
    icon: <PiUsersThreeLight />,
    id: "subscribersMenu",
    children: [
      { title: "All Clients", link: "/app/subscribers" },
      { title: "Add Clients", link: "/app/subscribers/add" },
      { title: "Plans & Packages", link: "/app/subscribers/plans" },
      { title: "Usage & Session Logs", link: "/app/subscribers/logs" },
      { title: "IPDR Logs", link: "/app/subscribers/ipdr" },
      { title: "NAT Logs", link: "/app/subscribers/nat" },
    ],
  },
  {
    title: "Network Management",
    icon: <PiNetworkLight />,
    id: "networkMenu",
    children: [
      { title: "NAS / BNG Status", link: "/app/network/nas" },
      { title: "OLT & ONU Mgmt", link: "/app/network/olt" },
      { title: "TR-069 / TR-369 CPE", link: "/app/network/cpe" },
      { title: "Config Backup", link: "/app/network/backup" },
      { title: "Network Map (GIS)", link: "/app/network/gis" },
    ],
  },
  {
    title: "Monitoring",
    icon: <PiHeartbeat />,
    id: "monitorMenu",
    children: [
      { title: "Network Monitoring", link: "/app/monitoring/network" },
      { title: "Capacity Dashboard", link: "/app/monitoring/capacity" },
      { title: "QoE Monitoring", link: "/app/monitoring/qoe" },
      { title: "Alerts & Notifications", link: "/app/monitoring/alerts" },
    ],
  },
  {
    title: "CRM & Support",
    icon: <PiHeadset />,
    id: "crmMenu",
    children: [
      { title: "Customer Profiles", link: "/app/crm/customers" },
      { title: "Complaint Tickets", link: "/app/crm/tickets" },
      { title: "SLA Dashboard", link: "/app/crm/sla" },
      { title: "Knowledge Base", link: "/app/crm/kb" },
    ],
  },
  {
    title: "Billing & Accounting",
    icon: <TbFileInvoice />,
    id: "billingMenu",
    children: [
      { title: "Invoices & Payments", link: "/app/billing/invoices" },
      { title: "Wallet / Recharge", link: "/app/billing/wallet" },
      { title: "Refunds & Credits", link: "/app/billing/refunds" },
      { title: "Tax / GST Reports", link: "/app/billing/tax" },
      { title: "Franchise Commission", link: "/app/billing/commission" },
    ],
  },
  {
    title: "Inventory",
    icon: <BsBoxSeam />,
    id: "inventoryMenu",
    children: [
      { title: "Devices", link: "/app/inventory/devices" },
      { title: "Assign to Customer", link: "/app/inventory/assign" },
      { title: "Returns & Faulty Items", link: "/app/inventory/returns" },
      { title: "Stock Tracking", link: "/app/inventory/stock" },
      { title: "POP Infra", link: "/app/inventory/pop" },
      { title: "AMC & Warranty", link: "/app/inventory/amc" },
    ],
  },
  {
    title: "HR & Workforce",
    icon: <LiaUserTieSolid />,
    id: "hrMenu",
    children: [
      { title: "Employee Profiles", link: "/app/hr/employees" },
      { title: "Attendance Tracking", link: "/app/hr/attendance" },
      { title: "Salary & Payroll", link: "/app/hr/payroll" },
      { title: "Expense Claims", link: "/app/hr/expenses" },
      { title: "Field Workforce App", link: "/app/hr/workforce" },
    ],
  },
  {
    title: "Franchise Mgmt",
    icon: <FaRegBuilding />,
    id: "franchiseMenu",
    children: [
      { title: "All Franchises", link: "/app/franchise/all" },
      { title: "Add Franchise", link: "/app/franchise/add" },
      { title: "Self-Franchise", link: "/app/franchise/self" },
      { title: "Revenue Sharing", link: "/app/franchise/revenue" },
      { title: "Hybrid Model", link: "/app/franchise/hybrid" },
      { title: "Distributor / Reseller", link: "/app/franchise/distributor" },
    ],
  },
  {
    title: "Communications",
    icon: <FaRegComments />,
    id: "commMenu",
    children: [
      { title: "WhatsApp API", link: "/app/comm/whatsapp" },
      { title: "SMS API", link: "/app/comm/sms" },
      { title: "Email Gateway", link: "/app/comm/email" },
      { title: "IVR Setup", link: "/app/comm/ivr" },
      { title: "Push Notifications", link: "/app/comm/notifications" },
    ],
  },
  {
    title: "Analytics & Reports",
    icon: <FaChartBar />,
    id: "analyticsMenu",
    children: [
      { title: "Revenue Reports", link: "/app/analytics/revenue" },
      { title: "Churn Analysis", link: "/app/analytics/churn" },
      { title: "Subscriber Reports", link: "/app/analytics/subscribers" },
      { title: "Capacity Planning", link: "/app/analytics/capacity" },
      { title: "Marketing Campaigns", link: "/app/analytics/marketing" },
    ],
  },
  {
    title: "Admin & Settings",
    icon: <HiOutlineCog />,
    id: "adminMenu",
    children: [
      { title: "User Roles", link: "/app/admin/users" },
      { title: "API Gateway", link: "/app/admin/api" },
      { title: "Branding", link: "/app/admin/branding" },
      { title: "Compliance Reports", link: "/app/admin/compliance" },
      { title: "Lawful Intercept", link: "/app/admin/intercept" },
      { title: "System Backup", link: "/app/admin/backup" },
    ],
  },
];

//
// ------------------- SIDEBAR ITEM COMPONENT -------------------
// Renders either:
// - a direct link (leaf item)
// - a parent menu with expandable submenu
//
const SidebarItem = ({
  item,
  isOpen,
  onToggle,
  toggleSidebar,
  closeAll,
  isCollapsed,
  onHoverIn,
  onHoverOut,
}) => {
  const location = useLocation();

  // Highlight parent menu if any of its children is active
  const isParentActive = item.children?.some(
    (child) => location.pathname === child.link
  );

  // -------- Case 1: Simple link (no children) --------
  if (!item.children) {
    return (
      <NavLink
        to={item.link}
        className={({ isActive }) =>
          `sidebar-link d-flex align-items-center mb-2 ${
            isActive ? "active-link" : ""
          }`
        }
        onClick={() => {
          toggleSidebar(); // close sidebar on mobile
          closeAll(); // close open submenus
        }}
        // For collapsed mode: show flyout submenu on hover
        onMouseEnter={isCollapsed ? (e) => onHoverIn(null, e) : undefined}
        onMouseLeave={isCollapsed ? onHoverOut : undefined}
      >
        {/* Empty span = spacing for arrow alignment */}
        <span style={{ width: 16 }} className="mt-3 mb-3" />
        {item.icon}
        <span className="ms-2">{item.title}</span>
      </NavLink>
    );
  }

  // -------- Case 2: Parent menu with children --------
  return (
    <div
      className="mb-3"
      // In collapsed mode, hover triggers flyout submenu
      onMouseEnter={
        isCollapsed ? (e) => onHoverIn(item.id, e, item.title) : undefined
      }
      onMouseLeave={isCollapsed ? onHoverOut : undefined}
    >
      {/* Parent menu clickable row */}
      <div
        className="sidebar-link d-flex align-items-center cursor-pointer"
        // Only toggle submenu in expanded mode
        onClick={() => (!isCollapsed ? onToggle(item.id) : undefined)}
      >
        {/* Arrow for expandable items (hidden when collapsed) */}
        {!isCollapsed && (
          <FaChevronDown
            className={`transition-arrow me-2 ${
              isOpen || isParentActive ? "rotate-down" : "rotate-right"
            }`}
          />
        )}
        {item.icon}
        {!isCollapsed && <span className="ms-2">{item.title}</span>}
      </div>

      {/* Inline submenu (only visible when expanded & item is open/active) */}
      <div
        className={`submenu ps-4 mt-2 ${
          !isCollapsed && (isOpen || isParentActive) ? "d-block" : "d-none"
        }`}
      >
        {item.children.map((child, i) => {
          const isActive = location.pathname === child.link;
          return (
            <NavLink
              key={i}
              to={child.link}
              className={`sidebar-sublink d-block py-2 ${
                isActive ? "active-link" : ""
              }`}
              onClick={() => {
                toggleSidebar(); // close sidebar on mobile
                closeAll();
              }}
            >
              {child.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

//
// ------------------- MAIN SIDEBAR COMPONENT -------------------
// Handles collapsed/expanded state, flyout menus, and mobile overlay
//
const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = React.useState(null); // currently open menu id
  const [isCollapsed, setIsCollapsed] = React.useState(false); // collapsed/expanded state

  // Flyout submenu state (for collapsed mode)
  const [flyout, setFlyout] = React.useState({
    id: null,
    title: "",
    top: 0,
  });
  const hideTimer = React.useRef(null);

  // Toggle submenu open/close
  const handleToggle = (id) => setOpenMenu(openMenu === id ? null : id);

  // Close all submenus
  const closeAll = () => setOpenMenu(null);

  // -------- Hover handlers for collapsed mode --------
  const handleHoverIn = (id, e, title = "") => {
    if (!isCollapsed) return;
    if (hideTimer.current) clearTimeout(hideTimer.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setFlyout({ id, title, top: rect.top });
  };

  const handleHoverOut = () => {
    if (!isCollapsed) return;
    hideTimer.current = setTimeout(() => {
      setFlyout({ id: null, title: "", top: 0 });
    }, 180); // delay allows moving into flyout without flicker
  };

  const hoveredItem = flyout.id && menuItems.find((m) => m.id === flyout.id);

  return (
    <>
      {/* Mobile overlay (click to close sidebar) */}
      {isSidebarOpen && (
        <div className="sidebar-overlay d-md-none" onClick={toggleSidebar} />
      )}

      {/* Sidebar container */}
      <div
        className={`sidebar bg-white text-black ${
          isSidebarOpen ? "sidebar-open" : ""
        } ${isCollapsed ? "collapsed" : ""}`}
      >
        {/* Sidebar Header with logo + collapse button */}
        <div className="sidebar-header p-2 d-flex align-items-center justify-content-between">
          <img src={isplogo} className="mb-2" alt="ISP Logo" />

          {/* Collapse button (hidden on phone screens) */}
          <button
            className="collapse-btn ms-2 d-none d-md-inline"
            title={isCollapsed ? "Expand" : "Collapse"}
            onClick={() => setIsCollapsed((v) => !v)}
          >
            {isCollapsed ? ">>" : "<<"}
          </button>
        </div>

        {/* Sidebar Menu List */}
        <div className="sidebar-menu p-2" id="sidebarMenu">
          {menuItems.map((item, i) => (
            <SidebarItem
              key={i}
              item={item}
              isOpen={openMenu === item.id}
              onToggle={handleToggle}
              toggleSidebar={toggleSidebar}
              closeAll={closeAll}
              isCollapsed={isCollapsed}
              onHoverIn={handleHoverIn}
              onHoverOut={handleHoverOut}
            />
          ))}
        </div>

        {/* Sidebar Footer (Profile link) */}
        <div className="sidebar-footer">
          <Link
            to="/app/profile"
            className="sidebar-link d-flex align-items-center mb-3"
            onClick={toggleSidebar}
          >
            <FaRegUserCircle className="me-2" />
            {/* Hide text when collapsed */}
            {!isCollapsed && "My Profile"}
          </Link>
        </div>
      </div>

      {/* Flyout submenu (only in collapsed mode) */}
      {isCollapsed && flyout.id && hoveredItem && (
        <div
          className="flyout-menu"
          style={{ top: Math.max(8, flyout.top), left: 70 }} // 70px = collapsed width
          onMouseEnter={() =>
            hideTimer.current && clearTimeout(hideTimer.current)
          }
          onMouseLeave={() => setFlyout({ id: null, title: "", top: 0 })}
        >
          <div className="flyout-title">{hoveredItem.title}</div>
          <div className="flyout-list">
            {hoveredItem.children.map((child, idx) => (
              <NavLink
                key={idx}
                to={child.link}
                className={({ isActive }) =>
                  `flyout-link ${isActive ? "active" : ""}`
                }
                onClick={() => setFlyout({ id: null, title: "", top: 0 })}
              >
                {child.title}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
