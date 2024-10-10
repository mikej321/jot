import { useState, useEffect, useRef } from "react";
import { animate, motion, stagger } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import DashboardNav from "../partials/dashboardNav";
import Searchbar from "../partials/searchbar";
import DashboardCanvas from "../partials/components/dashboardCanvas";
import MobileFooter from "../partials/mobileFooter";
import CodingDashboardBlock from "../partials/components/codingDashboardBlock";
import MathDashboardBlock from "../partials/components/mathDashboardBlock";
import ScienceDashboardBlock from "../partials/components/scienceDashboardBlock";
import FinanceDashboardBlock from "../partials/components/financeDashboardBlock";
import LawDashboardBlock from "../partials/components/lawDashboardBlock";
import EngineerDashboardBlock from "../partials/components/engineerDashboardBlock";
import Sidebar from "../partials/sidebar";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const initialRender = useRef(true);

  const staggerSideIcons = stagger(0.1, { startDelay: 0.25 });

  const sidebarIconAnimation = async () => {
      
    if (open) {
      animate(
          '.bar1',
          { y: 10 },
          { duration: 0.2 }
      )

      animate(
        '.bar2',
        { opacity: 0 },
        { duration: 0.2 }
      )
      
      await animate(
        '.bar3',
        { y: -10 },
        { duration: 0.2 }
      )

      animate(
        '.bar1',
        { rotate: 45 },
        { duration: 0.1, transformOrigin: 'top left' }
      )

      await animate(
        '.bar3',
        { rotate: -45 },
        { duration: 0.1, transformOrigin: 'top left' }
      )

      await animate(
        '.sideLinks',
        { opacity: 1 },
        { delay: 0.1, duration: 0.2 }
      )

      animate(
        '.sideLinks a',
        {
          opacity: 1,
          x: 0
        },
        {
          type: 'spring',
          delay: staggerSideIcons, duration: 0.2
        }
      )
    } else {

      animate(
        '.bar1',
        { rotate: 0 },
        { duration: 0.1, transformOrigin: 'top left' }
      )

      await animate(
        '.bar3',
        { rotate: 0 },
        { duration: 0.1, transformOrigin: 'top left' }
      )
      
      animate(
        '.bar1',
        { y: 0 },
        { duration: 0.2 }
      )

      animate(
        '.bar2',
        { opacity: 1 }
      )

      await animate(
        '.bar3',
        { y: 0 },
        { duration: 0.2 }
      )

      animate(
        '.sideLinks',
        { opacity: 0 },
        { duration: 0.2,}
      )

      await animate(
        '.sideLinks a',
        { opacity: 0, x: -50 },
        { duration: 0.2, delay: staggerSideIcons }
      )


      
    }
  }

 
  useEffect(() => {
      sidebarIconAnimation()     
  }, [open])

  const handleSidebarClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <motion.div
     className={`mainContainer dashboardContainer ${open ? 'open' : ''}`} 
     >
      <DashboardNav />
      <motion.div className={`hamburgerMenu ${open ? 'open' : ''}`} onClick={handleSidebarClick}>
            <motion.div className="bar bar1"></motion.div>
            <motion.div className="bar bar2"></motion.div>
            <motion.div className="bar bar3"></motion.div>
          </motion.div>
      <motion.div
        className="sidebarContainer"
        initial={{
            paddingLeft: 0,
        }}
      >
        <motion.div
         className="sideLinks"
         initial={{
          opacity: 0,
         }}
         >
          <Link to="/dashboard/addJot">Add Jot</Link>
          <Link to="/dashboard/editJot">Edit Jot</Link>
          <Link to="/dashboard/removeJot">Remove Jot</Link>
          <Link to="/dashboard/categories">Categories</Link>
          <Link to="/dashboard/settings">Settings</Link>
        </motion.div>
      </motion.div>
      <div className="titleRowContainer">
          <div className="titleContainer">
            <h1 className="dashboardTitle">Dashboard</h1>
          </div>
          <Searchbar />
      </div>
      <div className="dashboardContent">
        <DashboardCanvas>
          <p className="dashboardInstructions">
            Choose a category and start Jotting your thoughts
          </p>
          <div className="blockContainer">
            <CodingDashboardBlock />
            <MathDashboardBlock />
            <ScienceDashboardBlock />
            <FinanceDashboardBlock />
            <LawDashboardBlock />
            <EngineerDashboardBlock />
          </div>
        </DashboardCanvas>
      </div>
      <MobileFooter />
    </motion.div>
  );
}

export default Dashboard;
