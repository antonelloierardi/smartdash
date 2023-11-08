const express = require('express');
const companies = require("../controllers/companies.controller.js");
const router = express.Router();
const multer = require('multer');
const DIR = '../smartdash-fe/src/assets/images/logos/'

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


router.post("/",upload.single('logo'), companies.create);

router.get("/", companies.findAll);

router.get("/:id", companies.findOne);

router.put("/:id",upload.single('logo'), companies.update);

router.delete("/:id", companies.delete);

router.delete("/", companies.deleteAll);

module.exports = router;