const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");
const fileCtrl = require("../controllers/fileCtrl");



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    },
})

const upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 } //100mb
});

router.get("/", (req, res) => {
    File.getFiles(results => {
        res.json({ files: results })
    })
});


router.post("/", upload.single('myFile'), fileCtrl.createFile)
router.post("/send", fileCtrl.send)
router.get("/:uuid", fileCtrl.getFile);

router.get("/download/:uuid", fileCtrl.downloadFile)

module.exports = router