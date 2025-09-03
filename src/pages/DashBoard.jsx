  // src/components/Dashboard.jsx
  import React from "react";
  import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate
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
  import "../css/Dashboard.css";
  import AnnouncementBar from "../components/AnnouncementBar";

  function Dashboard() {
    const navigate = useNavigate(); // 👈 Initialize useNavigate hook

    const onlinePaymentData = [];
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
      { date: "12-Aug", complaints: 2 },
      { date: "17-Aug", complaints: 3 },
      { date: "21-Aug", complaints: 4 },
      { date: "23-Aug", complaints: 5 },
      { date: "24-Aug", complaints: 6 },
    ];
    const leadsData = [];
    const nasWiseData = [{ nas: "103.142.162.1", users: 58 }];
    const userStatsData = [
      { label: "Total", value: 74, color: "#D6A99D" },
      { label: "Active", value: 64, color: "#FBF3D5" },
      { label: "Online", value: 59, color: "#D6DAC8" },
      { label: "Expired", value: 0, color: "#9CAFAA" },
      { label: "Pend. Actv", value: 0, color: "#9CAFAA" },
      { label: "Suspended", value: 0, color: "#ECEEDF" },
      { label: "On Hold", value: 2, color: "#37E4BC" },
      { label: "Disconnected", value: 8, color: "#CFAB8D" },
    ];

    // 👈 New function to handle the card click
    const handleStatClick = (label) => {
      let filterKey = "";
      let filterValue = "";

      // Map the dashboard label to the correct filter key and value
      if (label === "Total") {
        filterKey = "all";
        filterValue = "all";
      } else if (label === "Online") {
        filterKey = "connStatus";
        filterValue = "Connected";
      } else if (label === "Active" || label === "Suspended" || label === "Disconnected") {
        filterKey = "status";
        filterValue = label;
      } else if (label === "Expired") {
        filterKey = "status";
        filterValue = "Terminated";
      } else if (label === "Pend. Actv") {
        filterKey = "status";
        filterValue = "Pending";
      }

      // Navigate to the AllSubscribers page with a state object
      navigate('/subscribers', {
        state: { filter: { [filterKey]: filterValue } }
      });
    };

    return (
      <div className="container-fluid">
        <AnnouncementBar />
        <div className="row">
          <div className="col-md-5">
            {/* User Stats */}
            <div className="card mb-3">
              <div className="card-header">
                <strong>User Stats</strong>
              </div>
              <div className="card-body">
                <div className="row g-2">
                  {userStatsData.map((stat, i) => (
                    <div key={i} className="col-6 col-md-3">
                      {/* 👈 Change div to button for click functionality */}
                      <button
                        className="user-stat-card card text-center d-flex align-items-center justify-content-center flex-column w-100 h-100 p-2 border-0"
                        style={{
                          background: stat.color,
                          borderRadius: "8px",
                        }}
                        onClick={() => handleStatClick(stat.label)} // 👈 Add onClick handler
                      >
                        <h4 className="mb-0">{stat.value}</h4>
                        <small>{stat.label}</small>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ... Rest of your Dashboard code remains the same ... */}
            <div className="card mb-3">
              <div className="card-header">
                <strong>Payment Stats</strong>
              </div>
              <div className="card-body mt-1">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={paymentData}
                    margin={{ top: 30, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, "dataMax + 20"]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#28a745" barSize={40}>
                      <LabelList dataKey="amount" position="top" dy={-5} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
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
            <div className="card mb-3">
              <div className="card-header">
                <strong>Nas wise Current Online Users</strong>
              </div>
              <div className="card-body" style={{ height: "250px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={nasWiseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nas" textAnchor="end" />
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
          <div className="col-md-2">
            <div className="card mb-3">
              <div className="card-header">
                <strong>Today</strong>
              </div>
              <div className="card-body">
                <p>Registrations</p>
                <p>Activations</p>
                <p>Expiry: </p>
                <p>Renewals</p>
                <p>Payments </p>
                <p>Online Pay</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header">
                <strong>Complaints</strong>
              </div>
              <div className="card-body">
                <p>Open</p>
                <p>In Progres</p>
                <p>Resolved</p>
                <p>Closed</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header">
                <strong>Yesterday</strong>
              </div>
              <div className="card-body">
                <p>Registrations</p>
                <p>Activations</p>
                <p>Expiry</p>
                <p>Renewals</p>
                <p>Payments</p>
                <p>Online Pay</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header">
                <strong>Upcoming Expiry</strong>
              </div>
              <div className="card-body">
                <p>Tomorrow</p>
                <p>Next 7 Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Dashboard;