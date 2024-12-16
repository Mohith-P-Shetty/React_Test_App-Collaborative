const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminName: { type: String },            // The name of the admin (e.g., "John Doe")
    email: { type: String, unique: true },  // The unique email address of the admin for login and communication
    passcode: { type: String },             // The encrypted password or passcode for admin authentication
    permission: { type: Boolean },          // A flag indicating whether the admin has full access (true) or restricted access (false)
    designation: { type: String },          // The role or position of the admin (e.g., "Quiz Manager", "Super Admin")
    auditLogs: [
        {
            action: {
                type: String,               // A description of the action performed by the admin (e.g., "Created Quiz", "Deleted Question")
            },
            timestamp: {
                type: Date,
                default: Date.now,
                // The timestamp of when the action occurred, defaults to the current time
            },
        },
    ],

});

// Export the Admin model
module.exports = mongoose.model('Admin', adminSchema);