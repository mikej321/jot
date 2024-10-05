import "../../App.css";
import "../../styles/InputForm.css";
import { Link } from "react-router-dom";

function SignupButton() {
  return (
    <Link to="/signup" className="landingButton">
      Sign Up
    </Link>
  );
}

export default SignupButton;
