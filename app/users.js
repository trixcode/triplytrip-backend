const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const Users = require('../models/Users');



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

router.get('/', (req, res) => {
  Users.find()
    .then(result => res.send(result))
    .catch(() => res.sendStatus(500))
});

router.post('/', async (req, res) => {
  const user = new Users(req.body);
  user.generateToken();
  if (req.file){
    user.photo = req.file.filename;
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
    user.set(req.body);
    user.save((saveErr, updatedUser)=>{
      res.send({updatedUser})
    })
  })
})



module.exports = router;