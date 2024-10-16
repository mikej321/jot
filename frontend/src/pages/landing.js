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
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const formContainerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const formInputVariant = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.2,
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
  const [message, setMessage] = useState("");

  const firstRender = useRef(true);

  // Set up the navigate for redirecting to another page
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Send the username and password here to the backend
      const response = await axios.post("http://localhost:5000/api/signup", {
        firstName,
        lastName,
        username,
        password,
      });

      setMessage(response.data.message);
      navigate("/api/dashboard");
    } catch (err) {
      // Handle error
      if (err.response) {
        // Request was made and server responded with a code
        setMessage(err.response.data.message);
      } else if (err.request) {
        // Request was made but no response
        setMessage("No response from server. Please try again");
      } else {
        // Something else has happened
        setMessage("An error has occured. Please try again");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send the username and password here to the backend
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      setMessage(response.data.message);
    } catch (err) {
      // Handle error
      if (err.response) {
        // Request was made and server responded with a code
        setMessage(err.response.data.message);
      } else if (err.request) {
        // Request was made but no response
        setMessage("No response from server. Please try again");
      } else {
        // Something else has happened
        setMessage("An error has occured. Please try again");
      }
    }
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
      onSubmit={formState === "login" ? handleLogin : handleSignup}
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
        <AnimatePresence mode="wait">
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
                <UsernameInput getUsername={getUsername} />
              </motion.div>
              <motion.div className="inputMotion" variants={formInputVariant}>
                <PasswordInput getPassword={getPassword} />
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
                <FirstNameInput getFirstName={getFirstName} />
              </motion.div>
              <motion.div className="inputMotion" variants={formInputVariant}>
                <LastNameInput getLastName={getLastName} />
              </motion.div>
              <motion.div className="inputMotion" variants={formInputVariant}>
                <UsernameInput getUsername={getUsername} />
              </motion.div>
              <motion.div className="inputMotion" variants={formInputVariant}>
                <PasswordInput getPassword={getPassword} />
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
