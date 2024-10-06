import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import LandingPage from "./pages/landing";
import SignupPage from "./pages/signup";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
