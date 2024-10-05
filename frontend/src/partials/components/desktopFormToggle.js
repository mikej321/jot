import { useState } from "react";
import "../../styles/InputForm.css";
import DesktopForm from "../desktopFormLogin";

function DesktopToggle({ formState, setFormState }) {
  const handleToggleIndicator = (e) => {
    const thisEl = e.currentTarget;

    if (!thisEl.hasAttribute("signUpForm")) {
      thisEl.setAttribute("signUpForm", "");
      setFormState("signup");
    } else {
      thisEl.removeAttribute("signUpForm");
      setFormState("login");
    }
  };

  const handleToggleLogin = (e) => {
    const indicator = e.currentTarget.previousSibling;
    if (!indicator.hasAttribute("signUpForm")) {
      indicator.setAttribute("signUpForm", "");
      setFormState("signup");
    } else {
      indicator.removeAttribute("signUpForm");
      setFormState("login");
    }
  };

  const handleToggleSignup = (e) => {
    const indicator = e.currentTarget.previousSibling.previousSibling;
    if (!indicator.hasAttribute("signUpForm")) {
      indicator.setAttribute("signUpForm", "");
      setFormState("signup");
    } else {
      indicator.removeAttribute("signUpForm");
      setFormState("login");
    }
  };

  return (
    <>
      <div
        className="toggleIndicator"
        onClick={(e) => handleToggleIndicator(e)}
      ></div>
      <button
        className="desktopLoginButton"
        onClick={(e) => handleToggleLogin(e)}
      >
        Log In
      </button>
      <button
        className="desktopSignupButton"
        onClick={(e) => handleToggleSignup(e)}
      >
        Sign Up
      </button>
    </>
  );
}

export default DesktopToggle;
