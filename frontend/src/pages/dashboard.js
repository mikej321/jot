import { useState, useEffect, useRef } from "react";
import { animate, AnimatePresence, motion, stagger } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleMinus,
  faEllipsisVertical,
  faTrash,
  faX,
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
import "../styles/InputForm.css";


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

const panelButtonContainerVariant = {
  start: {
    maxHeight: "60px",
    gridTemplateRows: "40px",
  },
  unclicked: {
    maxHeight: "60px",
    gridTemplateRows: "40px",
    transition: {
      // when: "afterChildren",
    },
  },
  clicked: {
    maxHeight: "500px",
    gridTemplateRows: "40px auto",
    transition: {
      // when: "beforeChildren",
    },
  },
};

const jotTitleVariant = {
  // unclicked: {
  //   y: 0,
  //   transition: {
  //     duration: 0.4,
  //     ease: 'easeIn'
  //   }
  // },
  // clicked: {
  //   y: 20,
  //   transition: {
  //     duration: 0.4,
  //     ease: 'easeOut'
  //   }
  // }
};

const jotContentVariant = {
  hidden: {
    maxHeight: 0,
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
  exit: {
    maxHeight: 0,
    opacity: 0,
    y: -20,
    transition: {
      maxHeight: {
        duration: 0.2,
        ease: "easeInOut",
      },
      opacity: {
        duration: 0.2,
      },
      y: {
        duration: 0.2,
        type: "bounce",
        ease: "easeInOut",
      },
    },
  },
  clicked: {
    maxHeight: "500px",
    opacity: 1,
    y: 0,
    transition: {
      maxHeight: {
        duration: 0.2,
        type: "spring",
        ease: "linear",
      },
      opacity: {
        duration: 0.2,
      },
      y: {
        duration: 0.2,
        type: "spring",
        ease: "linear",
      },
    },
  },
};

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [dashboardState, setDashboardState] = useState("jots");
  const [jotContent, setJotContent] = useState({
    title: "",
    content: "",
  });
  const [userJots, setUserJots] = useState([]);
  const [clickedId, setClickedId] = useState({
    ids: [],
  });
  const [settingsId, setSettingsID] = useState({
    clickedId: undefined,
    ids: [],
    titleClicked: false,
    contentClicked: false,
    startUpdate: false,
  });
  const [editValue, setEditValue] = useState({
    titleEditVal: "",
    contentEditVal: "",
  });
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

  const updateJotTitle = async (jotId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/dashboard/edit-jot-title/${jotId}`,
        {
          title: editValue.titleEditVal,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      )
    } catch(err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else if (err.request) {
        console.error('no response from server');
      }
    }
  };

  const updateJotContent = async (jotId) => {
    const token = localStorage.getItem('token');
    

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/dashboard/edit-jot-content/${jotId}`,
        {
          content: editValue.contentEditVal,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      )
    } catch(err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else if (err.request) {
        console.error('no response from server');
      }
    }
  };
  
  const submitJot = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/dashboard/jot-add`,
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
        `${process.env.REACT_APP_API_URL}/api/dashboard/get-jots`,
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
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/dashboard/delete-jot/${jotId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setUserJots((prev) => ({
        ...prev,
        // I learned that mutating a state can cause unneccesary re-renders
        // This will cause issues in framer motion, so it's best
        // to use the filter function to change an array state without
        // mutating it.
        jots: prev.jots.filter((jot) => jot.id !== jotId),
      }));
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

  const handleEdit = (jotID, title, content) => {
    setEditValue({
      titleEditVal: title,
      contentEditVal: content
    })
    setSettingsID((prev) => ({
      ...prev,
      clickedId: jotID,
      ids: prev.ids.includes(jotID)
        ? prev.ids.filter((id) => id !== jotID)
        : [...prev.ids, jotID],
    }));
  }
  
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

  const animateJotOnClick = (jotId) => {
    setClickedId((prev) => ({
      ...prev,
      ids: prev.ids.includes(jotId) // If my state array has the JotId of the clicked element already in it
        ? prev.ids.filter((id) => id !== jotId) // Then remove it
        : [...prev.ids, jotId], // Else add it to the array
    }));
  };

  const animateEllipsesOnClick = (jotId) => {
    
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
          dashboardState === "jots"
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
        { dashboardState === "jots" ? (
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
          { dashboardState === "jots" && userJots.jots === undefined ? (
            <p>Loading Jots...</p>
          ) : dashboardState === "jots" && userJots.jots.length > 0 ? (
            <>
              <AnimatePresence>
                {userJots.jots.length > 0 ? (
                  userJots.jots.map((userJot, index) => (
                    <motion.div
                      className="panelButtonContainer"
                      key={userJot.id}
                      variants={panelButtonContainerVariant}
                      animate={
                        clickedId.ids.includes(userJot.id)
                          ? "clicked"
                          : "unclicked"
                      }
                      
                      onClick={() => animateJotOnClick(userJot.id)}
                      style={{
                        gridTemplateAreas: clickedId.ids.includes(userJot.id)
                          ? `"jotTitle" "jotContent"`
                          : `"jotTitle"`,
                      }}
                      layout
                    >
                      <motion.div
                        className="panelTitleContainer"
                        variants={jotTitleVariant}
                        initial="unclicked"
                        animate={
                          clickedId.ids.includes(userJot.id)
                            ? "clicked"
                            : "unclicked"
                        }
                        layout
                      >
                        <motion.p className="panelTitle">
                          {userJot.title}
                        </motion.p>
                        <motion.div
                          initial={{
                            scale: 1
                          }}
                          whileHover={{
                            scale: [1, 1.3],
                            transition: {
                              duration: 0.8,
                              type: "tween",
                              ease: "linear",
                              repeat: Infinity,
                              repeatType: "reverse",
                              repeatDelay: .5,
                            }
                          }}
                          
                        >
                          <FontAwesomeIcon
                            className="ellipsis"
                            icon={faEllipsisVertical}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(userJot.id, userJot.title, userJot.content);
                            }}
                          />
                        </motion.div>
                        <AnimatePresence initial="false">
                          {settingsId.ids.includes(userJot.id) &&
                          !settingsId.titleClicked &&
                          !settingsId.contentClicked &&
                          settingsId.clickedId === userJot.id ? (
                            <motion.ul
                              className="settingsContainer"
                              key={userJot.id}
                              initial={{
                                opacity: 0,
                                y: 0,
                              }}
                              animate={{
                                opacity: settingsId.ids.includes(userJot.id)
                                  ? 1
                                  : 0,
                                y: settingsId.ids.includes(userJot.id)
                                  ? -50
                                  : 0,
                                transition: {
                                  duration: 0.2,
                                },
                              }}
                              exit={{
                                opacity: 0,
                                y: 0,
                                transition: {
                                  duration: 0.2,
                                },
                              }}
                            >
                              <motion.div
                                className="xiconContainer"
                                initial={{
                                  scale: 1,
                                }}
                                whileHover={{
                                  scale: [1, 1.3],
                                  transition: {
                                    duration: 0.8,
                                    type: "tween",
                                    ease: "linear",
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    repeatDelay: .5,
                                  }
                                }}
                              >
                                <FontAwesomeIcon
                                 icon={faX}
                                 className="xicon"
                                 onClick={(e) => {
                                  e.stopPropagation();
                                  setSettingsID((prev) => ({
                                    ...prev,
                                    ids: [],
                                    clickedId: undefined,
                                  }))
                                 }}
                                 />
                              </motion.div>
                              <motion.li
                                initial={{
                                  opacity: 0,
                                  x: -20,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  transition: {
                                    duration: 0.2,
                                    delay: 0.2,
                                    type: "spring",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSettingsID((prev) => ({
                                    ...prev,
                                    titleClicked: !prev.titleClicked,
                                    startUpdate: !prev.startUpdate
                                  }))
                                }}
                              >
                                Edit Title
                              </motion.li>
                              <motion.li
                                initial={{
                                  opacity: 0,
                                  x: -20,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  transition: {
                                    duration: 0.2,
                                    delay: 0.4,
                                    type: "spring",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSettingsID((prev) => ({
                                    ...prev,
                                    contentClicked: !prev.contentClicked,
                                    startUpdate: !prev.startUpdate,
                                  }))
                                }}
                              >
                                Edit Content
                              </motion.li>
                            </motion.ul>
                          ) : settingsId.ids.includes(userJot.id) &&
                            settingsId.titleClicked &&
                            !settingsId.contentClicked &&
                            settingsId.startUpdate ? (
                            <motion.div
                             className="editContainer"
                             onClick={(e) => {
                              e.stopPropagation();
                             }}
                             >
                              <motion.div
                                className="xiconContainer"
                                initial={{
                                  scale: 1,
                                }}
                                whileHover={{
                                  scale: [1, 1.1],
                                  transition: {
                                    duration: 0.8,
                                    type: "tween",
                                    ease: "linear",
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    repeatDelay: .5,
                                  }
                                }}
                              >
                                <FontAwesomeIcon
                                 icon={faX}
                                 className="xicon"
                                 onClick={(e) => {
                                  e.stopPropagation();
                                  setSettingsID((prev) => ({
                                    ...prev,
                                    ids: [],
                                    clickedId: undefined,
                                    titleClicked: false,
                                    contentClicked: false,
                                    startUpdate: false,
                                  }))
                                 }}
                                 />
                              </motion.div>
                              <motion.div
                                className="jotTitleInput"
                                variants={dashboardChildVariants}
                                initial={{
                                  opacity: 0,
                                  x: -20,
                                }}
                                animate="visible"
                                exit="exit"
                                key="add-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <motion.label
                                  className="jotTitleLabel"
                                  htmlFor="title"
                                >
                                  Jot Title
                                </motion.label>
                                <input
                                  type="text"
                                  name="title"
                                  id="jotTitle"
                                  value={editValue.titleEditVal}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  onChange={(e) => {
                                    setEditValue((prev) => ({
                                      ...prev,
                                      titleEditVal: e.target.value,
                                    }));
                                    setJotContent((prev) => ({
                                      ...prev,
                                      title: e.target.value,
                                    }))
                                  }}
                                />
                              </motion.div>
                              <motion.button
                               type="button" 
                               className="continueButton"
                               onClick={() => {
                                updateJotTitle(userJot.id)
                                setSettingsID((prev) => ({
                                  ...prev,
                                  startUpdate: false,
                                  clickedId: undefined,
                                  contentClicked: false,
                                  ids: [],
                                  titleClicked: false,
                                }))
                               }}
                               >
                                Complete
                              </motion.button>
                            </motion.div>
                          ) : settingsId.ids.includes(userJot.id) &&
                            !settingsId.titleClicked &&
                            settingsId.contentClicked &&
                            settingsId.startUpdate ? (
                            <motion.div
                             className="editContainer"
                             onClick={(e) => {
                              e.stopPropagation();
                             }}
                             >
                              <motion.div>
                                <FontAwesomeIcon
                                 icon={faX}
                                 className="xicon"
                                 onClick={(e) => {
                                  e.stopPropagation();
                                  setSettingsID((prev) => ({
                                    ...prev,
                                    ids: [],
                                    clickedId: undefined,
                                    contentClicked: false,
                                    startUpdate: false,
                                    titleClicked: false,
                                  }))
                                 }}
                                 />
                              </motion.div>
                              <motion.div
                                className="contentInputContainer"
                                variants={dashboardChildVariants}
                                initial={{
                                  opacity: 0,
                                  x: -30,
                                }}
                                animate="visible"
                                exit="exit"
                                key="add-3"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <motion.label
                                  htmlFor="content"
                                  className="jotTitleLabel"
                                >
                                  Jot Content
                                </motion.label>
                                <textarea
                                  name="content"
                                  id="content"
                                  className="defaultValue"
                                  value={editValue.contentEditVal}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  onChange={(e) => {
                                    setEditValue((prev) => ({
                                      ...prev,
                                      contentEditVal: e.target.value,
                                    }))
                                    setJotContent((prev) => ({
                                      ...prev,
                                      content: e.target.value,
                                    }))
                                  }}
                                />
                              </motion.div>
                              <motion.button
                               type="button" 
                               className="continueButton"
                               onClick={() => {
                                updateJotContent(userJot.id);
                                setSettingsID((prev) => ({
                                  ...prev,
                                  startUpdate: false,
                                  clickedId: undefined,
                                  contentClicked: false,
                                  ids: [],
                                  titleClicked: false,
                                }))
                               }}
                               >
                                Complete
                              </motion.button>
                            </motion.div>
                          ) : (
                            <></>
                          )}
                        </AnimatePresence>
                        <motion.div
                          className="trashContainer"
                          onClick={() => deleteJots(userJot.id)}
                          initial={{
                            scale: 1,
                          }}
                          whileHover={{
                            scale: [1, 1.1],
                            transition: {
                              duration: 0.8,
                              type: "tween",
                              ease: "linear",
                              repeat: Infinity,
                              repeatType: "reverse",
                              repeatDelay: .5,
                            }
                          }}
                        >
                          <FontAwesomeIcon className="trash" icon={faTrash} />
                        </motion.div>
                      </motion.div>
                      <motion.p
                        className="panelContent"
                        key={index}
                        variants={jotContentVariant}
                        initial="hidden"
                        animate={
                          clickedId.ids.includes(userJot.id)
                            ? "clicked"
                            : "exit"
                        }
                        layout
                      >
                        {userJot.content}
                      </motion.p>
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
