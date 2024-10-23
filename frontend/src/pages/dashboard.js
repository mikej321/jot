import { useState, useEffect, useRef } from "react";
import { animate, AnimatePresence, motion, stagger } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import DashboardNav from "../partials/dashboardNav";
import Searchbar from "../partials/searchbar";
import DashboardCanvas from "../partials/components/dashboardCanvas";
import MobileFooter from "../partials/mobileFooter";
import Sidebar from "../partials/sidebar";
import axios from "axios";
import CreateIndicator from "../partials/components/createIndicator";
import JotContentInput from "../partials/components/jotContentInput";
import JotTitleInput from '../partials/components/JotTitleInput';
import '../styles/dashboard.css';


const dashboardHeaderVariant = {
  hidden: {
    opacity: 0,
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    }
  }
}

const dashboardChildVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
}

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [dashboardState, setDashboardState] = useState("main");
  const [jotContent, setJotContent] = useState({
    title: '',
    content: '',
  })
  const navigate = useNavigate();

  const handleSidebarClick = () => {
    setOpen((prev) => !prev);
  };

  const grabJotTitle = (e) => {
    setJotContent(prev => ({
      ...prev,
      title: e.target.value,
    }))
  }  

  const grabJotContent = (e) => {
    setJotContent(prev => ({
      ...prev,
      content: e.target.value
    }))
  }

  const submitJot = async () => {

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/api/dashboard/jot-add',
        {
          title: jotContent.title,
          content: jotContent.content
        },
        {
          "Content-Type": "application/json",
          "headers": {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      setDashboardState('jots');
    } catch(err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else if (err.request) {
        console.error('No response from server')
      }
    }
  }

  const breadCrumbNavigator = (e) => {
    const thisCrumb = e.currentTarget.textContent;
    const thisCrumbContent = thisCrumb.toLowerCase();
    
    if (thisCrumbContent === 'dashboard') {
      setDashboardState('main');
    } else if (thisCrumbContent === 'create') {
      setDashboardState('add');
    } else if (thisCrumbContent === 'Your jots') {
      setDashboardState('jots');
    } else if (thisCrumbContent === 'about me') {
      setDashboardState('about');
    } else if (thisCrumbContent === 'how to use') {
      setDashboardState('instructions');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

 

  return (
    <motion.div
      className={`mainContainer dashboardContainer ${open ? "open" : ""} ${dashboardState === 'main' ? 'mainDashboard' 
        : dashboardState === 'jots' 
        ? 'jotDashboard' : dashboardState === 'add' 
        ? 'addDashboard' : ''}`}
    >
      <DashboardNav />
      <motion.div
        className={`hamburgerMenu ${open ? "open" : ""}`}
        onClick={handleSidebarClick}
      >
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
      <AnimatePresence mode="wait">
        {
          dashboardState === 'main' ? (
            <motion.div
             className="titleRowContainer"
             variants={dashboardHeaderVariant}
             initial="hidden"
             animate="visible"
             exit="exit"
             key="main"
             >
              <div className="titleContainer">
                <h1 className="dashboardTitle">Dashboard</h1>
              </div>
              <Searchbar />
            </motion.div>
          ) : dashboardState === 'jots' ? (
              <motion.div
               className="textNavigationContainer yourJotNavigationContainer"
               variants={dashboardHeaderVariant}
               initial="hidden"
               animate="visible"
               exit="exit"
               key="jots"
               >
                <div className="titleContainer">Your Jots</div>
                <div className="breadcrumbContainer">
                  <p onClick={(e) => breadCrumbNavigator(e)}>Dashboard</p>
                  <p className="breadcrumbArrow">&#62;</p>
                  <p onClick={(e) => breadCrumbNavigator(e)} className="currentLocation">Your Jots</p>
                </div>
              </motion.div>
          ) : dashboardState === 'add' ? (
              <motion.div
               className="textNavigationContainer addNavigationContainer"
               variants={dashboardHeaderVariant}
               initial="hidden"
               animate="visible"
               exit="exit"
               key="add"
               >
                <div className="titleContainer">Create Jot</div>
                <div className="breadcrumbContainer">
                  <p onClick={(e) => breadCrumbNavigator(e)}>Dashboard</p>
                  <p className="breadcrumbArrow">&#62;</p>
                  <p onClick={(e) => breadCrumbNavigator(e)} className="currentLocation">Create Jot</p>
                </div>
              </motion.div>    
          ) : (
            <>
            </>
          )
      }
      </AnimatePresence>
      {/* I'll have to add a ternary condition to check if the users jot contents
      in the server is empty. If it is, it'll display the 'main' dashboardState
      whereas if it isn't, it'll display the 'jots' dashboardState containing a list
      of the user's jots */}
      
        <DashboardCanvas dashboardState={dashboardState}>
          <AnimatePresence>
            {
              dashboardState === 'main' ? (
                <>
                  <motion.div
                   className="dashboardTextContent"
                   variants={dashboardChildVariants}
                   initial="hidden"
                   animate="visible"
                   exit="exit"
                   key="main-1"
                   >
                    <p className="dashboardIntro">You have <span className="jotAmount">0</span> jots</p>
                    <p className="addInstructions">Add your first jot!</p>
                  </motion.div>
                  <motion.button
                   type="button" 
                   className="continueButton"
                   onClick={() => {
                    setDashboardState('add');
                   }}
                   initial={{
                    scale: 1,
                   }}
                   whileHover={{
                    scale: [1, 1.05],
                    transition: {
                      duration: .8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }
                   }}
                   key="main-2"
                   >Continue</motion.button>
                </>
              ) : dashboardState === 'jots' ? (
                  <>
                    <div className="dashboardTextContent">
                    </div>
                  </>
              ) : dashboardState === 'add' ? (
                  <>
                    <CreateIndicator />
                    <JotTitleInput grabJotTitle={(e) => grabJotTitle(e)} />
                    <JotContentInput grabJotContent={(e) => grabJotContent(e)} />
                    <motion.button
                     type="button" 
                     className="continueButton"
                     initial={{
                      scale: 1,
                     }}
                     whileHover={{
                      scale: [1, 1.05],
                      transition: {
                        duration: .8,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      }
                     }}
                     onClick={() => {
                      setDashboardState('jots');
                      submitJot();
                     }}
                     key="add-4"
                    >Continue</motion.button>
                  </>
              ) : (
                  <>
                  </>
              )
            }

          </AnimatePresence>
        </DashboardCanvas>
      
      <MobileFooter setDashboardState={setDashboardState} />
    </motion.div>
  );
}

export default Dashboard;
