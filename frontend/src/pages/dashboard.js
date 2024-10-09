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
  const [layout, setLayout] = useState('layout1');
  const [userWidth, setUserWidth] = useState(window.innerWidth);
  const initialRender = useRef(true);

  const staggerSideIcons = stagger(0.1, { startDelay: 0.25 });

  const layoutStyles = {
    'mobileLayout': {
        gridTemplateAreas: `
            "nav"
            "pageTitleSearch"
            "content"
            "footer"
        `,
    },
    'layout1': {
        gridTemplateAreas: `
            "nav nav nav"
            "sidebar pageTitleSearch pageTitleSearch"
            "sidebar content content"
        `,
    },
  }

  useEffect(() => {
    const handleResize = () => {
        setUserWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (userWidth <= 600) {
        setLayout('mobileLayout');
    } else if (userWidth > 600) {
        setLayout('layout1');
    } 
  }, [userWidth])

  const sidebarAnimation = async () => {
    if (open) {
      animate(
        '.mainContainer.dashboardContainer',
        { gridTemplateColumns: '320px 1fr 2fr' },
        { duration: 0.2 }
      )
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
        { duration: 0.2, transformOrigin: 'top left' }
      )
      animate(
        '.bar3',
        { rotate: -45 },
        { duration: 0.2, transformOrigin: 'top left' }
      )
      
    } else {
      animate(
        '.bar3',
        { rotate: 0 },
        { duration: 0.2, transformOrigin: 'top left' }
      )
      animate(
        '.bar1',
        { rotate: 0 },
        { duration: 0.2, transformOrigin: 'top left' }
      )
      await animate(
        '.bar2',
        { opacity: 1 },
        { duration: 0.1 }
      );
      animate(
        '.bar3',
        { y: 0 },
        { duration: 0.2 }
      )
      await animate(
        '.bar1',
        { y: 0 },
        { duration: 0.2 }
      )
      await animate(
        '.mainContainer.dashboardContainer',
        { gridTemplateColumns: '0px 1fr 2fr' },
        { duration: 0.2 }
      )
    }
  }

  useEffect(() => {
    sidebarAnimation();
  }, [open])

  const handleSidebarClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <motion.div
     className="mainContainer dashboardContainer" 
     layout
     style={{
        gridTemplateAreas: layoutStyles[layout].gridTemplateAreas,
     }}
     initial={{
        gridTemplateColumns: '320px 1fr 2fr',
     }}
     >
      <DashboardNav />
      <motion.div className="hamburgerMenu" onClick={handleSidebarClick}>
            <motion.div className="bar bar1"></motion.div>
            <motion.div className="bar bar2"></motion.div>
            <motion.div className="bar bar3"></motion.div>
          </motion.div>
      <motion.div
        className="sidebarContainer"
        initial={{
            paddingLeft: 0,
        }}
        layout
      >
        <motion.div className="sideLinks">
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
