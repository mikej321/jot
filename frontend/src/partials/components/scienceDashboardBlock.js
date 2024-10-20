import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
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

function ScienceDashboardBlock() {
  return (
    <motion.div
      className="dashboardBlock scienceBlock"
      variants={blockVariant}
      whileHover="hover"
    >
      <FontAwesomeIcon icon={faFlask} className="dashboardIcon" />
      <div className="blockLabel">Science</div>
    </motion.div>
  );
}

export default ScienceDashboardBlock;
