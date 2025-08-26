import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import React Router components
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Import your page components
import Layout from './components/Layout';
import DashboardPage from './pages/DashBoard'; // Renamed DashboardMain to DashboardPage
import LoginPage from './pages/LoginPage';
 // A simple component for 404 errors

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route for the login page without the layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* This is the main layout route that contains the sidebar and header */}
        <Route path="/" element={<Layout />}>
          {/* Dashboard as the default page when visiting the root path */}
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* Add all your other routes here */}
          <Route path="subscribers" element={<div>All Subscribers Page</div>} />
          <Route path="subscribers/add" element={<div>Add Subscriber Page</div>} />
          <Route path="subscribers/plans" element={<div>Plans & Packages Page</div>} />
          <Route path="subscribers/logs" element={<div>Usage & Session Logs Page</div>} />
          <Route path="subscribers/ipdr" element={<div>IPDR Logs Page</div>} />
          <Route path="subscribers/nat" element={<div>NAT Logs Page</div>} />

          {/* Add the other routes from your menuItems list here */}
          <Route path="network/nas" element={<div>NAS / BNG Status Page</div>} />
          <Route path="network/olt" element={<div>OLT & ONU Mgmt Page</div>} />
          <Route path="network/cpe" element={<div>TR-069 / TR-369 CPE Page</div>} />
          <Route path="network/backup" element={<div>Config Backup Page</div>} />
          <Route path="network/gis" element={<div>Network Map (GIS) Page</div>} />
          
          {/* ... and so on for all menu items ... */}

          {/* A catch-all route for any undefined URLs */}
      
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);