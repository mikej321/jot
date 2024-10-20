import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import "../../styles/dashboard.css";
import { motion } from "framer-motion";

const blockVariant = {
  hover: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
};

function FinanceDashboardBlock() {
  return (
    <motion.div
      className="dashboardBlock financeBlock"
      variants={blockVariant}
      whileHover="hover"
    >
      <FontAwesomeIcon icon={faMoneyBillWave} className="dashboardIcon" />
      <div className="blockLabel">Finance</div>
    </motion.div>
  );
}

export default FinanceDashboardBlock;
