import React, { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaGlobe, // Language
  FaStore, // Franchise
  FaLink, // Quick Links
  FaWhatsapp, // WhatsApp
  FaTelegramPlane, // Telegram
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
      className="main-header p-3 border-bottom bg-white d-flex flex-column flex-md-row justify-content-between align-items-center"
      id="header"
    >
      {/* Sidebar Button + Search Bar in one row */}
      <div className="header-section header-search-wrapper flex-grow-1 order-md-2 my-2 my-md-0">
        <button
          className="btn btn-dark d-md-none me-2"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

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
              className={`border-0 bg-transparent text-dark ${isDropdownOpen ? "dropdown-open" : ""}`}
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
      <div className="header-section header-right d-flex flex-row justify-content-center justify-content-md-end align-items-center order-md-3 mt-2 mt-md-0">
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
