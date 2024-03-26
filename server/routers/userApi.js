const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const upload = require("../middleware/upload");
const uploadImage = require("../middleware/uploadImage");
const uploadController = require("../contollers/uploadController");

//upload user image
router.post("/uploadAvatar", uploadImage, upload, auth, async (req, res) => {
  const avatarURL = await uploadController.uploadAvatar(req, res);
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.avatar = avatarURL;
    await user.save();

    res.status(200).send({ message: "Avatar updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get user info
router.get("/userdata", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-passwordHash -_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//update user details
router.post("/updateUser", auth, async (req, res) => {
  const updates = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (const field in updates) {
      user[field] = updates[field];
    }

    await user.save();
    res.status(200).send({ message: "Profile updated" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//update user password
router.post("/updatePassword", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);

    user.passwordHash = req.body.newPassword;
    await user.save();

    res.status(200).send({ message: "Password updated" });
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//update user email
router.post("/updateEmail", auth, async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ errorMessage: "Account with this email already exists" });

    user.email = email;
    await user.save();
    res.status(200).send({ message: "Email updated" });
  } catch (error) {
    console.error("Error updating user email:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
