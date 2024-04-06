const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  type: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  calories: {
    type: Number,
    require: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;
