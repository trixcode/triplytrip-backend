const express = require('express');
const jwt = require('jsonwebtoken');
const permit = require('../../middleware/permit');
const verifyToken = require('../../middleware/verifyToken');
const RoleUsers = require('../../models/RoleUsers');

const router = express.Router();

router.get('/', (req, res)=>{
  RoleUsers.find()
    .then(result => res.send(result))
    .catch(() => res.sendStatus(404))
});
router.get('/:id', (req, res)=>{
  RoleUsers.findById(req.params.id)
    .then(result => res.send(result))
    .catch(()=> res.sendStatus(404))
});
router.post('/', (req, res)=> {
  if (req.body.user && req.body.user.roles === "admin"){
    const role = new RoleUsers(req.body);
    role.save()
      .then(result => res.send(result))
  }

});
router.delete('/:id', (req, res)=>{
  Users.findById(req.params.id, (err, user)=>{
    user.remove((userErr, removeUser)=>{
      res.send('Delete user');
    })
  })
})


module.exports = router;