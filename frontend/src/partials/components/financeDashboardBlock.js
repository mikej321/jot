import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import "../../styles/dashboard.css";

function FinanceDashboardBlock() {
  return (
    <div className="dashboardBlock financeBlock">
      <FontAwesomeIcon icon={faMoneyBillWave} className="dashboardIcon" />
      <div className="blockLabel">Finance</div>
    </div>
  );
}

export default FinanceDashboardBlock;
