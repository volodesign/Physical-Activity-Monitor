const router = require("express").Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const User = require("../models/userModel");
const File = require("../models/fileModel");
const cloudinary = require("../config/cloudinary");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({});
const upload = multer({ storage });

//upload user image
router.post("/uploadavatar", auth, upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `${req.user}/avatar/`,
    });
    const newUrl = result.secure_url;

    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has an avatar
    if (
      user.avatar !==
      "https://res.cloudinary.com/dtl2l9omr/image/upload/v1711479355/avatar/k4jrt1fmdvojl3wwm56g.jpg"
    ) {
      // Delete the current avatar from Cloudinary
      const publicId = user.avatar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // Save the new avatar URL to the user document
    user.avatar = newUrl;
    await user.save();

    res.status(200).send("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file");
  }
});

//delete avatar
router.post("/deleteavatar", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      user.avatar !==
      "https://res.cloudinary.com/dtl2l9omr/image/upload/v1711479355/avatar/k4jrt1fmdvojl3wwm56g.jpg"
    ) {
      const publicId = user.avatar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);

      user.avatar =
        "https://res.cloudinary.com/dtl2l9omr/image/upload/v1711479355/avatar/k4jrt1fmdvojl3wwm56g.jpg";
      await user.save();

      res.status(200).send("Avatar deleted and set to default successfully");
    } else {
      res.status(200).send("No avatar to delete. Already set to default.");
    }
  } catch (error) {
    console.error("Error deleting avatar:", error);
    res.status(500).send("Error deleting avatar");
  }
});

//get user info
router.get("/userdata", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-passwordHash");
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
