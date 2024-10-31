import {
  faHouse,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faGear,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InputForm.css";
import { motion } from "framer-motion";

function MobileFooter({ handleFooter, getJots }) {
  const navigate = useNavigate();

  return (
    <div className="mobileFooter">
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
        <FontAwesomeIcon className="mobileFooterIcon" icon={faPlus} />
      </motion.div>
      <motion.div
        className="footerButton"
        onClick={() => {
          getJots();
          navigate("/api/about-me");
        }}
      >
        <FontAwesomeIcon className="mobileFooterIcon" icon={faQuestion} />
      </motion.div>
    </div>
  );
}

export default MobileFooter;
