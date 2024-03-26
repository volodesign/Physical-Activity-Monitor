const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const filterFilter = (req, file, cb) => {
  cb(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: filterFilter,
});

module.exports = upload.single("avatar");
