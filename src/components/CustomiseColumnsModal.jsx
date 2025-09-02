// src/components/CustomiseColumnsModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaColumns } from "react-icons/fa";

const CustomiseColumnsModal = ({ show, handleClose, initialColumns, onSave }) => {
  const [availableColumns, setAvailableColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);

  // NEW: states to track selected columns
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
  const defaultVisible = ["id", "status", "connStatus", "username", "name", "packageName", "mobile",]; // ✅ match keys from SubscriberTable

  setAvailableColumns(defaultAvailable);
  setVisibleColumns(defaultVisible);

  // ✅ Immediately update parent so table re-renders
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
        <div className="d-flex justify-content-center align-items-center">
          {/* Available Columns */}
          <div className="me-4">
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
          <div className="d-flex flex-column">
            <Button className="mb-2" onClick={handleMoveToVisible} disabled={!selectedAvailable}>
              &gt;&gt;
            </Button>
            <Button onClick={handleMoveToAvailable} disabled={!selectedVisible}>
              &lt;&lt;
            </Button>
          </div>

          {/* Visible Columns */}
          <div className="ms-4">
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

      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="danger" onClick={handleRestoreDefault}>
          Restore Default
        </Button>
        <div>
          <Button variant="secondary" onClick={handleClose} className="me-2">
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
