import "../../App.css";
import "../../styles/InputForm.css";
import { Link } from "react-router-dom";

function LoginButton() {
  return (
    <Link to="/login" className="landingButton">
      Log In
    </Link>
  );
}

export default LoginButton;
