const User = require('../models/User');

exports.registerToken = async (req, res) => {
    try {
        const { token } = req.body;
        const userId = req.user.id; // From auth middleware

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        // Add token if not exists
        await User.findByIdAndUpdate(userId, {
            $addToSet: { deviceTokens: token }
        });

        res.status(200).json({ message: 'Token registered successfully' });
    } catch (error) {
        console.error('Register Token Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
