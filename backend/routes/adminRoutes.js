const express = require('express');
const router = express.Router();
const { getAllUsers, getUserDetail, updateUserRole, deleteUser } = require('../controllers/adminController');
const { protect, requireAdmin } = require('../middleware/auth');

// All admin routes require auth AND admin role
router.use(protect, requireAdmin);

router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetail);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
