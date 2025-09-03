import { StrictMode } from 'react';
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="subscribers" element={<AllSubscribers />} />
          <Route path="subscribers/add" element={<Addsubscriber />} />
          <Route path="subscribers/plans" element={<div>Plans & Packages Page</div>} />
          <Route path="subscribers/logs" element={<div>Usage & Session Logs Page</div>} />
          <Route path="subscribers/ipdr" element={<div>IPDR Logs Page</div>} />
          <Route path="subscribers/nat" element={<div>NAT Logs Page</div>} />
          <Route path="network/nas" element={<div>NAS / BNG Status Page</div>} />
          <Route path="network/olt" element={<div>OLT & ONU Mgmt Page</div>} />
          <Route path="network/cpe" element={<div>TR-069 / TR-369 CPE Page</div>} />
          <Route path="network/backup" element={<div>Config Backup Page</div>} />
          <Route path="network/gis" element={<div>Network Map (GIS) Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);