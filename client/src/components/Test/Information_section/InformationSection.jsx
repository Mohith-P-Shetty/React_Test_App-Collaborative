import { useSelector, useDispatch } from "react-redux";
import { Accordion, Button } from "react-bootstrap";
import { setCurrentQuestion } from "../../../redux/Slices/testMetaDataSlice"; // Import Redux action
import "./InformationSection.css";

const InformationSection = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.testMetaData); // Get questions and current question index from Redux

  // Function to determine the button color based on the question's visited and selectedOption
  const getButtonClass = (question) => {
    if (question.selectedOption) {
      return "question-button answered"; // Green if answered
    } else if (question.visited) {
      return "question-button not-answered"; // Red if not answered but visited
    } else {
      return "question-button not-viewed"; // Gray if not visited
    }
  };

  // Group questions by category (section)
  const sections = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {});

  // Handle button click to navigate to a specific question
  const handleQuestionClick = (index) => {
    dispatch(setCurrentQuestion(index)); // Dispatch action to set the current question index
  };

  return (
    <div className="information-section">
      <h3>Question Information</h3>
      <p>Details about the test questions.</p>

      <Accordion defaultActiveKey="0">
        {Object.entries(sections).map(([category, questions], sectionIndex) => (
          <Accordion.Item eventKey={String(sectionIndex)} key={category}>
            <Accordion.Header>{category} Questions</Accordion.Header>
            <Accordion.Body>
              <div className="question-buttons">
                {questions.map((question, questionIndex) => (
                  <Button
                    key={question.questionId}
                    className={getButtonClass(question)}
                    onClick={() => handleQuestionClick(questionIndex)}
                    variant="outline-dark"
                  >
                    {questionIndex + 1} {/* Display the question number */}
                  </Button>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <div className="navigation-container">
        <Button variant="outline-dark">Submit</Button>
      </div>
    </div>
  );
};

export default InformationSection;
