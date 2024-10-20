import { useState, useEffect, useRef } from "react";
import { animate, AnimatePresence, motion, stagger } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { containerVariant } from "./landing";
import Sidebar from "../partials/sidebar";

const dashboardContainerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      when: 'afterChildren',
      staggerChildren: 0.1
    }
  }
}

const dashboardContentVariant = {
  hidden: {
    x: -50,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    }
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [blockChoice, setBlockChoice] = useState("");
  const [dashboardState, setDashboardState] = useState("main");
  const [jotContent, setJotContent] = useState({
    title: '',
    content: '',
  })
  const navigate = useNavigate();

  const handleSidebarClick = () => {
    setOpen((prev) => !prev);
  };

  const handleJotChoice = (e) => {
    const jotTopic = e.currentTarget.childNodes[0].childNodes[1].textContent;
    setBlockChoice(jotTopic);
    setDashboardState("pick");
  };

  const breadCrumbNavigator = (e) => {
    const thisCrumb = e.currentTarget.textContent;
    const thisCrumbContent = thisCrumb.toLowerCase();
    
    if (thisCrumbContent === 'dashboard') {
      setDashboardState('main');
    } else if (thisCrumbContent === 'sub-category') {
      setDashboardState('pick');
    } else if (thisCrumbContent === 'create jot') {
      setDashboardState('add');
    } else if (thisCrumbContent === 'jot categories') {
      setDashboardState('categories');
    } else if (thisCrumbContent === 'your jots') {
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

  useEffect(() => {
    /* I want to check for any changes in blockChoice. Of course,
    make it to where the userEffect doesn't run on first load, 
    If there is a change, I want to lead it into a new form. 
    This will be done in a ternary statement below.The blockChoice
    will be used to determine which component will be animated 
    and moved to the top of the page. The rest will fade out. */
  }, [blockChoice]);

  return (
    <motion.div
      className={`mainContainer dashboardContainer ${open ? "open" : ""}`}
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
      {
        dashboardState === 'main' ? (
          <div className="titleRowContainer">
            <div className="titleContainer">
              <h1 className="dashboardTitle">Dashboard</h1>
            </div>
            <Searchbar />
          </div>
        ) : dashboardState === 'pick' ? (
            <div className="subCategoryContainer">
              <div className="titleContainer">Sub-Category</div>
              <div className="breadcrumbContainer">
                <p onClick={(e) => breadCrumbNavigator(e)}>Dashboard</p>
                <p className="breadcrumbArrow">&#62;</p>
                <p onClick={(e) => breadCrumbNavigator(e)} className="currentLocation">Sub-Category</p>
              </div>
            </div>
        ) : (
            <>
            </>
        )
      }
      <AnimatePresence>
        <motion.div
         className='dashboardContent'
         layout
         >
          <DashboardCanvas>
            {dashboardState === 'main' ? (
              <p className="dashboardInstructions">
                Choose a category and start Jotting your thoughts
              </p>
            ) : (<></>)
            }
        
            <AnimatePresence
              mode="wait"
            >
              <motion.div
               className={`blockContainer ${dashboardState === 'pick' ? 'jotAdd' : ''}`}
               >
                {dashboardState === "main" ? (
                  <>
                    <motion.div
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    onClick={(e) => handleJotChoice(e)}>
                      <CodingDashboardBlock />
                    </motion.div>
                    <motion.div
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    onClick={(e) => handleJotChoice(e)}>
                      <MathDashboardBlock />
                    </motion.div>
                    <motion.div
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    onClick={(e) => handleJotChoice(e)}>
                      <ScienceDashboardBlock />
                    </motion.div>
                    <motion.div
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    onClick={(e) => handleJotChoice(e)}>
                      <FinanceDashboardBlock />
                    </motion.div>
                    <motion.div
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    onClick={(e) => handleJotChoice(e)}>
                      <LawDashboardBlock />
                    </motion.div>
                    <motion.div
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    onClick={(e) => handleJotChoice(e)}>
                      <EngineerDashboardBlock />
                    </motion.div>
                  </>
                ) : (
                  <>
                    {blockChoice.toLowerCase() === "coding" ? (
                      <motion.div
                      key="coding"
                      initial={{
                        y: 50,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        y: -50,
                        opacity: 0
                      }}
                      className="block">
                        <CodingDashboardBlock />
                      </motion.div>
                    ) : blockChoice.toLowerCase() === "math" ? (
                      <motion.div
                      key="math"
                      initial={{
                        y: 50,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        y: -50,
                        opacity: 0
                      }}
                      className="block">
                        <MathDashboardBlock />
                      </motion.div>
                    ) : blockChoice.toLowerCase() === "science" ? (
                      <motion.div
                      key="science"
                      initial={{
                        y: 50,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        y: -50,
                        opacity: 0
                      }}
                      className="block">
                        <ScienceDashboardBlock />
                      </motion.div>
                    ) : blockChoice.toLowerCase() === "finance" ? (
                      <motion.div
                      key="finance"
                      initial={{
                        y: 50,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        y: -50,
                        opacity: 0
                      }}
                      className="block">
                        <FinanceDashboardBlock />
                      </motion.div>
                    ) : blockChoice.toLowerCase() === "law" ? (
                      <motion.div
                      key="law"
                      initial={{
                        y: 50,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        y: -50,
                        opacity: 0
                      }}
                      className="block">
                        <LawDashboardBlock />
                      </motion.div>
                    ) : (
                      <motion.div
                      key="engineer"
                      initial={{
                        y: 50,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        y: -50,
                        opacity: 0
                      }}
                      className="block">
                        <EngineerDashboardBlock />
                      </motion.div>
                    )}
        
                    <p className="addTitle">Create your first sub-category</p>
                    <div className="mobileFormInputNoIcon jotChoiceInput">
                      <label htmlFor="category">Category Name</label>
                      <input
                       type="text"
                       name="category"
                       id="category"
                       onChange={(e) => setJotContent(prev => ({
                        ...prev,
                        content: e.target.value
                       }))}
                       />
                    </div>
                    <motion.button
                      type="submit"
                      className="landingSubmitButton jotSubmit"
                    >
                      Continue
                    </motion.button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </DashboardCanvas>
        </motion.div>
      </AnimatePresence>
      <MobileFooter />
    </motion.div>
  );
}

export default Dashboard;
