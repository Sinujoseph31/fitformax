const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true }, // Cloudinary public ID for deletion
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);
