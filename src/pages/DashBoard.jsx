import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserStatsDashboard from "../components/user_stats_card";
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
import { BiFilterAlt } from "react-icons/bi";

// Your existing data
const onlinePaymentData = [
  { date: "21-Aug", amount: 1500 },
  { date: "22-Aug", amount: 2000 },
  { date: "23-Aug", amount: 1800 },
  { date: "24-Aug", amount: 2500 },
  { date: "25-Aug", amount: 2200 },
  { date: "26-Aug", amount: 3000 },
  { date: "27-Aug", amount: 2800 },
  { date: "28-Aug", amount: 3500 },
  { date: "29-Aug", amount: 3200 },
  { date: "30-Aug", amount: 4000 },
  { date: "31-Aug", amount: 3800 },
  { date: "01-Sep", amount: 4500 },
  { date: "02-Sep", amount: 4200 },
  { date: "03-Sep", amount: 5000 },
  { date: "04-Sep", amount: 4800 },
  { date: "05-Sep", amount: 5500 },
];

const registrationData = [
  { date: "21-Aug", registrations: 1, activations: 1 },
  { date: "22-Aug", registrations: 2, activations: 2 },
];

const paymentData = [
  { date: "13-Aug", amount: 2700 },
  { date: "16-Aug", amount: 550 },
  { date: "17-Aug", amount: 550 },
  { date: "21-Aug", amount: 5900 },
  { date: "22-Aug", amount: 575 },
  { date: "23-Aug", amount: 1200 },
  { date: "24-Aug", amount: 3000 },
  { date: "25-Aug", amount: 450 },
  { date: "26-Aug", amount: 800 },
  { date: "27-Aug", amount: 1500 },
  { date: "28-Aug", amount: 900 },
  { date: "29-Aug", amount: 2100 },
  { date: "30-Aug", amount: 650 },
  { date: "31-Aug", amount: 1800 },
  { date: "01-Sep", amount: 2500 },
  { date: "02-Sep", amount: 1200 },
  { date: "03-Sep", amount: 750 },
  { date: "04-Sep", amount: 1900 },
  { date: "05-Sep", amount: 2200 },
  { date: "06-Sep", amount: 1100 },
  { date: "07-Sep", amount: 1400 },
  { date: "08-Sep", amount: 950 },
  { date: "09-Sep", amount: 1700 },
  { date: "10-Sep", amount: 2000 },
];
const complaintData = [
  { date: "11-Aug", complaints: 1 },
  { date: "12-Aug", complaints: 2 },
  { date: "17-Aug", complaints: 3 },
  { date: "21-Aug", complaints: 4 },
  { date: "23-Aug", complaints: 5 },
  { date: "24-Aug", complaints: 6 },
  { date: "25-Aug", complaints: 7 },
  { date: "26-Aug", complaints: 8 },
  { date: "27-Aug", complaints: 9 },
  { date: "28-Aug", complaints: 10 },
  { date: "29-Aug", complaints: 11 },
  { date: "30-Aug", complaints: 12 },
  { date: "31-Aug", complaints: 13 },
  { date: "01-Sep", complaints: 14 },
  { date: "02-Sep", complaints: 15 },
  { date: "03-Sep", complaints: 16 },
  { date: "04-Sep", complaints: 17 },
  { date: "05-Sep", complaints: 18 },
  { date: "06-Sep", complaints: 19 },
  { date: "07-Sep", complaints: 20 },
  { date: "08-Sep", complaints: 21 },
  { date: "09-Sep", complaints: 22 },
  { date: "10-Sep", complaints: 23 },
];

const leadsData = [
  { date: "21-Aug", leads: 5 },
  { date: "22-Aug", leads: 8 },
  { date: "23-Aug", leads: 12 },
  { date: "24-Aug", leads: 10 },
  { date: "25-Aug", leads: 7 },
  { date: "26-Aug", leads: 9 },
  { date: "27-Aug", leads: 15 },
  { date: "28-Aug", leads: 11 },
  { date: "29-Aug", leads: 14 },
  { date: "30-Aug", leads: 18 },
  { date: "31-Aug", leads: 16 },
  { date: "01-Sep", leads: 20 },
  { date: "02-Sep", leads: 13 },
  { date: "03-Sep", leads: 17 },
  { date: "04-Sep", leads: 19 },
];

const nasWiseData = [{ nas: "103.142.162.1", users: 58 }];
const userStatsData = [
  { label: "Total", value: 74, color: "#3f2ab9ff" },
  { label: "Active", value: 64, color: "#007f88ff" },
  { label: "Online", value: 59, color: "#15a702ff" },
  { label: "Expired", value: 0, color: "#868d6bff" },
  { label: "Pend. Actv", value: 0, color: "#4d0057ff" },
  { label: "Suspended", value: 0, color: "#9e0000ff" },
  { label: "On Hold", value: 2, color: "#ff8928ff" },
  { label: "Disconnected", value: 8, color: "#e60d0dff" },
];

const onlineAdminUsers = [
  {
    user: "Its You!",
    device: "Windows 10",
    browser: "Chrome",
    duration: "1 s",
    ip: "103.142.163.180",
    isCurrent: true,
  },
  {
    user: "desk",
    device: "Android",
    browser: "Firefox",
    duration: "2 h 26 m 56 s",
    ip: "103.142.162.68",
    isCurrent: false,
  },
  {
    user: "support",
    device: "iOS",
    browser: "Safari",
    duration: "1 h 15 m 30 s",
    ip: "103.142.162.99",
    isCurrent: false,
  },
  {
    user: "field_agent",
    device: "Linux",
    browser: "Brave",
    duration: "30 m 10 s",
    ip: "103.142.162.150",
    isCurrent: false,
  },
];

// Helper functions to get icon URLs
const getDeviceIcon = (device) => {
  switch (device) {
    case "Windows 10":
      return "https://img.icons8.com/color/16/000000/windows-10.png";
    case "Android":
      return "https://img.icons8.com/color/16/000000/android-os.png";
    case "iOS":
      return "https://img.icons8.com/color/16/000000/ios-logo.png";
    case "Linux":
      return "https://img.icons8.com/color/16/000000/linux.png";
    default:
      return "https://img.icons8.com/ios/16/000000/device--v1.png"; // Generic icon
  }
};

const getBrowserIcon = (browser) => {
  switch (browser) {
    case "Chrome":
      return "https://img.icons8.com/color/16/000000/chrome--v1.png";
    case "Firefox":
      return "https://img.icons8.com/color/16/000000/firefox.png";
    case "Safari":
      return "https://img.icons8.com/color/16/000000/safari--v1.png";
    case "Brave":
      return "https://img.icons8.com/color/16/000000/brave-web-browser.png";
    default:
      return "https://img.icons8.com/ios/16/000000/web.png"; // Generic icon
  }
};

function Dashboard() {
  const navigate = useNavigate();

  // Function to get the default date range (last 15 days)
  const getDefaultDateRange = () => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 14);
    return {
      from: startDate.toISOString().slice(0, 10),
      to: today.toISOString().slice(0, 10),
    };
  };

  // State to hold the visibility of each filter
  const [showPaymentFilter, setShowPaymentFilter] = useState(false);
  const [showOnlinePaymentFilter, setShowOnlinePaymentFilter] = useState(false);
  const [showRegistrationFilter, setShowRegistrationFilter] = useState(false);
  const [showComplaintFilter, setShowComplaintFilter] = useState(false);
  const [showLeadsFilter, setShowLeadsFilter] = useState(false);

  // State to hold the currently selected dates in the filter inputs (not yet applied)
  const [paymentDateRange, setPaymentDateRange] = useState(
    getDefaultDateRange()
  );
  const [onlinePaymentDateRange, setOnlinePaymentDateRange] = useState(
    getDefaultDateRange()
  );
  const [registrationDateRange, setRegistrationDateRange] = useState(
    getDefaultDateRange()
  );
  const [complaintDateRange, setComplaintDateRange] = useState(
    getDefaultDateRange()
  );
  const [leadsDateRange, setLeadsDateRange] = useState(getDefaultDateRange());

  // State to hold the filtered data for each chart
  const [filteredPaymentData, setFilteredPaymentData] = useState([]);
  const [filteredOnlinePaymentData, setFilteredOnlinePaymentData] = useState(
    []
  );
  const [filteredRegistrationData, setFilteredRegistrationData] = useState([]);
  const [filteredComplaintData, setFilteredComplaintData] = useState([]);
  const [filteredLeadsData, setFilteredLeadsData] = useState([]);
  const [filteredNasWiseData, setFilteredNasWiseData] = useState(nasWiseData);

  // Helper function to filter data based on a given date range
  const filterData = (data, dateRange) => {
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);

    return data.filter((item) => {
      if (!item.date) return false;
      const [day, month] = item.date.split("-");
      const year = new Date().getFullYear();
      const itemDate = new Date(`${month} ${day}, ${year}`);

      itemDate.setHours(0, 0, 0, 0);
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);

      return itemDate >= fromDate && itemDate <= toDate;
    });
  };

  // Handlers for the "Apply" button
  const handleApplyFilter = (chartName) => {
    let dateRangeToApply;
    let originalData;

    switch (chartName) {
      case "payment":
        dateRangeToApply = paymentDateRange;
        originalData = paymentData;
        setFilteredPaymentData(filterData(originalData, dateRangeToApply));
        setShowPaymentFilter(false); // Hide the filter
        break;
      case "onlinePayment":
        dateRangeToApply = onlinePaymentDateRange;
        originalData = onlinePaymentData;
        setFilteredOnlinePaymentData(
          filterData(originalData, dateRangeToApply)
        );
        setShowOnlinePaymentFilter(false); // Hide the filter
        break;
      case "registration":
        dateRangeToApply = registrationDateRange;
        originalData = registrationData;
        setFilteredRegistrationData(filterData(originalData, dateRangeToApply));
        setShowRegistrationFilter(false); // Hide the filter
        break;
      case "complaint":
        dateRangeToApply = complaintDateRange;
        originalData = complaintData;
        setFilteredComplaintData(filterData(originalData, dateRangeToApply));
        setShowComplaintFilter(false); // Hide the filter
        break;
      case "leads":
        dateRangeToApply = leadsDateRange;
        originalData = leadsData;
        setFilteredLeadsData(filterData(originalData, dateRangeToApply));
        setShowLeadsFilter(false); // Hide the filter
        break;
      default:
        break;
    }
  };

  // Initial filtering for the charts when the component mounts
  useEffect(() => {
    setFilteredPaymentData(filterData(paymentData, getDefaultDateRange()));
    setFilteredOnlinePaymentData(
      filterData(onlinePaymentData, getDefaultDateRange())
    );
    setFilteredRegistrationData(
      filterData(registrationData, getDefaultDateRange())
    );
    setFilteredComplaintData(filterData(complaintData, getDefaultDateRange()));
    setFilteredLeadsData(filterData(leadsData, getDefaultDateRange()));
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleStatClick = (label) => {
    navigate(`/user-stats?status=${label}`);
  };

  const renderChart = (data, chartType) => {
    if (!data || data.length === 0) {
      return (
        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
          No data to display.
        </div>
      );
    }

    let bars = [];
    let xKey = chartType === "nasWise" ? "nas" : "date";

    switch (chartType) {
      case "payment":
        bars.push(
          <Bar key="payment" dataKey="amount" fill="#28a745" barSize={40}>
            <LabelList dataKey="amount" position="top" dy={-5} fontSize={13} />
          </Bar>
        );
        break;
      case "onlinePayment":
        bars.push(
          <Bar key="onlinePayment" dataKey="amount" fill="#f39c12" barSize={40}>
            <LabelList dataKey="amount" position="top" dy={-5} fontSize={13} />
          </Bar>
        );
        break;
      case "complaint":
        bars.push(
          <Bar key="complaint" dataKey="complaints" fill="#e74c3c" barSize={40}>
            <LabelList
              dataKey="complaints"
              position="top"
              dy={-5}
              fontSize={13}
            />
          </Bar>
        );
        break;
      case "registration":
        bars.push(
          <Bar
            key="registrations"
            dataKey="registrations"
            fill="#BBDCE5"
            barSize={40}
          >
            <LabelList
              dataKey="registrations"
              position="top"
              dy={-5}
              fontSize={13}
            />
          </Bar>
        );
        bars.push(
          <Bar
            key="activations"
            dataKey="activations"
            fill="#9CAFAA"
            barSize={40}
          >
            <LabelList
              dataKey="activations"
              position="top"
              dy={-5}
              fontSize={13}
            />
          </Bar>
        );
        break;
      case "leads":
        bars.push(
          <Bar key="leads" dataKey="leads" fill="#9b59b6" barSize={40}>
            <LabelList dataKey="leads" position="top" dy={-5} fontSize={13} />
          </Bar>
        );
        break;
      case "nasWise":
        bars.push(
          <Bar key="nasWise" dataKey="users" fill="#CFAB8D" barSize={60}>
            <LabelList dataKey="users" position="top" dy={-10} fontSize={13} />
          </Bar>
        );
        break;
      default:
        return null;
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 30, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} fontSize={10} />
          <YAxis domain={[0, "dataMax + 20"]} fontSize={10} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {bars}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="container-fluid">
      <AnnouncementBar />

      <div className="row">
        <div className="col-md-5">
          {/* User Stats Card (unchanged) */}
          <div className="card mb-3">
            <UserStatsDashboard />
          </div>

          {/* Payment Stats Card */}
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Payment Stats</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowPaymentFilter(!showPaymentFilter)}
              >
                <BiFilterAlt className="me-1" /> Filter
              </button>
            </div>
            {showPaymentFilter && (
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <label className="mb-0">From:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={paymentDateRange.from}
                      onChange={(e) =>
                        setPaymentDateRange({
                          ...paymentDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <label className="mb-0">To:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={paymentDateRange.to}
                      onChange={(e) =>
                        setPaymentDateRange({
                          ...paymentDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleApplyFilter("payment")}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
            <div className="card-body" style={{ height: "250px" }}>
              {renderChart(filteredPaymentData, "payment")}
            </div>
          </div>

          {/* Online Payments Stats Card */}
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Online Payments Stats</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() =>
                  setShowOnlinePaymentFilter(!showOnlinePaymentFilter)
                }
              >
                <BiFilterAlt className="me-1" /> Filter
              </button>
            </div>
            {showOnlinePaymentFilter && (
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <label className="mb-0">From:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={onlinePaymentDateRange.from}
                      onChange={(e) =>
                        setOnlinePaymentDateRange({
                          ...onlinePaymentDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <label className="mb-0">To:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={onlinePaymentDateRange.to}
                      onChange={(e) =>
                        setOnlinePaymentDateRange({
                          ...onlinePaymentDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleApplyFilter("onlinePayment")}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
            <div className="card-body" style={{ height: "250px" }}>
              {renderChart(filteredOnlinePaymentData, "onlinePayment")}
            </div>
          </div>

          {/* Registrations & Activations Card */}
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Registrations & Activations</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() =>
                  setShowRegistrationFilter(!showRegistrationFilter)
                }
              >
                <BiFilterAlt className="me-1" /> Filter
              </button>
            </div>
            {showRegistrationFilter && (
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <label className="mb-0">From:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={registrationDateRange.from}
                      onChange={(e) =>
                        setRegistrationDateRange({
                          ...registrationDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <label className="mb-0">To:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={registrationDateRange.to}
                      onChange={(e) =>
                        setRegistrationDateRange({
                          ...registrationDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleApplyFilter("registration")}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
            <div className="card-body" style={{ height: "250px" }}>
              {renderChart(filteredRegistrationData, "registration")}
            </div>
          </div>
        </div>

        <div className="col-md-5">
          {/* Online Admin Users Card (updated) */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Online Admin Users</strong>
            </div>
            <div className="card-body p-2">
              <p className="mb-2">
                <strong>Total Online Admin / Staff Users Found :</strong>{" "}
                {onlineAdminUsers.length}
              </p>

              <table className="table table-sm mb-0">
                <tbody>
                  {onlineAdminUsers.map((user, index) => (
                    <tr
                      key={index}
                      className={`align-middle ${
                        user.isCurrent ? "text-success" : ""
                      }`}
                    >
                      <td>
                        {user.isCurrent ? (
                          <strong>Its You!</strong>
                        ) : (
                          <button className="btn btn-sm btn-danger p-1">
                            <i className="fa fa-power-off"></i>
                          </button>
                        )}
                      </td>
                      <td>
                        <img
                          src={getDeviceIcon(user.device)}
                          alt={user.device}
                          className="me-1"
                        />
                        <img
                          src={getBrowserIcon(user.browser)}
                          alt={user.browser}
                        />
                      </td>
                      <td>{user.user}</td>
                      <td>{user.duration}</td>
                      <td>{user.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Complaints Stats Card */}
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Complaints Stats</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowComplaintFilter(!showComplaintFilter)}
              >
                <BiFilterAlt className="me-1" /> Filter
              </button>
            </div>
            {showComplaintFilter && (
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <label className="mb-0">From:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={complaintDateRange.from}
                      onChange={(e) =>
                        setComplaintDateRange({
                          ...complaintDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <label className="mb-0">To:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={complaintDateRange.to}
                      onChange={(e) =>
                        setComplaintDateRange({
                          ...complaintDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleApplyFilter("complaint")}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
            <div className="card-body" style={{ height: "250px" }}>
              {renderChart(filteredComplaintData, "complaint")}
            </div>
          </div>

          {/* Leads Stats Card */}
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Leads Stats</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowLeadsFilter(!showLeadsFilter)}
              >
                <BiFilterAlt className="me-1" /> Filter
              </button>
            </div>
            {showLeadsFilter && (
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <label className="mb-0">From:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={leadsDateRange.from}
                      onChange={(e) =>
                        setLeadsDateRange({
                          ...leadsDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <label className="mb-0">To:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={leadsDateRange.to}
                      onChange={(e) =>
                        setLeadsDateRange({
                          ...leadsDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleApplyFilter("leads")}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
            <div className="card-body" style={{ height: "250px" }}>
              {renderChart(filteredLeadsData, "leads")}
            </div>
          </div>

          {/* Nas wise Current Online Users Card (no change) */}
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Nas wise Current Online Users</strong>
            </div>
            <div className="card-body" style={{ height: "250px" }}>
              {renderChart(filteredNasWiseData, "nasWise")}
            </div>
          </div>
        </div>

        {/* The two small columns on the right (no change) */}
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