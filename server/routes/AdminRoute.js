const express = require('express');
const adminController = require('../controllers/AdminController'); // Adjust the path if necessary

const router = express.Router();

// Route to create a new admin
router.post('/create', adminController.createAdmin);

// Route to get all admins
router.get('/', adminController.getAllAdmins);

// Route to get a specific admin by ID
router.get('/:id', adminController.getAdminById);

// Route to update an admin by ID
router.put('/:id/update', adminController.updateAdmin);

// Route to delete an admin by ID
router.delete('/:id/delete', adminController.deleteAdmin);

// Route to add an audit log entry for a specific admin
router.post('/:id/audit-log', adminController.addAuditLog);

module.exports = router;