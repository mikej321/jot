import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {  motion } from "framer-motion";
import { useState } from "react";
import '../../styles/dashboard.css';

const JotPanelButton = () => {
    return (
            <motion.div className="panelButtonContainer">
                <p className="panelTitle">Setting up a Server in React</p>
                <motion.div>
                    <FontAwesomeIcon className="trash" icon={faTrashCan} />
                </motion.div>
            </motion.div>
    )
}

export default JotPanelButton;