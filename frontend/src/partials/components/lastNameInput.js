import "../../styles/InputForm.css";
import "../../App.css";

function LastNameInput({ getLastName }) {
  return (
    <div className="mobileFormInputNoIcon">
      <div className="inputContentContainerNoIcon">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={(e) => getLastName(e.target.value)}
        />
      </div>
    </div>
  );
}

export default LastNameInput;
