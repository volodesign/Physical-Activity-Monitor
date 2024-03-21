const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");

//get user info
router.get("/userdata", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-passwordHash -_id');
        if (!user) {
            // Handle case when user is not found
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error retrieving user data:", error);
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
})

module.exports = router;