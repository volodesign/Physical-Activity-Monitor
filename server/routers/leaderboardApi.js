const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");

router.get("/getdata", async (req, res) => {
  try {
    const users = await User.find().populate("workouts");

    const leaderboard = users.map((user) => {
      const totalCalories = user.workouts.reduce(
        (acc, workout) => acc + workout.calories,
        0
      );

      const totalWorkouts = user.workouts.length;

      return {
        Name: user.first_name + " " + user.last_name,
        Country: user.country,
        Age: user.age,
        Weight: user.weight,
        Workouts: totalWorkouts,
        Calories: totalCalories,
      };
    });

    leaderboard.sort((a, b) => b.Calories - a.Calories);
    const response = leaderboard.map((user, index) => {
      return {
        Rank: index + 1,
        Name: user.Name,
        Country: user.Country,
        Age: user.Age,
        Weight: user.Weight,
        Workouts: user.Workouts,
        Calories: user.Calories,
      };
    });
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
