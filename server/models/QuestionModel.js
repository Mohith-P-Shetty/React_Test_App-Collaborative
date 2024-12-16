const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionId: { type: String, unique: true }, // Unique ID for each question

    jobAppliedFor: {
        type: String,

    },
    category: {
        type: String,

    },
    question: { type: String, },                 // The actual question text
    options: {
        type: [String], // Array of possible answers

    },

    image: {
        // questionId: "",
        type: Buffer,
        // Optional field for storing image data 
    },

    correctOption: {
        type: String,

    },
});

module.exports = mongoose.model('Question', questionSchema);