// src/pages/fist.jsx
import React, { useState } from "react";
import ChartCard from "../components/ChartCard";

const Fist = () => {
  // Example Data
  const [filteredPaymentData] = useState([
    { date: "2025-09-01", amount: 500 },
    { date: "2025-09-02", amount: 700 },
  ]);
  const [filteredOnlinePaymentData] = useState([
    { date: "2025-09-01", amount: 300 },
    { date: "2025-09-02", amount: 900 },
  ]);
  const [filteredRegistrationData] = useState([
    { date: "2025-09-01", registrations: 100, activations: 80 },
    { date: "2025-09-02", registrations: 150, activations: 120 },
  ]);
  const [filteredComplaintData] = useState([
    { date: "2025-09-01", complaints: 10 },
    { date: "2025-09-02", complaints: 20 },
  ]);
  const [filteredLeadData] = useState([
    { date: "2025-09-01", leads: 50 },
    { date: "2025-09-02", leads: 70 },
  ]);

  // Filter States
  const [showPaymentFilter, setShowPaymentFilter] = useState(false);
  const [paymentDateRange, setPaymentDateRange] = useState({ from: "", to: "" });

  const [showOnlinePaymentFilter, setShowOnlinePaymentFilter] = useState(false);
  const [onlinePaymentDateRange, setOnlinePaymentDateRange] = useState({ from: "", to: "" });

  const [showRegistrationFilter, setShowRegistrationFilter] = useState(false);
  const [registrationDateRange, setRegistrationDateRange] = useState({ from: "", to: "" });

  const [showComplaintFilter, setShowComplaintFilter] = useState(false);
  const [complaintDateRange, setComplaintDateRange] = useState({ from: "", to: "" });

  const [showLeadFilter, setShowLeadFilter] = useState(false);
  const [leadDateRange, setLeadDateRange] = useState({ from: "", to: "" });

  const handleApplyFilter = (type) => {
    console.log("Apply filter for", type);
    // filtering logic goes here
  };

  return (
    <div className="container py-4">
      {/* Payment Stats */}
      <ChartCard
        title="Payment Stats"
        data={filteredPaymentData}
        showFilter={showPaymentFilter}
        toggleFilter={() => setShowPaymentFilter(!showPaymentFilter)}
        dateRange={paymentDateRange}
        setDateRange={setPaymentDateRange}
        onApplyFilter={() => handleApplyFilter("payment")}
        gradientId="paymentGradient"
        gradientColors={[
          { offset: "5%", color: "#065f12ff" },
          { offset: "95%", color: "#028d20ff" },
        ]}
        barConfig={{
          bars: [{ dataKey: "amount" }],
        }}
      />

      {/* Online Payments Stats */}
      <ChartCard
        title="Online Payments Stats"
        data={filteredOnlinePaymentData}
        showFilter={showOnlinePaymentFilter}
        toggleFilter={() => setShowOnlinePaymentFilter(!showOnlinePaymentFilter)}
        dateRange={onlinePaymentDateRange}
        setDateRange={setOnlinePaymentDateRange}
        onApplyFilter={() => handleApplyFilter("onlinePayment")}
        gradientId="onlinePayGradient"
        gradientColors={[
          { offset: "5%", color: "#e69028ff" },
          { offset: "95%", color: "#ffa600ff" },
        ]}
        barConfig={{
          bars: [{ dataKey: "amount" }],
        }}
      />

      {/* Registrations & Activations */}
      <ChartCard
        title="Registrations & Activations"
        data={filteredRegistrationData}
        showFilter={showRegistrationFilter}
        toggleFilter={() => setShowRegistrationFilter(!showRegistrationFilter)}
        dateRange={registrationDateRange}
        setDateRange={setRegistrationDateRange}
        onApplyFilter={() => handleApplyFilter("registration")}
        gradientId="regGradient"
        gradientColors={[
          { offset: "5%", color: "#4facfe" },
          { offset: "95%", color: "#00c9a7" },
        ]}
        barConfig={{
          bars: [
            { dataKey: "registrations", fill: "#4facfe" },
            { dataKey: "activations", fill: "#00c9a7" },
          ],
        }}
        showLegend={true}
      />

      {/* Complaints Stats */}
      <ChartCard
        title="Complaints Stats"
        data={filteredComplaintData}
        showFilter={showComplaintFilter}
        toggleFilter={() => setShowComplaintFilter(!showComplaintFilter)}
        dateRange={complaintDateRange}
        setDateRange={setComplaintDateRange}
        onApplyFilter={() => handleApplyFilter("complaint")}
        gradientId="complaintGradient"
        gradientColors={[
          { offset: "5%", color: "#ff4d4f" },
          { offset: "95%", color: "#ff7875" },
        ]}
        barConfig={{
          bars: [{ dataKey: "complaints" }],
        }}
      />

      {/* Leads Stats */}
      <ChartCard
        title="Leads Stats"
        data={filteredLeadData}
        showFilter={showLeadFilter}
        toggleFilter={() => setShowLeadFilter(!showLeadFilter)}
        dateRange={leadDateRange}
        setDateRange={setLeadDateRange}
        onApplyFilter={() => handleApplyFilter("lead")}
        gradientId="leadGradient"
        gradientColors={[
          { offset: "5%", color: "#722ed1" },
          { offset: "95%", color: "#9254de" },
        ]}
        barConfig={{
          bars: [{ dataKey: "leads" }],
        }}
      />
    </div>
  );
};

export default Fist;
