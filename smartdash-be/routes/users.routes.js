const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const usersCtrl = require('../controllers/users.controller');
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

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(asyncHandler(insert));
router.route('/:id').put( upload.single('photo'),asyncHandler(update));
router.route('/:id').delete(usersCtrl.deleteUser);
router.route('/').get(usersCtrl.findAll);
router.route('/:id').get(usersCtrl.findOne);

async function insert(req, res) {
  let user = await usersCtrl.insert(req.body);
  res.json(user);
}

async function update(req, res) {
  let photo;
  if (req.file) {
    photo = '/assets/images/profiles/' + req.file.filename
  } else photo = req.body.photo;
  req.body.photo = photo;
  let user = await usersCtrl.update(req.body);
  let message = "Aggiornamento avvenuto con successo!"
  res.json({ message, user });
}
