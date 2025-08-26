import React, { useState } from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import "../css/Header.css";

function Header() {
  const [searchType, setSearchType] = useState("Username");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching "${searchQuery}" by ${searchType}`);
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white" id="eader">
      {/* 🔹 Searchbar */}
      <form
        onSubmit={handleSearch}
        className="position-relative d-flex align-items-center"
        style={{
          margin: "auto",
          width: "50%",
          border: "1px solid black",
          borderRadius: "20px",
        }}
      >
        <input
          type="text"
          className="form-control rounded-pill pe-5 ps-5"
          placeholder={`Search ${searchType}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ height: "45px" }}
        />
        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />

        {/* 🔹 Dropdown */}
        <Dropdown
          onSelect={(val) => setSearchType(val)}
          onToggle={(isOpen) => setIsDropdownOpen(isOpen)} // track state
          className="position-absolute top-50 end-0 translate-middle-y me-2"
        >
          <Dropdown.Toggle
            variant="light"
            size="sm"
            className={`border-0 bg-transparent text-dark dropdown-toggle-custom ${
              isDropdownOpen ? "open" : ""
            }`}
          >
            {searchType}
          </Dropdown.Toggle>

          <Dropdown.Menu
            align="end"
            renderOnMount
            container={document.body}
            style={{ zIndex: 9999, position: "absolute" }}
          >
            <Dropdown.Item eventKey="Username">Username</Dropdown.Item>
            <Dropdown.Item eventKey="Email">Email</Dropdown.Item>
            <Dropdown.Item eventKey="Mobile">Mobile</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </form>

      {/* 🔹 Right Side Icons */}
      <div className="d-flex align-items-center">
        <button className="btn btn-light me-2">
          <FaBell />
        </button>
        <button className="btn btn-light rounded-circle">
          <FaUserCircle />
        </button>
      </div>
    </div>
  );
}

export default Header;
