import React, { useState, useRef } from "react";
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
  PiUsersThree,
} from "react-icons/pi";
import { HiOutlineCog } from "react-icons/hi";
import { LiaUserTieSolid } from "react-icons/lia";
import { TbFileInvoice } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineAccessTime, MdOutlineAccountTree } from "react-icons/md";
import { LuFileClock } from "react-icons/lu";

import isplogo from "../assets/logo.png";
import "../css/Sidebar.css";

// --- UPDATED MENU ITEMS ---
const menuItems = [
  { title: "Dashboard", icon: <AiOutlineHome />, link: "/app/dashboard" },
  {
    title: "Clients",
    icon: <PiUsersThreeLight />,
    id: "clientsMenu",
    children: [
      { title: "All Clients", link: "/app/clients/all" },
      { title: "Add Client", link: "/app/clients/add" },
      { title: "Online Clients", link: "/app/clients/online" },
      { title: "Bulk Operation", link: "/app/clients/bulk" },
      { title: "Session History", link: "/app/clients/session-history" },
      { title: "Traffic History", link: "/app/clients/traffic-history" },
      { title: "Suspended / Disconnected", link: "/app/clients/suspended" },
    ],
  },
  {
    title: "Network Management",
    icon: <PiNetworkLight />,
    id: "networkMenu",
    children: [
      { title: "Plans & Packages", link: "/app/network/plans-packages" },
      { title: "NAS / BNG", link: "/app/network/nas-bng" },
      { title: "OLT(Device) Management", link: "/app/network/olt-management" },
      { title: "ONU / ONT Management", link: "/app/network/onu-ont-management" },
      { title: "Wireless Towers", link: "/app/network/wireless-towers" },
      { title: "Wireless CPEs", link: "/app/network/wireless-cpes" },
      { title: "Config Backup & Restore", link: "/app/network/config-backup-restore" },
      { title: "TR069", link: "/app/network/tr069" },
      { title: "Network Map", link: "/app/network/network-map" },
      { title: "IP Address Mgmt", link: "/app/network/ip-address-mgmt" },
      { title: "Settings", link: "/app/network/settings" },
    ],
  },
  {
    title: "Monitoring",
    icon: <PiHeartbeat />,
    id: "monitorMenu",
    children: [
      { title: "Network Monitoring", link: "/app/monitoring/network-monitoring" },
      { title: "Traffic Report", link: "/app/monitoring/traffic-report" },
      { title: "QoE Monitoring", link: "/app/monitoring/qoe-monitoring" },
      { title: "Alerts & Notifications", link: "/app/monitoring/alerts-notifications" },
      { title: "Server and License Information", link: "/app/monitoring/server-license" },
      { title: "Service Uptime / Downtime Monitor", link: "/app/monitoring/service-uptime" },
    ],
  },
  {
    title: "CRM & Support",
    icon: <PiHeadset />,
    id: "crmMenu",
    children: [
      {
        title: "Complaint Tickets (List)",
        link: "/app/crm/complaint-tickets",
        subChildren: [
          { title: "New", link: "/app/crm/complaint-tickets/new" },
          { title: "Assigned", link: "/app/crm/complaint-tickets/assigned" },
          { title: "Resolved", link: "/app/crm/complaint-tickets/resolved" },
          { title: "Closed", link: "/app/crm/complaint-tickets/closed" },
        ]
      },
      { title: "SLA Dashboard", link: "/app/crm/sla-dashboard" },
      { title: "Escalation Matrix", link: "/app/crm/escalation-matrix" },
      { title: "Feedback and Ratings", link: "/app/crm/feedback-ratings" },
      { title: "Knowledge Base & FAQs", link: "/app/crm/knowledge-base" },
      { title: "Settings", link: "/app/crm/settings" },
    ],
  },
  {
    title: "Billing & Accounting",
    icon: <TbFileInvoice />,
    id: "billingMenu",
    children: [
      { title: "Invoices (Tax & Proforma)", link: "/app/billing/invoices" },
      { title: "Vendor Bills", link: "/app/billing/vendor-bills" },
      { title: "Expenses", link: "/app/billing/expenses" },
      { title: "Payments", link: "/app/billing/payments" },
      { title: "Wallet", link: "/app/billing/wallet" },
      { title: "User Specials", link: "/app/billing/user-specials" },
      { title: "Refunds & Credits", link: "/app/billing/refunds-credits" },
      { title: "Debit Notes", link: "/app/billing/debit-notes" },
      { title: "Payment Reconciliation", link: "/app/billing/payment-reconciliation" },
      { title: "GST & AGR", link: "/app/billing/gst-agr" },
    ],
  },
  {
    title: "Inventory",
    icon: <BsBoxSeam />,
    id: "inventoryMenu",
    children: [
      {
        title: "Operations",
        link: "/app/inventory/operations",
        subChildren: [
          { title: "Sales", link: "/app/inventory/operations/sales" },
          { title: "Purchase", link: "/app/inventory/operations/purchase" },
          { title: "Returns", link: "/app/inventory/operations/returns" },
          { title: "Repairs", link: "/app/inventory/operations/repairs" },
        ]
      },
      { title: "Product (ONU, Routers, Spares)", link: "/app/inventory/product" },
      { title: "Vendors", link: "/app/inventory/vendors" },
      { title: "Assign to Customer", link: "/app/inventory/assign-customer" },
      { title: "Stock Tracking (with QR/Barcode)", link: "/app/inventory/stock-tracking" },
      { title: "POP Infra (UPS, Batteries, Racks)", link: "/app/inventory/pop-infra" },
      { title: "AMC & Warranty Alerts", link: "/app/inventory/amc-warranty" },
    ],
  },
  {
    title: "Analytics & Reports",
    icon: <FaChartBar />,
    id: "analyticsMenu",
    children: [
      { title: "Revenue Reports", link: "/app/analytics/revenue" },
      { title: "Inventory Report", link: "/app/analytics/inventory" },
      { title: "Customer Churn Analysis", link: "/app/analytics/churn" },
      { title: "Area-Wise Subscriber Report", link: "/app/analytics/area-subscribers" },
      { title: "Usage/Top Consumers Report", link: "/app/analytics/usage" },
      { title: "Franchise Wise Report", link: "/app/analytics/franchise" },
      { title: "SLA Compliance Report", link: "/app/analytics/sla-compliance" },
      { title: "Custom Report Builder", link: "/app/analytics/custom-report" },
    ],
  },
  {
    title: "Communications",
    icon: <FaRegComments />,
    id: "commMenu",
    children: [
      { title: "WhatsApp", link: "/app/communications/whatsapp" },
      { title: "IVR or Calls", link: "/app/communications/ivr-calls" },
      { title: "SMS", link: "/app/communications/sms" },
      { title: "Email", link: "/app/communications/email" },
      { title: "Marketing Campaigns", link: "/app/communications/marketing-campaigns" },
      { title: "Notifications", link: "/app/communications/notifications" },
      { title: "Promotions", link: "/app/communications/promotions" },
      { title: "Templates", link: "/app/communications/templates" },
      { title: "WhatsApp Bot", link: "/app/communications/whatsapp-bot" },
      { title: "Settings", link: "/app/communications/settings" },
    ],
  },
  {
    title: "Logs",
    icon: <LuFileClock />,
    id: "logsMenu",
    children: [
      { title: "Audit", link: "/app/logs/audit" },
      { title: "Communication", link: "/app/logs/communication" },
      { title: "Login", link: "/app/logs/login" },
      { title: "System", link: "/app/logs/system" },
    ],
  },
  {
    title: "HR & Workforce",
    icon: <LiaUserTieSolid />,
    id: "hrMenu",
    children: [
      { title: "Employee (Admin User)", link: "/app/hr/employee" },
      { title: "Roles", link: "/app/hr/roles" },
      { title: "Department", link: "/app/hr/department" },
      { title: "Attendance", link: "/app/hr/attendance" },
      { title: "Salary & Payroll", link: "/app/hr/salary-payroll" },
      { title: "Expense Claims", link: "/app/hr/expense-claims" },
      { title: "Field Workforce App Integration", link: "/app/hr/field-workforce-app" },
      { title: "Tracking", link: "/app/hr/tracking" },
      { title: "Leave & Shift Management", link: "/app/hr/leave-shift" },
      { title: "Incentives / Commission", link: "/app/hr/incentives-commission" },
      { title: "Performance Report", link: "/app/hr/performance-report" },
      { title: "Settings", link: "/app/hr/settings" },
    ],
  },
  {
    title: "Franchise Management",
    icon: <FaRegBuilding />,
    id: "franchiseMenu",
    children: [
      { title: "All Franchises", link: "/app/franchise/all" },
      { title: "Add Franchise", link: "/app/franchise/add" },
      { title: "Franchise Setup", link: "/app/franchise/setup" },
      { title: "Revenue-Sharing Setup", link: "/app/franchise/revenue-sharing" },
      { title: "Franchise Ledger & Wallet", link: "/app/franchise/ledger-wallet" },
      { title: "Custom Pricing", link: "/app/franchise/custom-pricing" },
      { title: "Commission & Settlement Reports", link: "/app/franchise/commission-reports" },
      { title: "Franchise Setting", link: "/app/franchise/settings" },
    ],
  },
  {
    title: "Settings",
    icon: <HiOutlineCog />,
    id: "settingsMenu",
    children: [
      { title: "Company", link: "/app/settings/company" },
      { title: "General", link: "/app/settings/general" },
      { title: "Branch", link: "/app/settings/branch" },
      { title: "Location Management", link: "/app/settings/location-management" },
      { title: "Billing", link: "/app/settings/billing" },
      { title: "Integrations", link: "/app/settings/integrations" },
      { title: "Notification Setting", link: "/app/settings/notification" },
      { title: "User Portal", link: "/app/settings/user-portal" },
      { title: "Rules", link: "/app/settings/rules" },
      { title: "Documentation & TnCs", link: "/app/settings/documentation" },
      { title: "System Backup & Restore", link: "/app/settings/system-backup-restore" },
    ],
  },
  {
    title: "Profile",
    icon: <FaRegUserCircle />,
    id: "profileMenu",
    children: [
      { title: "Profile Info", link: "/app/profile/info" },
      { title: "Settings", link: "/app/profile/settings" },
    ],
  },
];

// --- SIDEBAR ITEM COMPONENT ---
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
  // Check if any child's link matches the current location
  const isParentActive = item.children?.some(
    (child) => location.pathname === child.link
  );

  if (!item.children) {
    // This is a direct link item (no dropdown)
    return (
      <NavLink
        to={item.link}
        className={({ isActive }) =>
          `sidebar-link d-flex align-items-center ${
            isActive ? "active-link" : ""
          }`
        }
        onClick={() => {
          toggleSidebar(); // Close sidebar on mobile when a link is clicked
          closeAll(); // Close any open dropdowns
        }}
        onMouseEnter={isCollapsed ? (e) => onHoverIn(null, e) : undefined}
        onMouseLeave={isCollapsed ? onHoverOut : undefined}
      >
        {item.icon}
        {/* Conditionally render the title span only if the sidebar is NOT collapsed */}
        {!isCollapsed && <span className="ms-2">{item.title}</span>}
      </NavLink>
    );
  }

  // This is a menu item with children (dropdown)
  return (
    <div
      className="mb-3"
      onMouseEnter={
        isCollapsed ? (e) => onHoverIn(item.id, e, item.title) : undefined
      }
      onMouseLeave={isCollapsed ? onHoverOut : undefined}
    >
      <div
        className="sidebar-link d-flex align-items-center cursor-pointer"
        onClick={() => {
          // Only toggle if the sidebar is NOT collapsed. If collapsed, hover handles it.
          if (!isCollapsed) {
            onToggle(item.id);
          }
        }}
      >
        {/* Arrow icon is shown only when not collapsed and the item has children */}
        {!isCollapsed && (
          <FaChevronDown
            className={`transition-arrow me-2 ${
              isOpen || isParentActive ? "rotate-down" : "rotate-right"
            }`}
          />
        )}
        {item.icon}
        {/* Conditionally render the title span only if the sidebar is NOT collapsed */}
        {!isCollapsed && <span className="ms-2">{item.title}</span>}
      </div>
      {/* Submenu is displayed if not collapsed AND (menu is open OR parent is active) */}
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
                toggleSidebar(); // Close sidebar on mobile when a sub-link is clicked
                closeAll(); // Close any open dropdowns
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

// --- MAIN SIDEBAR COMPONENT ---
const Sidebar = ({
  isSidebarOpen, // Prop to control mobile sidebar visibility
  toggleSidebar, // Function to toggle mobile sidebar visibility
  isCollapsed, // Prop to control if the sidebar is collapsed
  setIsCollapsed, // Function to set the collapsed state
}) => {
  const [openMenu, setOpenMenu] = useState(null); // State to manage which menu is open
  const [flyout, setFlyout] = useState({
    id: null, // ID of the menu item currently being hovered over
    title: "", // Title of the hovered menu item
    top: 0, // Vertical position for the flyout menu
  });
  const hideTimer = useRef(null); // Ref to manage the delay for hiding the flyout menu

  // Handler to toggle a specific menu
  const handleToggle = (id) => setOpenMenu(openMenu === id ? null : id);
  // Handler to close all open menus
  const closeAll = () => setOpenMenu(null);

  // Handler for when the mouse enters a collapsed menu item
  const handleHoverIn = (id, e, title = "") => {
    if (!isCollapsed) return; // Only active when sidebar is collapsed
    if (hideTimer.current) clearTimeout(hideTimer.current); // Clear any existing hide timer
    const rect = e.currentTarget.getBoundingClientRect(); // Get position of the element
    setFlyout({ id, title, top: rect.top }); // Set flyout state
  };

  // Handler for when the mouse leaves a collapsed menu item
  const handleHoverOut = () => {
    if (!isCollapsed) return; // Only active when sidebar is collapsed
    // Set a timer to hide the flyout menu after a short delay
    hideTimer.current = setTimeout(() => {
      setFlyout({ id: null, title: "", top: 0 });
    }, 180);
  };

  // Find the menu item that is currently being hovered over for the flyout
  const hoveredItem = flyout.id && menuItems.find((m) => m.id === flyout.id);

  return (
    <>
      {/* Sidebar Overlay: Visible only on mobile when the sidebar is open */}
      {isSidebarOpen && (
        <div className="sidebar-overlay d-md-none" onClick={toggleSidebar} />
      )}

      <div
        className={`sidebar bg-white text-black ${
          isSidebarOpen ? "sidebar-open" : "" // Class for mobile sidebar open state
        } ${isCollapsed ? "collapsed" : ""}`} // Class for collapsed state
      >
        <div className="sidebar-header p-2 d-flex align-items-center justify-content-between">
          <img
            src={isplogo}
            className="mb-2"
            alt="ISP Logo"
            style={{
              height: "auto",
              // Adjust logo width: full width when collapsed, 70% when expanded
              width: isCollapsed ? "100%" : "70%",
              objectFit: "contain",
              flexShrink: 0,
            }}
          />

          <button
            className="collapse-btn ms-2 d-none d-md-inline" // Button visible on larger screens
            title={isCollapsed ? "Expand" : "Collapse"}
            onClick={() => {
              setIsCollapsed((v) => !v); // Toggle the collapsed state
              // If sidebar is open on mobile, close it when collapsing to desktop view
              if (isSidebarOpen) {
                toggleSidebar();
              }
            }}
          >
            {isCollapsed ? ">>" : "<<"}
          </button>
        </div>

        <div className="sidebar-menu p-2" id="sidebarMenu">
          {menuItems.map((item, i) => (
            <SidebarItem
              key={i}
              item={item}
              isOpen={openMenu === item.id} // Is this menu item currently open?
              onToggle={handleToggle} // Function to toggle this menu item
              toggleSidebar={toggleSidebar} // Pass down to close mobile sidebar on link click
              closeAll={closeAll} // Function to close all menus
              isCollapsed={isCollapsed} // Pass down the collapsed state
              onHoverIn={handleHoverIn} // Hover handler for flyout menu
              onHoverOut={handleHoverOut} // Hover handler for flyout menu
            />
          ))}
        </div>

        <div className="sidebar-footer">
          <Link
            to="/app/profile"
            className="sidebar-link d-flex align-items-center mb-3"
            onClick={toggleSidebar} // Close sidebar on mobile when profile link is clicked
          >
            <FaRegUserCircle className="me-2" />
            {/* Conditionally render "My Profile" text only if not collapsed */}
            {!isCollapsed && "My Profile"}
          </Link>
        </div>
      </div>

      {/* Flyout menu for collapsed sidebar */}
      {isCollapsed && flyout.id && hoveredItem && (
        <div
          className="flyout-menu"
          style={{ top: Math.max(8, flyout.top), left: 70 }} // Position the flyout menu
          onMouseEnter={() =>
            hideTimer.current && clearTimeout(hideTimer.current) // Keep flyout open if mouse enters it
          }
          onMouseLeave={() => setFlyout({ id: null, title: "", top: 0 })} // Hide flyout when mouse leaves
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
                onClick={() => setFlyout({ id: null, title: "", top: 0 })} // Close flyout on link click
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