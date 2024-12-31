import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  candidateEmail: null, // Store the current candidate's email
  isSubmitted: false, // Flag to track if the test is submitted
  questions: [
    // Example question structure
    // {
    //   questionId: "1",
    //   jobAppliedFor: "Software Engineer",
    //   category: "Aptitude",
    //   question: "What is 2 + 2?",
    //   options: ["1", "2", "3", "4"],
    //   correctOption: "4",
    //   selectedOption: null, // User's selected option
    //   visited: false, // Whether the user has visited the question
    //   points: 0, // Points assigned for the question (can be 1 or more)
    // },
  ],
  currentQuestion: 0, // Index of the current question being answered
  totalPoints: 0, // Total score
};

const testMetaDataSlice = createSlice({
  name: "testMetaData",
  initialState,
  reducers: {
    // Action to set the candidate email
    setCandidateEmail: (state, action) => {
      state.candidateEmail = action.payload;
    },
    // Action to set the questions array (e.g., fetched from API)
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    // Action to update the selected option for a specific question
    selectOption: (state, action) => {
      const { questionId, selectedOption } = action.payload;
      const question = state.questions.find((q) => q.questionId === questionId);
      if (question) {
        question.selectedOption = selectedOption;

        // Update the points for the question based on correctness
        question.points = selectedOption === question.correctOption ? 1 : 0;
      }
    },
    // Action to mark a question as visited
    markAsVisited: (state, action) => {
      const { questionId } = action.payload;
      const question = state.questions.find((q) => q.questionId === questionId);
      if (question) {
        question.visited = true;
      }
    },
    // Action to update the current question index
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    // Action to submit the test and mark the test as submitted
    submitTest: (state) => {
      state.isSubmitted = true;
    },
    setTotalPoints: (state, action) => {
      state.totalPoints = action.payload;
      console.log(`test meta data pay load :${state.totalPoints}`);
    },
    // Action to reset the test (e.g., clearing selected options and totalPoints)
    resetTest: (state) => {
      state.questions = state.questions.map((q) => ({
        ...q,
        selectedOption: null,
        visited: false,
      }));
      state.isSubmitted = false;
      state.currentQuestion = 0; // Reset the current question to the first question
      state.totalPoints = 0;
    },
  },
});

// Export actions to dispatch them
export const {
  setCandidateEmail,
  setQuestions,
  selectOption,
  markAsVisited,
  setCurrentQuestion,
  setTotalPoints,
  submitTest,
  resetTest,
} = testMetaDataSlice.actions;

// Export the reducer to add to the store
export default testMetaDataSlice.reducer;
