import { useSelector, useDispatch } from "react-redux";
import { setCurrentQuestion } from "../../../redux/Slices/testMetaDataSlice"; // Import the action
// import { useEffect } from "react";

const Questions = () => {
  const dispatch = useDispatch();

  // Fetch data from Redux store
  const { questions, currentQuestion } = useSelector(
    (state) => state.testMetaData
  );

  // Get the current question object from the questions array using the currentQuestion index
  const currentQuestionData = questions[currentQuestion];

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      dispatch(setCurrentQuestion(currentQuestion - 1)); // Update the current question index in Redux
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      dispatch(setCurrentQuestion(currentQuestion + 1)); // Update the current question index in Redux
    }
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
            // Handle selection logic if needed (e.g., storing the selected option in Redux)
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
          disabled={currentQuestion === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Questions;
