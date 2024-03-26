const fs = require("fs");

const uploadImageValidationMiddleware = (req, res, next) => {
  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    return res.status(400).json({ message: "Error uploading a file" });
  }

  let image = req.file.path;

  if (
    !req.file.mimetype.includes("jpeg") &&
    !req.file.mimetype.includes("jpg") &&
    !req.file.mimetype.includes("png")
  ) {
    fs.unlinkSync(image);
    return res.status(400).json({ message: "File type is not supported" });
  }

  if (req.file.size > 2 * 1024 * 1024) {
    return res.status(400).json({ message: "File is too large. Max 2mb" });
  }

  next();
};

module.exports = uploadImageValidationMiddleware;
