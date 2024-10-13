import "../../styles/toggleButton.css";

function BrightnessToggle() {
  const handleToggle = (e) => {
    const mainContainer = document.querySelector(".mainContainer");

    if (!mainContainer.classList.contains("darkMode")) {
      mainContainer.classList.add("darkMode");
      document.body.style.background = "#091F1B";
    } else {
      mainContainer.classList.remove("darkMode");
      document.body.style.background =
        "linear-gradient(180deg, rgba(255, 227, 187, .5) 0%, rgba(229, 187, 128, .50) 31%, rgba(219, 128, 0, .50) 79%)";
    }
  };

  return (
    <div className="toggleContainer" onClick={(e) => handleToggle(e)}>
      <div className="ball"></div>
    </div>
  );
}

export default BrightnessToggle;
