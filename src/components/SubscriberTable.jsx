// src/components/SubscriberTable.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaSort, FaLink, FaUnlink } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SubscriberTable.css";

const SubscriberTable = ({ subscribers, visibleColumns }) => {
  const [sortConfig, setSortConfig] = useState(null);

  // Drag-to-scroll refs
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const handleMouseDown = (e) => {
      isDown.current = true;
      slider.classList.add("active-drag");
      startX.current = e.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown.current = false;
      slider.classList.remove("active-drag");
    };

    const handleMouseUp = () => {
      isDown.current = false;
      slider.classList.remove("active-drag");
    };

    const handleMouseMove = (e) => {
      if (!isDown.current) return;
      e.preventDefault(); // prevents text selection
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 1.5; // drag speed
      slider.scrollLeft = scrollLeft.current - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const columnMapping = {
    id: "Id",
    status: "Status",
    connStatus: "Conn. Status",
    accountType: "Account Type",
    franchiseName: "Franchise's Name",
    branch: "Branch",
    username: "Username",
    name: "Name",
    gstin: "GSTIN",
    packageName: "Package Name",
    subPackage: "Sub Package",
    mobile: "Mobile",
    lastLogoff: "Last Logoff",
    dateAdded: "Date Added",
    expiryDate: "Expiry Date",
    ipAddress: "IpAddress",
    city: "City",
    node: "Node",
    pop: "POP",
    switch: "Switch",
    installationAddress: "Installation Address",
    "CAF No": "CAF No",
    Outage: "Outage",
    MAC: "MAC",
    "User Type": "User Type",
    "Alt. Mobile": "Alt. Mobile",
    "FUP Limit": "FUP Limit",
    Area: "Area",
    Colony: "Colony",
    Building: "Building",
    State: "State",
    "Door No": "Door No",
    "Billing Address": "Billing Address",
    Email: "Email",
    "User Added": "User Added",
    "Commitment Date": "Commitment Date",
    "Wallet Credit": "Wallet Credit",
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...subscribers];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [subscribers, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const statusColors = {
    Active: "text-success",
    Suspended: "text-secondary",
    Pending: "text-warning",
    Terminated: "text-danger",
  };

  const renderCellContent = (subscriber, columnKey) => {
    switch (columnKey) {
      case "status":
        return (
          <div className="d-flex justify-content-center">
            <span
              className={statusColors[subscriber.status]}
              title={subscriber.status}
            >
              <BsCircleFill />
            </span>
          </div>
        );
      case "connStatus":
        return (
          <>
            <span
              className={`conn-status-icon p-1 ${
                subscriber.connStatus === "Connected"
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {subscriber.connStatus === "Connected" ? <FaLink /> : <FaUnlink />}
            </span>
            {subscriber.connStatus}
          </>
        );
      default:
        return subscriber[columnKey];
    }
  };

  return (
    <div ref={scrollRef} className="drag-scroll">
      <Table hover className="subscriber-datatable">
        <thead>
          <tr className="table-header">
            {visibleColumns.map((key) => (
              <th key={key} onClick={() => requestSort(key)}>
                {columnMapping[key] || key} <FaSort />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((subscriber) => (
            <tr key={subscriber.id}>
              {visibleColumns.map((key) => (
                <td key={key}>{renderCellContent(subscriber, key)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SubscriberTable;
