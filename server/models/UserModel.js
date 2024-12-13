const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({                        // Define a schema for the "User" collection


    candidateName: { type: String, required: true },             // Name of the candidate
    gender: { type: String, required: true },                   // Gender of the candidate (e.g., "Male", "Female", "Other")
    email: { type: String, required: true, unique: true },      // Email of the candidate (must be unique to prevent duplicates)
    contactNo: { type: String, required: true },                // Contact number of the candidate
    registrationDate: { type: Date, default: Date.now },        // Date of registration (defaults to the current date and time)
    source: { type: String, required: true },                   // Source of registration (e.g., "Referral", "College")
    qualifications: { type: String, required: true },           // Candidate's qualifications (e.g., "Bachelor's Degree", "Master's Degree")
    stream: { type: String, required: true, required: true },   // Stream or field of study (e.g., "Computer Science", "Mechanical Engineering")
    yearOfPassing: { type: Number, required: true },            // Year the candidate passed their studies (e.g., 2022)
    jobAppliedFor: [{ type: String, required: true }],          // Job role or position the candidate is applying for 
    collegename: { type: String },                                // College name if source is College
    referralcode: { type: String },                               // Referral-Code if source is referral-code
    resume: { type: Buffer },                                   // Uploaded resume as a binary file (stored as a Buffer)
});

module.exports = mongoose.model('User', userSchema);            // Export the User model based on the schema