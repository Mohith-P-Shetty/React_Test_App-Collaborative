// Import the Admin model
const Admin = require('../models/AdminModel.js');

// Create a new Admin
const createAdmin = async (req, res) => {
    try {
        const { adminName, email, passcode, permission, designation } = req.body;

        // Create a new admin
        const newAdmin = new Admin({
            adminName,
            email,
            passcode, // Ideally, hash this passcode before saving
            permission,
            designation,
            auditLogs: [{ action: 'Admin account created' }],
        });

        await newAdmin.save(); // Save the admin to the database
        res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
};

// Get all Admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find(); // Retrieve all admins
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins', error: error.message });
    }
};

// Get an Admin by ID
const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id); // Find admin by ID

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin', error: error.message });
    }
};

// Update an Admin
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { adminName, email, passcode, permission, designation } = req.body;

        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            {
                adminName,
                email,
                passcode, // Again, hash the passcode if updated
                permission,
                designation,
                $push: { auditLogs: { action: 'Admin details updated' } },
            },
            { new: true } // Return the updated document
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin', error: error.message });
    }
};

// Delete an Admin
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error: error.message });
    }
};

// Add an audit log entry for an Admin
const addAuditLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body;

        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { $push: { auditLogs: { action } } },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Audit log added', admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error adding audit log', error: error.message });
    }
};

// Export each controller separately
module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    addAuditLog,
};
