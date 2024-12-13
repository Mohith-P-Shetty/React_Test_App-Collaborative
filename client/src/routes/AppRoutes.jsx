import "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CandidateLogin from "../pages/CandidateLogin";
import AdminLogin from "../pages/AdminLogin";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/adminlogin" element={<AdminLogin />}></Route>
        <Route path="/candidatelogin" element={<CandidateLogin />}></Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
