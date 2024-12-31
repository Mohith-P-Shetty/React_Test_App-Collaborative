import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Landing.css";
import "react-bootstrap";
import logo from "../../assets/landing/QuestLogo.png";
import adminimg from "../../assets/landing/admin.gif";
import candidateimg from "../../assets/landing/candidate.gif";

function Landing() {
  const navigate = useNavigate();
  const handlecard1 = () => {
    navigate("/candidatelogin");
  };
  const handlecard2 = () => {
    navigate("/adminlogin");
  };
  return (
    <div className="Cls_div_landing_wrapper bg">
      <Container className="Cls_container">
        <Card className="Cls_MainCard">
          <Card.Header className="Cls_card_header d-flex align-items-center">
            <img src={logo} alt="Logo" className="Cls_logo" />
            <h1 className="Cls_heading flex-grow-1 text-center rubik-cardsname">
              Quest Informatics Test portal
            </h1>
          </Card.Header>
          <Card.Body className="kosugi-maru-regular">
            <Row>
              <Col>
                <Card onClick={handlecard1}>
                  <Card.Img
                    src={candidateimg}
                    className="card-img-top ps-5 pe-5 "
                    alt="Admin Login GIF"
                    style={{ height: "300px", width: "400px" }}
                  />
                  <Card.Header>Candidate Login</Card.Header>
                </Card>
              </Col>
              <Col>
                <Card onClick={handlecard2}>
                  <Card.Img
                    src={adminimg}
                    className="card-img-top ps-5 pe-5"
                    alt="Admin Login GIF"
                    style={{ height: "300px", width: "400px" }}
                  />
                  <Card.Header>Admin Login</Card.Header>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Landing;
