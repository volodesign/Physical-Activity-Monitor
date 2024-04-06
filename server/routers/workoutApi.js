const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");

//delete workout
router.post("/delete/:workoutId", auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);

    if (!workout) {
      return res.status(404).send("Workout not found");
    }

    await workout.deleteOne();

    res.status(200).send("Workout deleted successfully");
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).send("Error deleting workout");
  }
});

//create new workout
router.post("/create", auth, async (req, res) => {
  try {
    const workoutDetails = {
      type: req.body.type,
      duration: req.body.duration,
      calories: req.body.calories,
      user: req.user,
    };

    const workout = new Workout(workoutDetails);
    await workout.save();

    res.status(200).send("Workout created successfully");
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).send("Error creating workout");
  }
});

//get all user workouts
router.get("/getdata/:userID", auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.params.userID });
    res.json(workouts);
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
