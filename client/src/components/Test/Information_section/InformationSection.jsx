// InformationSection.jsx
import { useSelector, useDispatch } from "react-redux";
import { Accordion, Button, ProgressBar } from "react-bootstrap";
import { setCurrentQuestion } from "../../../redux/Slices/testMetaDataSlice";
import { useState, useEffect } from "react";
import "./InformationSection.css";

const InformationSection = () => {
  const dispatch = useDispatch();

  const { questions, currentQuestion } = useSelector(
    (state) => state.testMetaData
  );

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
        onClick={() => console.log("Submit Test")}
      >
        Submit
      </Button>
    </div>
  );
};

export default InformationSection;
