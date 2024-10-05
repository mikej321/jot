import MobileLoginNav from "../partials/mobileLoginNav";
import UsernameInput from "../partials/components/usernameInput";
import PasswordInput from "../partials/components/passwordInput";
import FirstNameInput from "../partials/components/firstNameInput";
import LastNameInput from "../partials/components/lastNameInput";
import SignupButton from "../partials/components/signupButton";
import "../styles/signupPage.css";
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

function SignupPage() {
  return (
    <motion.div
      className="mainContainer signupContainer"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div variants={navbarVariant}>
        <MobileLoginNav />
      </motion.div>
      <motion.div className="pageContent signupPage" variants={contentVariant}>
        <h1>Please Sign Up</h1>
      </motion.div>
      <motion.form
        className="pageInputContainer signupInputContainer"
        variants={inputVariant}
      >
        <FirstNameInput />
        <LastNameInput />
        <UsernameInput />
        <PasswordInput />
      </motion.form>
      <motion.div className="landingButtonContainer" variants={inputVariant}>
        <SignupButton />
      </motion.div>
    </motion.div>
  );
}

export default SignupPage;
