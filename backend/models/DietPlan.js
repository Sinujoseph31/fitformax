const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  desc: String,
  macros: {
    protein: Number,
    carbs: Number,
    fat: Number
  },
  rules: [String],
  schedule: [{
    time: String,
    mealName: String,
    notes: String,
    items: [String]
  }],
  type: {
    type: String,
    default: 'custom'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('DietPlan', dietPlanSchema);
