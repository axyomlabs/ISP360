import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Addsubscriber.css";
import { Button } from "react-bootstrap";

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

const DISCOUNT_HEADERS = ["Reason", "Description", "Approved By", "Amount", "Type", "#"];

function Addsubscriber() {
  const [discountRows, setDiscountRows] = useState([]);
  const [showFooter, setShowFooter] = useState(false);
  const formRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (containerRef.current.scrollTop > 50) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };
    containerRef.current.addEventListener("scroll", handleScroll);
    return () =>
      containerRef.current &&
      containerRef.current.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddRow = () =>
    setDiscountRows([
      ...discountRows,
      { reason: "", description: "", approvedBy: "", amount: "", type: "Special Discount" },
    ]);

  const handleRemoveRow = (index) => {
    const updated = [...discountRows];
    updated.splice(index, 1);
    setDiscountRows(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...discountRows];
    updated[index][field] = value;
    setDiscountRows(updated);
  };

  const renderField = (f, i) => {
    const col = `col-md-${f.col || 3} mb-3`;
    const id = `fld_${f.key || i}`;
    if (f.type === "button")
      return (
        <div className={col + " d-flex align-items-end"} key={id}>
          <button type="button" className="btn w-100" style={f.style || {}}>
            {f.text}
          </button>
        </div>
      );
    if (f.type === "checkbox")
      return (
        <div className={col} key={id}>
          <label className="form-label d-block">{f.label}</label>
          <label className="toggle-switch">
            <input id={id} type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      );
    return (
      <div className={col} key={id}>
        {f.label && (
          <label htmlFor={id} className="form-label">
            {f.label} {f.required && <span className="text-danger">*</span>}
          </label>
        )}
        {f.type === "select" ? (
          <select id={id} className="form-select" required={f.required}>
            {(f.options || []).map((op, idx) => (
              <option key={idx}>{op}</option>
            ))}
          </select>
        ) : f.type === "textarea" ? (
          <textarea
            id={id}
            className="form-control"
            rows={f.rows || 3}
            placeholder={f.placeholder || ""}
            required={f.required}
          />
        ) : (
          <input
            id={id}
            type={f.type || "text"}
            className="form-control"
            placeholder={f.placeholder || (f.label ? `Enter ${f.label}` : "")}
            required={f.required}
          />
        )}
      </div>
    );
  };

  return (
    <div className="container-fluid px-3" style={{ position: "relative", height: "100vh" }}>
      <div
        className="card no-hover-move m-2"
        style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: "8px" }}
      >
        <div className="card-header">
          <h4 className="mb-0">CAF Registration</h4>
        </div>
        <div
          ref={containerRef}
          className="card-body"
          style={{ overflowY: "auto", flex: 1, paddingBottom: "80px" }}
        >
          <form ref={formRef}>
            {SECTIONS.map((section, sIdx) => (
              <div key={sIdx} className="mb-4">
                <h5 className="mb-3">{section.title}</h5>
                <div className="row g-3">{section.fields.map(renderField)}</div>
                {section.title === "Upload Files" && (
                  <p className="text-muted small mt-2">
                    Note: Allowed Types (jpeg,jpg,png,gif,pdf), Max size of file : 4MB
                  </p>
                )}
                <hr />
              </div>
            ))}

            <h5 className="mb-3">Special Discount & Additional Charges</h5>
            <button type="button" className="btn btn-outline-primary mb-2" onClick={handleAddRow}>
              Add Special
            </button>
            <div className="table-responsive mb-4">
              <table className="table table-bordered">
                <thead>
                  <tr>{DISCOUNT_HEADERS.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {discountRows.length === 0 ? (
                    <tr>
                      <td colSpan={DISCOUNT_HEADERS.length} className="text-center text-muted">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    discountRows.map((row, idx) => (
                      <tr key={idx}>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={row.reason}
                            onChange={(e) => handleChange(idx, "reason", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={row.description}
                            onChange={(e) => handleChange(idx, "description", e.target.value)}
                          />
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={row.approvedBy}
                            onChange={(e) => handleChange(idx, "approvedBy", e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={row.amount}
                            onChange={(e) => handleChange(idx, "amount", e.target.value)}
                          />
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={row.type}
                            onChange={(e) => handleChange(idx, "type", e.target.value)}
                          >
                            <option value="Special Discount">Special Discount</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveRow(idx)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </form>
        </div>

        {/* Sticky Footer inside card */}
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






