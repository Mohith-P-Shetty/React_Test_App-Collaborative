import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Landing.css";
import "react-bootstrap";

function Landing() {
  const navigate = useNavigate();
  const handlecard1 = () => {
    navigate("/candidatelogin");
  };
  const handlecard2 = () => {
    navigate("/adminlogin");
  };
  return (
    <div className="Cls_div_landing_wrapper">
      <Container>
        <Row>
          <Col>
            <Card onClick={handlecard1}>CandidateLogin</Card>
          </Col>
          <Col>
            <Card onClick={handlecard2}>AdminLogin</Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Landing;
