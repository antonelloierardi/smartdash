const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const usersCtrl = require('../controllers/users.controller');
const authCtrl = require('../controllers/auth.controller');
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

router.post('/register', upload.single('photo'), asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', passport.authenticate('jwt', { session: false }), login);

async function register(req, res, next) {
  let photo;
  if (req.file) {
    photo = '/assets/images/profiles/' + req.file.filename
  } else photo = '/assets/images/profiles/no-image.png';
  req.body.photo = photo;
  let user = await usersCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next();
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
