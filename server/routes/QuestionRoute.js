const express = require('express');
const router = express.Router();  // This line is necessary to create a new router instance
const {
    createQuestion,
    editQuestion,
    deleteQuestion,
    getQuestionByCategory,
    getQuestionByJob,
    getAllQuestions
} = require('../controllers/QuestionController');

// Route to create a new question
router.post('/question', createQuestion);

// Route to edit an existing question by ID
router.put('/questions/:questionId', editQuestion);

// Route to delete a question by ID
router.delete('/questions/:questionId', deleteQuestion);

// Route to get questions by category
router.get('/questions/category/:category', getQuestionByCategory);

// Route to get questions by job applied for
router.get('/questions/job/:jobAppliedFor', getQuestionByJob);

// Route to get all questions
router.get('/questions', getAllQuestions);

module.exports = router;