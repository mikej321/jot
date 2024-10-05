import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import BrightnessToggle from "./components/brightnessToggle.js";
import "../styles/loginNav.css";
import { useNavigate, useLocation } from "react-router-dom";

function MobileLoginNav() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <FontAwesomeIcon
        onClick={(e) => handleClick(e)}
        icon={faArrowLeftLong}
        className="arrow"
      />
      <BrightnessToggle />
    </nav>
  );
}

export default MobileLoginNav;
