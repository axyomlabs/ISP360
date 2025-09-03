// src/components/FilterModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';

const FilterModal = ({ show, handleClose, handleFilter }) => {
  const [filterValues, setFilterValues] = useState({
    status: '',
    connStatus: '',
    franchiseName: '',
    branch: '',
    accNo: '', // Assuming 'accNo' is the state key for A/C No
    username: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    handleFilter(filterValues);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title><FaFilter className="me-2" /> Apply Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            {/* Status Filter */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={filterValues.status} onChange={handleChange}>
                  <option value="">--All--</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Pending">Pending</option>
                  <option value="Terminated">Terminated</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Conn. Status Filter */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Conn. Status</Form.Label>
                <Form.Select name="connStatus" value={filterValues.connStatus} onChange={handleChange}>
                  <option value="">--All--</option>
                  <option value="Connected">Connected</option>
                  <option value="Disconnected">Disconnected</option>
                 
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Franchise Filter */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Franchise</Form.Label>
                <Form.Select name="franchiseName" value={filterValues.franchiseName} onChange={handleChange}>
                  <option value="">--All--</option>
                  {/* Add dynamic options based on your data */}
                  <option value="Main Office">Main Office</option>
                  <option value="Sub Office A">Sub Office A</option>
                  <option value="Tech Solutions">Tech Solutions</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Branch Filter */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Branch</Form.Label>
                <Form.Select name="branch" value={filterValues.branch} onChange={handleChange}>
                  <option value="">--All--</option>
                  {/* Add dynamic options based on your data */}
                  <option value="Main Branch">Main Branch</option>
                  <option value="Branch A">Branch A</option>
                  <option value="Corporate HQ">Corporate HQ</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* A/C No Filter */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>A/C No</Form.Label>
                <Form.Control
                  type="text"
                  name="accNo"
                  placeholder="Enter A/C No"
                  value={filterValues.accNo}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            
            {/* Username Filter */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={filterValues.username}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Apply 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;