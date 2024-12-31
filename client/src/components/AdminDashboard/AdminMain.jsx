import { useState } from "react";
import AdminNavbar from "./subcomponents/AdminNavbar";
import AdminDashboard from "./subcomponents/AdminDashboard";
import AdminResult from "./subcomponents/AdminResult";
import AdminQuestions from "./subcomponents/AdminQuestions";

function AdminMain() {
  const [activePage, setActivePage] = useState("dashboard"); // Default page is the dashboard
  const [isCollapsed, setIsCollapsed] = useState(false); // State for navbar collapse

  const adminPhoto = "https://via.placeholder.com/40"; // Replace with actual photo URL
  const adminEmail = "admin@example.com"; // Replace with actual email

  return (
    <div className="d-flex">
      {/* Admin Navbar on the left */}
      <AdminNavbar
        adminPhoto={adminPhoto}
        adminEmail={adminEmail}
        setActivePage={setActivePage}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Content Section */}
      <div
        className="content-container"
        style={{
          marginLeft: isCollapsed ? "80px" : "250px", // Adjust margin dynamically
          transition: "margin-left 0.3s ease",
          padding: "20px", // Optional padding for spacing
          width: "100%", // Ensures content spans the rest of the screen
        }}
      >
        {activePage === "dashboard" && <AdminDashboard />}
        {activePage === "result" && <AdminResult />}
        {activePage === "questions" && <AdminQuestions />}
      </div>
    </div>
  );
}

export default AdminMain;
