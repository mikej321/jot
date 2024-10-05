import "../../styles/InputForm.css";
import "../../App.css";

function FirstNameInput() {
  return (
    <div className="mobileFormInputNoIcon">
      <div className="inputContentContainerNoIcon">
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" />
      </div>
    </div>
  );
}

export default FirstNameInput;
