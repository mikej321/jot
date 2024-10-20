import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
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

function CodingDashboardBlock() {
  return (
    <motion.div
      className="dashboardBlock codingBlock"
      variants={blockVariant}
      whileHover="hover"
    >
      <FontAwesomeIcon icon={faCode} className="dashboardIcon" />
      <div className="blockLabel">Coding</div>
    </motion.div>
  );
}

export default CodingDashboardBlock;
