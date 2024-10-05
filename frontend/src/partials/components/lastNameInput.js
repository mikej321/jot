import "../../styles/InputForm.css";
import "../../App.css";

function LastNameInput() {
  return (
    <div className="mobileFormInputNoIcon">
      <div className="inputContentContainerNoIcon">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" />
      </div>
    </div>
  );
}

export default LastNameInput;
