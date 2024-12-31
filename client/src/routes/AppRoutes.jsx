import "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CandidateLogin from "../pages/CandidateLogin";
import AdminLogin from "../pages/AdminLogin";
import TestPage from "../pages/TestPage";
import ResultPage from "../pages/ResultPage";
import AdminPage from "../pages/AdminPage";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/adminlogin" element={<AdminLogin />}></Route>
        <Route path="/candidatelogin" element={<CandidateLogin />}></Route>
        <Route path="/testpage" element={<TestPage />}></Route>
        <Route path="/adminpage" element={<AdminPage />}></Route>
        <Route path="/resultpage" element={<ResultPage />}></Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
