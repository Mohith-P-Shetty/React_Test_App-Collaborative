import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCandidateName,
  setJobAppliedFor,
  setCandidateEmail,
} from "../../../redux/Slices/globalDataSlice";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import "./Candidate.css"; // Import custom styles to match the design

function Candidate() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    candidateName: "",
    gender: "",
    email: "",
    contactNo: "",
    source: "",
    qualifications: "",
    stream: "",
    yearOfPassing: "",
    collegename: "",
    referralcode: "",
    jobAppliedFor: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:2000/api/questions/jobs"
        );
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setAlertMessage("Failed to load job titles.");
      }
    };

    if (isLogin) {
      fetchJobs();
    }
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await fetch("http://localhost:2000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            jobAppliedFor: formData.jobAppliedFor,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setAlertMessage("Login successful.");
          dispatch(setCandidateName(data.user.candidateName));
          dispatch(setCandidateEmail(formData.email));
          dispatch(setJobAppliedFor(formData.jobAppliedFor));
          navigate("/testpage");
        } else {
          setAlertMessage(`Error: ${data.message}`);
        }
      } else {
        const response = await fetch(
          "http://localhost:2000/api/users/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setFormData({ ...formData, payment: false });
          setAlertMessage("Registration successful.");
          dispatch(setCandidateName(formData.candidateName));
          dispatch(setCandidateEmail(formData.email));
          dispatch(setJobAppliedFor(formData.jobAppliedFor));
          setIsLogin(true);
        } else {
          alert(`Error: ${data.message}`);
        }
      }
    } catch (error) {
      setAlertMessage(`Server error. Please try again later.${error}`);
    }
  };

  return (
    <div id="welcome">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="login-form-container">
            <h2 className="text-center mb-4">
              {isLogin ? "Candidate Login" : "Candidate Registration"}
            </h2>

            {alertMessage && <Alert variant="info">{alertMessage}</Alert>}

            <Form onSubmit={handleSubmit} className="custom-form">
              {!isLogin && (
                <>
                  <FormGroup>
                    <FormLabel>Candidate Name</FormLabel>
                    <FormControl
                      type="text"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Gender</FormLabel>
                    <FormControl
                      as="select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Contact No</FormLabel>
                    <FormControl
                      type="text"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Source</FormLabel>
                    <FormControl
                      as="select"
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Source</option>
                      <option value="College">College</option>
                      <option value="Referral">Referral</option>
                    </FormControl>
                  </FormGroup>
                  {formData.source === "College" && (
                    <FormGroup>
                      <FormLabel>College Name</FormLabel>
                      <FormControl
                        type="text"
                        name="collegename"
                        value={formData.collegename}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  )}
                  {formData.source === "Referral" && (
                    <FormGroup>
                      <FormLabel>Referral Code</FormLabel>
                      <FormControl
                        type="text"
                        name="referralcode"
                        value={formData.referralcode}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  )}
                  <FormGroup>
                    <FormLabel>Qualifications</FormLabel>
                    <FormControl
                      type="text"
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Stream</FormLabel>
                    <FormControl
                      type="text"
                      name="stream"
                      value={formData.stream}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Year of Passing</FormLabel>
                    <FormControl
                      type="number"
                      name="yearOfPassing"
                      value={formData.yearOfPassing}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </>
              )}

              {isLogin && (
                <>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                      placeholder="Enter your mail"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="custom-input"
                    />
                    <div className="line"></div>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Job Applied For</FormLabel>
                    <FormControl
                      as="select"
                      name="jobAppliedFor"
                      value={formData.jobAppliedFor}
                      onChange={handleChange}
                      required
                      className="custom-select"
                    >
                      <option value="">Select a Job</option>
                      {jobs.length > 0
                        ? jobs.map((job, index) => (
                            <option key={index} value={job}>
                              {job}
                            </option>
                          ))
                        : "Loading..."}
                    </FormControl>
                    <div className="line"></div>
                  </FormGroup>
                </>
              )}

              <Button
                variant="primary"
                type="submit"
                className="w-100 custom-button my-3"
              >
                {isLogin ? "Login" : "Register"}
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <p>
                {isLogin ? "Not registered? " : "Already have an account? "}
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="p-0"
                >
                  {isLogin ? "Register here" : "Login here"}
                </Button>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Candidate;
