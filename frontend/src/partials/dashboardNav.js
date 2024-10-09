import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import BrightnessToggle from "./components/brightnessToggle";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function DashboardNav() {
  return (
    <>
      <nav className="dashboardNav mobileDashboardNav">
        <FontAwesomeIcon icon={faRightFromBracket} className="navbarIcon" />
        <div className="nameBubble">
          <div className="userNameFirstLetter">M</div>
        </div>
        <BrightnessToggle />
      </nav>
      <nav className="dashboardNav desktopDashboardNav">
        <p className="logo">Jot</p>
        <div className="linkContainer">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/instructions">Instructions</Link>
          <Link to="/about-me">About Me</Link>
          <Link to="#">Sign Out</Link>
        </div>
        <BrightnessToggle />
      </nav>
    </>
  );
}

export default DashboardNav;
