const express = require('express');
const Category = require('../../models/CategoryPlace');
const verifyToken = require('../../middleware/verifyToken');


const router = express.Router();

router.get('/', verifyToken, (req, res)=>{
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Category.find()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(404))
  } else {
    res.sendStatus(403)
  }
});

router.post('/', verifyToken, (req, res)=>{
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    const category = new Category(req.body);
    category.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(400))
  } else {
    res.sendStatus(403)
  }
});
router.put('/:id', verifyToken, (req, res)=> {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Category.findById(req.params.id, (err, category)=>{
      category.name = req.body.name;
      category.description = req.body.description;
      category.updatedDate = req.body.updatedDate;
      category.save()
        .then(result => res.send(result))
        .catch(() => res.sendStatus(400))
    })
  } else {
    res.sendStatus(403)
  }


});
router.delete('/:id', verifyToken, (req, res)=>{
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator' && req.user._id === req.body.user){
    Users.findById(req.params.id, (err, user)=>{
      user.remove((userErr, removeUser)=>{
        res.send('Delete user');
      })
    })
  } else {
    res.sendStatus(403)
  }
});


module.exports = router;