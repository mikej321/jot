import "../../App.css";
import "../../styles/InputForm.css";
import { Link } from "react-router-dom";

function SignupButton({ handleButtonVisibility, handleFormState }) {
  return (
    <button
     className="landingButton"
     onClick={() => {
      handleButtonVisibility();
      handleFormState('signup');
     }}
     >
      Sign Up
    </button>
  );
}

export default SignupButton;
