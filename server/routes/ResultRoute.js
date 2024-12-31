const express = require("express");
const { addResult, getResults, getResultById } = require("../controllers/ResultController"); // Adjust path as necessary

const router = express.Router();

// POST: Add a new result
router.post("/add", addResult);

// GET: Fetch results by query parameters
router.get("/", getResults);

// GET: Fetch a single result by result ID
router.get("/:resultId", getResultById);

module.exports = router;
