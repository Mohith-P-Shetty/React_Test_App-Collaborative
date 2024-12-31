import { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/landing/QuestLogo.png";

import "./Admin.css"; // Import the custom CSS file

function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload
    setError("");
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Simulated API call for admin login (replace with actual API call)
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin123") {
        alert("Login successful! Redirecting to Admin Page...");
        setLoading(false);
        navigate("/adminpage"); // Redirect to admin page
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Container>
      <Card className="Cls_Card_AdminloginCard">
        <Card.Header>
          <Row>
            <Col>
              <img src={logo} alt="Logo" className="Cls_logo" />
            </Col>
            <Col>
              <h1 className="Cls_heading  text-center rubik-cardsname">
                Quest Informatics
              </h1>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="justify-content-center">
            <Col xs={12} md={5}>
              <Card className="admin-card">
                <Card.Header className="text-center">
                  <h2>Admin Login</h2>
                </Card.Header>
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-100"
                      variant="primary"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Admin;
