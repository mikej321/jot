import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareRootVariable } from "@fortawesome/free-solid-svg-icons";
import "../../styles/dashboard.css";

function MathDashboardBlock() {
  return (
    <div className="dashboardBlock mathBlock">
      <div className="blockContent">
        <FontAwesomeIcon
          icon={faSquareRootVariable}
          className="dashboardIcon"
        />
        <div className="blockLabel">Math</div>
      </div>
    </div>
  );
}

export default MathDashboardBlock;
