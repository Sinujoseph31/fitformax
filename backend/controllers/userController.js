const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/user/profile
const getUserProfile = async (req, res) => {
    // req.user is already populated by protect middleware
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            age: req.user.age,
            height: req.user.height,
            weight: req.user.weight,
            goal: req.user.goal,
            gender: req.user.gender,
            bmi: req.user.bmi,
            bmiCategory: req.user.bmiCategory,
            role: req.user.role
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.age = req.body.age || user.age;
        user.height = req.body.height || user.height;
        user.weight = req.body.weight || user.weight;
        user.goal = req.body.goal || user.goal;
        user.gender = req.body.gender || user.gender;
        user.bmi = req.body.bmi || user.bmi;
        user.bmiCategory = req.body.bmiCategory || user.bmiCategory;
        user.role = req.body.role || user.role;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            age: updatedUser.age,
            height: updatedUser.height,
            weight: updatedUser.weight,
            goal: updatedUser.goal,
            gender: updatedUser.gender,
            bmi: updatedUser.bmi,
            bmiCategory: updatedUser.bmiCategory,
            role: updatedUser.role,
            token: req.headers.authorization.split(' ')[1] // Keep existing token
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { getUserProfile, updateUserProfile };
