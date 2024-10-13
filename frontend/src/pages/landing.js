import "../App.css";
import "../styles/InputForm.css";
import "../styles/landingPage.css";
import BrightnessToggle from "../partials/components/brightnessToggle";
import LoginButton from "../partials/components/loginButton";
import SignupButton from "../partials/components/signupButton";
import DesktopToggle from "../partials/components/desktopFormToggle";
import DesktopFormLogin from "../partials/desktopFormLogin";
import DesktopFormSignup from "../partials/desktopFormSignup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
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

function LandingPage() {
  const [formState, setFormState] = useState("login");
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    <AnimatePresence>
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
        <nav class="landingNav">
          <AnimatePresence>
            {!buttonVisibility && (
              <motion.div
                className="arrowContainer"
                initial={{
                  opacity: 0,
                  x: -50,
                  transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                  },
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -50,
                  transition: {
                    duration: 0.3,
                    ease: "easeIn",
                  },
                }}
                style={
                  buttonVisibility
                    ? { cursor: "none", pointerEvents: "none" }
                    : { cursor: "pointer", pointerEvents: "all" }
                }
                layout
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="landingArrow"
                  onClick={handleBackButton}
                />
              </motion.div>
            )}
          </AnimatePresence>
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
          <motion.div className="mobileControls" variants={inputVariant}>
            <LoginButton
              handleButtonVisibility={handleButtonVisibility}
              handleFormState={handleFormState}
            />
            <SignupButton
              handleButtonVisibility={handleButtonVisibility}
              handleFormState={handleFormState}
            />
          </motion.div>
          <motion.div className="desktopControls" variants={loginToggleVariant}>
            <DesktopToggle setFormState={setFormState} />
          </motion.div>
        </motion.div>
        <motion.div className="pageInputContainer landingInputContainer">
          <AnimatePresence>
            {formState === "login" ? (
              <motion.div variants={inputVariant}>
                <DesktopFormLogin />
              </motion.div>
            ) : (
              <motion.div variants={inputVariant}>
                <DesktopFormSignup
                  getFirstName={getFirstName}
                  getLastName={getLastName}
                  getUsername={getUsername}
                  getPassword={getPassword}
                />
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
    </AnimatePresence>
  );
}

export default LandingPage;

/* Change the desktop page to where it has the same content as the mobile. Take the desktopSignupPage and desktopLoginPage away and instead, just put the inputs on this page
under one container. Some styling may need to be changed for it to work. */

/* Take the mobile/desktop controls container away and instead, make it to where the desktop toggle is simply under the page.
The page has far too many containers and this is what's causing the problem. Look into fixing this tomorrow. */
