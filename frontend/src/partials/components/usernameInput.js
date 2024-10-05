import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../../styles/InputForm.css";
import "../../App.css";

function UsernameInput() {
  return (
    <div className="mobileFormInput">
      <FontAwesomeIcon icon={faUser} className="mobileIcon" />
      <div className="divider"></div>
      <div className="inputContentContainer">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>
    </div>
  );
}

export default UsernameInput;