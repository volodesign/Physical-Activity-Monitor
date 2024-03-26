const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadController = {
  uploadAvatar: async (req, res) => {
    try {
      const file = req.file;

      cloudinary.v2.uploader.upload(
        file.path,
        {
          folder: "avatar",
          width: 200,
          height: 200,
          crop: "fill",
        },
        (err, result) => {
          if (err) throw err;
          fs.unlinkSync(file.path);
          res
            .status(200)
            .json({ message: "File uploaded", url: result.secure_url });
        }
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = uploadController;
