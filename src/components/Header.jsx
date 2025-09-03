import React, { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import isp360Logo from "../assets/isp360.png"; // (if you want to show logo)
import "../css/Header.css";

function Header({ toggleSidebar, isSidebarOpen }) {
  const [searchType, setSearchType] = useState("Username");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching "${searchQuery}" by ${searchType}`);
  };

  return (
    <div className="main-header p-3 border-bottom bg-white" id="header">
      {/* Left Section: Logo & Sidebar Button */}
      <div className="header-section header-left">
        <button
          className="btn btn-dark d-lg-none me-2" // Visible on phones & tablets, hidden on desktop
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
    
      </div>

      {/* Center Section: Search Bar */}
      <div className="header-section header-center flex-grow-1">
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
          <Dropdown onSelect={(val) => setSearchType(val)} className="search-dropdown">
            <Dropdown.Toggle
              variant="light"
              size="sm"
              className="border-0 bg-transparent text-dark"
            >
              <span className="d-none d-md-inline">{searchType}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" renderOnMount>
              <Dropdown.Item eventKey="Username">Username</Dropdown.Item>
              <Dropdown.Item eventKey="Email">Email</Dropdown.Item>
              <Dropdown.Item eventKey="Mobile">Mobile</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </form>
      </div>

      {/* Right Section: Icons */}
      <div className="header-section header-right d-flex justify-content-end">
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
