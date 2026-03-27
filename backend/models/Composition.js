const mongoose = require('mongoose');

const compositionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // The entry method used to create this log
    entryMethod: {
        type: String,
        enum: ['manual', 'bca_receipt', 'body_image'],
        required: true,
        default: 'manual'
    },
    // Cloudinary URL if they uploaded an image (receipt or body image)
    imageUrl: {
        type: String
    },
    
    // Extracted / Entered Data
    weight: { type: Number }, // in kg
    skeletalMuscle: { type: Number }, // in kg
    bodyFatMass: { type: Number }, // in kg
    bodyFatPercent: { type: Number }, // in %
    bmi: { type: Number },
    waistHipRatio: { type: Number },
    waterRate: { type: Number }, // in %
    protein: { type: Number }, // in kg
    inorganicSalt: { type: Number }, // in kg
    basalMetabolicRate: { type: Number }, // kcal
    healthScore: { type: Number } // out of 100
}, { timestamps: true });

module.exports = mongoose.model('Composition', compositionSchema);
