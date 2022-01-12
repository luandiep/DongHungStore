const fs = require("fs");
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(
      new Error("Only image files are allowed! type not invalid"),
      false
    );
  } else {
    fs.exists("Images/" + file.originalname, function (exists) {
      if (exists) {
        cb(null, true);
      } else {
        cb(null, true);
      }
    });
  }
  cb(null, true);
};
exports.imageFilter = imageFilter;
