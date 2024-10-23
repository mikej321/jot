import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import "../../styles/dashboard.css";

const dashboardChildVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const CreateIndicator = () => {
  return (
    <motion.div
      className="dashboardBlock"
      variants={dashboardChildVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="add-block"
    >
      <FontAwesomeIcon className="folderPlus" icon={faFolderPlus} />
      <motion.p className="blockLabel">Create</motion.p>
    </motion.div>
  );
};

export default CreateIndicator;
