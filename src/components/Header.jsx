// src/components/Header.jsx

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
    <div
      className="d-flex flex-wrap justify-content-between align-items-center p-3 border-bottom bg-white header-container"
      id="header"
    >
      {/* 🔹 Searchbar */}
      <form
        onSubmit={handleSearch}
        className="position-relative d-flex align-items-center search-form"
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
          onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
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
            style={{ zIndex: 1050, position: "absolute" }}
          >
            <Dropdown.Item eventKey="Username">Username</Dropdown.Item>
            <Dropdown.Item eventKey="Email">Email</Dropdown.Item>
            <Dropdown.Item eventKey="Mobile">Mobile</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </form>

      {/* 🔹 Right Side Icons */}
      <div className="d-flex align-items-center mt-2 mt-md-0">
        <button className="btn me-2">
          <FaBell />
        </button>
        <button className="btn rounded-circle">
          <FaUserCircle />
        </button>
      </div>
    </div>
  );
}

export default Header;
