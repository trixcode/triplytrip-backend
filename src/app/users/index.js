const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const Users = require('../../models/Users');
const Place = require('../../models/Place');
const verifyToken = require('../../middleware/verifyToken');
const userByToken = require('../../middleware/userByToken');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin') {
    Users.find()
      .then(results => res.json({ results }))
  } else {
    Users.findById(req.user._id)
      .then(results => res.json({ results }))
  }

});

router.get('/myuser', userByToken, (req, res) => {
  if (req.user) {
    const response = {
      user : req.user,
      token: req.token,
    }
    res.json(response);
  } else {
    const response = {
      user: '',
      token: '',
    }
    res.json(response);
  }
})

router.get('/places', verifyToken, (req, res) => {
  if (req.user) {
    Place.find({ user: req.user._id })
      .populate('user')
      .then(result => res.json({ userPlaces: result }))
      .catch(() => res.sendStatus(404))
  }
});


router.get('/:id', verifyToken, (req, res) => {
  if (req.user) {
    Users.findById(req.params.id)
      .then(result => res.send(result))
      .catch(() => res.sendStatus(500))
  }

});

router.patch('/:id', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Users.findById(req.params.id, (err, user) => {
      user.set({ ...req.body, updatedDate: new Date() });
      user.save((saveErr, updatedUser) => {
        res.send({ updatedUser })
      })
    })
  } else if (req.user._id.equals(req.params.id)) {
    Users.findById(req.params.id, (err, user) => {
      user.set({ ...req.body, updatedDate: new Date() });
      user.save((saveErr, updatedUser) => {
        res.send({ updatedUser })
      })
    })
  } else {
    res.sendStatus(403)
  }

});

router.put('/:id', [upload.single('avatar')], (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Users.findById(req.params.id, (err, user) => {
      if (req.file) {
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
  } else if (req.user._id.equals(req.params.id)) {
    Users.findById(req.params.id, (err, user) => {
      if (req.file) {
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
  } else {
    res.sendStatus(403)
  }


});

router.delete('/remove/:id', verifyToken, (req, res) => {

  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Users.findById(req.params.id, (err, user) => {
      user.remove((userErr, removeUser) => {
        res.send('Delete user');
      })
    })
  } else if (req.user._id.equals(req.params.id)) {
    Users.findById(req.params.id, (err, user) => {
      user.remove((userErr, removeUser) => {
        res.send('Your profile deleted');
      })
    })
  } else {
    res.sendStatus(403)
  }

});
// ------------




module.exports = router;