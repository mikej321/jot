import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "../../styles/InputForm.css";
import "../../App.css";

function PasswordInput({ getPasswordVal, getPasswordMobile }) {
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
          onChange={(e) => {
            getPasswordVal(e.target.value);
            getPasswordMobile(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default PasswordInput;
