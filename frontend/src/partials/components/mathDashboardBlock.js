import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareRootVariable } from "@fortawesome/free-solid-svg-icons";
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

function MathDashboardBlock() {
  return (
    <motion.div
      className="dashboardBlock mathBlock"
      variants={blockVariant}
      whileHover="hover"
    >
      <FontAwesomeIcon icon={faSquareRootVariable} className="dashboardIcon" />
      <div className="blockLabel">Math</div>
    </motion.div>
  );
}

export default MathDashboardBlock;
