const Result = require("../models/ResultModel"); // Adjust the path to your model as needed

// Controller function to add a result
const addResult = async (req, res) => {
    try {
        // Extract result data from the request body

        const {
            result_Id,
            candidateName,
            candidateEmail,
            jobAppliedFor,
            answers,
            score
        } = req.body;
        // Generate resultid as a combination of userid and testid
        const resultid = `${result_Id}`;

        // Create a new Result document
        const newResult = new Result({
            resultid,
            candidateName,
            candidateEmail,
            jobAppliedFor,
            answers,
            score
        });

        // Save the document to the database
        const savedResult = await newResult.save();

        // Return success response
        res.status(201).json({ message: "Result added successfully.", data: savedResult });
    } catch (error) {
        console.error("Error adding result:", error);
        res.status(500).json({ message: "An error occurred while adding the result." });
    }
};

// Fetch results by filters (dynamic query)
const getResults = async (req, res) => {
    try {
        const { candidateEmail, jobAppliedFor, date, score } = req.query;

        // Create dynamic query object
        const query = {};
        if (candidateEmail) query.candidateEmail = candidateEmail;
        if (jobAppliedFor) query.jobAppliedFor = jobAppliedFor;
        if (date) query.date = date;
        if (score) query.score = parseInt(score, 10); // Convert score to integer

        // Fetch results based on query
        const results = await Result.find(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Error fetching results", error: error.message });
    }
};
// Fetch a single result by resultid
const getResultById = async (req, res) => {
    try {
        const { result_id } = req.params;
        console.log(result_id);
        const result = await Result.findOne({ result_id });
        if (!result) {
            return res.status(404).json({ message: "Result not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching result", error: error.message });
    }
};

module.exports = { addResult, getResults, getResultById };

