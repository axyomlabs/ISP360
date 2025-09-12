import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaSearch,
  FaRegBell,
  FaRegUserCircle,
  FaBars,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PiLinkSimple } from "react-icons/pi";
import { TbBrandTelegram } from "react-icons/tb";
import { Dropdown, Breadcrumb } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserPlus, FaUsers, FaTools, FaLaptopCode, FaRegFileAlt } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaChartLine, FaExclamationCircle } from 'react-icons/fa';
import isplogo from "../assets/isp360dark.png";
import "../css/Header.css";

// Accept toggleSidebar and isSidebarOpen as props
function Header({ toggleSidebar, isSidebarOpen }) {
  const [searchType, setSearchType] = useState("Username");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Breadcrumb logic
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const filteredPathnames = pathnames.filter(
    (name) => name.toLowerCase() !== "app"
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <>
      <div
        className="main-header p-3 bg-white d-flex flex-column"
        id="header"
      >
        {/* Top Row: Logo, Search Bar, and Icons */}
        <div className="header-top-row d-flex justify-content-between align-items-center">
          {/* Sidebar toggle (mobile) + Logo */}
          <div className="d-flex align-items-center">
            <button
              className="btn btn-dark d-md-none me-2"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <div className="me-3" style={{ height: "auto", width: "200px" }}>
              <img
                src={isplogo}
                alt="ISP Logo"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="search-form d-flex align-items-center flex-grow-1 mx-3"
          >
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
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
                className={`search-dropdown-toggle border-0 bg-transparent text-dark ${
                  isDropdownOpen ? "dropdown-open" : ""
                }`}
              >
                <span className="d-none d-md-inline">{searchType}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu
                align="end"
                renderOnMount
                container={document.body}
                style={{
                  zIndex: 1050,
                  position: "absolute",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                <Dropdown.Item eventKey="Username">Username</Dropdown.Item>
                <Dropdown.Item eventKey="Mobile">Mobile</Dropdown.Item>
                <Dropdown.Item eventKey="A/C No">A/C No</Dropdown.Item>
                <Dropdown.Item eventKey="MAC">MAC</Dropdown.Item>
                <Dropdown.Item eventKey="Customer First Name">
                  Customer First Name
                </Dropdown.Item>
                <Dropdown.Item eventKey="Customer Last Name">
                  Customer Last Name
                </Dropdown.Item>
                <Dropdown.Item eventKey="Ip Address">Ip Address</Dropdown.Item>
                <Dropdown.Item eventKey="Email Id">Email Id</Dropdown.Item>
                <Dropdown.Item eventKey="Address">Address</Dropdown.Item>
                <Dropdown.Item eventKey="CAF No">CAF No</Dropdown.Item>
                <Dropdown.Item eventKey="Company name">
                  Company name
                </Dropdown.Item>
                <Dropdown.Item eventKey="Reference No">
                  Reference No
                </Dropdown.Item>
                <Dropdown.Item eventKey="STB No">STB No</Dropdown.Item>
                <Dropdown.Item eventKey="Smart Card No">
                  Smart Card No
                </Dropdown.Item>
                <Dropdown.Item eventKey="Telephone No">
                  Telephone No
                </Dropdown.Item>
                <Dropdown.Item eventKey="IPTV Device Id">
                  IPTV Device Id
                </Dropdown.Item>
                <Dropdown.Item eventKey="IPTV User Id">
                  IPTV User Id
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </form>

          {/* Right Section: Icons */}
          <div className="header-right d-flex justify-content-end align-items-center">
            <button className="btn header-icon-btn" title="Franchise">
              <HiOutlineBuildingOffice2 className="header-icon" />
            </button>
            {/* Quick Links Dropdown */}
            <Dropdown align="end" className="header-icon-btn">
              <Dropdown.Toggle as="div" bsPrefix="p-0">
                <button className="btn header-icon-btn" title="Quick Links">
                  <PiLinkSimple className="header-icon" />
                </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/live-logs">
                  <FaChartLine className="me-2" />
                  Live Logs
                </Dropdown.Item>
                <Dropdown.Item href="/app/clients/add">
                  <FaUserPlus className="me-2" />
                  Add User
                </Dropdown.Item>
                <Dropdown.Item href="#/add-complaint">
                  <FaExclamationCircle className="me-2" />
                  Add Complaint
                </Dropdown.Item>
                <Dropdown.Item href="#/add-lead">
                  <FaRegFileAlt className="me-2" />
                  Add Lead
                </Dropdown.Item>
                <Dropdown.Item href="/app/clients/all">
                  <FaUsers className="me-2" />
                  List Users
                </Dropdown.Item>
                <Dropdown.Item href="#/online-users">
                  <FaLaptopCode className="me-2" />
                  Online Users
                </Dropdown.Item>
                <Dropdown.Item href="#/olt-signal-details">
                  <BiDotsVerticalRounded className="me-2" />
                  OLT Signal Details
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <button className="btn header-icon-btn" title="WhatsApp">
              <FaWhatsapp className="header-icon" />
            </button>
            <button className="btn header-icon-btn" title="Telegram">
              <TbBrandTelegram className="header-icon" />
            </button>
            <button className="btn header-icon-btn" title="Notifications">
              <FaRegBell className="header-icon" />
            </button>
            <button className="btn header-icon-btn" title="Profile">
              <FaRegUserCircle className="header-icon" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Breadcrumb */}
        <div className="breadcrumb-wrapper d-flex justify-content-center w-100">
          <Breadcrumb className="mb-0">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/app/dashboard" }}>
              <AiOutlineHome />
            </Breadcrumb.Item>
            {filteredPathnames.map((name, index) => {
              const routeTo = `/${filteredPathnames
                .slice(0, index + 1)
                .join("/")}`;
              const isLast = index === filteredPathnames.length - 1;
              return (
                <Breadcrumb.Item
                  key={name}
                  linkProps={{ to: routeTo }}
                  active={isLast}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </div>
      </div>
      {showMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
            zIndex: 1000,
            textAlign: "center",
          }}
        >
          Searching "{searchQuery}" by {searchType}
        </div>
      )}
    </>
  );
}

export default Header;