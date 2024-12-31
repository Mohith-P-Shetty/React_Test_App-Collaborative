// InformationSection.jsx
import { useSelector, useDispatch } from "react-redux";
import { Accordion, Button, ProgressBar, Modal } from "react-bootstrap";
import {
  setCurrentQuestion,
  setTotalPoints,
  submitTest,
} from "../../../redux/Slices/testMetaDataSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./InformationSection.css";

const InformationSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState({});
  const { candidateEmail, questions, currentQuestion, totalPoints } =
    useSelector((state) => state.testMetaData);
  const { candidateName, jobAppliedFor } = useSelector(
    (state) => state.globalData
  );

  const compileAnswers = () => {
    return questions.map((question) => ({
      questionId: question.questionId,
      category: question.category,
      correctOption: question.correctOption,
      selectedOption: question.selectedOption,
      timeTaken: question.timeTaken || 0, // Assuming timeTaken is tracked elsewhere
      point: question.points || 0,
    }));
  };
  const Marks = () => {
    // Calculate total points based on the current Redux state
    const total = questions.reduce((sum, question) => {
      // Ensure `point` is defined and numeric
      return sum + (question.points || 0);
    }, 0);
    // Dispatch the calculated total points to the Redux state
    dispatch(setTotalPoints(total));
  };

  const handleSubmit = () => {
    dispatch(submitTest());
    Marks();
    const compiledAnswers = compileAnswers();
    const currentResult = {
      candidateName,
      candidateEmail,
      jobAppliedFor,
      answers: compiledAnswers,
      score: totalPoints,
    };
    setResult(currentResult);
    setShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowModal(false);
    try {
      const response = await axios.post(
        "http://localhost:2000/api/results/addResult",
        result
      );
      console.log("Result submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting result:", error);
    }
    navigate("/resultpage");
  };

  const handleCancelSubmit = () => {
    setShowModal(false); // Close the modal
  };

  const sections = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {});

  const [timeLeft, setTimeLeft] = useState(360); // 6 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    Marks(); // Recalculate total points whenever questions are updated
  });

  const handleQuestionClick = (questionIndex) => {
    dispatch(setCurrentQuestion(questionIndex));
  };

  const progressPercentage = ((360 - timeLeft) / 360) * 100;

  return (
    <div className="information-section">
      <h3>Time remaining</h3>
      <p>{`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}</p>
      <ProgressBar className="progressbar" now={progressPercentage} />

      <Accordion className="accordion" defaultActiveKey="0">
        {Object.entries(sections).map(
          ([category, categoryQuestions], sectionIndex) => (
            <Accordion.Item eventKey={String(sectionIndex)} key={category}>
              <Accordion.Header>{category} Questions</Accordion.Header>
              <Accordion.Body>
                <div className="question-buttons">
                  {categoryQuestions.map((question, index) => {
                    const isCurrent =
                      questions[currentQuestion].questionId ===
                      question.questionId;
                    return (
                      <Button
                        key={question.questionId}
                        className="question-button"
                        onClick={() =>
                          handleQuestionClick(
                            questions.findIndex(
                              (q) => q.questionId === question.questionId
                            )
                          )
                        }
                        style={{
                          color: "black",
                          backgroundColor: isCurrent ? "red" : "white",
                          borderColor: "black",
                        }}
                      >
                        {index + 1}
                      </Button>
                    );
                  })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          )
        )}
      </Accordion>
      <Button
        className="submit-button
      "
        variant="outline-dark"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Modal show={showModal} onHide={handleCancelSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to submit the test? Once submitted, changes
          cannot be made.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelSubmit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit}>
            Confirm Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InformationSection;
