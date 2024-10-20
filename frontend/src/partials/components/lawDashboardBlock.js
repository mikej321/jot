import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
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

function LawDashboardBlock() {
  return (
    <motion.div
      className="dashboardBlock lawBlock"
      variants={blockVariant}
      whileHover="hover"
    >
      <FontAwesomeIcon icon={faGavel} className="dashboardIcon" />
      <div className="blockLabel">Law</div>
    </motion.div>
  );
}

export default LawDashboardBlock;
