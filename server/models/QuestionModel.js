const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionId: { type: String, required: true, unique: true }, // Unique ID for each question

    jobAppliedFor: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    question: { type: String, required: true }, // The actual question text
    options: {
        type: [String], // Array of possible answers
        required: true,
    },

    image: {
        // questionId: "",
        type: Buffer,
        required: false // Optional field for storing image data 
    },

    correctOption: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Question', questionSchema);