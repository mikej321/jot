import { motion } from "framer-motion"; 
import BrightnessToggle from "../partials/components/brightnessToggle";
import MobileFooter from "../partials/mobileFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../App.css";
import "../styles/InputForm.css";
import "../styles/landingPage.css";
import { faAt, faGlobe, faMobile } from "@fortawesome/free-solid-svg-icons";
import DashboardNav from "../partials/dashboardNav";

const AboutMe = () => {
  return (
    <motion.div className="mainContainer aboutMePage">
        <DashboardNav />
        <h1>My name is Michael Johnson and I am a Web Developer.</h1>
        <h2>For inquiries and pricing, please see info below</h2>

        <ul className="contactInfoContainer">
            <li className="liContainer">
                <FontAwesomeIcon className="dashboardIcon" icon={faAt} />
                <p>Michaeljcantley@gmail.com</p>
            </li>
            <div className="liContainer">
                <FontAwesomeIcon className="dashboardIcon" icon={faMobile} />
                <p>843-833-4379</p>
            </div>
            <div className="liContainer">
                <FontAwesomeIcon className="dashboardIcon" icon={faGlobe} />
                <a href="http://github.com/mikej321">View Portfolio</a>
            </div>
        </ul>
        <MobileFooter />
    </motion.div>
  );
};

export default AboutMe;
