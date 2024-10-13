import "../../styles/InputForm.css";
import "../../App.css";

function FirstNameInput({ getFirstNameVal, getFirstNameMobile }) {
  return (
    <div className="mobileFormInputNoIcon">
      <div className="inputContentContainerNoIcon">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={(e) => {
            getFirstNameVal(e.target.value);
            getFirstNameMobile(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default FirstNameInput;
