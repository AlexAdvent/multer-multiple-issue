const multer  = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('type',req.body.type);
      cb(null, "uploads/images/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });


const maxSize = 1 * 1024 * 1024; // for 1MB

var upload = multer({
    storage: storage,
    fileFilter: async (req, file, cb) => {

      var ext = path.extname(file.originalname);
      console.log("ext", ext);

      let validImageExtensions = ['png', 'jpg', 'jpeg'];

      if (validImageExtensions.indexOf(ext.substring(1)) === -1) {
        cb(null, false);
        console.log("invalid extension");
        return cb(new Error("Only " + validImageExtensions + " are allowed with maxsize 1MB"));
      }else{
        console.log("valid extension");
        cb(null, true);
      }
    },
    limits: { fileSize: maxSize },
  });

module.exports = upload;