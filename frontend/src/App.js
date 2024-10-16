import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/api/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
