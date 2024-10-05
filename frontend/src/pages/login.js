import MobileLoginNav from "../partials/mobileLoginNav";
import UsernameInput from "../partials/components/usernameInput";
import PasswordInput from "../partials/components/passwordInput";
import LoginButton from "../partials/components/loginButton";
import "../styles/loginPage.css";
import { motion, AnimatePresence } from "framer-motion";

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const navbarVariant = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const contentVariant = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const inputVariant = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

function LoginPage() {
  return (
    <motion.div
      className="mainContainer loginContainer"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div variants={navbarVariant}>
        <MobileLoginNav />
      </motion.div>
      <motion.div className="pageContent loginPage" variants={contentVariant}>
        <h1>Please Log In</h1>
      </motion.div>
      <motion.form
        className="pageInputContainer loginInputContainer"
        variants={inputVariant}
      >
        <UsernameInput />
        <PasswordInput />
      </motion.form>
      <motion.div variants={inputVariant}>
        <LoginButton />
      </motion.div>
    </motion.div>
  );
}

export default LoginPage;
