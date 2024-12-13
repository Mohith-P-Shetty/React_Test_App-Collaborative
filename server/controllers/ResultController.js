const Result = require("../models/ResultModel"); // Adjust the path to your model as needed

// Controller function to add a result
const addResult = async (req, res) => {
    try {
        // Extract result data from the request body
        const {
            userid,
            testid,
            date,
            answers,
            score
        } = req.body;

        // Validate required fields
        if (!userid || !testid || !date || !answers) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Generate resultid as a combination of userid and testid
        const resultid = `${userid}_${testid}`;

        // Create a new Result document
        const newResult = new Result({
            resultid,
            userid,
            testid,
            date,
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
        const { userid, testid, date, score } = req.query;

        // Create dynamic query object
        const query = {};
        if (userid) query.userid = userid;
        if (testid) query.testid = testid;
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
        const { resultid } = req.params;

        const result = await Result.findOne({ resultid });
        if (!result) {
            return res.status(404).json({ message: "Result not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching result", error: error.message });
    }
};

module.exports = { addResult, getResults, getResultById };

