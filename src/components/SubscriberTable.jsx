import React, { useState, useMemo, useRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaSort, FaLink, FaUnlink } from "react-icons/fa";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SubscriberTable.css";

const SubscriberTable = ({
  subscribers,
  visibleColumns,
  onColumnOrderChange,
}) => {
  const [sortConfig, setSortConfig] = useState(null);

  // Drag-to-scroll refs
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Drag-to-scroll logic (unchanged)
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

  // Column names mapping (unchanged)
  const columnMapping = {
    id: "Id",
    status: "Status",
    connStatus: "Conn",
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

  // Sorting logic (unchanged)
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

  // Status and connStatus logic (unchanged)
  const renderCellContent = (subscriber, columnKey) => {
    switch (columnKey) {
      case "status":
        const statusColors = {
          Active: "text-success",
          Suspended: "text-secondary",
          Pending: "text-warning",
          Terminated: "text-danger",
        };
        return (
          <div className="d-flex ">
            <span className={statusColors[subscriber.status]}>
              {subscriber.status}
            </span>
          </div>
        );
      case "connStatus":
        return (
          <div className="d-flex">
            <span
              className={`conn-status-icon ${
                subscriber.connStatus === "Connected"
                  ? "text-success"
                  : "text-danger"
              }`}
              title={subscriber.connStatus}
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
    const newCols = Array.from(visibleColumns);
    const [moved] = newCols.splice(result.source.index, 1);
    newCols.splice(result.destination.index, 0, moved);
    onColumnOrderChange(newCols);
  };

  // Refined drag style logic to keep it near the cursor
  const getDragStyle = (style, snapshot) => {
    if (!snapshot.isDragging) {
      // If not dragging, return the original styles without modification
      return style;
    }

    // When dragging, the library provides positioning via `style` which uses
    // fixed positioning and offsets. We augment this with visual cues.
    return {
      ...style,
      userSelect: "none", // Prevent text selection while dragging
      cursor: "grabbing", // Show grabbing cursor
      opacity: 0.7, // Make the dragged item slightly transparent
      // Ensure it stays within the scrollable container.
      // The library usually handles this with its fixed positioning.
      // If it's still detaching, it might be related to overflow issues.
    };
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
                  {visibleColumns.map((key, index) => (
                    <Draggable
                      key={key}
                      draggableId={key}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <th
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps} // Crucial for initiating drag
                          onClick={() => requestSort(key)}
                          style={{
                            // This merge is critical:
                            // 1. Apply the library's positioning styles first.
                            // 2. Then apply our custom styles (opacity, cursor).
                            ...provided.draggableProps.style,
                            ...getDragStyle(provided.draggableProps.style, snapshot),
                            // Ensure cursor is always 'grab' when draggable
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
                {visibleColumns.map((key) => (
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