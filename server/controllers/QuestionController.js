const Question = require('../models/QuestionModel');

// CREATE: Add a new question
const createQuestion = async (req, res) => {
    try {
        const { questionId, jobAppliedFor, category, question, options, correctOption, image } = req.body;

        // Create a new question document
        const questionData = new Question({
            questionId,
            jobAppliedFor,
            category,
            question,
            options,
            correctOption,
            image: image ? Buffer.from(image, 'base64') : null // Convert base64 string to buffer if image exists
        });

        await questionData.save();
        res.status(201).json({ message: "Question created successfully", question: questionData });
    } catch (error) {
        console.error("Error creating question:", error);
        res.status(500).json({ message: "Error creating question", error });
    }
};

// EDIT: Update a question by ID
const editQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { jobAppliedFor, category, question, options, correctOption, image } = req.body;

        const updatedQuestion = await Question.findOneAndUpdate(
            { questionId },
            {
                jobAppliedFor,
                category,
                question,
                options,
                correctOption,
                image: image ? Buffer.from(image, 'base64') : null // Update image if provided
            },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json({ message: "Question updated successfully", question: updatedQuestion });
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ message: "Error updating question", error });
    }
};

// DELETE: Delete a question by ID
const deleteQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;

        const deletedQuestion = await Question.findOneAndDelete({ questionId });

        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ message: "Error deleting question", error });
    }
};

// READ: Get questions by category
const getQuestionByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const questions = await Question.find({ category });

        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: `No questions found for category: ${category}` });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error("Error retrieving questions by category:", error);
        res.status(500).json({ message: "Error retrieving questions by category", error });
    }
};

// READ: Get questions by job applied for
const getQuestionByJob = async (req, res) => {
    try {
        const { jobAppliedFor } = req.params;
        const questions = await Question.find({ jobAppliedFor });

        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: `No questions found for job: ${jobAppliedFor}` });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error("Error retrieving questions by job applied for:", error);
        res.status(500).json({ message: "Error retrieving questions by job applied for", error });
    }
};

// READ: Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error retrieving all questions:", error);
        res.status(500).json({ message: "Error retrieving questions", error });
    }
};

module.exports = {
    createQuestion,
    editQuestion,
    deleteQuestion,
    getQuestionByCategory,
    getQuestionByJob,
    getAllQuestions
};
