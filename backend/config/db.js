const mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // One-time migration: Add default 'role: user' to any existing users missing the field
        const usersCollection = conn.connection.collection('users');
        const result = await usersCollection.updateMany(
            { role: { $exists: false } },
            { $set: { role: 'user' } }
        );
        if (result.modifiedCount > 0) {
            console.log(`[Migration] Added 'role: user' to ${result.modifiedCount} existing user(s).`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;
