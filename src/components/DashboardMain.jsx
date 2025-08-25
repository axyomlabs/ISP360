import React from "react";
import Header from "./Header"; // ✅ Import Header
import "../css/Dashboard.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

function DashboardMain() {
  // 🔹 Sample Data
  const onlinePaymentData = []; // empty => "No data to display"

  const registrationData = [
    { date: "21-Aug", registrations: 1, activations: 1 },
  ];

  const paymentData = [
    { date: "13-Aug", amount: 2700 },
    { date: "16-Aug", amount: 550 },
    { date: "17-Aug", amount: 550 },
    { date: "21-Aug", amount: 5900 },
    { date: "22-Aug", amount: 575 },
  ];

  const complaintData = [
    { date: "11-Aug", complaints: 1 },
    { date: "12-Aug", complaints: 1 },
    { date: "17-Aug", complaints: 1 },
    { date: "21-Aug", complaints: 1 },
    { date: "23-Aug", complaints: 1 },
    { date: "24-Aug", complaints: 1 },
  ];
  const leadsData = []; // empty chart → show "No data to display"

  const nasWiseData = [{ nas: "103.142.162.1", users: 58 }];

  return (
    <div className="container-fluid ">
      {/* 🔹 Header Component */}
      <Header />

      {/* 🔹 Second Row (your existing layout) */}
      <div className="row mt-3">
        {/* Left Column */}
        <div className="col-md-5">
          {/* User Stats */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>User Stats</strong>
            </div>
            <div className="card-body">
              <div className="row g-2">
                {[
                  "#D6A99D",
                  "#FBF3D5",
                  "#D6DAC8",
                  "#BBDCE5",
                  "#9CAFAA",
                  "#ECEEDF",
                  "#37E4BC",
                  "#CFAB8D",
                ].map((color, i) => (
                  <div key={i} className="col-3">
                    <div
                      className="card text-center text-white"
                      style={{
                        height: "80px",
                        background: color,
                        borderRadius: "8px",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Stats */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Payment Stats</strong>
            </div>
            <div className="card-body mt-1">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={paymentData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }} // ✅ extra top space
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, "dataMax + 20"]} />{" "}
                  {/* ✅ add headroom above bars */}
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#28a745" barSize={40}>
                    <LabelList dataKey="amount" position="top" dy={-5} />{" "}
                    {/* ✅ prevent cut */}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Online Payments Stats */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Online Payments Stats</strong>
            </div>
            <div className="card-body" style={{ height: "250px" }}>
              {onlinePaymentData.length === 0 ? (
                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                  No data to display
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={onlinePaymentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#f39c12" barSize={40}>
                      <LabelList dataKey="amount" position="top" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          {/* Registrations & Activations */}

          <div className="card mb-3">
            <div className="card-header">
              <strong>Registrations & Activations</strong>
            </div>
            <div className="card-body" style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={registrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="registrations" fill="#BBDCE5" barSize={40}>
                    <LabelList dataKey="registrations" position="top" />
                  </Bar>
                  <Bar dataKey="activations" fill="#9CAFAA" barSize={40}>
                    <LabelList dataKey="activations" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-md-5">
          <div className="card mb-3">
            <div className="card-header">
              <strong>Online Admin Users</strong>
            </div>
            <div className="card-body">
              <p>No Admins Found</p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header">
              <strong>Complaints Stats</strong>
            </div>
            <div className="card-body" style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complaintData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend formatter={() => "Total No Of Complaints"} />
                  <Bar dataKey="complaints" fill="#e74c3c" barSize={40}>
                    <LabelList dataKey="complaints" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-header">
              <strong>Leads Stats</strong>
            </div>
            <div className="card-body" style={{ height: "250px" }}>
              {leadsData.length === 0 ? (
                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                  No data to display
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads" fill="#9b59b6" barSize={40}>
                      <LabelList dataKey="leads" position="top" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Nas wise Current Online Users */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Nas wise Current Online Users</strong>
            </div>
            <div className="card-body" style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nasWiseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nas"  textAnchor="end" />
                  <YAxis domain={[0, "dataMax + 20"]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#CFAB8D" barSize={60}>
                    <LabelList dataKey="users" position="top" dy={-10} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-2">
          <div className="card mb-3">
            <div className="card-header">
              <strong>Today</strong>
            </div>
            <div className="card-body">
              <p>Registrations: 0</p>
              <p>Expiry: 3</p>
              <p>Payments: 0</p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header">
              <strong>Complaints</strong>
            </div>
            <div className="card-body">
              <p>Open: 0</p>
              <p>Resolved: 1</p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header">
              <strong>Yesterday</strong>
            </div>
            <div className="card-body">
              <p>Renewals: 1 / ₹1100</p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header">
              <strong>Upcoming Expiry</strong>
            </div>
            <div className="card-body">
              <p>Tomorrow: 1</p>
              <p>Next 7 Days: 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;
