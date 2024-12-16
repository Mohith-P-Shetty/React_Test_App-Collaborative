import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch for Redux
import {
  setCandidateName,
  setJobAppliedFor,
  setCandidateEmail,
} from "../../../redux/Slices/globalDataSlice"; // Import Redux actions
import {
  Card,
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Alert,
} from "react-bootstrap";

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
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch for Redux

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login API call
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
          // Dispatch Redux actions
          dispatch(setCandidateName(formData.candidateName));
          dispatch(setCandidateEmail(formData.email));
          dispatch(setJobAppliedFor(formData.jobAppliedFor));
          navigate("/testpage");
        } else {
          setAlertMessage(`Error: ${data.message}`);
        }
      } else {
        // Registration API call
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
          setFormData({ ...formData, payment: false }); // Set payment to false after successful registration
          setAlertMessage("Registration successful.");
          // Dispatch Redux actions
          dispatch(setCandidateName(formData.candidateName));
          dispatch(setCandidateEmail(formData.email));
          dispatch(setJobAppliedFor(formData.jobAppliedFor));
          setIsLogin(true); // Redirect to user dashboard or home
        } else {
          alert(`Error: ${data.message}`);
        }
      }
    } catch (error) {
      setAlertMessage(`Server error. Please try again later.${error}`);
    }
  };

  return (
    <div>
      <Card className="m-3">
        <Form onSubmit={handleSubmit}>
          <h3 className="text-center my-3">{isLogin ? "Login" : "Register"}</h3>
          {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
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
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Job Applied For</FormLabel>
                <FormControl
                  type="text"
                  name="jobAppliedFor"
                  value={formData.jobAppliedFor}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </>
          )}
          <Button variant="outline-dark" type="submit" className="my-3">
            {isLogin ? "Login" : "Register"}
          </Button>
        </Form>
        <Button
          variant="outline-dark"
          onClick={() => setIsLogin(!isLogin)}
          className="my-3"
        >
          {isLogin ? "Register" : "Login"}
        </Button>
      </Card>
    </div>
  );
}

export default Candidate;
