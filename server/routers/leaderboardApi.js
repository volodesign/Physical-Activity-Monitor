const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");

router.get("/getdata", async (req, res) => {
  try {
    const users = await User.find().populate("workouts");
    const leaderboard = users.map((user) => {
      const totalDuration = user.workouts.reduce(
        (acc, workout) => acc + workout.duration,
        0
      );
      const totalCalories = user.workouts.reduce(
        (acc, workout) => acc + workout.calories,
        0
      );
      return {
        name: user.first_name + " " + user.last_name,
        country: user.country,
        age: user.age,
        weight: user.weight,
        totalDuration,
        totalCalories,
      };
    });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
