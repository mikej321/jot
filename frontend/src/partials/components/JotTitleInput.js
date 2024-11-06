import { motion } from "framer-motion";
import "../../styles/InputForm.css";

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
const JotTitleInput = ({ grabJotTitle }) => {
  return (
    <motion.div
      className="jotTitleInput"
      variants={dashboardChildVariants}
      initial={{
        background: "rgba(193, 169, 137, .8)",
        opacity: 0,
        x: -20,
      }}
      animate="visible"
      exit="exit"
      whileHover={{
        background: "rgba(226, 174, 107, .8)",
        transition: {
          duration: 0.2,
          ease: "easeInOut",
        },
      }}
      key="add-2"
    >
      <motion.label className="jotTitleLabel" htmlFor="title">
        Jot Title
      </motion.label>
      <input
        type="text"
        name="title"
        id="jotTitle"
        onChange={(e) => grabJotTitle(e)}
      />
    </motion.div>
  );
};

export default JotTitleInput;
