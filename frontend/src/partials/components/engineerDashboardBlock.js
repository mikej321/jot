import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
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

function EngineerDashboardBlock() {
  return (
    <motion.div
      className="dashboardBlock engineerBlock"
      variants={blockVariant}
      whileHover="hover"
    >
      <FontAwesomeIcon icon={faGears} className="dashboardIcon" />
      <div className="blockLabel">Engineer</div>
    </motion.div>
  );
}

export default EngineerDashboardBlock;
