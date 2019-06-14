const express = require('express');
const Cities = require('../../models/Cities');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();


router.get('/', (req, res) => {
  Cities.find()
    .then(result => res.send(result))
    .catch(() => res.sendStatus(404))
});

router.post('/', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    const cities = new Cities(req.body);
    cities.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(404))
  } else {
    res.status(403).send({message: 'You are not posted'})
  }
});
router.delete('/:id', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Cities.findById(req.params.id, (err, user)=>{
      user.remove((userErr, removeUser)=>{
        res.send('Delete category');
      })
    })
  }
});

module.exports = router;