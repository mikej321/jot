import { motion } from "framer-motion";
import "../../styles/InputForm.css";
import { useState } from "react";

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

const JotContentInput = ({ grabJotContent }) => {
  const [defaultValue, setDefaultValue] = useState("Jot content goes here....");

  const checkDefaultValue = () => {
    if (defaultValue.toLowerCase() === "jot content goes here....") {
      setDefaultValue("");
    }
  };

  return (
    <motion.div
      className="contentInputContainer"
      variants={dashboardChildVariants}
      initial={{
        background: "rgba(193, 169, 137, .8)",
        opacity: 0,
        x: -30,
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
      key="add-3"
    >
      <motion.label htmlFor="content" className="jotTitleLabel">
        Jot Content
      </motion.label>
      <textarea
        name="content"
        id="content"
        className="defaultValue"
        value={defaultValue}
        onFocus={checkDefaultValue}
        onChange={(e) => {
          setDefaultValue(e.target.value);
          grabJotContent(e);
        }}
      />
    </motion.div>
  );
};

export default JotContentInput;
