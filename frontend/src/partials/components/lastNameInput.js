import "../../styles/InputForm.css";
import "../../App.css";

function LastNameInput({ getLastNameVal, getLastNameMobile }) {
  return (
    <div className="mobileFormInputNoIcon">
      <div className="inputContentContainerNoIcon">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={(e) => {
            getLastNameVal(e.target.value);
            getLastNameMobile(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default LastNameInput;
