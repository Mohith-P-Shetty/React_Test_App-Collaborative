const express = require("express");
const { addResult, getResults, getResultById } = require("../controllers/ResultController"); // Adjust path as necessary

const router = express.Router();

router.post("/addResult", addResult);

router.post("/getResult", getResults);

router.post("/getResultById", getResultById);

module.exports = router;
