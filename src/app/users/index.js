const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const Users = require('../../models/Users');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken/index');


const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) =>{
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});
const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Get Users',
        authData
      });
    }
  })
})


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

router.get('/:id', (req, res) => {
  Users.findById(req.params.id)
    .then(result => res.send(result))
    .catch(() => res.sendStatus(500))
});

router.patch('/:id', (req, res) => {
  Users.findById(req.params.id, (err, user)=>{
    user.set({...req.body, updatedDate: new Date()});
    user.save((saveErr, updatedUser)=>{
      res.send({updatedUser})
    })
  })
});

router.put('/:id', (req, res) => {
  Users.findById(req.params.id, (err, user)=>{
    if (req.file){
      user.avatar = req.file.filename
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.dateOfBirth = req.body.dateOfBirth;
    user.phone = req.body.phone;
    user.updatedDate = new Date();
    user.save((saveErr, updatedUser) => {
      res.send({ updatedUser });
    });
  })
});

router.delete('/remove/:id', (req, res)=> {
  Users.findById(req.params.id, (err, user)=>{
    user.remove((userErr, removeUser)=>{
      res.send('Delete user');
    })
  })
});
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
    await user.save();
    res.json({
      token,
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




module.exports = router;