const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const RoleUsers = require('../../models/RoleUsers');

const router = express.Router();

router.get('/', verifyToken,  (req, res)=>{
  if (req.user.roles.name === 'admin'){
    RoleUsers.find()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(404))
  } else {
    res.sendStatus(403)
  }

});
router.get('/:id', verifyToken, (req, res)=>{
  if (req.user.roles.name === 'admin'){
    RoleUsers.findById(req.params.id)
      .then(result => res.send(result))
      .catch(()=> res.sendStatus(404))
  } else {
    res.sendStatus(403)
  }

});
router.post('/', verifyToken,(req, res)=> {
  if (req.user.roles.name === "admin"){
    const role = new RoleUsers(req.body);
    role.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(404))
  }else {
    res.sendStatus(403)
  }

});
router.delete('/:id', verifyToken, (req, res)=>{
  if (req.user.roles.name === "admin"){
    Users.findById(req.params.id, (err, user)=>{
      user.remove((userErr, removeUser)=>{
        res.send('Delete Role');
      })
    })
  }else {
    res.sendStatus(403)
  }

})


module.exports = router;