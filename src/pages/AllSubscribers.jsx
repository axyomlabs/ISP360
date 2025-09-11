import React, { useState, useEffect } from "react";
import SubscriberTable from "../components/SubscriberTable";
import FilterModal from "../components/FilterModal";
import TablePagination from "../components/TablePagination";
import CustomiseColumnsModal from "../components/CustomiseColumnsModal";
import "../css/Allsubscriber.css";
import { FaUserPlus, FaFileExport, FaFilter, FaColumns } from "react-icons/fa";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AllSubscribers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filterStateFromDashboard, setFilterStateFromDashboard] =
    useState(null);

  const dummySubscribers = [
    {
      id: "2025001",
      status: "Active",
      connStatus: "Connected",
      accountType: "Regular",
      franchiseName: "Main Office",
      branch: "Main Branch",
      username: "johndoe",
      name: "John Doe",
      gstin: "27ABCE1234F1Z5",
      packageName: "20 Mbps Unlimited",
      subPackage: "N/A",
      mobile: "9876543210",
      lastLogoff: "28/08/2025 15:30",
      dateAdded: "01/01/2025",
      expiryDate: "01/09/2025",
      ipAddress: "192.168.1.100",
      city: "Bhuj",
      node: "Node A",
      pop: "POP 1",
      switch: "Switch-01",
      installationAddress: "123 Main St, Bhuj",
      lastRenewal: "20/08/2025",
      packagePrice: 1000,
      customPrice: 950,
      currentBalance: 500,
      nasPortId: "NAS-002",
      latitude: "23.0225",
      longitude: "72.5714",
      MAC: "00:1A:2B:3C:4D:5E",
      "User Type": "Home",
      "Alt. Mobile": "9123456789",
      Email: "john.doe@example.com",
    },
    {
      id: "2025002",
      status: "Suspended",
      connStatus: "Disconnected",
      accountType: "Regular",
      franchiseName: "Sub Office A",
      branch: "Branch A",
      username: "jane_smith",
      name: "Jane Smith",
      gstin: "27ABCE1234F2Z5",
      packageName: "100 Mbps Unlimited",
      subPackage: "N/A",
      mobile: "9988776655",
      lastLogoff: "27/08/2025 10:00",
      dateAdded: "15/02/2025",
      expiryDate: "15/09/2025",
      ipAddress: "192.168.1.101",
      city: "Anjar",
      node: "Node B",
      pop: "POP 2",
      switch: "Switch-02",
      installationAddress: "456 Side St, Anjar",
      lastRenewal: "20/08/2025",
      packagePrice: 1000,
      customPrice: 950,
      currentBalance: 500,
      nasPortId: "NAS-002",
      latitude: "23.0225",
      longitude: "72.5714",
      MAC: "6A:B7:C8:D9:E0:F1",
      "User Type": "Business",
      "Alt. Mobile": "9876543210",
      Email: "jane.smith@example.com",
    },
    {
      id: "2025003",
      status: "Active",
      connStatus: "Connected",
      accountType: "Corporate",
      franchiseName: "Tech Solutions",
      branch: "Corporate HQ",
      username: "techcorp",
      name: "Tech Corp",
      gstin: "27ABCE1234F3Z5",
      packageName: "500 Mbps Corporate",
      subPackage: "VPN Service",
      mobile: "9123456789",
      lastLogoff: "N/A",
      dateAdded: "10/03/2025",
      expiryDate: "10/10/2025",
      ipAddress: "192.168.2.1",
      city: "Bhuj",
      node: "Node C",
      pop: "POP 3",
      switch: "Switch-03",
      installationAddress: "789 Business Ave, Bhuj",
      lastRenewal: "20/08/2025",
      packagePrice: 1000,
      customPrice: 950,
      currentBalance: 500,
      nasPortId: "NAS-002",
      latitude: "23.0225",
      longitude: "72.5714",
      MAC: "22:2C:3D:4E:5F:6G",
      "User Type": "Corporate",
      "Alt. Mobile": "9988776655",
      Email: "tech.corp@example.com",
    },
    {
      id: "2025004",
      status: "Terminated",
      connStatus: "Disconnected",
      accountType: "Trial",
      franchiseName: "Main Office",
      branch: "Main Branch",
      username: "trial_user",
      name: "Trial User",
      gstin: "N/A",
      packageName: "Trial 10 Mbps",
      subPackage: "N/A",
      mobile: "9000000000",
      lastLogoff: "N/A",
      dateAdded: "25/08/2025",
      expiryDate: "01/09/2025",
      ipAddress: "N/A",
      city: "Bhuj",
      node: "Node A",
      pop: "POP 1",
      switch: "Switch-01",
      installationAddress: "321 Test St, Bhuj",
      lastRenewal: "20/08/2025",
      packagePrice: 1000,
      customPrice: 950,
      currentBalance: 500,
      nasPortId: "NAS-002",
      latitude: "23.0225",
      longitude: "72.5714",
      MAC: "33:3A:4B:5C:6D:7E",
      "User Type": "Trial",
      "Alt. Mobile": "9765432109",
      Email: "trial.user@example.com",
    },
    {
      id: "2025005",
      status: "Pending",
      connStatus: "Disconnected",
      accountType: "Regular",
      franchiseName: "Sub Office B",
      branch: "Branch B",
      username: "old_user",
      name: "Old User",
      gstin: "27ABCE1234F4Z5",
      packageName: "20 Mbps Unlimited",
      subPackage: "N/A",
      mobile: "9765432109",
      lastLogoff: "20/08/2025 12:00",
      dateAdded: "05/01/2025",
      expiryDate: "05/02/2025",
      ipAddress: "192.168.1.102",
      city: "Gandhidham",
      node: "Node D",
      pop: "POP 4",
      switch: "Switch-04",
      installationAddress: "654 Old Road, Gandhidham",
      lastRenewal: "20/08/2025",
      packagePrice: 1000,
      customPrice: 950,
      currentBalance: 500,
      nasPortId: "NAS-002",
      latitude: "23.0225",
      longitude: "72.5714",
      MAC: "44:4A:5B:6C:7D:8E",
      "User Type": "Home",
      "Alt. Mobile": "9123456780",
      Email: "old.user@example.com",
    },
    {
      id: "2025006",
      status: "Active",
      connStatus: "Connected",
      accountType: "Regular",
      franchiseName: "Main Office",
      branch: "Main Branch",
      username: "user06",
      name: "User Six",
      gstin: "27ABCE1234F5Z5",
      packageName: "20 Mbps Unlimited",
      subPackage: "N/A",
      mobile: "9123456780",
      lastLogoff: "28/08/2025 16:00",
      dateAdded: "02/01/2025",
      expiryDate: "02/09/2025",
      ipAddress: "192.168.1.103",
      city: "Bhuj",
      node: "Node A",
      pop: "POP 1",
      switch: "Switch-01",
      installationAddress: "124 Main St, Bhuj",
      lastRenewal: "20/08/2025",
      packagePrice: 1000,
      customPrice: 950,
      currentBalance: 500,
      nasPortId: "NAS-002",
      latitude: "23.0225",
      longitude: "72.5714",
      MAC: "55:5A:6B:7C:8D:9E",
      "User Type": "Home",
      "Alt. Mobile": "9988776650",
      Email: "user.six@example.com",
    },
    {
      id: "2025007",
      status: "Suspended",
      connStatus: "Disconnected",
      accountType: "Regular",
      franchiseName: "Sub Office A",
      branch: "Branch A",
      username: "user07",
      name: "User Seven",
      gstin: "27ABCE1234F6Z5",
      packageName: "100 Mbps Unlimited",
      subPackage: "N/A",
      mobile: "9988776650",
      lastLogoff: "27/08/2025 10:30",
      dateAdded: "16/02/2025",
      expiryDate: "16/09/2025",
      ipAddress: "192.168.1.104",
      city: "Anjar",
      node: "Node B",
      pop: "POP 2",
      switch: "Switch-02",
      installationAddress: "457 Side St, Anjar",
      lastRenewal: "20/08/2025",
      packagePrice: 1000,
      customPrice: 950,
      currentBalance: 500,
      nasPortId: "NAS-002",
      latitude: "23.0225",
      longitude: "72.5714",
      MAC: "66:6A:7B:8C:9D:0E",
      "User Type": "Business",
      "Alt. Mobile": "9123456781",
      Email: "user.seven@example.com",
    },
    {
      id: "2025008",
      status: "Active",
      connStatus: "Connected",
      accountType: "Corporate",
      franchiseName: "Tech Solutions",
      branch: "Corporate HQ",
      username: "user08",
      name: "User Eight",
      gstin: "27ABCE1234F7Z5",
      packageName: "500 Mbps Corporate",
      subPackage: "N/A",
      mobile: "9123456781",
      lastLogoff: "28/08/2025 15:40",
      dateAdded: "11/03/2025",
      expiryDate: "11/10/2025",
      ipAddress: "192.168.2.2",
      city: "Bhuj",
      node: "Node C",
      pop: "POP 3",
      switch: "Switch-03",
      installationAddress: "790 Business Ave, Bhuj",
      lastRenewal: "20/08/2025",
      packagePrice: 1000,
      customPrice: 950,
      currentBalance: 500,
      nasPortId: "NAS-002",
      latitude: "23.0225",
      longitude: "72.5714",
      MAC: "77:7A:8B:9C:0D:1E",
      "User Type": "Corporate",
      "Alt. Mobile": "9000000001",
      Email: "user.eight@example.com",
    },
    {
      id: "2025009",
      status: "Terminated",
      connStatus: "Disconnected",
      accountType: "Trial",
      franchiseName: "Main Office",
      branch: "Main Branch",
      username: "user09",
      name: "User Nine",
      gstin: "N/A",
      packageName: "Trial 10 Mbps",
      subPackage: "N/A",
      mobile: "9000000001",
      lastLogoff: "N/A",
      dateAdded: "26/08/2025",
      expiryDate: "02/09/2025",
      ipAddress: "N/A",
      city: "Bhuj",
      node: "Node A",
      pop: "POP 1",
      switch: "Switch-01",
      installationAddress: "322 Test St, Bhuj",
      lastRenewal: "20/08/2025",
      packagePrice: 1000,
      customPrice: 950,
      currentBalance: 500,
      nasPortId: "NAS-002",
      latitude: "23.0225",
      longitude: "72.5714",
      MAC: "88:8A:9B:0C:1D:2E",
      "User Type": "Trial",
      "Alt. Mobile": "9765432108",
      Email: "user.nine@example.com",
    },
    {
      id: "2025010",
      status: "Terminated",
      connStatus: "Disconnected",
      accountType: "Regular",
      franchiseName: "Sub Office B",
      branch: "Branch B",
      username: "user10",
      name: "User Ten",
      gstin: "27ABCE1234F8Z5",
      packageName: "20 Mbps Unlimited",
      subPackage: "N/A",
      mobile: "9765432108",
      lastLogoff: "21/08/2025 12:00",
      dateAdded: "06/01/2025",
      expiryDate: "06/02/2025",
      ipAddress: "192.168.1.105",
      city: "Gandhidham",
      node: "Node D",
      pop: "POP 4",
      switch: "Switch-04",
      installationAddress: "655 Old Road, Gandhidham",
      lastRenewal: "20/08/2025",
      packagePrice: 1000,
      customPrice: 950,
      currentBalance: 500,
      nasPortId: "NAS-002",
      latitude: "23.0225",
      longitude: "72.5714",
      MAC: "99:9A:0B:1C:2D:3E",
      "User Type": "Home",
      "Alt. Mobile": "9123456789",
      Email: "user.ten@example.com",
    },
  ];

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCustomiseModal, setShowCustomiseModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [modalFilters, setModalFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (location.state && location.state.filter) {
      const { filter } = location.state;
      setFilters(filter);
      setModalFilters({});
      setCurrentPage(1);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.state]);

  const allPossibleColumns = [
    "accountType",
    "franchiseName",
    "branch",
    "username",
    "name",
    "gstin",
    "packageName",
    "subPackage",
    "mobile",
    "lastLogoff",
    "expiryDate",
    "dateAdded",
    "ipAddress",
    "city",
    "node",
    "pop",
    "switch",
    "installationAddress",
    "lastRenewal",
    "packagePrice",
    "customPrice",
    "currentBalance",
    "nasPortId",
    "latitude",
    "longitude",
    "MAC",
    "Email",
  ];

  const [visibleColumns, setVisibleColumns] = useState(() => {
    const saved = localStorage.getItem("visibleColumns");
    return saved
      ? JSON.parse(saved)
      : [
          "id",
          "status",
          "connStatus",
          "username",
          "name",
          "packageName",
          "mobile",
        ];
  });

  useEffect(() => {
    localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  const handleShowFilterModal = () => setShowFilterModal(true);
  const handleCloseFilterModal = () => setShowFilterModal(false);

  const handleShowCustomiseModal = () => setShowCustomiseModal(true);
  const handleCloseCustomiseModal = () => setShowCustomiseModal(false);

  const handleSaveColumns = (newVisibleColumns) => {
    setVisibleColumns(newVisibleColumns);
    setShowCustomiseModal(false);
  };

  const handleModalFilter = (newFilters) => {
    setModalFilters(newFilters);
    setCurrentPage(1);
    handleCloseFilterModal();
  };

  const handleMainFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const filteredSubscribers = dummySubscribers.filter((subscriber) => {
    const allFilters = { ...filters, ...modalFilters };

    for (const key in allFilters) {
      if (allFilters[key] && allFilters[key] !== "all") {
        const subscriberValue = subscriber[key]?.toLowerCase();
        const filterValue = allFilters[key]?.toLowerCase();

        if (key === "username") {
          if (!subscriberValue.includes(filterValue)) {
            return false;
          }
        } else {
          if (subscriberValue !== filterValue) {
            return false;
          }
        }
      }
    }
    return true;
  });

  const totalResults = filteredSubscribers.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subscribersToShow = filteredSubscribers.slice(startIndex, endIndex);

  return (
    <div className="container-fluid">
      <div className="card mb-4 p-3 mx-2">
        <Row className="align-items-end mb-3 justify-content-center">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={filters.status || ""}
                onChange={handleMainFilterChange}
              >
                <option value="">--All--</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Pending">Pending</option>
                <option value="Terminated">Terminated</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Conn. Status</Form.Label>
              <Form.Select
                name="connStatus"
                value={filters.connStatus || ""}
                onChange={handleMainFilterChange}
              >
                <option value="">--All--</option>
                <option value="Connected">Connected</option>
                <option value="Disconnected">Disconnected</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Search Username"
                value={filters.username || ""}
                onChange={handleMainFilterChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Col className="d-flex justify-content-start gap-2">
          <Button
            variant="outline-info"
            className="d-flex align-items-center"
            onClick={handleShowCustomiseModal}
          >
            <FaColumns className="me-1" /> Customise Columns
          </Button>
          <Button variant="outline-dark" className="d-flex align-items-center">
            <FaFileExport className="me-1" /> Export
          </Button>
          <Col className="d-flex justify-content-end gap-2">
            <Button
              variant="outline-primary"
              className="d-flex align-items-center"
              onClick={handleShowFilterModal}
              style={{ minHeight: "45px" }}
            >
              <FaFilter className="p-0" />
            </Button>
            <Button
              variant="outline-success"
              className="d-flex align-items-center"
              onClick={() => navigate("/app/subscribers/add")} // Correct path
            >
              <FaUserPlus className="me-1" /> Add
            </Button>
          </Col>
        </Col>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center mx-2">
        <div className="text-muted me-3">
          Showing {startIndex + 1} to {Math.min(endIndex, totalResults)} of{" "}
          {totalResults} entries
        </div>
        <div className="d-flex align-items-center gap-2 mx-2">
          <div className="d-flex align-items-center mb-1">
            <span>Show</span>
            <Form.Select
              className="mx-2"
              style={{ width: "80px" }}
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Form.Select>
            <span>rows</span>
          </div>
        </div>
      </div>
      <div className="card m-1" style={{ height: "63vh", overflow: "hidden" }}>
        <div
          className="card-body"
          style={{
            height: "calc(100% - 80px)",
            overflowY: "auto",
          }}
        >
          <SubscriberTable
            subscribers={subscribersToShow}
            visibleColumns={visibleColumns}
          />
        </div>
        <div className="mx-2">
          <TablePagination
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <FilterModal
        show={showFilterModal}
        handleClose={handleCloseFilterModal}
        handleFilter={handleModalFilter}
      />
      <CustomiseColumnsModal
        show={showCustomiseModal}
        handleClose={handleCloseCustomiseModal}
        initialColumns={{
          available: allPossibleColumns.filter(
            (col) => !visibleColumns.includes(col)
          ),
          visible: visibleColumns,
        }}
        onSave={handleSaveColumns}
      />
    </div>
  );
};

export default AllSubscribers;
