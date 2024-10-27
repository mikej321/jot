import { useState, useEffect, useRef } from "react";
import { animate, AnimatePresence, motion, stagger } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleMinus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DashboardNav from "../partials/dashboardNav";
import Searchbar from "../partials/searchbar";
import DashboardCanvas from "../partials/components/dashboardCanvas";
import MobileFooter from "../partials/mobileFooter";
import Sidebar from "../partials/sidebar";
import axios from "axios";
import CreateIndicator from "../partials/components/createIndicator";
import JotContentInput from "../partials/components/jotContentInput";
import JotTitleInput from "../partials/components/JotTitleInput";
import JotPanelButton from "../partials/components/jotPanelButton";
import "../styles/dashboard.css";

const dashboardHeaderVariant = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const dashboardChildVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const jotVariant = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [dashboardState, setDashboardState] = useState("main");
  const [jotContent, setJotContent] = useState({
    title: "",
    content: "",
  });
  const [userJots, setUserJots] = useState([]);
  const navigate = useNavigate();

  const handleSidebarClick = () => {
    setOpen((prev) => !prev);
  };

  const handleFooter = (key) => {
    setDashboardState(key);
  };

  const grabJotTitle = (e) => {
    setJotContent((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const grabJotContent = (e) => {
    setJotContent((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const submitJot = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/dashboard/jot-add",
        {
          title: jotContent.title,
          content: jotContent.content,
        },
        {
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDashboardState("jots");
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else if (err.request) {
        console.error("No response from server");
      }
    }
  };

  const getJots = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/get-jots",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const jots = response.data;
      setUserJots(jots);
    } catch (err) {
      if (err.response) {
        console.error(err.response);
      } else if (err.request) {
        console.error("No response from server");
      }
    }
  };

  const deleteJots = async (jotId) => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .delete(`http://localhost:5000/api/dashboard/delete-jot/${jotId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
        setUserJots(prev => ({
          ...prev,
          // I learned that mutating a state can cause unneccesary re-renders
          // This will cause issues in framer motion, so it's best
          // to use the filter function to change an array state without
          // mutating it.
          jots: prev.jots.filter(jot => jot.id !== jotId)
           
        }))
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("Error", err.message);
      }

      console.log(err.config);
    }
  };

  const breadCrumbNavigator = (e) => {
    const thisCrumb = e.currentTarget.textContent;
    const thisCrumbContent = thisCrumb.toLowerCase();

    if (thisCrumbContent === "dashboard") {
      setDashboardState("main");
    } else if (thisCrumbContent === "create") {
      setDashboardState("add");
    } else if (thisCrumbContent === "Your jots") {
      setDashboardState("jots");
    } else if (thisCrumbContent === "about me") {
      setDashboardState("about");
    } else if (thisCrumbContent === "how to use") {
      setDashboardState("instructions");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    getJots();
  }, [userJots]);

  /* Figure out why it isn't correctly grabbing jots
  from the database on load from the login page. */

  return (
    <motion.div
      className={`mainContainer dashboardContainer ${open ? "open" : ""} ${
        dashboardState === "main"
          ? "mainDashboard"
          : dashboardState === "jots"
          ? "jotDashboard"
          : dashboardState === "add"
          ? "addDashboard"
          : ""
      }`}
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
        {dashboardState === "main" ? (
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
        ) : dashboardState === "jots" ? (
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
              <p
                onClick={(e) => breadCrumbNavigator(e)}
                className="currentLocation"
              >
                Your Jots
              </p>
            </div>
          </motion.div>
        ) : dashboardState === "add" ? (
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
              <p
                onClick={(e) => breadCrumbNavigator(e)}
                className="currentLocation"
              >
                Create Jot
              </p>
            </div>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
      {/* I'll have to add a ternary condition to check if the users jot contents
      in the server is empty. If it is, it'll display the 'main' dashboardState
      whereas if it isn't, it'll display the 'jots' dashboardState containing a list
      of the user's jots */}

      <DashboardCanvas dashboardState={dashboardState}>
        <AnimatePresence>
          {dashboardState === "main" && userJots.jots === undefined ? (
            <p>Loading Jots.....</p>
          ) : dashboardState === "main" && userJots.jots.length >= 0 ? (
            <>
              <motion.div
                className="dashboardTextContent"
                variants={dashboardChildVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key="main-1"
              >
                <p className="dashboardIntro">
                  You have{" "}
                  <span className="jotAmount">{userJots.jots.length}</span> jots
                </p>
                <p className="addInstructions">Add your first jot!</p>
              </motion.div>
              <motion.button
                type="button"
                className="continueButton"
                onClick={() => {
                  setDashboardState("add");
                }}
                initial={{
                  scale: 1,
                }}
                whileHover={{
                  scale: [1, 1.05],
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
                key="main-2"
              >
                Continue
              </motion.button>
            </>
          ) : dashboardState === "jots" && userJots.jots === undefined ? (
            <p>Loading Jots...</p>
          ) : dashboardState === "jots" && userJots.jots.length > 0 ? (
            <>
              <AnimatePresence>
                {userJots.jots.length > 0 ? (
                  userJots.jots.map((userJot, index) => (
                      <motion.div
                        className="panelButtonContainer"
                        variants={jotVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        key={userJot.id}
                      >
                        <p className="panelTitle">{userJot.title}</p>
                        <motion.div onClick={() => deleteJots(userJot.id)}>
                          <FontAwesomeIcon
                            className="trash"
                            icon={faTrash}
                          />
                        </motion.div>
                      </motion.div>
                  ))
                ) : (
                  <>
                    <p>Please add a jot</p>
                  </>
                )}
              </AnimatePresence>
            </>
          ) : dashboardState === "add" ? (
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
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
                onClick={() => {
                  setDashboardState("jots");
                  submitJot();
                  getJots();
                }}
                key="add-4"
              >
                Continue
              </motion.button>
            </>
          ) : (
            <></>
          )}
        </AnimatePresence>
      </DashboardCanvas>

      <MobileFooter getJots={getJots} handleFooter={handleFooter} />
    </motion.div>
  );
}

/* Figure out how to get my jots to display on the jots page. They are already
being sent over to state properly from the GET request. Also figure out
how to get the mobile footer working properly. I probably have to send a function
down through state that alters the dashboardState. Once I'm done with that, I'll just be
left with edit and removal requests. */

export default Dashboard;
