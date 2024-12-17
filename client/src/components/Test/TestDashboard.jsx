import { Row, Col } from "react-bootstrap";
import "./TestDashboard.css";
import Questions from "./Questions/Questions";
import { useSelector, useDispatch } from "react-redux";
import InformationSection from "./Information_section/InformationSection";
import { useEffect } from "react";
import {
  setQuestions,
  setCandidateEmail,
} from "../../redux/Slices/testMetaDataSlice";

const TestDashboard = () => {
  const dispatch = useDispatch();

  const { candidateEmail, jobAppliedFor } = useSelector(
    (state) => state.globalData
  );

  useEffect(() => {
    if (jobAppliedFor && candidateEmail) {
      const encodedValue = encodeURIComponent(jobAppliedFor);
      fetch(`http://localhost:2000/api/questions/questions/job/${encodedValue}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const questions = data.map((question) => ({
              ...question,
              selectedOption: null,
              visited: false,
              points: 0,
            }));
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
      <header className="test-dashboard-header">
        <h1>Test Page</h1>
      </header>
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
      <footer className="test-dashboard-footer">
        <p>© 2024 Test Page. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TestDashboard;
