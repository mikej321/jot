import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "../../styles/InputForm.css";
import "../../App.css";

function PasswordInput() {
  return (
    <div className="mobileFormInput">
      <FontAwesomeIcon icon={faLock} className="mobileIcon" />
      <div className="divider"></div>
      <div className="inputContentContainer">
        <label htmlFor="username">Password</label>
        <input type="text" name="username" id="username" />
      </div>
    </div>
  );
}

export default PasswordInput;
