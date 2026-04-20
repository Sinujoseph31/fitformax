const mongoose = require('mongoose');

const hydrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: String, // Stored as YYYY-MM-DD for easy daily reset/lookup
    required: true
  }
}, {
  timestamps: true
});

// Composite index for fast lookup of a user's specific day
hydrationSchema.index({ user: 1, date: 1 }, { unique: true });

const Hydration = mongoose.model('Hydration', hydrationSchema);
module.exports = Hydration;
