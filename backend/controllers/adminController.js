const User = require('../models/User');
const Composition = require('../models/Composition');
const WorkoutPlan = require('../models/WorkoutPlan');
const DietPlan = require('../models/DietPlan');

// @desc    Get all users
// @route   GET /api/admin/users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a specific user's full detail with their composition logs
// @route   GET /api/admin/users/:id
const getUserDetail = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const compositionLogs = await Composition.find({ user: req.params.id }).sort({ date: -1 });
        res.json({ user, compositionLogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Promote a user to admin or demote
// @route   PUT /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.role = req.body.role === 'admin' ? 'admin' : 'user';
        await user.save();
        res.json({ message: `User role updated to ${user.role}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a user account
// @route   DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        // Also clean up composition logs
        await Composition.deleteMany({ user: req.params.id });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all plans (optionally filtered by status)
// @route   GET /api/admin/plans
const getAllPlans = async (req, res) => {
    try {
        const workouts = await WorkoutPlan.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        const diets = await DietPlan.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json({ workouts, diets });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve or Reject a plan
// @route   PUT /api/admin/plans/:type/:id/status
const updatePlanStatus = async (req, res) => {
    try {
        const { type, id } = req.params;
        const { status } = req.body;
        
        let plan;
        if (type === 'workout') {
            plan = await WorkoutPlan.findById(id);
        } else {
            plan = await DietPlan.findById(id);
        }

        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        
        plan.status = status;
        await plan.save();
        
        res.json({ message: `Plan status updated to ${status}`, plan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getAllUsers, 
    getUserDetail, 
    updateUserRole, 
    deleteUser,
    getAllPlans,
    updatePlanStatus
};
