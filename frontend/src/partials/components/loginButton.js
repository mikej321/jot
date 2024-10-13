import "../../App.css";
import "../../styles/InputForm.css";

function LoginButton({ handleButtonVisibility, handleFormState }) {
  return (
    <button 
      className="landingButton"
      onClick={() => {
        handleButtonVisibility();
        handleFormState('login');
      }}
      >
      Log In
    </button>
  );
}

export default LoginButton;
