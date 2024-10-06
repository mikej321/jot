import { faHouse, faPenToSquare, faPlus, faTrashCan, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/InputForm.css';

function MobileFooter() {
    return (
        <div className="mobileFooter">
            <div className="footerButton">
                <FontAwesomeIcon  className="mobileFooterIcon" icon={faHouse} />
            </div>
            <div className="footerButton">
                <FontAwesomeIcon  className="mobileFooterIcon" icon={faPenToSquare} /> 
            </div>
            <div className="footerButton">
                <FontAwesomeIcon  className="mobileFooterIcon" icon={faPlus} />
            </div>
            <div className="footerButton">
                <FontAwesomeIcon  className="mobileFooterIcon" icon={faTrashCan} />
            </div>
            <div className="footerButton">
                <FontAwesomeIcon  className="mobileFooterIcon" icon={faGear} />
            </div>
        </div>
    )
}

export default MobileFooter;
