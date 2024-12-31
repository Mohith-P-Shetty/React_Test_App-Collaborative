/* eslint-disable react/prop-types */
import {Nav, Image, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaHome, FaChartBar, FaQuestionCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function AdminNavbar({ adminPhoto, adminEmail, setActivePage, isCollapsed, setIsCollapsed }) {
  return (
    <div
      className={`d-flex flex-column position-fixed top-0 start-0 vh-100 bg-light ${
        isCollapsed ? "collapsed-navbar" : "expanded-navbar"
      }`}
      style={{
        width: isCollapsed ? "80px" : "250px",
        transition: "width 0.3s ease",
      }}
    >
      {/* Toggle Button */}
      <Button
        variant="light"
        className="border-0 mt-2 mb-3 align-self-end me-2"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </Button>

      {/* Admin Info */}
      <Nav.Item className={`d-flex align-items-center mb-4 px-3 ${isCollapsed ? "justify-content-center" : ""}`}>
        <Image src={adminPhoto} roundedCircle height="40" width="40" alt="Admin" />
        {!isCollapsed && (
          <span className="ms-3 navbar-text text-truncate" style={{ maxWidth: "120px" }}>
            {adminEmail}
          </span>
        )}
      </Nav.Item>

      {/* Navigation Links */}
      <Nav className="flex-column">
        {/* Dashboard Link */}
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="dashboard-tooltip">Admin Dashboard</Tooltip>}
        >
          <Nav.Link
            className="d-flex align-items-center px-3 py-2"
            onClick={() => setActivePage("dashboard")}
          >
            <FaHome className="me-2" />
            {!isCollapsed && <span>Admin Dashboard</span>}
          </Nav.Link>
        </OverlayTrigger>

        {/* Results Link */}
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="result-tooltip">Admin Result</Tooltip>}
        >
          <Nav.Link
            className="d-flex align-items-center px-3 py-2"
            onClick={() => setActivePage("result")}
          >
            <FaChartBar className="me-2" />
            {!isCollapsed && <span>Admin Result</span>}
          </Nav.Link>
        </OverlayTrigger>

        {/* Questions Link */}
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="questions-tooltip">Admin Questions</Tooltip>}
        >
          <Nav.Link
            className="d-flex align-items-center px-3 py-2"
            onClick={() => setActivePage("questions")}
          >
            <FaQuestionCircle className="me-2" />
            {!isCollapsed && <span>Admin Questions</span>}
          </Nav.Link>
        </OverlayTrigger>
      </Nav>
    </div>
  );
}

export default AdminNavbar;
