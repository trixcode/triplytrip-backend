const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const Users = require('../../models/Users');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');


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
  if (req.user.roles.name === 'admin') {
    Users.find()
      .then(result => res.json({ result }))
  } else {
    Users.findById(req.user._id)
      .then(result => res.json({ result }))
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

router.delete('/remove/:id', verifyToken, (req, res)=> {
  if (req.user.roles.name === 'admin'){
    Users.findById(req.params.id, (err, user)=>{
      user.remove((userErr, removeUser)=>{
        res.send('Delete user');
      })
    })
  } else {
    res.sendStatus(403)
  }

});
// ------------




module.exports = router;