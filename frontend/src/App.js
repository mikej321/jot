import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

function App() {
  const location = useLocation();
  /* Make a state that changes when the page is refreshed.
  This can be done in a function that will run in a useEffect
  that pays attention to the location.pathname changes. After changing
  the value of the state, it can then change that state back after changing
  pages. */

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={location.pathname}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/api/dashboard" element={<Dashboard />} />
      </Routes>
    </motion.div>
  );
}

export default App;
