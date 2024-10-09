import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import "../../styles/dashboard.css";

function LawDashboardBlock() {
  return (
    <div className="dashboardBlock lawBlock">
      <FontAwesomeIcon icon={faGavel} className="dashboardIcon" />
      <div className="blockLabel">Law</div>
    </div>
  );
}

export default LawDashboardBlock;
