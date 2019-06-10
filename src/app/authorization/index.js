const express = require('express');
const router = express.Router();
const multer = require('multer');
const nanoid = require('nanoid');
const config = require('../../config');
const path = require('path');
const jwt = require('jsonwebtoken');

const Users = require('../../models/Users');

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) =>{
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});


router.post('/login', async (req, res)=>{
  


  const user = await Users.findOne({username: req.body.username});

  if (!user) {
    return res.status(404).send({error: "Username or Password is wrong"})
  }

  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch){
    return res.status(400).send({error: "Username or Password is wrong"})
  }


  jwt.sign({user}, 'secretkey', async (err, token)=>{
    req.user = user;
    await user.save();
    res.json({
      token: token,
      user: jwt.sign({id: req.user}, 'secret'),
      firstName: user.firstName
    })
  });
});
router.delete('/logout', async (req, res) => {
  const token = req.get('Authorization');
  const success = {message: 'Logged out'};

  if (!token) {
    return res.send(success);
  }

  const user = await Users.findOne({token});

  if (!user) {
    return res.send(success);
  }

  user.generateToken();
  await  user.save();

  return res.send(success);
});
router.post('/register', upload.single('avatar'), async (req, res) => {
  const user = new Users(req.body);
  user.generateToken();
  if (req.file) {
    user.avatar = req.file.filename;
  }
  try {
    await user.save();
    return res.send({_id: user._id, username: user.username});
  } catch (e) {
    return res.status(400).send(e)
  }
});

module.exports = router;