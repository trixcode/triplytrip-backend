const express = require('express');
const router = express.Router();
const multer = require('multer');
const nanoid = require('nanoid');
const config = require('../../config');
const path = require('path');
const jwt = require('jsonwebtoken');

const Users = require('../../models/Users');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

//get all users
router.get('/user', function (req, res) {
  Users.find({}, function (err, users) {
    if (err) {
      res.send('error');
      next();
    }
    res.json(users);
  });
})

//get one user
router.get('/user/:id', function (req, res) {
  Users.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      return res.status(200).json(user);
    })
    .catch(err => next(err));
})



router.post('/login', async (req, res) => {

  const user = await Users.findOne({ username: req.body.username });

  if (!user) {
    return res.status(404).send({ error: "Username is not exist" })
  }

  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) {
    return res.status(400).send({ error: "Username or Password is wrong" })
  }


  jwt.sign({ user }, 'secretkey', async (err, token) => {
    req.user = user;
    await user.save();
    res.json({
      token: token,
    })
  });
});
router.delete('/logout', async (req, res) => {
  const token = req.get('Authorization');
  const success = { message: 'Logged out' };

  if (!token) {
    return res.send(success);
  }

  const user = await Users.findOne({ token });

  if (!user) {
    return res.send(success);
  }

  user.generateToken();
  await user.save();

  return res.send(success);
});
router.post('/register', upload.single('avatar'), async (req, res) => {
  const user = new Users(req.body);
  user.generateToken();
  if (req.file) {
    user.avatar = req.file.filename;
  }
  try {
    jwt.sign({ user }, 'secretkey', async (err, token) => {
      req.user = user;
      await user.save();
      res.json({
        token: token,
      })
    });

  } catch (e) {
    return res.status(400).send(e)
  }
});

module.exports = router;