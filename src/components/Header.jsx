// src/components/Header.jsx
import React, { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaGlobe,
  FaStore,
  FaLink,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import isp360Logo from "../assets/isp360.png";
import "../css/Header.css";

function Header({ toggleSidebar, isSidebarOpen }) {
  const [searchType, setSearchType] = useState("Username");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching "${searchQuery}" by ${searchType}`);
  };

  return (
    <div
      className="main-header p-3 border-bottom bg-white"
      id="header"
    >
      {/* Left Section */}
      <div className="header-section header-left">
        <button
          className="btn btn-dark d-md-none me-2"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Center Section: Search Bar */}
      <div className="header-section header-center">
        <form
          onSubmit={handleSearch}
          className="search-form d-flex align-items-center"
        >
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="form-control rounded-pill search-input"
            placeholder={`Search By ${searchType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Dropdown
            onSelect={(val) => setSearchType(val)}
            onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
            className="search-dropdown"
          >
            <Dropdown.Toggle
              variant="light"
              size="sm"
              className={`border-0 bg-transparent text-dark ${isDropdownOpen ? 'dropdown-open' : ''}`}
            >
              <span className="d-none d-md-inline">{searchType}</span>
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
      </div>

      {/* Right Section: Icons */}
      <div className="header-section header-right d-flex justify-content-end align-items-center">
        <button className="btn header-icon-btn" title="Language">
          <FaGlobe className="header-icon" />
        </button>
        <button className="btn header-icon-btn" title="Franchise">
          <FaStore className="header-icon" />
        </button>
        <button className="btn header-icon-btn" title="Quick Links">
          <FaLink className="header-icon" />
        </button>
        <button className="btn header-icon-btn" title="WhatsApp">
          <FaWhatsapp className="header-icon" />
        </button>
        <button className="btn header-icon-btn" title="Telegram">
          <FaTelegramPlane className="header-icon" />
        </button>
        <button className="btn header-icon-btn" title="Notifications">
          <FaBell className="header-icon" />
        </button>
        <button className="btn header-icon-btn" title="Profile">
          <FaUserCircle className="header-icon" />
        </button>
      </div>
    </div>
  );
}

export default Header;