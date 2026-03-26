const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'New Workout'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  exercises: [{
    exerciseId: String,
    name: String,
    sets: [{
      reps: Number,
      weight: Number,
      isCompleted: {
        type: Boolean,
        default: false
      }
    }]
  }],
  notes: String,
  totalVolume: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
