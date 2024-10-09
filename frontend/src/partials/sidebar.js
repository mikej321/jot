import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion, animate, stagger } from 'framer-motion';
import "../styles/dashboard.css";

function Sidebar({ open, handleSidebar, animationDone }) {

    const initialRender = useRef(true);
    const staggerSideIcons = stagger(0.1, { startDelay: 0.25 });

    const handleClick = () => {
        if (!open) {
            handleSidebar(true);
        } else {
            handleSidebar(false);
        }
    }

    return (
            <motion.div
             className="sidebarContainer"
             initial={{
                paddingLeft: 0,
             }}
             layout
             >
                <motion.div
                 className="openIconContainer"
                 initial={{
                    opacity: 1
                 }} 
                 >
                    <FontAwesomeIcon
                     icon={faBars} 
                     className="sidebarIcon openIcon" 
                     onClick={handleClick}
                     />
                </motion.div>
                <motion.div
                 className="closeIconContainer"
                 initial={{
                    opacity: 0
                 }}
                 >
                    <FontAwesomeIcon
                     icon={faCircleMinus} 
                     className="sidebarIcon closeIcon"  
                     onClick={handleClick}
                     />
                </motion.div>
                <motion.div className="sideLinks">
                    <Link to="/dashboard/addJot">Add Jot</Link>
                    <Link to="/dashboard/editJot">Edit Jot</Link>
                    <Link to="/dashboard/removeJot">Remove Jot</Link>
                    <Link to="/dashboard/categories">Categories</Link>
                    <Link to="/dashboard/settings">Settings</Link>                
                </motion.div>
            </motion.div>
    )
}

export default Sidebar;
