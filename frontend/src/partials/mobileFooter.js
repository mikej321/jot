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
import { motion } from "framer-motion";

function MobileFooter({ handleFooter, getJots }) {
  return (
    <div className="mobileFooter">
      <motion.div
        className="footerButton"
        onClick={() => {
          getJots();
          handleFooter("main");
        }}
      >
        <FontAwesomeIcon className="mobileFooterIcon" icon={faHouse} />
      </motion.div>
      <motion.div
        className="footerButton"
        onClick={() => {
          getJots();
          handleFooter("jots");
        }}
      >
        <FontAwesomeIcon
          className="mobileFooterIcon"
          icon={faPenToSquare}
          onClick={() => {}}
        />
      </motion.div>
      <motion.div
        className="footerButton"
        onClick={() => {
          getJots();
          handleFooter("add");
        }}
      >
        <FontAwesomeIcon
          className="mobileFooterIcon"
          icon={faPlus}
          onClick={() => {}}
        />
      </motion.div>
      <div className="footerButton">
        <FontAwesomeIcon
          className="mobileFooterIcon"
          icon={faGear}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default MobileFooter;
