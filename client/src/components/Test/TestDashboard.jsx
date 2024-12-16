import { Row, Col } from "react-bootstrap";
import "./TestDashboard.css";
import Questions from "./Questions/Questions";
import { useSelector, useDispatch } from "react-redux";
import InformationSection from "./Information_section/InformationSection";
import { useEffect } from "react";
import {
  setQuestions,
  setCandidateEmail,
} from "../../redux/Slices/testMetaDataSlice"; // Import Redux actions

const TestDashboard = () => {
  const dispatch = useDispatch();

  // Fetch candidate info from global state
  const { candidateEmail, jobAppliedFor } = useSelector(
    (state) => state.globalData
  );
  console.log(jobAppliedFor);

  useEffect(() => {
    if (jobAppliedFor && candidateEmail) {
      const encodedValue = encodeURIComponent(jobAppliedFor);
      // Fetch questions based on jobAppliedFor
      fetch(`http://localhost:2000/api/questions/questions/job/${encodedValue}`)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          if (Array.isArray(data)) {
            const questions = data.map((question) => ({
              ...question,
              selectedOption: null, // Initially no option is selected
              visited: false, // Initially, the question hasn't been visited
              points: 0, // Default points, can be changed if needed
            }));

            // Dispatch questions to Redux
            dispatch(setQuestions(questions));
            dispatch(setCandidateEmail(candidateEmail));
          } else {
            console.error("Response data is not an array:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [jobAppliedFor, candidateEmail, dispatch]);

  return (
    <div className="test-dashboard-container">
      {/* Header */}
      <header className="test-dashboard-header">
        <h1>Test Page</h1>
      </header>

      {/* Main Content */}
      <main className="test-dashboard-main">
        <Row className="test-dashboard-row">
          <Col md={7} className="test-dashboard-questions">
            <Questions />
          </Col>

          <Col md={5} className="test-dashboard-info">
            <InformationSection />
          </Col>
        </Row>
      </main>

      {/* Footer */}
      <footer className="test-dashboard-footer">
        <p>© 2024 Test Page. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TestDashboard;
