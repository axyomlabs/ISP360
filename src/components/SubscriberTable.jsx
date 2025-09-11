// src/components/SubscriberTable.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaSort, FaLink, FaUnlink } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SubscriberTable.css";

// A key to identify our saved column order in local storage
const LOCAL_STORAGE_KEY = "subscriberTableColumnOrder";

const SubscriberTable = ({ subscribers, visibleColumns }) => {
  // Initialize columns from local storage or use the default prop
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedColumns ? JSON.parse(savedColumns) : visibleColumns;
  });
  const [sortConfig, setSortConfig] = useState(null);

  // Use useEffect to save the column order to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  // Drag-to-scroll refs
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Drag-to-scroll logic
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
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 1.5;
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

  // Column names mapping
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

  // Sorting logic
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

  // Status colors
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
          <span className={statusColors[subscriber.status]}>
            {subscriber.status}
          </span>
        </div>
      );
    case "connStatus":
      return (
        <div className="d-flex justify-content-center">
          <span
            className={`conn-status-icon ${
              subscriber.connStatus === "Connected"
                ? "text-success"
                : "text-danger"
            }`}
            title={subscriber.connStatus} // Tooltip shows text when hovering
          >
            {subscriber.connStatus === "Connected" ? <FaLink /> : <FaUnlink />}
          </span>
        </div>
      );
    default:
      return subscriber[columnKey];
  }
};


  // Handle column drag reorder
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newCols = Array.from(columns);
    const [moved] = newCols.splice(result.source.index, 1);
    newCols.splice(result.destination.index, 0, moved);
    setColumns(newCols);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div ref={scrollRef} className="drag-scroll">
        <Table hover className="subscriber-datatable">
          <Droppable droppableId="columns" direction="horizontal">
            {(provided) => (
              <thead
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <tr className="table-header">
                  {columns.map((key, index) => (
                    <Draggable
                      key={key}
                      draggableId={key}
                      index={index}
                    >
                      {(provided) => (
                        <th
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => requestSort(key)}
                          style={{
                            ...provided.draggableProps.style,
                            cursor: "grab",
                          }}
                        >
                          {columnMapping[key] || key} <FaSort />
                        </th>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tr>
              </thead>
            )}
          </Droppable>
          <tbody>
            {sortedData.map((subscriber) => (
              <tr key={subscriber.id}>
                {columns.map((key) => (
                  <td key={key}>{renderCellContent(subscriber, key)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DragDropContext>
  );
};

export default SubscriberTable;