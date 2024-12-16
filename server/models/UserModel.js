const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({                         // Define a schema for the "User" collection


    candidateName: { type: String, },                                       // Name of the candidate
    gender: { type: String, },                                              // Gender of the candidate (e.g., "Male", "Female", "Other")
    email: { type: String, unique: true },                                  // Email of the candidate (must be unique to prevent duplicates)
    contactNo: { type: String, },                                           // Contact number of the candidate
    registrationDate: { type: Date, default: Date.now },                    // Date of registration (defaults to the current date and time)
    source: { type: String, },                                              // Source of registration (e.g., "Referral", "College")
    qualifications: { type: String, },                                      // Candidate's qualifications (e.g., "Bachelor's Degree", "Master's Degree")
    stream: { type: String, },                                              // Stream or field of study (e.g., "Computer Science", "Mechanical Engineering")
    yearOfPassing: { type: Number, },                                       // Year the candidate passed their studies (e.g., 2022)
    jobAppliedFor: [{ type: String }],                                      // Job role or position the candidate is applying for 
    collegename: { type: String },                                          // College name if source is College
    referralcode: { type: String },                                         // Referral-Code if source is referral-code
    resume: { type: Buffer },                                               // Uploaded resume as a binary file (stored as a Buffer)
});

module.exports = mongoose.model('User', userSchema);            // Export the User model based on the schema