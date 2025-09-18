import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaRegBell,
  FaRegUserCircle,
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaRedo,
} from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PiLinkSimple } from "react-icons/pi";
import { TbBrandTelegram } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { Dropdown, Breadcrumb } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserPlus, FaUsers, FaTools, FaLaptopCode, FaRegFileAlt } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaChartLine, FaExclamationCircle } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import isplogo from "../assets/isp360dark.png";
import "../css/Header.css";
import { BiReset } from 'react-icons/bi';

function Header({ toggleSidebar, isSidebarOpen, dragEnabled, setDragEnabled, onResetLayout }) {
  const [searchType, setSearchType] = useState("Username");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const filteredPathnames = pathnames.filter(
    (name) => name.toLowerCase() !== "app"
  );
  
  const isDashboardPage = location.pathname === "/dashboard" || location.pathname === "/";

  const handleSearch = (e) => {
    e.preventDefault();
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleLogout = () => {
    // 1. Reset the layout toggle state to 'false'
    setDragEnabled(false);

    // 2. Add your actual logout logic here (e.g., clearing a token)
    console.log("User logged out. Redirecting to login page.");

    // 3. Navigate to the login page
    navigate("/login");
  };

  return (
    <>
      <div
        className="main-header p-3 bg-white d-flex flex-column"
        id="header"
      >
        <div className="header-top-row d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-dark d-md-none me-2"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <div className="me-3" style={{ height: "auto", width: "150px" }}>
              <img
                src={isplogo}
                alt="ISP Logo"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

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

          <div className="header-right d-flex justify-content-end align-items-center">
            <button className="btn header-icon-btn" title="Franchise">
              <HiOutlineBuildingOffice2 className="header-icon" />
            </button>
            <Dropdown align="end" className="header-icon-btn">
              <Dropdown.Toggle as="div" bsPrefix="p-0">
                <button className="btn header-icon-btn">
                  <PiLinkSimple className="header-icon" />
                </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="clients/all" className="quick-link">
                  <FaUserPlus className="me-2" />
                  Add User
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="clients/add" className="quick-link">
                  <FaUsers className="me-2" />
                  All Users
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/nas-details" className="quick-link">
                  <FaLaptopCode className="me-2" />
                  NAS
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/reports" className="quick-link">
                  <FaRegFileAlt className="me-2" />
                  Reports
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/tools" className="quick-link">
                  <FaTools className="me-2" />
                  Tools
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/complaints" className="quick-link">
                  <FaExclamationCircle className="me-2" />
                  Complaints
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <button className="btn header-icon-btn" title="Telegram">
              <TbBrandTelegram className="header-icon" />
            </button>
            <button className="btn header-icon-btn" title="WhatsApp">
              <FaWhatsapp className="header-icon" />
            </button>
            <button className="btn header-icon-btn" title="Notifications">
              <FaRegBell className="header-icon" />
            </button>

            <Dropdown align="end" className="header-icon-btn">
              <Dropdown.Toggle as="div" bsPrefix="p-0">
                <button className="btn header-icon-btn">
                  <FaRegUserCircle className="header-icon" />
                </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/profile">
                  <FaRegUserCircle className="me-2" />
                  My Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="div">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="form-check-label small" htmlFor="dragToggle">
                      <FiSettings className="me-2" />
                      Layout
                    </label>
                    <div className="form-check form-switch p-0 m-0">
                      <input
                        className="form-check-input ms-3"
                        type="checkbox"
                        id="dragToggle"
                        checked={dragEnabled}
                        onChange={() => setDragEnabled(!dragEnabled)}
                      />
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={onResetLayout}>
                  <BiReset className="me-2" />
                  Reset Layout
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <IoIosLogOut className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;