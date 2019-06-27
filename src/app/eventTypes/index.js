const express = require('express');
const EventTypes = require('../../models/EventTypes');
const verifyToken = require('../../middleware/verifyToken');


const router = express.Router();

router.get('/', (req, res)=> {
  EventTypes.find()
    .then(result => res.send(result))
    .catch(() => res.sendStatus(404));
});

router.post('/', verifyToken, (req, res)=>{
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    const EventTypes = new EventTypes(req.body);
    EventTypes.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(400))
  } else {
    res.sendStatus(403)
  }
});
router.put('/:id', verifyToken, (req, res)=> {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    EventTypes.findById(req.params.id, (err, EventTypes)=>{
      EventTypes.name = req.body.name;
      EventTypes.description = req.body.description;
      EventTypes.updatedDate = req.body.updatedDate;
      EventTypes.save()
        .then(result => res.send(result))
        .catch(() => res.sendStatus(400))
    })
  } else {
    res.sendStatus(403)
  }


});
router.delete('/:id', verifyToken, (req, res)=>{
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator' && req.user._id === req.body.user){
    EventTypes.findById(req.params.id, (err, user)=>{
      user.remove((userErr, removeUser)=>{
        res.send('Delete EventTypes Place');
      })
    })
  } else {
    res.sendStatus(403)
  }
});


module.exports = router;