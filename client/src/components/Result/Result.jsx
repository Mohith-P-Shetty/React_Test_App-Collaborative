import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // For accessing Redux state
import ResultChart from "./ResultChart/ResultChart";
import "./Result.css";
import axios from "axios";

function Result() {
  const navigate = useNavigate();
  const { candidateEmail, jobAppliedFor } = useSelector(
    (state) => state.globalData
  );
  const resultid = `${candidateEmail}_${jobAppliedFor}`;
  console.log(resultid);

  const [resultData, setResultData] = useState([]);
  const [candidateInfo, setCandidateInfo] = useState({
    name: "",
    email: "",
    jobAppliedFor: "",
    score: 0,
  });
  const [scoreData, setScoreData] = useState({
    totalScore: 0,
    maxScore: 0,
    categories: [],
  });

  useEffect(() => {
    const fetchResult = async () => {
      if (!resultid) return; // Ensure resultid is available

      try {
        const response = await axios.post(
          `http://localhost:2000/api/results/getResultById`,
          resultid
        );
        const data = response.data;

        // Set candidate info
        setCandidateInfo({
          name: data.candidateName,
          email: data.candidateEmail,
          jobAppliedFor: data.jobAppliedFor,
          score: data.score,
        });

        // Process categories and scoreData
        const categories = {};
        data.answers.forEach((answer) => {
          if (!categories[answer.category]) {
            categories[answer.category] = {
              totalQuestions: 0,
              attended: 0,
              totalMarks: 0,
              obtainedMarks: 0,
              color: getCategoryColor(answer.category),
            };
          }
          const category = categories[answer.category];
          category.totalQuestions += 1;
          category.attended += answer.selectedOption ? 1 : 0;
          category.totalMarks += 1;
          category.obtainedMarks += answer.point || 0;
        });

        const categoriesArray = Object.entries(categories).map(
          ([name, data]) => ({
            name,
            ...data,
          })
        );

        setResultData(categoriesArray);

        setScoreData({
          totalScore: data.score,
          maxScore: Object.values(categories).reduce(
            (acc, cat) => acc + cat.totalMarks,
            0
          ),
          categories: categoriesArray.map((cat) => ({
            name: cat.name,
            score: cat.obtainedMarks,
            color: cat.color,
          })),
        });
      } catch (error) {
        console.error("Error fetching result data:", error);
      }
    };

    fetchResult();
  }, [resultid]);

  const getCategoryColor = (category) => {
    const colors = {
      Math: "#FF6384",
      Analytical: "#36A2EB",
      Logical: "#FFCE56",
      Aptitude: "#4BC0C0",
    };
    return colors[category] || "#888888";
  };

  const totals = resultData.reduce(
    (acc, item) => {
      acc.totalQuestions += item.totalQuestions;
      acc.attended += item.attended;
      acc.totalMarks += item.totalMarks;
      acc.obtainedMarks += item.obtainedMarks;
      return acc;
    },
    { totalQuestions: 0, attended: 0, totalMarks: 0, obtainedMarks: 0 }
  );

  return (
    <Container fluid className="result-container">
      <Row className="result-row candidate-info-row">
        <Col xs={12} md={4} className="candidate-info">
          <h4>Candidate Information</h4>
          <p>
            <strong>Name:</strong> {candidateInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {candidateInfo.email}
          </p>
          <p>
            <strong>Job Applied For:</strong> {candidateInfo.jobAppliedFor}
          </p>
        </Col>
        <Col xs={12} md={8} className="chart-container">
          <ResultChart scoreData={scoreData} />
        </Col>
      </Row>

      <Row className="result-row result-table-row">
        <div className="table-responsive result-table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Questions</th>
                <th>Attended Questions</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.totalQuestions}</td>
                  <td>{item.attended}</td>
                  <td>{item.totalMarks}</td>
                  <td>{item.obtainedMarks}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{totals.totalQuestions}</strong>
                </td>
                <td>
                  <strong>{totals.attended}</strong>
                </td>
                <td>
                  <strong>{totals.totalMarks}</strong>
                </td>
                <td>
                  <strong>{totals.obtainedMarks}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="text-center">
          <Button variant="primary" onClick={() => navigate("/")}>
            Done
          </Button>
        </div>
      </Row>
    </Container>
  );
}

export default Result;
