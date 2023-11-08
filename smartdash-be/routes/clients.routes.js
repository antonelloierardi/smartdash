const express = require('express');
const clients = require("../controllers/clients.controller.js");
const router = express.Router();
const multer = require('multer');
const DIR = '../smartdash-fe/src/assets/images/profiles/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, fileName)
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  },
})


router.post("/",upload.single('photo'), clients.create);


router.get("/", clients.findAll);


router.get("/:id", clients.findOne);


router.put("/:id",upload.single('photo'), clients.update);


router.delete("/:id", clients.delete);


router.delete("/", clients.deleteAll);

module.exports = router;
