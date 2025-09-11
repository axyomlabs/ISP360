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

// Helper function to generate a random date within the last 15 days
const getRandomDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return `${date.getDate()}-${date.toLocaleString('default', { month: 'short' }).slice(0, 3)}`;
};

// Helper function to generate dummy data for the last 15 days
const generateDummyData = (key, max) => {
  const data = [];
  for (let i = 14; i >= 0; i--) {
    const date = getRandomDate(i);
    const value = Math.floor(Math.random() * max) + 1;
    data.push({ date, [key]: value });
  }
  return data;
};

// Data sets for the charts
const onlinePaymentData = generateDummyData("amount", 5000);
const registrationData = [
  ...generateDummyData("registrations", 100),
  ...generateDummyData("activations", 80).map((item, index) => ({
    ...item,
    activations: item.activations > registrationData[index].registrations ? registrationData[index].registrations : item.activations,
  })),
];
const paymentData = generateDummyData("amount", 7000);
const complaintData = generateDummyData("complaints", 50);
const leadsData = generateDummyData("leads", 30);
const nasWiseData = [{ nas: "103.142.162.1", users: 58 }, { nas: "103.142.162.2", users: 45 }];

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

// New dummy data for the sidebar cards
const sideBarData = {
  today: {
    registrations: 5,
    activations: 4,
    expiry: 2,
    renewals: 3,
    payments: "₹ 5500",
    onlinePay: "₹ 2100",
  },
  yesterday: {
    registrations: 7,
    activations: 6,
    expiry: 1,
    renewals: 4,
    payments: "₹ 7200",
    onlinePay: "₹ 3500",
  },
  complaints: {
    open: 10,
    inProgress: 5,
    resolved: 15,
    closed: 8,
  },
  upcomingExpiry: {
    tomorrow: 3,
    next7Days: 12,
  },
};

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
      return "https://img.icons8.com/ios/16/000000/device--v1.png";
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
      return "https://img.icons8.com/ios/16/000000/web.png";
  }
};

function Dashboard() {
  const navigate = useNavigate();

  const getDefaultDateRange = () => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 14);
    return {
      from: startDate.toISOString().slice(0, 10),
      to: today.toISOString().slice(0, 10),
    };
  };

  const [showPaymentFilter, setShowPaymentFilter] = useState(false);
  const [showOnlinePaymentFilter, setShowOnlinePaymentFilter] = useState(false);
  const [showRegistrationFilter, setShowRegistrationFilter] = useState(false);
  const [showComplaintFilter, setShowComplaintFilter] = useState(false);
  const [showLeadsFilter, setShowLeadsFilter] = useState(false);

  const [paymentDateRange, setPaymentDateRange] = useState(getDefaultDateRange());
  const [onlinePaymentDateRange, setOnlinePaymentDateRange] = useState(getDefaultDateRange());
  const [registrationDateRange, setRegistrationDateRange] = useState(getDefaultDateRange());
  const [complaintDateRange, setComplaintDateRange] = useState(getDefaultDateRange());
  const [leadsDateRange, setLeadsDateRange] = useState(getDefaultDateRange());

  const [filteredPaymentData, setFilteredPaymentData] = useState([]);
  const [filteredOnlinePaymentData, setFilteredOnlinePaymentData] = useState([]);
  const [filteredRegistrationData, setFilteredRegistrationData] = useState([]);
  const [filteredComplaintData, setFilteredComplaintData] = useState([]);
  const [filteredLeadsData, setFilteredLeadsData] = useState([]);
  const [filteredNasWiseData, setFilteredNasWiseData] = useState(nasWiseData);

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

  const handleApplyFilter = (chartName) => {
    let dateRangeToApply;
    let originalData;

    switch (chartName) {
      case "payment":
        dateRangeToApply = paymentDateRange;
        originalData = paymentData;
        setFilteredPaymentData(filterData(originalData, dateRangeToApply));
        setShowPaymentFilter(false);
        break;
      case "onlinePayment":
        dateRangeToApply = onlinePaymentDateRange;
        originalData = onlinePaymentData;
        setFilteredOnlinePaymentData(filterData(originalData, dateRangeToApply));
        setShowOnlinePaymentFilter(false);
        break;
      case "registration":
        dateRangeToApply = registrationDateRange;
        originalData = registrationData;
        setFilteredRegistrationData(filterData(originalData, dateRangeToApply));
        setShowRegistrationFilter(false);
        break;
      case "complaint":
        dateRangeToApply = complaintDateRange;
        originalData = complaintData;
        setFilteredComplaintData(filterData(originalData, dateRangeToApply));
        setShowComplaintFilter(false);
        break;
      case "leads":
        dateRangeToApply = leadsDateRange;
        originalData = leadsData;
        setFilteredLeadsData(filterData(originalData, dateRangeToApply));
        setShowLeadsFilter(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setFilteredPaymentData(filterData(paymentData, getDefaultDateRange()));
    setFilteredOnlinePaymentData(filterData(onlinePaymentData, getDefaultDateRange()));
    setFilteredRegistrationData(filterData(registrationData, getDefaultDateRange()));
    setFilteredComplaintData(filterData(complaintData, getDefaultDateRange()));
    setFilteredLeadsData(filterData(leadsData, getDefaultDateRange()));
  }, []);

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
        bars.push(<Bar key="payment" dataKey="amount" fill="#28a745" barSize={40}><LabelList dataKey="amount" position="top" dy={-5} fontSize={13} /></Bar>);
        break;
      case "onlinePayment":
        bars.push(<Bar key="onlinePayment" dataKey="amount" fill="#f39c12" barSize={40}><LabelList dataKey="amount" position="top" dy={-5} fontSize={13} /></Bar>);
        break;
      case "complaint":
        bars.push(<Bar key="complaint" dataKey="complaints" fill="#e74c3c" barSize={40}><LabelList dataKey="complaints" position="top" dy={-5} fontSize={13} /></Bar>);
        break;
      case "registration":
        bars.push(<Bar key="registrations" dataKey="registrations" fill="#BBDCE5" barSize={40}><LabelList dataKey="registrations" position="top" dy={-5} fontSize={13} /></Bar>);
        bars.push(<Bar key="activations" dataKey="activations" fill="#9CAFAA" barSize={40}><LabelList dataKey="activations" position="top" dy={-5} fontSize={13} /></Bar>);
        break;
      case "leads":
        bars.push(<Bar key="leads" dataKey="leads" fill="#9b59b6" barSize={40}><LabelList dataKey="leads" position="top" dy={-5} fontSize={13} /></Bar>);
        break;
      case "nasWise":
        bars.push(<Bar key="nasWise" dataKey="users" fill="#CFAB8D" barSize={60}><LabelList dataKey="users" position="top" dy={-10} fontSize={13} /></Bar>);
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
          <div className="card mb-3">
            <UserStatsDashboard />
          </div>

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

          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Online Payments Stats</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowOnlinePaymentFilter(!showOnlinePaymentFilter)}
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

          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Registrations & Activations</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowRegistrationFilter(!showRegistrationFilter)}
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

          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Nas wise Current Online Users</strong>
            </div>
            <div className="card-body" style={{ height: "250px" }}>
              {renderChart(filteredNasWiseData, "nasWise")}
            </div>
          </div>
        </div>

        <div className="col-md-2">
          {/* Today Card */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Today</strong>
            </div>
            <div className="card-body">
              <p>
                <strong>Registrations:</strong> {sideBarData.today.registrations}
              </p>
              <p>
                <strong>Activations:</strong> {sideBarData.today.activations}
              </p>
              <p>
                <strong>Expiry:</strong> {sideBarData.today.expiry}
              </p>
              <p>
                <strong>Renewals:</strong> {sideBarData.today.renewals}
              </p>
              <p>
                <strong>Payments:</strong> {sideBarData.today.payments}
              </p>
              <p>
                <strong>Online Pay:</strong> {sideBarData.today.onlinePay}
              </p>
            </div>
          </div>
          {/* Complaints Card */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Complaints</strong>
            </div>
            <div className="card-body">
              <p>
                <strong>Open:</strong> {sideBarData.complaints.open}
              </p>
              <p>
                <strong>In Progress:</strong> {sideBarData.complaints.inProgress}
              </p>
              <p>
                <strong>Resolved:</strong> {sideBarData.complaints.resolved}
              </p>
              <p>
                <strong>Closed:</strong> {sideBarData.complaints.closed}
              </p>
            </div>
          </div>
          {/* Yesterday Card */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Yesterday</strong>
            </div>
            <div className="card-body">
              <p>
                <strong>Registrations:</strong> {sideBarData.yesterday.registrations}
              </p>
              <p>
                <strong>Activations:</strong> {sideBarData.yesterday.activations}
              </p>
              <p>
                <strong>Expiry:</strong> {sideBarData.yesterday.expiry}
              </p>
              <p>
                <strong>Renewals:</strong> {sideBarData.yesterday.renewals}
              </p>
              <p>
                <strong>Payments:</strong> {sideBarData.yesterday.payments}
              </p>
              <p>
                <strong>Online Pay:</strong> {sideBarData.yesterday.onlinePay}
              </p>
            </div>
          </div>
          {/* Upcoming Expiry Card */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Upcoming Expiry</strong>
            </div>
            <div className="card-body">
              <p>
                <strong>Tomorrow:</strong> {sideBarData.upcomingExpiry.tomorrow}
              </p>
              <p>
                <strong>Next 7 Days:</strong> {sideBarData.upcomingExpiry.next7Days}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;