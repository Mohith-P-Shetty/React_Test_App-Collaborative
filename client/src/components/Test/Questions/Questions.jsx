import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import {
  setCurrentQuestion,
  selectOption,
} from "../../../redux/Slices/testMetaDataSlice"; // Import actions
import "./Questions.css";
const Questions = () => {
  const dispatch = useDispatch();

  // Fetch data from Redux store
  const { questions, currentQuestion } = useSelector(
    (state) => state.testMetaData
  );

  // Check if questions or currentQuestion is not loaded yet
  if (!questions || currentQuestion === undefined) {
    return <div>Loading...</div>; // Handle loading state
  }

  // Get the current question data
  const currentQuestionData = questions[currentQuestion];

  // If currentQuestionData is undefined, display an error or loading state
  if (!currentQuestionData) {
    return <div>Error: Question not found</div>;
  }

  // Get the current category from the current question
  const currentCategory = currentQuestionData?.category;

  // If category is not found, show an error message
  if (!currentCategory) {
    return <div>Error: Category not found</div>;
  }

  // Find all categories in the questions
  const categories = Array.from(new Set(questions.map((q) => q.category)));

  // Get all questions in the same category as the current question
  const currentCategoryQuestions = questions.filter(
    (q) => q.category === currentCategory
  );

  // Find the index of the current question within the current category
  const categoryIndex = currentCategoryQuestions.findIndex(
    (q) => q.questionId === currentQuestionData.questionId
  );

  // Get the index of the current category globally
  const currentCategoryIndex = categories.findIndex(
    (cat) => cat === currentCategory
  );

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (categoryIndex > 0) {
      // Navigate within the current category
      const newQuestion = currentCategoryQuestions[categoryIndex - 1];
      const newIndex = questions.findIndex(
        (q) => q.questionId === newQuestion.questionId
      );
      dispatch(setCurrentQuestion(newIndex));
    } else if (currentCategoryIndex > 0) {
      // Navigate to the previous category
      const previousCategory = categories[currentCategoryIndex - 1];
      const previousCategoryQuestions = questions.filter(
        (q) => q.category === previousCategory
      );
      const newQuestion =
        previousCategoryQuestions[previousCategoryQuestions.length - 1];
      const newIndex = questions.findIndex(
        (q) => q.questionId === newQuestion.questionId
      );
      dispatch(setCurrentQuestion(newIndex));
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (categoryIndex < currentCategoryQuestions.length - 1) {
      // Navigate within the current category
      const newQuestion = currentCategoryQuestions[categoryIndex + 1];
      const newIndex = questions.findIndex(
        (q) => q.questionId === newQuestion.questionId
      );
      dispatch(setCurrentQuestion(newIndex));
    } else if (currentCategoryIndex < categories.length - 1) {
      // Navigate to the next category
      const nextCategory = categories[currentCategoryIndex + 1];
      const nextCategoryQuestions = questions.filter(
        (q) => q.category === nextCategory
      );
      const newQuestion = nextCategoryQuestions[0];
      const newIndex = questions.findIndex(
        (q) => q.questionId === newQuestion.questionId
      );
      dispatch(setCurrentQuestion(newIndex));
    }
  };

  // Handle option selection
  const handleOptionSelect = (selectedOption) => {
    // Dispatch the selectOption action to update the selected option in the Redux store
    dispatch(
      selectOption({
        questionId: currentQuestionData.questionId,
        selectedOption,
      })
    );
  };

  return (
    <div className="question-wrapper">
      <h3>{currentCategory}</h3>

      <div className="question-display">
        <p>Q.{currentQuestionData.question}</p>
        {/* Render options for the current question */}
        {currentQuestionData.options.map((option, index) => (
          <div className="options" key={index}>
            <Form.Check
              type="radio"
              id={option}
              name="option"
              value={option}
              label={option} // Automatically generates the label for the radio button
              checked={currentQuestionData.selectedOption === option} // Selects the radio button if this option is chosen
              onChange={() => handleOptionSelect(option)} // Updates state with the selected option
              className="option"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="nav-buttons">
        <Button
          variant="outline-dark"
          onClick={handlePrevious}
          disabled={
            currentCategoryIndex === 0 && categoryIndex === 0 // Disable at the very first question
          }
        >
          Previous
        </Button>
        <Button
          variant="outline-dark"
          onClick={handleNext}
          disabled={
            currentCategoryIndex === categories.length - 1 &&
            categoryIndex === currentCategoryQuestions.length - 1 // Disable at the very last question
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Questions;
