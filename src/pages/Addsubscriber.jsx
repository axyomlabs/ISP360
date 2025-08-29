import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/addSubscriber.css";
import { Button } from "react-bootstrap"; // <-- added

const SECTIONS = [
  // 1) Aadhaar Verification
  {
    title: "Aadhaar Verification",
    fields: [
      {
        key: "aadhaarNo",
        label: "Aadhaar No",
        type: "text",
        col: 6,
        required: true,
      },
      {
        key: "sendOtp",
        type: "button",
        text: "Send OTP",
        col: 2,
        style: { backgroundColor: "#B8CEF6", color: "#000" },
      },
    ],
  },

  // 2) Basic Information
  {
    title: "Basic Information",
    fields: [
      {
        key: "franchise",
        label: "Select Franchise",
        type: "select",
        col: 3,
        options: ["Select Franchise"],
        required: true,
      },
      {
        key: "branch",
        label: "Branch",
        type: "select",
        col: 3,
        options: ["Select Branch"],
        required: true,
      },
      {
        key: "username",
        label: "Username",
        type: "text",
        col: 3,
        required: true,
      },
      {
        key: "password",
        label: "Password",
        type: "password",
        col: 3,
        required: true,
      },

      {
        key: "firstName",
        label: "First Name",
        type: "text",
        col: 3,
        required: true,
      },
      { key: "lastName", label: "Last Name", type: "text", col: 3 },
      {
        key: "fatherCompany",
        label: "Father Name or Company Name",
        type: "text",
        col: 3,
        required: true,
      },
      {
        key: "registerMobile",
        label: "Register Mobile",
        type: "text",
        col: 3,
        required: true,
      },

      { key: "altNum", label: "Alt Num", type: "text", col: 3 },
      { key: "regEmail", label: "Register Email", type: "email", col: 3 },
      { key: "altEmail", label: "Alternate Email", type: "email", col: 3 },
      { key: "cafNo", label: "CAF No", type: "text", col: 3 },
      { key: "refNo", label: "Ref No", type: "text", col: 3 },
    ],
  },

  // 3) Billing Information
  {
    title: "Billing Information",
    fields: [
      {
        key: "primaryService",
        label: "Primary Service",
        type: "select",
        col: 3,
        options: ["Broadband"],
        required: true,
      },
      {
        key: "billingType",
        label: "Billing Type",
        type: "select",
        col: 3,
        options: ["Select Billing Type"],
        required: true,
      },
      {
        key: "billingMode",
        label: "Billing Mode",
        type: "select",
        col: 3,
        options: ["Select Service Mode"],
      },
      {
        key: "package",
        label: "Package",
        type: "select",
        col: 3,
        options: ["Select Package"],
      },

      {
        key: "subPackage",
        label: "Sub Package",
        type: "select",
        col: 3,
        options: ["Select Sub Package"],
      },
      {
        key: "userType",
        label: "User Type",
        type: "select",
        col: 3,
        options: ["Select User Type"],
      },
      {
        key: "installAmount",
        label: "Install. Amount",
        type: "number",
        col: 3,
      },
      {
        key: "securityDeposit",
        label: "Security Deposit",
        type: "number",
        col: 3,
      },

      { key: "poNumber", label: "PO Number", type: "text", col: 3 },
      { key: "poDate", label: "PO Date", type: "date", col: 3 },
      { key: "expiryDate", label: "Expiry Date", type: "date", col: 3 },
    ],
  },

  // 4) Network Information
  {
    title: "Network Information",
    fields: [
      {
        key: "ipMode",
        label: "IP Address Mode",
        type: "select",
        col: 3,
        options: ["DHCP", "Static"],
        required: true,
      },
      {
        key: "node",
        label: "Node",
        type: "select",
        col: 3,
        options: ["Select Node"],
      },
      {
        key: "pop",
        label: "Pop",
        type: "select",
        col: 3,
        options: ["Select Pop"],
      },
      {
        key: "switch",
        label: "Switch",
        type: "select",
        col: 3,
        options: ["Select Switch"],
      },

      {
        key: "switchPort",
        label: "Switch Port",
        type: "select",
        col: 3,
        options: ["Select Switch Port"],
      },
      {
        key: "domain",
        label: "Domain Name",
        type: "select",
        col: 3,
        options: ["Select Domain"],
      },
      {
        key: "authProtocol",
        label: "Authentication Protocol",
        type: "select",
        col: 3,
        options: ["Select Protocol"],
      },
      { key: "circuitId", label: "Circuit Id", type: "text", col: 3 },

      {
        key: "fiberLength",
        label: "Fiber/Cat5 Length",
        type: "text",
        col: 3,
        placeholder: "Enter in meters",
      },
      { key: "autoRenew", label: "Auto Renew", type: "checkbox", col: 3 },
      { key: "bindMac", label: "Bind MAC", type: "checkbox", col: 3 },
      {
        key: "excludeMac",
        label: "Exclude MAC Bind",
        type: "checkbox",
        col: 3,
      },
      { key: "dontSuspend", label: "Don't Suspend", type: "checkbox", col: 3 },
    ],
  },

  // 5) Location Information
  {
    title: "Location Information",
    fields: [
      {
        key: "country",
        label: "Country",
        type: "select",
        col: 3,
        options: ["India (+91)"],
        required: true,
      },
      {
        key: "state",
        label: "State",
        type: "select",
        col: 3,
        options: ["Select State"],
        required: true,
      },
      { key: "city", label: "City", type: "text", col: 3, required: true },
      { key: "zip", label: "Zip", type: "text", col: 3, required: true },

      { key: "doorNo", label: "Door No", type: "text", col: 3 },
      {
        key: "area",
        label: "Area",
        type: "select",
        col: 3,
        options: ["Select Area"],
      },
      {
        key: "colony",
        label: "Colony",
        type: "select",
        col: 3,
        options: ["Select Colony"],
      },
      {
        key: "building",
        label: "Building",
        type: "select",
        col: 3,
        options: ["Select Building"],
      },

      {
        key: "billingAddress",
        label: "Billing Address",
        type: "textarea",
        col: 6,
      },
      {
        key: "installationAddress",
        label: "Installation Address",
        type: "textarea",
        col: 6,
      },
      {
        key: "houseType",
        label: "House Type",
        type: "select",
        col: 3,
        options: ["Select House Type"],
      },
      {
        key: "connectionLocation",
        label: "Connection Location",
        type: "text",
        col: 3,
      },
      { key: "latitude", label: "Latitude", type: "text", col: 3 },
      { key: "longitude", label: "Longitude", type: "text", col: 3 },
    ],
  },

  // 6) Upload Files
  {
    title: "Upload Files",
    fields: [
      { key: "cafForm", label: "CAF Form", type: "file", col: 3 },
      { key: "addressProof", label: "Address Proof", type: "file", col: 3 },
      { key: "identityProof", label: "Identity Proof", type: "file", col: 3 },
      { key: "customerPic", label: "Customer Pic", type: "file", col: 3 },
    ],
  },

  // 7) Payments
  {
    title: "Payments",
    fields: [
      {
        key: "advancePayment",
        label: "Advance Payment",
        type: "number",
        col: 3,
      },
      { key: "refNo", label: "Ref No", type: "text", col: 3 },
      {
        key: "paymentType",
        label: "Payment Type",
        type: "select",
        col: 3,
        options: ["Cash", "UPI", "Card"],
      },
      { key: "comment", label: "Comment", type: "text", col: 3 },
    ],
  },
];

const DISCOUNT_HEADERS = [
  "Reason",
  "Description",
  "Approved By",
  "Amount",
  "Type",
  "#",
];

function Addsubscriber() {
  const [discountRows, setDiscountRows] = useState([]);
  const formRef = useRef(null); // <-- added

  const handleAddRow = () => {
    setDiscountRows([
      ...discountRows,
      {
        reason: "",
        description: "",
        approvedBy: "",
        amount: "",
        type: "Special Discount",
      },
    ]);
  };

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

    if (f.type === "button") {
      return (
        <div className={col + " d-flex align-items-end"} key={id}>
          <button
            type="button"
            className={`btn w-100 ${f.className || ""}`}
            style={f.style || {}}
          >
            {f.text}
          </button>
        </div>
      );
    }
    if (f.type === "checkbox") {
      return (
        <div className={col} key={id}>
          <label className="form-label d-block">{f.label}</label>
          <label className="toggle-switch">
            <input id={id} type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      );
    }

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
    <div className="container-fluid px-3  ">
      <div className="card  no-hover-move m-2">
        <div className="card-header">
          <h4 className="mb-0">CAF Registration</h4>
        </div>

        <div className="card-body">
          {/* <-- wrap inputs in a form so reset() works */}
          <form ref={formRef}>
            {SECTIONS.map((section, sIdx) => (
              <div key={sIdx} className="mb-4">
                <h5 className="mb-3">{section.title}</h5>
                <div className="row g-3">{section.fields.map(renderField)}</div>
                {section.title === "Upload Files" && (
                  <p className="text-muted small mt-2 ">
                    Note: Allowed Types (jpeg,jpg,png,gif,pdf), Max size of file :
                    4MB
                  </p>
                )}
                <hr />
              </div>
            ))}

            {/* Special Discount & Additional Charges */}
            <h5 className="mb-3">Special Discount &amp; Additional Charges</h5>
            <button
              type="button"
              className="btn btn-outline-primary mb-2"
              onClick={handleAddRow}
            >
              Add Special
            </button>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {DISCOUNT_HEADERS.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {discountRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={DISCOUNT_HEADERS.length}
                        className="text-center text-muted"
                      >
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
                            onChange={(e) =>
                              handleChange(idx, "reason", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={row.description}
                            onChange={(e) =>
                              handleChange(idx, "description", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={row.approvedBy}
                            onChange={(e) =>
                              handleChange(idx, "approvedBy", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleChange(idx, "amount", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={row.type}
                            onChange={(e) =>
                              handleChange(idx, "type", e.target.value)
                            }
                          >
                            <option value="Special Discount">
                              Special Discount
                            </option>
                            <option value="Additional Charge">
                              Additional Charge
                            </option>
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

            <div className="d-flex gap-2 mt-3">
              <Button
                variant="warning"
                onClick={() => formRef.current && formRef.current.reset()} // safe reset
              >
                Clear
              </Button>
              <button type="button" className="btn btn-primary ">
                Submit
              </button>
            </div>
          </form>
          {/* end form */}
        </div>
      </div>
    </div>
  );
}

export default Addsubscriber;
