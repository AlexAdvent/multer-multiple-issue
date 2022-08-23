const express = require("express");
const router = express.Router();
const fs = require("fs");
const uploadMultiple = require("../middleware/multer").fields([
  { name: "certificateImage", maxCount: 1 },
  { name: "addressProofImage", maxCount: 1 },
]);

const multer = require("multer");


// route to upload address proof and certificate proof image multter
router.put("/upload-image",  (req, res) => {
  console.log("upload-image", req.body);
  uploadMultiple(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("A Multer error occurred when uploading.");
      console.log(err);
      return res
        .status(400)
        .send({ error: err.message, field: "profileImage" });
      //   return res.status(400).send({error: 'Only .png, .jpg and .jpeg format allowed with maxsize 1Mb!', field: 'profileImage'});
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("A Multer error occurred when uploading.");
      console.log("err", err);
      return res
        .status(400)
        .send({ error: err.message, field: "profileImage" });
      //   return res.status(400).send({error: 'Only .png, .jpg and .jpeg format allowed with maxsize 1Mb!', field: 'profileImage'});
    }

    // Everything went fine.
    console.log("upload-image", req.files);

    return res.send({"req.files": req.files});

   
  });
});


module.exports = router;
