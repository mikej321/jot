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

export const containerVariant = {
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
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
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

const errorContainerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
      staggerDirection: 1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.2,
      when: "afterChildren",
      staggerDirection: -1
    }
  }
}

const errorMessageVariant = {
  hidden: {
    y: -10,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}


function LandingPage() {
  const [formState, setFormState] = useState("login");
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

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

      setModalSuccess(true);
      setTimeout(() => {
        setSuccess(true);
      }, 2000);
      setSuccessMessage(response.data.message);

      setTimeout(() => {
        navigate("/api/dashboard");
      }, 2600);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errors) {
          setErrorMessage(err.response.data.errors.map(error => error.msg))
        } else {
          setErrorMessage(err.response.data.error.message);
        }
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send the username and password here to the backend
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      setSuccess(true);
      setTimeout(() => {
        navigate("/api/dashboard");
      }, 600);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errors) {
          setErrorMessage(err.response.data.errors.map((error) => error.msg));
        } else {
          setErrorMessage(err.response.data.error.message);
        }
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
  };

  const getLastName = (lastNameVal) => {
    setLastName(lastNameVal);
  };

  const getUsername = (usernameVal) => {
    setUsername(usernameVal);
  };

  const getPassword = (passwordVal) => {
    setPassword(passwordVal);
  };

  return (
    <motion.form
      className="mainContainer landingContainer"
      onSubmit={formState === "login" ? handleLogin : handleSignup}
      
    >
      {/* Things I need to try to fix the animation
      
        1. Try to experiment with putting 'layout' on the errors container only

        2. Wrap AnimatePresence around the error handlers containers, see if that helps
      */}
      <nav className="landingNav">
        <motion.div className="dayNightModeToggle" >
          <BrightnessToggle />
        </motion.div>
      </nav>
      <motion.div className="contentContainer" layout>
        <motion.div className="pageContent landingContent">
          <h1>Welcome to Jot!</h1>
          <p>Please log in or sign up below</p>
        </motion.div>
        <motion.div className="landingControls">
          <DesktopToggle setFormState={setFormState} />
        </motion.div>
      </motion.div>
      <motion.div
       className="pageInputContainer landingInputContainer"
       
       >
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
                <AnimatePresence>
                  <motion.div
                   className="errorContainer"
                   variants={errorContainerVariant}
                   initial="hidden"
                   animate="visible"
                   exit="exit"
                   onAnimationStart={() => setIsAnimating(true)}
                   onAnimationComplete={() => setIsAnimating(false)}
                   style={{ overflow: isAnimating ? "hidden" : "auto" }}
                   >
                    {
                      errorMessage && (
                        errorMessage.filter(error => error.includes('Username'))
                        .map((err, index) => <motion.p
                         className="errorMsg" 
                         variants={errorMessageVariant}
                         key={index}
                         
                         >{err}</motion.p>)
                      )
                    }
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div className="inputMotion" variants={formInputVariant}>
                <PasswordInput getPassword={getPassword} />
                <AnimatePresence>
                  <motion.div
                   className="errorContainer"
                   variants={errorContainerVariant}
                   initial="hidden"
                   animate="visible"
                   exit="exit"
                   onAnimationStart={() => setIsAnimating(true)}
                   onAnimationEnd={() => setIsAnimating(false)}
                   style={{ overflow: isAnimating ? "hidden" : "auto" }}
                   >
                    {
                      errorMessage && (
                        errorMessage.filter(error => error.includes('Password'))
                        .map((err, index) => <motion.p
                         className="errorMsg" 
                         variants={errorMessageVariant}
                         key={index}
                         
                         >{err}</motion.p>)
                      )
                    }
                  </motion.div>
                </AnimatePresence>
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
              <AnimatePresence mode="wait">
                {modalSuccess && (
                  <motion.div
                    className="signupModal"
                    key={modalSuccess}
                    initial={{
                      opacity: 0,
                      zIndex: -1,
                    }}
                    animate={{
                      opacity: 1,
                      zIndex: 3,
                    }}
                    exit={{
                      opacity: 0,
                      zIndex: -1,
                    }}
                    
                  >
                    <p>Thanks for joining</p>
                    <p className="userIdentification">{successMessage}</p>
                    <p>Let's start Jotting!</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
               className="inputMotion" 
               variants={formInputVariant}
               
               >
                <FirstNameInput getFirstName={getFirstName} />
                <AnimatePresence>
                  <motion.div
                   className="errorContainer"
                   variants={errorContainerVariant}
                   initial="hidden"
                   animate="visible"
                   exit="exit"
                   >
                     {
                       errorMessage && (
                         errorMessage.filter(err => err.includes('First'))
                         .map((errResult, index) => <motion.p
                          className="errorMsg" 
                          key={index}
                          variants={errorMessageVariant}
                          
                          >{errResult}</motion.p>)
                       )
                     }
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div
               className="inputMotion" 
               variants={formInputVariant}
               
               >
                <LastNameInput getLastName={getLastName} />
                <AnimatePresence>
                  <motion.div
                   className="errorContainer"
                   variants={errorContainerVariant}
                   initial="hidden"
                   animate="visible"
                   exit="exit"
                   >
                    {
                      errorMessage && (
                        errorMessage.filter(err => err.includes('Last'))
                        .map((errResult, index) => <motion.p
                         className="errorMsg" 
                         key={index}
                         variants={errorMessageVariant}
                         
                         >{errResult}</motion.p>)
                      )
                    }
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div
               className="inputMotion" 
               variants={formInputVariant}
               
               >
                <UsernameInput getUsername={getUsername} />
                <AnimatePresence>
                  <motion.div
                   className="errorContainer"
                   variants={errorContainerVariant}
                   initial="hidden"
                   animate="visible"
                   exit="exit"
                   >
                    {
                      errorMessage && (
                        errorMessage.filter(err => err.includes('Username'))
                        .map((errResult, index) => <motion.p
                         className="errorMsg" 
                         key={index}
                         variants={errorMessageVariant}
                         
                         >{errResult}</motion.p>)
                      )
                    }
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div
               className="inputMotion" 
               variants={formInputVariant}
               layout
               >
                <PasswordInput getPassword={getPassword} />
                <AnimatePresence>
                  <motion.div
                   className="errorContainer"
                   variants={errorContainerVariant}
                   initial="hidden"
                   animate="visible"
                   exit="exit"
                   >
                    {
                      errorMessage && (
                        errorMessage.filter(err => err.includes('Password'))
                        .map((errResult, index) => <motion.p
                         className="errorMsg" 
                         key={index}
                         variants={errorMessageVariant}
                         
                         >{errResult}</motion.p>)
                      )
                    }
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        
      </motion.div>
      <motion.button
        type="submit"
        className="landingSubmitButton"
        variants={contentVariant}
        layout
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
