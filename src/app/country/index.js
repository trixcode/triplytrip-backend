const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const Country = require('../../models/Country');


const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Country.find()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(404))
  } else {
    res.status(403).send({message: 'You are not view'})
  }
});
router.post('/', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    const country = new Country(req.body);
    country.save()
      .then(result => res.send(result))
      .catch(() => res.send(404))
  } else {
    res.status(403).send({message: 'You are not posted'})
  }
});
router.delete('/:id', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Users.findById(req.params.id, (err, user)=>{
      user.remove((userErr, removeUser)=>{
        res.send('Delete category');
      })
    })
  }
})


module.exports = router;