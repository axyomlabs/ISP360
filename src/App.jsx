import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your page components
import Layout from './components/Layout';
import Dashboard from './pages/DashBoard'; 
import LoginPage from './pages/LoginPage';
import AllSubscribers from './pages/AllSubscribers';
import Addsubscriber from './pages/Addsubscriber';
import OnlineUsers from './components/clints/OnlineUsers';

export default function App() {
  const [dragEnabled, setDragEnabled] = useState(false);

  return (
    <BrowserRouter basename='/isp360'>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Pass dragEnabled state and setter to Layout */}
        <Route path="/app" element={<Layout dragEnabled={dragEnabled} setDragEnabled={setDragEnabled} />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Clients Routes */}
          <Route path="clients/all" element={<AllSubscribers/>} />
          <Route path="clients/add" element={<Addsubscriber/>} />
          <Route path="clients/online" element={<OnlineUsers/>} />
          <Route path="clients/bulk" element={<div>Bulk Operation Page</div>} />
          <Route path="clients/session-history" element={<div>Session History Page</div>} />
          <Route path="clients/traffic-history" element={<div>Traffic History Page</div>} />
          <Route path="clients/suspended" element={<div>Suspended / Disconnected Page</div>} />
          
          {/* Network Management Routes */}
          <Route path="network/plans-packages" element={<div>Plans & Packages Page</div>} />
          <Route path="network/nas-bng" element={<div>NAS / BNG Page</div>} />
          <Route path="network/olt-management" element={<div>OLT(Device) Management Page</div>} />
          <Route path="network/onu-ont-management" element={<div>ONU / ONT Management Page</div>} />
          <Route path="network/wireless-towers" element={<div>Wireless Towers Page</div>} />
          <Route path="network/wireless-cpes" element={<div>Wireless CPEs Page</div>} />
          <Route path="network/config-backup-restore" element={<div>Config Backup & Restore Page</div>} />
          <Route path="network/tr069" element={<div>TR069 Page</div>} />
          <Route path="network/network-map" element={<div>Network Map Page</div>} />
          <Route path="network/ip-address-mgmt" element={<div>IP Address Mgmt Page</div>} />
          <Route path="network/settings" element={<div>Network Settings Page</div>} />

          {/* Monitoring Routes */}
          <Route path="monitoring/network-monitoring" element={<div>Network Monitoring Page</div>} />
          <Route path="monitoring/traffic-report" element={<div>Traffic Report Page</div>} />
          <Route path="monitoring/qoe-monitoring" element={<div>QoE Monitoring Page</div>} />
          <Route path="monitoring/alerts-notifications" element={<div>Alerts & Notifications Page</div>} />
          <Route path="monitoring/server-license" element={<div>Server and License Information Page</div>} />
          <Route path="monitoring/service-uptime" element={<div>Service Uptime / Downtime Monitor Page</div>} />

          {/* CRM & Support Routes */}
          <Route path="crm/complaint-tickets" element={<div>Complaint Tickets List Page</div>} />
          <Route path="crm/complaint-tickets/new" element={<div>New Complaint Tickets Page</div>} />
          <Route path="crm/complaint-tickets/assigned" element={<div>Assigned Complaint Tickets Page</div>} />
          <Route path="crm/complaint-tickets/resolved" element={<div>Resolved Complaint Tickets Page</div>} />
          <Route path="crm/complaint-tickets/closed" element={<div>Closed Complaint Tickets Page</div>} />
          <Route path="crm/sla-dashboard" element={<div>SLA Dashboard Page</div>} />
          <Route path="crm/escalation-matrix" element={<div>Escalation Matrix Page</div>} />
          <Route path="crm/feedback-ratings" element={<div>Feedback and Ratings Page</div>} />
          <Route path="crm/knowledge-base" element={<div>Knowledge Base & FAQs Page</div>} />
          <Route path="crm/settings" element={<div>CRM Settings Page</div>} />

          {/* Billing & Accounting Routes */}
          <Route path="billing/invoices" element={<div>Invoices (Tax & Proforma) Page</div>} />
          <Route path="billing/vendor-bills" element={<div>Vendor Bills Page</div>} />
          <Route path="billing/expenses" element={<div>Expenses Page</div>} />
          <Route path="billing/payments" element={<div>Payments Page</div>} />
          <Route path="billing/wallet" element={<div>Wallet Page</div>} />
          <Route path="billing/user-specials" element={<div>User Specials Page</div>} />
          <Route path="billing/refunds-credits" element={<div>Refunds & Credits Page</div>} />
          <Route path="billing/debit-notes" element={<div>Debit Notes Page</div>} />
          <Route path="billing/payment-reconciliation" element={<div>Payment Reconciliation Page</div>} />
          <Route path="billing/gst-agr" element={<div>GST & AGR Page</div>} />

          {/* Inventory Routes */}
          <Route path="inventory/product" element={<div>Product Page</div>} />
          <Route path="inventory/vendors" element={<div>Vendors Page</div>} />
          <Route path="inventory/assign-customer" element={<div>Assign to Customer Page</div>} />
          <Route path="inventory/stock-tracking" element={<div>Stock Tracking Page</div>} />
          <Route path="inventory/pop-infra" element={<div>POP Infra Page</div>} />
          <Route path="inventory/amc-warranty" element={<div>AMC & Warranty Alerts Page</div>} />

          {/* Inventory Operations Sub-routes */}
          <Route path="inventory/operations/sales" element={<div>Sales Operations Page</div>} />
          <Route path="inventory/operations/purchase" element={<div>Purchase Operations Page</div>} />
          <Route path="inventory/operations/returns" element={<div>Returns Operations Page</div>} />
          <Route path="inventory/operations/repairs" element={<div>Repairs Operations Page</div>} />
          
          {/* Analytics & Reports Routes */}
          <Route path="analytics/revenue" element={<div>Revenue Reports Page</div>} />
          <Route path="analytics/inventory" element={<div>Inventory Report Page</div>} />
          <Route path="analytics/churn" element={<div>Customer Churn Analysis Page</div>} />
          <Route path="analytics/area-subscribers" element={<div>Area-Wise Subscriber Report Page</div>} />
          <Route path="analytics/usage" element={<div>Usage/Top Consumers Report Page</div>} />
          <Route path="analytics/franchise" element={<div>Franchise Wise Report Page</div>} />
          <Route path="analytics/sla-compliance" element={<div>SLA Compliance Report Page</div>} />
          <Route path="analytics/custom-report" element={<div>Custom Report Builder Page</div>} />

          {/* Communications Routes */}
          <Route path="communications/whatsapp" element={<div>WhatsApp Page</div>} />
          <Route path="communications/ivr-calls" element={<div>IVR or Calls Page</div>} />
          <Route path="communications/sms" element={<div>SMS Page</div>} />
          <Route path="communications/email" element={<div>Email Page</div>} />
          <Route path="communications/marketing-campaigns" element={<div>Marketing Campaigns Page</div>} />
          <Route path="communications/notifications" element={<div>Notifications Page</div>} />
          <Route path="communications/promotions" element={<div>Promotions Page</div>} />
          <Route path="communications/templates" element={<div>Templates Page</div>} />
          <Route path="communications/whatsapp-bot" element={<div>WhatsApp Bot Page</div>} />
          <Route path="communications/settings" element={<div>Communications Settings Page</div>} />
          
          {/* Logs Routes */}
          <Route path="logs/audit" element={<div>Audit Log Page</div>} />
          <Route path="logs/communication" element={<div>Communication Log Page</div>} />
          <Route path="logs/login" element={<div>Login Log Page</div>} />
          <Route path="logs/system" element={<div>System Log Page</div>} />

          {/* HR & Workforce Routes */}
          <Route path="hr/employee" element={<div>Employee (Admin User) Page</div>} />
          <Route path="hr/roles" element={<div>Roles Page</div>} />
          <Route path="hr/department" element={<div>Department Page</div>} />
          <Route path="hr/attendance" element={<div>Attendance Page</div>} />
          <Route path="hr/salary-payroll" element={<div>Salary & Payroll Page</div>} />
          <Route path="hr/expense-claims" element={<div>Expense Claims Page</div>} />
          <Route path="hr/field-workforce-app" element={<div>Field Workforce App Integration Page</div>} />
          <Route path="hr/tracking" element={<div>Tracking Page</div>} />
          <Route path="hr/leave-shift" element={<div>Leave & Shift Management Page</div>} />
          <Route path="hr/incentives-commission" element={<div>Incentives / Commission Page</div>} />
          <Route path="hr/performance-report" element={<div>Performance Report Page</div>} />
          <Route path="hr/settings" element={<div>HR Settings Page</div>} />

          {/* Franchise Management Routes */}
          <Route path="franchise/all" element={<div>All Franchises Page</div>} />
          <Route path="franchise/add" element={<div>Add Franchise Page</div>} />
          <Route path="franchise/setup" element={<div>Franchise Setup Page</div>} />
          <Route path="franchise/revenue-sharing" element={<div>Revenue-Sharing Setup Page</div>} />
          <Route path="franchise/ledger-wallet" element={<div>Franchise Ledger & Wallet Page</div>} />
          <Route path="franchise/custom-pricing" element={<div>Custom Pricing Page</div>} />
          <Route path="franchise/commission-reports" element={<div>Commission & Settlement Reports Page</div>} />
          <Route path="franchise/settings" element={<div>Franchise Setting Page</div>} />

          {/* Settings Routes */}
          <Route path="settings/company" element={<div>Company Settings Page</div>} />
          <Route path="settings/general" element={<div>General Settings Page</div>} />
          <Route path="settings/branch" element={<div>Branch Settings Page</div>} />
          <Route path="settings/location-management" element={<div>Location Management Page</div>} />
          <Route path="settings/billing" element={<div>Billing Settings Page</div>} />
          <Route path="settings/integrations" element={<div>Integrations Page</div>} />
          <Route path="settings/notification" element={<div>Notification Setting Page</div>} />
          <Route path="settings/user-portal" element={<div>User Portal Page</div>} />
          <Route path="settings/rules" element={<div>Rules Page</div>} />
          <Route path="settings/documentation" element={<div>Documentation & TnCs Page</div>} />
          <Route path="settings/system-backup-restore" element={<div>System Backup & Restore Page</div>} />

          {/* Profile Routes */}
          <Route path="profile/info" element={<div>Profile Info Page</div>} />
          <Route path="profile/settings" element={<div>Profile Settings Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}