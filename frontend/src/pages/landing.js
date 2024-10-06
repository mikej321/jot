import "../App.css";
import "../styles/InputForm.css";
import "../styles/landingPage.css";
import BrightnessToggle from "../partials/components/brightnessToggle";
import LoginButton from "../partials/components/loginButton";
import SignupButton from "../partials/components/signupButton";
import DesktopToggle from "../partials/components/desktopFormToggle";
import DesktopFormLogin from "../partials/desktopFormLogin";
import DesktopFormSignup from "../partials/desktopFormSignup";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    }
  }
}

const contentVariant = {
  hidden: {
    opacity: 0,
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    }
  }
}

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
      ease: 'easeOut',
    }
  }
}

const inputVariant = {
  hidden: {
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35
    }
  }
}

function LandingPage() {
  const [formState, setFormState] = useState("login");
  
  return (
    <AnimatePresence>
      <motion.div
       className="mainContainer landingContainer"
       variants={containerVariant}
       initial="hidden"
       animate="visible"
       exit="hidden"
       >
        {/* Possibly use a useEffect to track what formState the landing page is in.
        When the useEffect is triggered, it will perform an animation on the pageContent
        while the rest of the form loads with it's own animations.  */}
        {/* On the mobile version of the app, I want to create a circular
        phrase that says 'A note-taking App' and it will circle the
        outside of the main content on the landing page. This could
        be done after everything is set up */}
        <motion.div className="dayNightModeToggle" variants={contentVariant}>
          <BrightnessToggle />
        </motion.div>
        <motion.div className="contentContainer">
          <motion.div
           className="pageContent landingContent"
           variants={contentVariant}>
            <h1>Welcome to Jot!</h1>
            <p>Please log in or sign up below</p>
          </motion.div>
          <motion.div
           className="mobileControls"
           variants={inputVariant}>
            <LoginButton />
            <SignupButton />
          </motion.div>
          <motion.div
           className="desktopControls"
           variants={loginToggleVariant}
           >
            <DesktopToggle setFormState={setFormState} />
          </motion.div>
        </motion.div>
        <motion.div className="pageInputContainer landingInputContainer">
            {/* For the desktop forms, do it in these steps

              1. Make the buttons serve no purpose other than being indicators.
              They shouldn't be able to be clicked. *Done*

              2. Make the 'toggleIndicator' the clickable element and tie it's
              state to whichever button it is currently hovering over. *Done*

              3. Create two forms that will be displayed below the toggle. Only one
              will be rendered depending on the state.

              4. Create these two forms in components to cut back on coding time.

              5. Have a continue button be on these forms. This button will handle
              the POST requests.

            */}
              <AnimatePresence>
                {formState === 'login' ? <motion.div variants={inputVariant}><DesktopFormLogin /></motion.div> : <motion.div variants={inputVariant}><DesktopFormSignup /></motion.div>}
              </AnimatePresence>
              

            {/* The form is complete now. Next, I need to animate the form with framer motion.
            This will be done with animatePresence. I should create a function that animates
            the portion of the form upwards before rendering in the extra inputs for signup when
            the signup toggle is clicked. When reverting back to login, I should animate the extra
            inputs out, before animating the form back towards the middle. This should be done smoothly.  */}
          </motion.div>
          <motion.button type="submit" className="landingSubmitButton" variants={contentVariant}>Continue</motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

export default LandingPage;
