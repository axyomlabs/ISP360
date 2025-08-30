// src/pages/AllSubscribers.jsx
import React, { useState } from "react";
import SubscriberTable from "../components/SubscriberTable";
import FilterModal from "../components/FilterModal";
import TablePagination from "../components/TablePagination";
import "../css/Allsubscriber.css";
import { FaUserPlus, FaFileExport, FaFilter } from "react-icons/fa";
import { Button, Form, InputGroup, Row, Col } from "react-bootstrap"; // Make sure to import Row and Col
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AllSubscribers = () => {
  const navigate = useNavigate();
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
    },
  ];

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [modalFilters, setModalFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleShowFilterModal = () => setShowFilterModal(true);
  const handleCloseFilterModal = () => setShowFilterModal(false);

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
      if (allFilters[key]) {
        if (key === "username") {
          if (!subscriber[key].toLowerCase().includes(allFilters[key].toLowerCase())) {
            return false;
          }
        } else {
          if (subscriber[key] !== allFilters[key]) {
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
    <div className="container-fluid py-4">
      <div className="card mb-4 p-3 m-2">
        <Row className="align-items-end mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={filters.status}
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
                value={filters.connStatus}
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
                value={filters.username}
                onChange={handleMainFilterChange}
              />
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex justify-content-end gap-2">
            <Button
              variant="outline-primary"
              className="d-flex align-items-center"
              onClick={handleShowFilterModal}
              style={{ minHeight: "45px" }}
            >
              <FaFilter className="p-0" /> Filter
            </Button>
            <Button
              variant="outline-dark"
              className="d-flex align-items-center"
            >
              <FaFileExport className="me-1" /> Export
            </Button>
            <Button
              variant="outline-success"
              className="d-flex align-items-center"
              onClick={() => navigate("/subscribers/add")}
            >
              <FaUserPlus className="me-1" /> Add Subscriber
            </Button>
          </Col>
        </Row>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-muted p-2">
          Showing {startIndex + 1} to {Math.min(endIndex, totalResults)} of {totalResults} entries
        </div>
        <div className="d-flex align-items-center mx-4">
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
      <div className="card m-2" style={{ height: "70vh", overflow: "hidden" }}>
        <div
          className="card-body"
          style={{
            height: "calc(100% - 80px)",
            overflowY: "auto",
          }}
        >
          <SubscriberTable subscribers={subscribersToShow} />
        </div>
        <TablePagination
          totalResults={totalResults}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <FilterModal
        show={showFilterModal}
        handleClose={handleCloseFilterModal}
        handleFilter={handleModalFilter}
      />
    </div>
  );
};

export default AllSubscribers;