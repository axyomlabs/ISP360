// src/components/CustomiseColumnsModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaColumns } from "react-icons/fa";

const CustomiseColumnsModal = ({ show, handleClose, initialColumns, onSave }) => {
  const [availableColumns, setAvailableColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);

  useEffect(() => {
    if (show) {
      setAvailableColumns(initialColumns.available);
      setVisibleColumns(initialColumns.visible);
    }
  }, [show, initialColumns]);

  const handleMoveToVisible = (column) => {
    setAvailableColumns(availableColumns.filter((col) => col !== column));
    setVisibleColumns([...visibleColumns, column]);
  };

  const handleMoveToAvailable = (column) => {
    setVisibleColumns(visibleColumns.filter((col) => col !== column));
    setAvailableColumns([...availableColumns, column]);
  };

  const handleSave = () => {
    onSave(visibleColumns);
    handleClose();
  };

  const handleRestoreDefault = () => {
    const defaultAvailable = ["CAF No", "Outage", "MAC", "User Type"];
    const defaultVisible = ["Id", "Status", "Conn. Status", "Franchise Name"];
    setAvailableColumns(defaultAvailable);
    setVisibleColumns(defaultVisible);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered> {/* Add centered here */}
      <Modal.Header closeButton>
        <Modal.Title>
          <FaColumns className="me-2" /> Customise Columns
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center">
          <div className="me-4">
            <h5>Available Columns</h5>
            <div className="list-group" style={{ height: "300px", overflowY: "auto", border: "1px solid #ddd" }}>
              {availableColumns.map((col, index) => (
                <div
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleMoveToVisible(col)}
                  style={{ cursor: "pointer" }}
                >
                  {col}
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column">
            <Button className="mb-2" onClick={() => {}}> &gt;&gt; </Button>
            <Button onClick={() => {}}> &lt;&lt; </Button>
          </div>
          <div className="ms-4">
            <h5>Visible Columns</h5>
            <div className="list-group" style={{ height: "300px", overflowY: "auto", border: "1px solid #ddd" }}>
              {visibleColumns.map((col, index) => (
                <div
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleMoveToAvailable(col)}
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