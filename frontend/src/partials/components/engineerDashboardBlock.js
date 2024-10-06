import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import "../../styles/dashboard.css";

function EngineerDashboardBlock() {
  return (
    <div className="dashboardBlock engineerBlock">
      <div className="blockContent">
        <FontAwesomeIcon icon={faGears} className="dashboardIcon" />
        <div className="blockLabel">Engineer</div>
      </div>
    </div>
  );
}

export default EngineerDashboardBlock;
