const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
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
  difficulty: String,
  duration: String,
  tags: [String],
  schedule: [{
    day: String,
    focus: String,
    exercises: [{
      id: String,
      sets: String,
      reps: String
    }]
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

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
