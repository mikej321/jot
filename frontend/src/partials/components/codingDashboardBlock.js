import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import "../../styles/dashboard.css";

function CodingDashboardBlock() {
  return (
    <div className="dashboardBlock codingBlock">
      <div className="blockContent">
        <FontAwesomeIcon icon={faCode} className="dashboardIcon" />
        <div className="blockLabel">Coding</div>
      </div>
    </div>
  );
}

export default CodingDashboardBlock;
