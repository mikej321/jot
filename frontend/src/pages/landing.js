import "../App.css";
import "../styles/InputForm.css";
import "../styles/landingPage.css";
import BrightnessToggle from "../partials/components/brightnessToggle";
import DesktopToggle from "../partials/components/desktopFormToggle";
import FirstNameInput from "../partials/components/firstNameInput";
import LastNameInput from "../partials/components/lastNameInput";
import UsernameInput from "../partials/components/usernameInput";
import PasswordInput from "../partials/components/passwordInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, stagger, animate } from "framer-motion";

// The stagger effect
const staggerList = stagger(0.1, { startDelay: 0.25 });

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

const loginToggleVariant = {
  hidden: {
    opacity: 0,
    x: -50,
    y: -30,
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

const formContainerVariant = {};

const formInputVariant = {};

function LandingPage() {
  const [formState, setFormState] = useState("login");
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const firstRender = useRef(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleFormState = (toggleVal) => {
    setFormState(toggleVal);
  };

  const handleButtonVisibility = () => {
    buttonVisibility ? setButtonVisibility(false) : setButtonVisibility(true);
  };

  const handleBackButton = () => {
    setFormState("login");
    setButtonVisibility((prev) => !prev);
  };

  const getFirstName = (firstNameVal) => {
    setFirstName(firstNameVal);
    console.log("changing first name value");
  };

  const getLastName = (lastNameVal) => {
    setLastName(lastNameVal);
    console.log("changing last name value");
  };

  const getUsername = (usernameVal) => {
    setUsername(usernameVal);
    console.log("changing username value");
  };

  const getPassword = (passwordVal) => {
    setPassword(passwordVal);
    console.log("changing password value");
  };

  return (
    <motion.form
      className="mainContainer landingContainer"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onSubmit={handleSubmit}
      layout
    >
      {/* On the mobile version of the app, I want to create a circular
        phrase that says 'A note-taking App' and it will circle the
        outside of the main content on the landing page. This could
        be done after everything is set up */}
      <nav className="landingNav">
        <motion.div className="dayNightModeToggle" layout>
          <BrightnessToggle />
        </motion.div>
      </nav>
      <motion.div className="contentContainer">
        <motion.div
          className="pageContent landingContent"
          variants={contentVariant}
        >
          <h1>Welcome to Jot!</h1>
          <p>Please log in or sign up below</p>
        </motion.div>
        <motion.div className="landingControls" variants={loginToggleVariant}>
          <DesktopToggle setFormState={setFormState} />
        </motion.div>
      </motion.div>
      <motion.div className="pageInputContainer landingInputContainer">
        <AnimatePresence>
          {formState === "login" ? (
            <motion.div
              className="formInputs loginInputs"
              key="login"
              variants={formContainerVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div className="inputMotion" variants={formInputVariant}>
                <UsernameInput />
              </motion.div>
              <motion.div className="inputMotion" variants={formInputVariant}>
                <PasswordInput />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="formInputs signupInputs"
              key="signup"
              variants={formContainerVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div className="inputMotion" variants={formInputVariant}>
                <FirstNameInput />
              </motion.div>
              <motion.div className="inputMotion" variants={formInputVariant}>
                <LastNameInput />
              </motion.div>
              <motion.div className="inputMotion" variants={formInputVariant}>
                <UsernameInput />
              </motion.div>
              <motion.div className="inputMotion" variants={formInputVariant}>
                <PasswordInput />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.button
        type="submit"
        className="landingSubmitButton"
        variants={contentVariant}
      >
        Continue
      </motion.button>
    </motion.form>
  );
}

export default LandingPage;

/* I fixed the mobile/desktop having two separate login/signup pages. Now everything is condensed
to the landing page. Next, I need to set up animations for the inputs when they come in similar
to how I had it on the desktop. After that, I should have everything needed to finish
authentication for Jot! */
