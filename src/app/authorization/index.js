const express = require('express');
const router = express.Router();
const muler = require('multer');
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');

const Users = require('../../models/Users');


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
router.post('/register', async (req, res) => {
  const user = new Users(req.body);
  user.generateToken();
  if (req.file){
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