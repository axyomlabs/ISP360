import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Addsubscriber.css";
import { Button, Row, Col, Form } from "react-bootstrap";

const SECTIONS = [
  {
    title: "Aadhaar Verification",
    fields: [
      { key: "aadhaarNo", label: "Aadhaar No", type: "text", col: 6, required: true },
      {
        key: "sendOtp",
        type: "button",
        text: "Send OTP",
        col: 2,
        style: { backgroundColor: "#B8CEF6", color: "#000" },
      },
    ],
  },
  {
    title: "Basic Information",
    fields: [
      { key: "franchise", label: "Select Franchise", type: "select", col: 3, options: ["Select Franchise"], required: true },
      { key: "branch", label: "Branch", type: "select", col: 3, options: ["Select Branch"], required: true },
      { key: "username", label: "Username", type: "text", col: 3, required: true },
      { key: "password", label: "Password", type: "password", col: 3, required: true },
      { key: "firstName", label: "First Name", type: "text", col: 3, required: true },
      { key: "lastName", label: "Last Name", type: "text", col: 3 },
      { key: "fatherCompany", label: "Father Name or Company Name", type: "text", col: 3, required: true },
      { key: "registerMobile", label: "Register Mobile", type: "text", col: 3, required: true },
      { key: "altNum", label: "Alt Num", type: "text", col: 3 },
      { key: "regEmail", label: "Register Email", type: "email", col: 3 },
      { key: "altEmail", label: "Alternate Email", type: "email", col: 3 },
      { key: "cafNo", label: "CAF No", type: "text", col: 3 },
      { key: "refNo", label: "Ref No", type: "text", col: 3 },
    ],
  },
  {
    title: "Location Information",
    fields: [
      { key: "country", label: "Country", type: "select", col: 3, options: ["India (+91)"], required: true },
      { key: "state", label: "State", type: "select", col: 3, options: ["Select State"], required: true },
      { key: "city", label: "City", type: "text", col: 3, required: true },
      { key: "zip", label: "Zip", type: "text", col: 3, required: true },
      { key: "doorNo", label: "Door No", type: "text", col: 3 },
      { key: "area", label: "Area", type: "select", col: 3, options: ["Select Area"] },
      { key: "colony", label: "Colony", type: "select", col: 3, options: ["Select Colony"] },
      { key: "building", label: "Building", type: "select", col: 3, options: ["Select Building"] },
      { key: "billingAddress", label: "Billing Address", type: "textarea", col: 6 },
      { key: "installationAddress", label: "Installation Address", type: "textarea", col: 6 },
      { key: "houseType", label: "House Type", type: "select", col: 3, options: ["Select House Type"] },
      { key: "connectionLocation", label: "Connection Location", type: "text", col: 3 },
      { key: "latitude", label: "Latitude", type: "text", col: 3 },
      { key: "longitude", label: "Longitude", type: "text", col: 3 },
    ],
  },
  {
    title: "Billing Information",
    fields: [
      { key: "primaryService", label: "Primary Service", type: "select", col: 3, options: ["Broadband"], required: true },
      { key: "billingType", label: "Billing Type", type: "select", col: 3, options: ["Select Billing Type"], required: true },
      { key: "billingMode", label: "Billing Mode", type: "select", col: 3, options: ["Select Service Mode"] },
      { key: "package", label: "Package", type: "select", col: 3, options: ["Select Package"] },
      { key: "subPackage", label: "Sub Package", type: "select", col: 3, options: ["Select Sub Package"] },
      { key: "userType", label: "User Type", type: "select", col: 3, options: ["Select User Type"] },
      { key: "installAmount", label: "Install. Amount", type: "number", col: 3 },
      { key: "securityDeposit", label: "Security Deposit", type: "number", col: 3 },
      { key: "poNumber", label: "PO Number", type: "text", col: 3 },
      { key: "poDate", label: "PO Date", type: "date", col: 3 },
      { key: "expiryDate", label: "Expiry Date", type: "date", col: 3 },
    ],
  },
  {
    title: "Upload Files",
    fields: [
      { key: "cafForm", label: "CAF Form", type: "file", col: 3 },
      { key: "addressProof", label: "Address Proof", type: "file", col: 3 },
      { key: "identityProof", label: "Identity Proof", type: "file", col: 3 },
      { key: "customerPic", label: "Customer Pic", type: "file", col: 3 },
    ],
  },
  {
    title: "Payments",
    fields: [
      { key: "advancePayment", label: "Advance Payment", type: "number", col: 3 },
      { key: "refNo", label: "Ref No", type: "text", col: 3 },
      { key: "paymentType", label: "Payment Type", type: "select", col: 3, options: ["Cash", "UPI", "Card"] },
      { key: "comment", label: "Comment", type: "text", col: 3 },
    ],
  },
];

function Addsubscriber() {
  const [showFooter, setShowFooter] = useState(false);
  const formRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      setShowFooter(containerRef.current.scrollTop > 50);
    };
    containerRef.current.addEventListener("scroll", handleScroll);
    return () =>
      containerRef.current &&
      containerRef.current.removeEventListener("scroll", handleScroll);
  }, []);

  const renderField = (f, i) => {
    const id = `fld_${f.key || i}`;
    return (
      <Col md={f.col || 3} className="mb-3" key={id}>
        {f.type === "button" ? (
          <Button className="w-100" style={f.style || {}}>
            {f.text}
          </Button>
        ) : (
          <>
            {f.label && (
              <Form.Label htmlFor={id}>
                {f.label} {f.required && <span className="text-danger">*</span>}
              </Form.Label>
            )}
            {f.type === "select" ? (
              <Form.Select id={id} required={f.required}>
                {(f.options || []).map((op, idx) => (
                  <option key={idx}>{op}</option>
                ))}
              </Form.Select>
            ) : f.type === "textarea" ? (
              <Form.Control
                as="textarea"
                id={id}
                rows={f.rows || 3}
                placeholder={f.placeholder || ""}
                required={f.required}
              />
            ) : (
              <Form.Control
                id={id}
                type={f.type || "text"}
                placeholder={f.placeholder || (f.label ? `Enter ${f.label}` : "")}
                required={f.required}
              />
            )}
          </>
        )}
      </Col>
    );
  };

  return (
    <div className="container-fluid">
      <div className="card m-2" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <div className="card-header">
          <h4 className="mb-0">CAF Registration</h4>
        </div>
        <div ref={containerRef} className="card-body" style={{ overflowY: "auto", flex: 1, paddingBottom: "80px" }}>
          <Form ref={formRef}>
            {SECTIONS.map((section, sIdx) => (
              <div key={sIdx} className="mb-4">
                <h5 className="mb-3">{section.title}</h5>
                <Row>{section.fields.map(renderField)}</Row>
                {section.title === "Upload Files" && (
                  <p className="text-muted small mt-2">
                    Note: Allowed Types (jpeg,jpg,png,gif,pdf), Max size of file : 4MB
                  </p>
                )}
                <hr />
              </div>
            ))}
          </Form>
        </div>
        {showFooter && (
  <div className="card-footer d-flex justify-content-end gap-2" style={{ backgroundColor: "#fff" }}>
    <Button
      variant="warning"
      onClick={() => formRef.current && formRef.current.reset()}
    >
      Clear
    </Button>
    <Button type="submit" variant="primary">
      Submit
    </Button>
  </div>
)}

      </div>
    </div>
  );
}

export default Addsubscriber;





