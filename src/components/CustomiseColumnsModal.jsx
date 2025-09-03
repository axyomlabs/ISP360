// src/components/CustomiseColumnsModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaColumns } from "react-icons/fa";

const CustomiseColumnsModal = ({ show, handleClose, initialColumns, onSave }) => {
  const [availableColumns, setAvailableColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);

  // states to track selected columns
  const [selectedAvailable, setSelectedAvailable] = useState(null);
  const [selectedVisible, setSelectedVisible] = useState(null);

  useEffect(() => {
    if (show) {
      setAvailableColumns(initialColumns.available);
      setVisibleColumns(initialColumns.visible);
      setSelectedAvailable(null);
      setSelectedVisible(null);
    }
  }, [show, initialColumns]);

  const handleMoveToVisible = () => {
    if (selectedAvailable) {
      setAvailableColumns(availableColumns.filter((col) => col !== selectedAvailable));
      setVisibleColumns([...visibleColumns, selectedAvailable]);
      setSelectedAvailable(null);
    }
  };

  const handleMoveToAvailable = () => {
    if (selectedVisible) {
      setVisibleColumns(visibleColumns.filter((col) => col !== selectedVisible));
      setAvailableColumns([...availableColumns, selectedVisible]);
      setSelectedVisible(null);
    }
  };

  const handleSave = () => {
    onSave(visibleColumns);
    handleClose();
  };

  const handleRestoreDefault = () => {
    const defaultAvailable = [
      "accountType", "franchiseName", "branch", "username", "name", "gstin",
      "packageName", "subPackage", "mobile", "lastLogoff", "expiryDate",
      "dateAdded", "ipAddress", "city", "node", "pop", "switch",
      "installationAddress", "lastRenewal", "packagePrice", "customPrice",
      "currentBalance", "nasPortId", "latitude", "longitude", "MAC", "Email"
    ];
    const defaultVisible = ["id", "status", "connStatus", "username", "name", "packageName", "mobile",];

    setAvailableColumns(defaultAvailable);
    setVisibleColumns(defaultVisible);
    onSave(defaultVisible);
  };


  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaColumns className="me-2" /> Customise Columns
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
          {/* Available Columns */}
          <div className="me-md-4 mb-3 mb-md-0 w-100">
            <h5>Available Columns</h5>
            <div
              className="list-group"
              style={{ height: "300px", overflowY: "auto", border: "1px solid #ddd" }}
            >
              {availableColumns.map((col, index) => (
                <div
                  key={index}
                  className={`list-group-item list-group-item-action ${
                    selectedAvailable === col ? "active" : ""
                  }`}
                  onClick={() => setSelectedAvailable(col)}
                  style={{ cursor: "pointer" }}
                >
                  {col}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex flex-row flex-md-column justify-content-center align-items-center my-3 my-md-0">
            <Button
              className="mb-md-2 me-2 me-md-0"
              onClick={handleMoveToVisible}
              disabled={!selectedAvailable}
            >
              {/* Conditional rendering for button text */}
              <span className="d-md-none">&darr;</span>
              <span className="d-none d-md-inline">&gt;&gt;</span>
            </Button>
            <Button
              onClick={handleMoveToAvailable}
              disabled={!selectedVisible}
            >
              {/* Conditional rendering for button text */}
              <span className="d-md-none">&uarr;</span>
              <span className="d-none d-md-inline">&lt;&lt;</span>
            </Button>
          </div>

          {/* Visible Columns */}
          <div className="ms-md-4 w-100">
            <h5>Visible Columns</h5>
            <div
              className="list-group"
              style={{ height: "300px", overflowY: "auto", border: "1px solid #ddd" }}
            >
              {visibleColumns.map((col, index) => (
                <div
                  key={index}
                  className={`list-group-item list-group-item-action ${
                    selectedVisible === col ? "active" : ""
                  }`}
                  onClick={() => setSelectedVisible(col)}
                  style={{ cursor: "pointer" }}
                >
                  {col}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between flex-wrap">
        <Button variant="danger" onClick={handleRestoreDefault}>
          Restore Default
        </Button>
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Submit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomiseColumnsModal;