import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentQuestion,
  selectOption,
} from "../../../redux/Slices/testMetaDataSlice"; // Import actions

const Questions = () => {
  const dispatch = useDispatch();

  // Fetch data from Redux store
  const { questions, currentQuestion } = useSelector(
    (state) => state.testMetaData
  );

  // Group questions by category
  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {});

  // Flatten grouped questions for sequential navigation
  const flattenedQuestions = Object.values(groupedQuestions).flat();

  // Get the current question object using the flattened index
  const currentQuestionData = flattenedQuestions[currentQuestion];

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      dispatch(setCurrentQuestion(currentQuestion - 1)); // Update the current question index in Redux
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (currentQuestion < flattenedQuestions.length - 1) {
      dispatch(setCurrentQuestion(currentQuestion + 1)); // Update the current question index in Redux
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

  // If no questions are loaded, display a loading message
  if (!currentQuestionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display the category */}
      <h3>{currentQuestionData.category} Section</h3>

      {/* Display the current question */}
      <p>{currentQuestionData.question}</p>

      {/* Render options for the current question */}
      {currentQuestionData.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={option}
            name="option"
            value={option}
            checked={currentQuestionData.selectedOption === option} // Check if this option is selected
            onChange={() => handleOptionSelect(option)} // Handle the selection of an option
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}

      {/* Navigation buttons */}
      <div>
        <button
          className="btn btn-secondary m-2"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary m-2"
          onClick={handleNext}
          disabled={currentQuestion === flattenedQuestions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Questions;
