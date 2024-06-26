const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");

//delete workout
router.post("/delete/:workoutId", auth, async (req, res) => {
  const workoutId = req.params.workoutId;
  try {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    const user = await User.findById(workout.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.workouts.pull(workoutId);
    await user.save();

    await Workout.deleteOne({ _id: workoutId });

    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).send("Error deleting workout");
  }
});

//create new workout
router.post("/create", auth, async (req, res) => {
  const { type, duration, calories } = req.body;
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const workout = new Workout({
      user: req.user,
      type: type,
      duration: duration,
      calories: calories,
    });

    await workout.save();

    user.workouts.push(workout);
    await user.save();

    res.status(200).send("Workout created successfully");
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).send("Error creating workout");
  }
});

router.post("/update/:id", auth, async (req, res) => {
  const { type, duration, calories } = req.body;
  const workoutId = req.params.id;

  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const workout = await Workout.findOneAndUpdate(
      { _id: workoutId, user: req.user },
      { type, duration, calories },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({ message: "Workout updated successfully", workout });
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).send("Error updating workout");
  }
});

//get all user workouts
router.get("/getdata/:userId", auth, async (req, res) => {
  const userId = req.params.userId;
  try {
    const userWorkouts = await Workout.find({ user: userId });
    res.json(userWorkouts);
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get all user workouts by date
router.get("/getdata/:userId/:date", auth, async (req, res) => {
  const userId = req.params.userId;
  const targetDate = new Date(req.params.date);
  try {
    const userWorkouts = await Workout.find({
      user: userId,
      date: {
        $gte: new Date(
          targetDate.getFullYear(),
          targetDate.getMonth(),
          targetDate.getDate()
        ), // Greater than or equal to start of the day
        $lt: new Date(
          targetDate.getFullYear(),
          targetDate.getMonth(),
          targetDate.getDate() + 1
        ), // Less than the start of the next day
      },
    });
    res.json(userWorkouts);
  } catch (error) {
    console.error("Error fetching user workouts by date:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
