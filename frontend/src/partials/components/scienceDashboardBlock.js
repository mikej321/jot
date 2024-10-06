import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import "../../styles/dashboard.css";

function ScienceDashboardBlock() {
  return (
    <div className="dashboardBlock scienceBlock">
      <div className="blockContent">
        <FontAwesomeIcon icon={faFlask} className="dashboardIcon" />
        <div className="blockLabel">Science</div>
      </div>
    </div>
  );
}

export default ScienceDashboardBlock;
