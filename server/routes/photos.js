const express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const connection = require("../models/dbPhotos");
const Grid = require("gridfs-stream");
const upload = require("../models/photos");

let gfs;
connection();

const conn = mongoose.connection;

conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

//This will return back the url that will be used in saving in the user record
router.post("/", upload.single("file"), async (req, res) => {
    if (req.file === undefined) {
        return await res.send("you must select a file.");
    }

    console.log("req.file.filename = ", req.file.filename);

    const imageUrl = {imgUrl: `http://localhost:3000/upload/file/${req.file.filename}`};

    console.log("imageUrl = ", imageUrl);

    return await res.send(imageUrl);
});


// Postman: http://localhost:4444/api/photos/file/1628729402214-any-name-farside.jpg
router.get("/file/:filename", async (req, res) => {

    console.log("inside get by filename")
    console.log("filename = ", req.params.filename)
    
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});
// http://localhost:4444/api/photos/1628733892398-any-name-farside.jpg
router.delete("/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});

module.exports = router;