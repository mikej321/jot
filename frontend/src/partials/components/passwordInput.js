import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "../../styles/InputForm.css";
import "../../App.css";

function PasswordInput({ getPassword }) {
  return (
    <div className="mobileFormInput">
      <FontAwesomeIcon icon={faLock} className="mobileIcon" />
      <div className="divider"></div>
      <div className="inputContentContainer">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => getPassword(e.target.value)}
        />
      </div>
    </div>
  );
}

export default PasswordInput;
