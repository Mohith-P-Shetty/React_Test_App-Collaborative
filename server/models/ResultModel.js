const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    resultid: {
        type: String,
        required: true,
        unique: true,                                           // Ensure result ID is unique
    },
    candidateName: {
        type: String,
        required: true,
    },
    jobAppliedFor: {
        type: String,
        required: true,
    },
    date: {
        type: String,                                           // Store date as a string in YYYY-MM-DD format
        required: true,
    },
    answers: [
        {
            questionId: { type: String, required: true },       // Question ID
            category: { type: String, required: true },         // (e.g., Analytical, Logical, etc.)
            correctOption: { type: String, default: null },     // Correct option as a string
            selectedOption: { type: String, default: null },    // Selected option as a string
            timeTaken: { type: Number, default: 0 },            // Time taken to answer (in seconds or milliseconds)
            point: { type: Number, default: 0 },                // Points for this answer           
        },
    ],
    score: {
        type: Number,
        default: 0, // Default score is 0
    },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
