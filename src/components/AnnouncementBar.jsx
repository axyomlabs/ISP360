import React from "react";
import { FaBullhorn } from "react-icons/fa";
import "../css/AnnouncementBar.css";

const AnnouncementBar = () => {
  const announcements = [
    "🔥 New Plans & Packages are now available!",
    "⚙️ Scheduled maintenance on network on 28th Aug 2025 at 2AM. Expected downtime: 30 minutes.",
    "📢 Quarterly revenue reports are now ready for review.",
  ];

  const announcementText = announcements.join(" | ");

  return (
    <div className="announcement-bar-container">
      <div className="announcement-bar-content">
        <FaBullhorn className="me-2" />
        <div className="announcement-text-wrapper">
          <span className="announcement-text">{announcementText}</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;