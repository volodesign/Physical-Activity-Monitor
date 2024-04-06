const router = require("express").Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const User = require("../models/userModel");
const File = require("../models/fileModel");
const cloudinary = require("../config/cloudinary");

const storage = multer.diskStorage({});
const upload = multer({
  storage: storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/") ||
      file.mimetype.startsWith("audio/") ||
      file.mimetype.startsWith("application/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"));
    }
  },
});

router.post("/uploadfile", auth, upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `${req.user}/files/`,
    });
    const newUrl = result.secure_url;
    const fileDetails = {
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: newUrl,
      user: req.user,
    };
    const file = new File(fileDetails);
    await file.save();

    res.status(200).send("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file");
  }
});

router.get("/filesdata/:userID", auth, async (req, res) => {
  try {
    const files = await File.find({ user: req.params.userID });
    res.json(files);
  } catch (error) {
    console.error("Error fetching user files:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/deletefile/:fileID", auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.fileID);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const parts = file.filePath.split("/");
    const tempURL =
      parts[parts.length - 3] +
      "/" +
      parts[parts.length - 2] +
      "/" +
      parts[parts.length - 1];

    const publicId = tempURL.split(".").slice(0, -1).join(".");

    await cloudinary.uploader.destroy(publicId);

    await File.findByIdAndDelete(req.params.fileID);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
