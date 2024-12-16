const User = require('../models/UserModel.js'); // Import the User model

module.exports = {

    // Registration handler (includes all fields except jobAppliedFor)
    async register(req, res) {
        try {
            const { candidateName, gender, email, contactNo, source, qualifications, stream, yearOfPassing, collegename, referralcode } = req.body;

            // Check if the email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists.' });
            }

            // Create a new user object
            const newUser = new User({
                candidateName,
                gender,
                email,
                contactNo,
                source,
                qualifications,
                stream,
                yearOfPassing,
                collegename,
                referralcode,
                // resume,
            });

            // Save the user to the database
            await newUser.save();

            return res.status(201).json({ message: 'Registration successful', user: newUser });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error, please try again later.' });
        }
    },

    // Login handler (find by email and add jobAppliedFor field if missing, always add new jobAppliedFor)
    async login(req, res) {
        try {
            const { email, jobAppliedFor } = req.body;

            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            // Always add the new jobAppliedFor value to the array, even if there are existing values
            if (!user.jobAppliedFor.includes(jobAppliedFor)) {
                user.jobAppliedFor.push(jobAppliedFor); // Add job applied for (if not already in the array)
                await user.save(); // Save the updated user
            }

            return res.status(200).json({
                message: 'Login successful',
                user,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error, please try again later.' });
        }
    },
};