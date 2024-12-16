import { useSelector, useDispatch } from "react-redux";
import { Accordion, Button } from "react-bootstrap";
import { setCurrentQuestion } from "../../../redux/Slices/testMetaDataSlice";
import "./InformationSection.css";

const InformationSection = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestion } = useSelector(
    (state) => state.testMetaData
  );

  // Group questions by category while preserving their original indices
  const sections = questions.reduce((acc, question, index) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push({ ...question, originalIndex: index });
    return acc;
  }, {});

  // Flatten grouped questions to simplify navigation logic
  const flattenedQuestions = Object.values(sections).flat();

  // Handle button click to set the current question
  const handleQuestionClick = (questionIndex) => {
    dispatch(setCurrentQuestion(questionIndex));
  };

  // Determine button styles based on question state
  const getButtonStyles = (question, isCurrent) => {
    if (isCurrent) {
      return { backgroundColor: "red", color: "white", borderColor: "red" };
    }
    if (question.selectedOption) {
      return { backgroundColor: "white", color: "black", borderColor: "green" };
    }
    if (question.visited) {
      return { backgroundColor: "white", color: "black", borderColor: "red" };
    }
    return { backgroundColor: "white", color: "black", borderColor: "black" };
  };

  return (
    <div className="information-section">
      <h3>Question Information</h3>
      <p>Select a question to view or answer it.</p>

      <Accordion defaultActiveKey="0">
        {Object.entries(sections).map(
          ([category, categoryQuestions], sectionIndex) => (
            <Accordion.Item eventKey={String(sectionIndex)} key={category}>
              <Accordion.Header>{category} Questions</Accordion.Header>
              <Accordion.Body>
                <div className="question-buttons">
                  {categoryQuestions.map((question) => {
                    const isCurrent =
                      flattenedQuestions[currentQuestion].originalIndex ===
                      question.originalIndex;
                    return (
                      <Button
                        key={question.questionId}
                        className="question-button"
                        onClick={() =>
                          handleQuestionClick(question.originalIndex)
                        }
                        style={getButtonStyles(question, isCurrent)}
                      >
                        {question.originalIndex + 1}
                      </Button>
                    );
                  })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          )
        )}
      </Accordion>

      <div className="navigation-container">
        <Button
          variant="outline-dark"
          onClick={() => console.log("Submit Test")}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default InformationSection;
