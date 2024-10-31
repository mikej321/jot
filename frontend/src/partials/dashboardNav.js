import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import BrightnessToggle from "./components/brightnessToggle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/dashboard.css";

function DashboardNav() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="dashboardNav mobileDashboardNav">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="navbarIcon"
          onClick={handleLogout}
        />
        <BrightnessToggle />
      </nav>
      <nav className="dashboardNav desktopDashboardNav">
        <p className="logo">Jot</p>
        <div className="linkContainer">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/instructions">Instructions</Link>
          <Link to="/about-me">About Me</Link>
          <a to="#" onClick={handleLogout}>
            Sign Out
          </a>
        </div>
        <BrightnessToggle />
      </nav>
    </>
  );
}

export default DashboardNav;
