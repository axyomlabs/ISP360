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
import { HiOutlineLanguage, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PiLinkSimple } from "react-icons/pi";
import { TbBrandTelegram } from "react-icons/tb";
import { Dropdown, Breadcrumb } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
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
    }, 3000); // Hide the message after 3 seconds
  };

  return (
    <>
      <div
        className="main-header p-3 pb-0 bg-white d-flex flex-column"
        id="header"
      >
        {/* Top Row: Logo, Search Bar, and Icons */}
        <div className="header-top-row d-flex justify-content-between align-items-center m">
          {/* Sidebar toggle (mobile) + Logo */}
          <div className="d-flex align-items-center">
            <button
              className="btn btn-dark d-md-none me-2"
              onClick={toggleSidebar} // Use the passed toggleSidebar function
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />} {/* Change icon based on state */}
            </button>

            {/* Logo Image */}
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
                style={{ zIndex: 1050, position: "absolute" }}
              >
                <Dropdown.Item eventKey="Username">Username</Dropdown.Item>
                <Dropdown.Item eventKey="Email">Email</Dropdown.Item>
                <Dropdown.Item eventKey="Mobile">Mobile</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </form>

          {/* Right Section: Icons */}
          <div className="header-right d-flex justify-content-end align-items-center">
            <button className="btn header-icon-btn" title="Franchise">
              <HiOutlineBuildingOffice2 className="header-icon" />
            </button>
            <button className="btn header-icon-btn" title="Quick Links">
              <PiLinkSimple className="header-icon" />
            </button>
            <button className="btn header-icon-btn" title="WhatsApp">
              <FaWhatsapp className="header-icon" />
            </button>
            <button className="btn header-icon-btn" title="Telegram">
              <TbBrandTelegram className="header-icon " />
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
     {/* Bottom Row: Breadcrumb */}
        <div className="breadcrumb-wrapper d-flex justify-content-center w-100 pb-2">
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