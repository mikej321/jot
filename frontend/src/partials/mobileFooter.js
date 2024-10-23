import {
  faHouse,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InputForm.css";

function MobileFooter({ setDashboardState }) {
  return (
    <div className="mobileFooter">
      <div className="footerButton">
        <FontAwesomeIcon
          className="mobileFooterIcon"
          icon={faHouse}
          onClick={() => {
            setDashboardState("main");
          }}
        />
      </div>
      <div className="footerButton">
        <FontAwesomeIcon
          className="mobileFooterIcon"
          icon={faPenToSquare}
          onClick={() => {
            setDashboardState("edit");
          }}
        />
      </div>
      <div className="footerButton">
        <FontAwesomeIcon
          className="mobileFooterIcon"
          icon={faPlus}
          onClick={() => {
            setDashboardState("add");
          }}
        />
      </div>
      <div className="footerButton">
        <FontAwesomeIcon
          className="mobileFooterIcon"
          icon={faTrashCan}
          onClick={() => {
            setDashboardState("remove");
          }}
        />
      </div>
      <div className="footerButton">
        <FontAwesomeIcon
          className="mobileFooterIcon"
          icon={faGear}
          onClick={() => {
            setDashboardState("settings");
          }}
        />
      </div>
    </div>
  );
}

export default MobileFooter;
