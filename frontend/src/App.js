import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import LandingPage from "./pages/landing";
import SignupPage from "./pages/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
