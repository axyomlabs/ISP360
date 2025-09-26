import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
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
  // ADD THESE IMPORTS FOR THE COMPLAINTS CHART
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../css/Dashboard.css";
import OnlineAdminUsers from "../components/OnlineAdminUsers"
import AnnouncementBar from "../components/AnnouncementBar";
import { BiFilterAlt } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { FiSettings } from "react-icons/fi"; 
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "react-modal";

// --- Data ---
const onlinePaymentData = [
  { date: "21-Sep", amount: 1500 },
  { date: "22-Sep", amount: 2000 },
  { date: "23-Sep", amount: 1800 },
  { date: "24-Sep", amount: 2500 },
  { date: "25-Sep", amount: 2200 },
  { date: "26-Sep", amount: 3000 },
  { date: "07-Sep", amount: 2800 },
  { date: "08-Sep", amount: 3500 },
  { date: "09-Sep", amount: 3200 },
  { date: "13-Sep", amount: 4000 },
  { date: "14-Sep", amount: 3800 },
  { date: "01-Sep", amount: 4500 },
  { date: "02-Sep", amount: 4200 },
  { date: "03-Sep", amount: 5000 },
  { date: "04-Sep", amount: 4800 },
  { date: "05-Sep", amount: 5500 },
];
const registrationData = [
  { date: "21-Sep", registrations: 1, activations: 1 },
  { date: "22-Sep", registrations: 2, activations: 2 },
];
const paymentData = [
  { date: "13-Sep", amount: 2700 },
  { date: "16-Sep", amount: 550 },
  { date: "17-Sep", amount: 550 },
  { date: "21-Sep", amount: 5900 },
  { date: "22-Sep", amount: 575 },
  { date: "23-Sep", amount: 1200 },
  { date: "24-Sep", amount: 3000 },
  { date: "25-Sep", amount: 450 },
  { date: "26-Sep", amount: 800 },
  { date: "11-Sep", amount: 1500 },
  { date: "12-Sep", amount: 900 },
  { date: "29-Sep", amount: 2100 },
  { date: "13-Sep", amount: 650 },
  { date: "14-Sep", amount: 1800 },
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
  { date: "11-Sep", complaints: 1 },
  { date: "12-Sep", complaints: 2 },
  { date: "17-Sep", complaints: 3 },
  { date: "21-Sep", complaints: 4 },
  { date: "23-Sep", complaints: 5 },
  { date: "24-Sep", complaints: 6 },
  { date: "25-Sep", complaints: 7 },
  { date: "26-Sep", complaints: 8 },
  { date: "27-Sep", complaints: 9 },
  { date: "28-Sep", complaints: 10 },
  { date: "29-Sep", complaints: 11 },
  { date: "30-Sep", complaints: 12 },
  { date: "31-Sep", complaints: 13 },
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
  { date: "21-Sep", leads: 5 },
  { date: "22-Sep", leads: 8 },
  { date: "23-Sep", leads: 12 },
  { date: "24-Sep", leads: 10 },
  { date: "25-Sep", leads: 7 },
  { date: "26-Sep", leads: 9 },
  { date: "27-Sep", leads: 15 },
  { date: "28-Sep", leads: 11 },
  { date: "29-Sep", leads: 14 },
  { date: "30-Sep", leads: 18 },
  { date: "31-Sep", leads: 16 },
  { date: "01-Sep", leads: 20 },
  { date: "02-Sep", leads: 13 },
  { date: "03-Sep", leads: 17 },
  { date: "04-Sep", leads: 19 },
];
const nasWiseData = [{ nas: "103.142.162.1", users: 58 }];


// --- NEW DATA AND COMPONENTS FOR COMPLAINTS DOUGHNUT CHART ---
const complaintStatusData = [
  { name: "Closed", value: 55, color: "#4facfe" }, // Blue
  { name: "In Progress", value: 8, color: "#ffa600ff" }, // Orange
  { name: "Open", value: 12, color: "#e41717ff" }, // Red
  { name: "Resolved", value: 25, color: "#028d20ff" }, // Green
];
const totalComplaints = complaintStatusData.reduce(
  (sum, entry) => sum + entry.value,
  0
);

// Custom Center Label (Simplified to take activeSlice)
const CustomCenterLabel = ({ cx, cy, activeSlice }) => {
  const { name, value, color } = activeSlice;

  return (
    <g>
      <text
        x={cx}
        y={cy - 5}
        textAnchor="middle"
        dominantBaseline="central"
        className="fw-bold"
        fontSize="18px"
        fill="#333"
      >
        {/* Shows the count/value of the selected/total slice */}
        {`${value}`} 
      </text>
      <text
        x={cx}
        y={cy + 15}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12px"
        fill={color}
        fontWeight="normal"
      >
        {name}
      </text>
    </g>
  );
};
// --- Removed CustomPieTooltip as it's no longer needed ---


// Custom Legend Formatter for Pie Chart (Remains the same)
const renderColorfulLegendText = (value, entry) => {
  const percentage =
    totalComplaints > 0
      ? ((entry.payload.value / totalComplaints) * 100).toFixed(2)
      : "0.00";
  return (
    <span
      style={{
        color: entry.color,
        fontWeight: 500,
        fontSize: "12px",
        whiteSpace: "nowrap",
      }}
    >
      {percentage}% {value}
    </span>
  );
};

// --- END NEW DATA AND COMPONENTS ---


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
  // Use the state and setter from the outlet context
  const { dragEnabled, cardOrder, setCardOrder } = useOutletContext();

  // --- NEW STATE FOR COMPLAINTS CHART (to track selection/hover) ---
  const [activeSlice, setActiveSlice] = useState({
    name: "Total",
    value: totalComplaints,
    color: "#6c757d", // Default color for total
  });

  // Handler for mouse enter on a slice
  const onPieEnter = (_, index) => {
    setActiveSlice(complaintStatusData[index]);
  };

  // Handler for mouse leave
  const onPieLeave = () => {
    setActiveSlice({ name: "Total", value: totalComplaints, color: "#6c757d" });
  };
  // -----------------------------------------------------------------


  // --- Existing State ---
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

  // --- Drag & Drop Handlers for multiple lists ---
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      const columnId = source.droppableId;
      const newColumnOrder = Array.from(cardOrder[columnId]);
      const [removed] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, removed);
      setCardOrder({
        ...cardOrder,
        [columnId]: newColumnOrder,
      });
    } else {
      const startColumn = cardOrder[source.droppableId];
      const endColumn = cardOrder[destination.droppableId];
      const newStartColumnOrder = Array.from(startColumn);
      const [removed] = newStartColumnOrder.splice(source.index, 1);
      const newEndColumnOrder = Array.from(endColumn);
      newEndColumnOrder.splice(destination.index, 0, removed);
      setCardOrder({
        ...cardOrder,
        [source.droppableId]: newStartColumnOrder,
        [destination.droppableId]: newEndColumnOrder,
      });
    }
  };

  // --- Render Card By Key ---
  const renderCardByKey = (key) => {
    switch (key) {
      case "userStats":
        return (
          <div className="card mb-3" key={key}>
            <UserStatsDashboard />
          </div>
        );
      case "paymentStats":
        return (
          <div className=" card mb-4 border-0 shadow-sm rounded-3" key={key}>
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold card-header text-dark mb-0">Payment Stats</h6>
              <button
                className="btn btn-sm btn-light rounded-circle shadow-sm"
                onClick={() => setShowPaymentFilter(!showPaymentFilter)}
              >
                <BiFilterAlt size={18} className="text-secondary" />
              </button>
            </div>
            {showPaymentFilter && (
              <div className="px-3 pb-3">
                <div className="d-flex flex-wrap gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">From</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={paymentDateRange.from}
                      onChange={(e) =>
                        setPaymentDateRange({
                          ...paymentDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">To</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={paymentDateRange.to}
                      onChange={(e) =>
                        setPaymentDateRange({
                          ...paymentDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-sm shadow-sm w-100"
                      onClick={() => handleApplyFilter("payment")}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="card-body" style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredPaymentData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor=" #065f12ff"
                        stopOpacity={0.9}
                      />
                      <stop
                        offset="95%"
                        stopColor="#028d20ff"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <YAxis
                    domain={[0, "dataMax + 500"]}
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Bar
                    dataKey="amount"
                    fill="url(#barGradient)"
                    barSize={35}
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                  >
                    <LabelList
                      dataKey="amount"
                      position="top"
                      fontSize={12}
                      fill="#333"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "onlinePaymentStats":
        return (
          <div className="card mb-4 border-0 shadow-sm rounded-3" key={key}>
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold card-header text-dark mb-0">
                Online Payments Stats
              </h6>
              <button
                className="btn btn-sm btn-light rounded-circle shadow-sm"
                onClick={() =>
                  setShowOnlinePaymentFilter(!showOnlinePaymentFilter)
                }
              >
                <BiFilterAlt size={18} className="text-secondary" />
              </button>
            </div>
            {showOnlinePaymentFilter && (
              <div className="px-3 pb-3">
                <div className="d-flex flex-wrap gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">From</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={onlinePaymentDateRange.from}
                      onChange={(e) =>
                        setOnlinePaymentDateRange({
                          ...onlinePaymentDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">To</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={onlinePaymentDateRange.to}
                      onChange={(e) =>
                        setOnlinePaymentDateRange({
                          ...onlinePaymentDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-sm shadow-sm w-100"
                      onClick={() => handleApplyFilter("onlinePayment")}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="card-body" style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredOnlinePaymentData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="onlinePayGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#e69028ff" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#ffa600ff"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <YAxis
                    domain={[0, "dataMax + 500"]}
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Bar
                    dataKey="amount"
                    fill="url(#onlinePayGradient)"
                    barSize={35}
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                  >
                    <LabelList
                      dataKey="amount"
                      position="top"
                      fontSize={12}
                      fill="#333"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "registrationStats":
        return (
          <div className="card mb-4 border-0 shadow-sm rounded-3" key={key}>
            <div className="bg-white border-0 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold card-header mb-0">
                Registrations & Activations
              </h6>
              <button
                className="btn btn-sm btn-light rounded-circle shadow-sm"
                onClick={() =>
                  setShowRegistrationFilter(!showRegistrationFilter)
                }
              >
                <BiFilterAlt size={18} className="text-secondary" />
              </button>
            </div>
            {showRegistrationFilter && (
              <div className="px-3 pb-3">
                <div className="d-flex flex-wrap gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">From</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={registrationDateRange.from}
                      onChange={(e) =>
                        setRegistrationDateRange({
                          ...registrationDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">To</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={registrationDateRange.to}
                      onChange={(e) =>
                        setRegistrationDateRange({
                          ...registrationDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-sm shadow-sm w-100"
                      onClick={() => handleApplyFilter("registration")}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="card-body" style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredRegistrationData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid stroke="#eee" />
                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <YAxis
                    domain={[0, "dataMax + 10"]}
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Legend verticalAlign="top" height={30} iconType="circle" />
                  <Bar
                    dataKey="registrations"
                    fill="#4facfe"
                    barSize={30}
                    radius={[6, 6, 0, 0]}
                    animationDuration={800}
                  >
                    <LabelList
                      dataKey="registrations"
                      position="top"
                      fontSize={12}
                      fill="#333"
                    />
                  </Bar>
                  <Bar
                    dataKey="activations"
                    fill="#00c9a7"
                    barSize={30}
                    radius={[6, 6, 0, 0]}
                    animationDuration={800}
                  >
                    <LabelList
                      dataKey="activations"
                      position="top"
                      fontSize={12}
                      fill="#333"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "onlineAdminUsers":
        return (
          <div className="card mb-3" key={key}>
           <OnlineAdminUsers/>
          </div>
        );
      case "complaintStats":
        return (
          <div className="card mb-4 border-0 shadow-sm rounded-3" key={key}>
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold card-header  text-dark mb-0">Complaints Stats</h6>
              <button
                className="btn btn-sm btn-light rounded-circle shadow-sm"
                onClick={() => setShowComplaintFilter(!showComplaintFilter)}
              >
                <BiFilterAlt size={18} className="text-secondary" />
              </button>
            </div>
            {showComplaintFilter && (
              <div className="px-3 pb-3">
                <div className="d-flex flex-wrap gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">From</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={complaintDateRange.from}
                      onChange={(e) =>
                        setComplaintDateRange({
                          ...complaintDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">To</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={complaintDateRange.to}
                      onChange={(e) =>
                        setComplaintDateRange({
                          ...complaintDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-sm shadow-sm w-100"
                      onClick={() => handleApplyFilter("complaint")}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="card-body" style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredComplaintData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="complaintsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#e41717ff" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#a50d0dff"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <YAxis
                    domain={[0, "dataMax + 5"]}
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Bar
                    dataKey="complaints"
                    fill="url(#complaintsGradient)"
                    barSize={35}
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                  >
                    <LabelList
                      dataKey="complaints"
                      position="top"
                      fontSize={12}
                      fill="#333"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "leadsStats":
        return (
          <div className="card mb-4 border-0 shadow-sm rounded-3" key={key}>
            <div className="card-header bg-white border-0 d-flex  ">
              <h6 className="fw-bold card-header text-dark mb-0">Leads Stats</h6>
              <button
                className="btn btn-sm btn-light rounded-circle shadow-sm"
                onClick={() => setShowLeadsFilter(!showLeadsFilter)}
              >
                <BiFilterAlt size={18} className="text-secondary" />
              </button>
            </div>
            {showLeadsFilter && (
              <div className="px-3 pb-3">
                <div className="d-flex flex-wrap gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">From</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={leadsDateRange.from}
                      onChange={(e) =>
                        setLeadsDateRange({
                          ...leadsDateRange,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex-grow-1">
                    <label className="small fw-semibold text-muted">To</label>
                    <input
                      type="date"
                      className="form-control form-control-sm shadow-sm w-100"
                      value={leadsDateRange.to}
                      onChange={(e) =>
                        setLeadsDateRange({
                          ...leadsDateRange,
                          to: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-sm shadow-sm w-100"
                      onClick={() => handleApplyFilter("leads")}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="card-body" style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredLeadsData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="leadsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6f42c1" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#8640a1ff"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <YAxis
                    domain={[0, "dataMax + 5"]}
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Bar
                    dataKey="leads"
                    fill="url(#leadsGradient)"
                    barSize={35}
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                  >
                    <LabelList
                      dataKey="leads"
                      position="top"
                      fontSize={12}
                      fill="#333"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "nasWise":
        return (
          <div className="card mb-4 border-0 shadow-sm rounded-3" key={key}>
            <div className=" bg-white border-0 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold card-header text-dark mb-0">
                NAS Wise Online Users
              </h6>
            </div>
            <div className="card-body" style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredNasWiseData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="nasWiseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#975620ff" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#8B6F4E"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="nas"
                    fontSize={12}
                    tick={{ fill: "#6c757d" }}
                  />
                  <YAxis fontSize={12} tick={{ fill: "#6c757d" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxBoxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Bar
                    dataKey="users"
                    fill="url(#nasWiseGradient)"
                    barSize={35}
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                  >
                    <LabelList
                      dataKey="users"
                      position="top"
                      fontSize={12}
                      fill="#333"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "today":
        return (
          <div className="card mb-3" key={key}>
            <div className="fw-bold card-header">
              Today
            </div>
            <ul className="list-group list-group-flush small">
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Registrations</span> <a href="#">55550</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Activations</span> <a href="#">336350</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Expiry</span> <a href="#">1</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Renewals</span> <a href="#">0 / ₹ 568950</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Payments</span> <a href="#">0 / ₹ 569835630</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Online Pay</span> <a href="#">01120 / ₹ 456930</a>
              </li>
            </ul>
          </div>
        );
      case "complaints":
        // --- UPDATED DOUGHNUT CHART LOGIC ---
        return (
          <div className="card mb-3" key={key}>
            <div className="fw-bold card-header">Complaints</div>
            <div
              className="card-body"
              style={{
                height: "300px",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Pie
                    data={complaintStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    fill="#8884d8"
                    labelLine={false}
                    // HANDLERS ADDED for "select/click" on hover
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    // This prop is required to make the onMouseEnter/Leave handlers work correctly
                    activeIndex={activeSlice.name !== "Total" ? complaintStatusData.findIndex(d => d.name === activeSlice.name) : -1} 
                    activeShape={null} // Prevents default Recharts active slice behavior
                  >
                    {complaintStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        // Apply black stroke for the selected slice (Fulfills black border request)
                        stroke={activeSlice.name === entry.name ? '#000000' : 'none'} 
                        strokeWidth={activeSlice.name === entry.name ? 3 : 0}
                      />
                    ))}
                    {/* Dynamic center label (Fulfills showing count on select and removing top text) */}
                    <CustomCenterLabel 
                        cx="50%" 
                        cy="50%"
                        activeSlice={activeSlice}
                    />
                  </Pie>
                  {/* REMOVED: The <Tooltip> component is removed to prevent the "box" from showing */}
                  
                  <Legend
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center" 
                    iconType="circle"
                    wrapperStyle={{
                        paddingTop: "10px",
                        fontSize: "12px",
                        width: "100%", 
                    }}
                    formatter={renderColorfulLegendText}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
          </div>
        );
      case "yesterday":
        return (
          <div className="card mb-3" key={key}>
            <div className="fw-bold card-header">
              Yesterday
            </div>
            <ul className="list-group list-group-flush small">
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Registrations</span> <a href="#">0</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Activations</span> <a href="#">0</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Expiry</span> <a href="#">10000</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Renewals</span> <a href="#">1 / ₹ 155625</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Payments</span> <a href="#">0 / ₹ 550000</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Online Pay</span> <a href="#">0 / ₹ 50000</a>
              </li>
            </ul>
          </div>
        );
      case "upcomingExpiry":
        return (
          <div className="card mb-3" key={key}>
            <div className="fw-bold card-header">
              Upcoming User Expiry
            </div>
            <ul className="list-group list-group-flush small">
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Tomorrow</span> <a href="#">20000</a>
              </li>
              <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center">
                <span className="span">Next 7 Days</span> <a href="#">30000</a>
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  // --- Main Render ---
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <AnnouncementBar />
      </div>

      <div className="row">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="col-md-5">
            <Droppable droppableId="column1" isDropDisabled={!dragEnabled}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {cardOrder.column1.map((key, idx) => (
                    <Draggable
                      key={key}
                      draggableId={key}
                      index={idx}
                      isDragDisabled={!dragEnabled}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity:
                              dragEnabled && snapshot.isDragging ? 0.7 : 1,
                            cursor: dragEnabled ? "grab" : "default",
                          }}
                        >
                          {renderCardByKey(key)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="col-md-5">
            <Droppable droppableId="column2" isDropDisabled={!dragEnabled}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {cardOrder.column2.map((key, idx) => (
                    <Draggable
                      key={key}
                      draggableId={key}
                      index={idx}
                      isDragDisabled={!dragEnabled}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity:
                              dragEnabled && snapshot.isDragging ? 0.7 : 1,
                            cursor: dragEnabled ? "grab" : "default",
                          }}
                        >
                          {renderCardByKey(key)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="col-md-2">
            <Droppable droppableId="column3" isDropDisabled={!dragEnabled}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {cardOrder.column3.map((key, idx) => (
                    <Draggable
                      key={key}
                      draggableId={key}
                      index={idx}
                      isDragDisabled={!dragEnabled}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}   
                          style={{
                            ...provided.draggableProps.style,
                            opacity:
                              dragEnabled && snapshot.isDragging ? 0.7 : 1,
                            cursor: dragEnabled ? "grab" : "default",
                          }}
                        >
                          {renderCardByKey(key)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Dashboard;