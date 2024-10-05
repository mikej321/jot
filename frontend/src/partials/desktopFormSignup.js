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

function DesktopFormSignup() {
  return (
    <motion.form
      action=""
      method="POST"
      className="desktopForm"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div variants={inputVariants}>
        <FirstNameInput />
      </motion.div>
      <motion.div variants={inputVariants}>
        <LastNameInput />
      </motion.div>
      <motion.div variants={inputVariants}>
        <UsernameInput />
      </motion.div>
      <motion.div variants={inputVariants}>
        <PasswordInput />
      </motion.div>
    </motion.form>
  );
}

export default DesktopFormSignup;
