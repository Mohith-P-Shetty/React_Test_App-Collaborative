import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ResultChart from "./ResultChart/ResultChart"; // Import the chart component
import "./Result.css"; // Import the CSS file for styling

function Result() {
  const navigate = useNavigate();
  const scoreData = {
    totalScore: 85,
    maxScore: 100,
    categories: [
      { name: "Math", score: 30, color: "#FF6384" },
      { name: "Analytical", score: 20, color: "#36A2EB" },
      { name: "Logical", score: 25, color: "#FFCE56" },
      { name: "Aptitude", score: 10, color: "#4BC0C0" },
    ],
  };

  const candidateInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    jobAppliedFor: "Software Engineer",
    score: 85,
  };

  const resultData = [
    {
      category: "Math",
      totalQuestions: 10,
      attended: 8,
      totalMarks: 20,
      obtainedMarks: 16,
    },
    {
      category: "Analytical",
      totalQuestions: 15,
      attended: 12,
      totalMarks: 30,
      obtainedMarks: 24,
    },
    {
      category: "Logical",
      totalQuestions: 10,
      attended: 9,
      totalMarks: 20,
      obtainedMarks: 18,
    },
  ];

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
      {/* First Row */}
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

      {/* Second Row */}
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
                  <td>{item.category}</td>
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
          <Button
            variant="primary"
            onClick={() => navigate("/")} // Change "/main" to your desired route
          >
            Done
          </Button>
        </div>
      </Row>
    </Container>
  );
}

export default Result;
