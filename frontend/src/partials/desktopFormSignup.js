import { useState } from "react";
import FirstNameInput from "./components/firstNameInput";
import LastNameInput from "./components/lastNameInput";
import PasswordInput from "./components/passwordInput";
import UsernameInput from "./components/usernameInput";
import { motion, AnimatePresence } from "framer-motion";

const formVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.25,
      ease: "easeOut",
      type: "spring",
      bounce: 0.8,
    },
  },
};

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function DesktopFormSignup({
  getFirstName,
  getLastName,
  getUsername,
  getPassword,
}) {
  const getFirstNameVal = (firstNameVal) => {
    getFirstName(firstNameVal);
  };

  const getLastNameVal = (lastNameVal) => {
    getLastName(lastNameVal);
  };

  const getUserVal = (usernameVal) => {
    getUsername(usernameVal);
  };

  const getPasswordVal = (passwordVal) => {
    getPassword(passwordVal);
  };

  return (
    <motion.div
      action=""
      method="POST"
      className="desktopForm"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div variants={inputVariants}>
        <FirstNameInput getFirstNameVal={getFirstNameVal} />
      </motion.div>
      <motion.div variants={inputVariants}>
        <LastNameInput getLastNameVal={getLastNameVal} />
      </motion.div>
      <motion.div variants={inputVariants}>
        <UsernameInput getUserVal={getUserVal} />
      </motion.div>
      <motion.div variants={inputVariants}>
        <PasswordInput getPasswordVal={getPasswordVal} />
      </motion.div>
    </motion.div>
  );
}

export default DesktopFormSignup;
